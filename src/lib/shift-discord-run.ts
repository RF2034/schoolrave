import {
  dueShifts,
  parseShiftCsv,
  shiftDiscordPayload,
} from "./shift-discord.ts";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/1O6Pl5W10lLasni7azFAHcyKXQNZsM91ufCCVIGrvm6Q/export?format=csv&gid=1053159720";

type Statement = {
  bind(...values: unknown[]): Statement;
  run(): Promise<{ meta?: { changes?: number } }>;
  first<T>(): Promise<T | null>;
};

type ShiftDb = { prepare(query: string): Statement };

type ShiftEnv = {
  DB?: ShiftDb;
  DISCORD_DIARY_WEBHOOK_URL?: string;
};

function webhookUrl(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const url = raw.trim();
  if (
    url.startsWith("https://discord.com/api/webhooks/") ||
    url.startsWith("https://discordapp.com/api/webhooks/")
  ) {
    return url;
  }
  if (url)
    console.error("[shift-discord] webhook URL is not a Discord webhook");
  return null;
}

async function ready(db: ShiftDb): Promise<void> {
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS shift_sent (
        slot TEXT PRIMARY KEY,
        sent_at TEXT NOT NULL
      )`,
    )
    .run();
}

async function claim(db: ShiftDb, id: string, now: number): Promise<boolean> {
  const sentAt = new Date(now).toISOString();
  const inserted = await db
    .prepare(
      `INSERT INTO shift_sent (slot, sent_at) VALUES (?, ?)
       ON CONFLICT(slot) DO NOTHING`,
    )
    .bind(id, sentAt)
    .run();
  if ((inserted.meta?.changes ?? 0) > 0) return true;
  const row = await db
    .prepare(`SELECT sent_at FROM shift_sent WHERE slot = ?`)
    .bind(id)
    .first<{ sent_at?: string }>();
  return row?.sent_at === sentAt;
}

async function release(db: ShiftDb, id: string): Promise<void> {
  try {
    await db.prepare(`DELETE FROM shift_sent WHERE slot = ?`).bind(id).run();
  } catch {
    console.error("[shift-discord] release failed");
  }
}

async function post(
  url: string,
  body: { content: string; allowed_mentions: { parse: []; users: string[] } },
): Promise<void> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    console.error("[shift-discord] webhook status", response.status);
    throw new Error("webhook rejected");
  }
}

async function readSlots(): Promise<
  { slots: ReturnType<typeof parseShiftCsv> } | { error: string }
> {
  const response = await fetch(CSV_URL, {
    redirect: "follow",
    cache: "no-store",
  });
  if (!response.ok) return { error: `sheet ${response.status}` };
  const slots = parseShiftCsv(await response.text());
  if (slots.length === 0) return { error: "sheet empty" };
  return { slots };
}

export type ShiftNoticeReport = { sent: string[]; error?: string };

/** 開始5分前から終了までの枠を、その場でシートを読んで1回送る。失敗した枠は次の分でやり直す。 */
export async function notifyDueShifts(
  env: unknown,
  now = Date.now(),
): Promise<ShiftNoticeReport> {
  const sent: string[] = [];
  try {
    const worker = env as ShiftEnv;
    const db = worker.DB;
    const url = webhookUrl(worker.DISCORD_DIARY_WEBHOOK_URL);
    if (!db || !url) {
      console.error("[shift-discord] missing db or webhook");
      return { sent, error: !db ? "missing db" : "missing webhook" };
    }
    const loaded = await readSlots();
    if ("error" in loaded) {
      console.error("[shift-discord]", loaded.error);
      return { sent, error: loaded.error };
    }
    const due = dueShifts(loaded.slots, now);
    if (due.length === 0) return { sent };
    await ready(db);
    for (const slot of due) {
      if (!(await claim(db, slot.id, now))) continue;
      try {
        await post(url, shiftDiscordPayload(slot));
        sent.push(slot.id);
        console.log("[shift-discord] sent", slot.id);
      } catch {
        console.error("[shift-discord] notify failed");
        await release(db, slot.id);
        return { sent, error: "webhook rejected" };
      }
    }
    return { sent };
  } catch {
    console.error("[shift-discord] failed");
    return { sent, error: "failed" };
  }
}
