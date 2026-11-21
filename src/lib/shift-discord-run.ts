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
      `CREATE TABLE IF NOT EXISTS shift_notice (
        slot TEXT PRIMARY KEY,
        sent_at TEXT NOT NULL
      )`,
    )
    .run();
}

async function claim(db: ShiftDb, id: string, now: number): Promise<boolean> {
  const result = await db
    .prepare(
      `INSERT INTO shift_notice (slot, sent_at) VALUES (?, ?)
       ON CONFLICT(slot) DO NOTHING`,
    )
    .bind(id, new Date(now).toISOString())
    .run();
  return (result.meta?.changes ?? 0) > 0;
}

async function release(db: ShiftDb, id: string): Promise<void> {
  try {
    await db.prepare(`DELETE FROM shift_notice WHERE slot = ?`).bind(id).run();
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

/** 開始5分前の枠だけ、その場でシートを読んで1回送る。失敗した枠は次の分でやり直す。 */
export async function notifyDueShifts(
  env: unknown,
  now = Date.now(),
): Promise<void> {
  try {
    const worker = env as ShiftEnv;
    const db = worker.DB;
    const url = webhookUrl(worker.DISCORD_DIARY_WEBHOOK_URL);
    if (!db || !url) {
      console.error("[shift-discord] missing db or webhook");
      return;
    }
    const response = await fetch(CSV_URL, {
      redirect: "follow",
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("[shift-discord] sheet status", response.status);
      return;
    }
    const slots = parseShiftCsv(await response.text());
    if (slots.length === 0) {
      console.error("[shift-discord] sheet has no shifts");
      return;
    }
    const due = dueShifts(slots, now);
    if (due.length === 0) return;
    await ready(db);
    for (const slot of due) {
      if (!(await claim(db, slot.id, now))) continue;
      try {
        await post(url, shiftDiscordPayload(slot));
      } catch {
        console.error("[shift-discord] notify failed");
        await release(db, slot.id);
      }
    }
  } catch {
    console.error("[shift-discord] failed");
  }
}
