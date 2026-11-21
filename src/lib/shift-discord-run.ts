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
};

// 当日連絡用。交換日記のウェブフックは使わない。
const TASK_WEBHOOK =
  "https://discord.com/api/webhooks/1573540535015178390/BsYmf1uUYO-_fikqXl46853I-xWkRcewrf8yZn83rVbydQN-_NtMwsJgwYIuh8jIJ7xE";

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

async function held(db: ShiftDb, id: string): Promise<boolean> {
  const row = await db
    .prepare(`SELECT slot FROM shift_sent WHERE slot = ?`)
    .bind(id)
    .first<{ slot?: string }>();
  return row?.slot === id;
}

async function remember(db: ShiftDb, id: string, now: number): Promise<void> {
  await db
    .prepare(
      `INSERT INTO shift_sent (slot, sent_at) VALUES (?, ?)
       ON CONFLICT(slot) DO UPDATE SET sent_at = excluded.sent_at`,
    )
    .bind(id, new Date(now).toISOString())
    .run();
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

export type ShiftNoticeReport = {
  sent: string[];
  due: string[];
  held: string[];
  error?: string;
};

/** 開始5分前から終了までの枠を、その場でシートを読んで1回送る。失敗した枠は次の分でやり直す。 */
export async function notifyDueShifts(
  env: unknown,
  now = Date.now(),
  opts?: { force?: boolean },
): Promise<ShiftNoticeReport> {
  const sent: string[] = [];
  const heldIds: string[] = [];
  try {
    const worker = env as ShiftEnv;
    const db = worker.DB;
    const url = webhookUrl(TASK_WEBHOOK);
    if (!db || !url) {
      console.error("[shift-discord] missing db or webhook");
      return {
        sent,
        due: [],
        held: heldIds,
        error: !db ? "missing db" : "missing webhook",
      };
    }
    const loaded = await readSlots();
    if ("error" in loaded) {
      console.error("[shift-discord]", loaded.error);
      return { sent, due: [], held: heldIds, error: loaded.error };
    }
    const due = dueShifts(loaded.slots, now);
    const dueIds = due.map((slot) => slot.id);
    if (due.length === 0) return { sent, due: dueIds, held: heldIds };
    await ready(db);
    for (const slot of due) {
      if (!opts?.force && (await held(db, slot.id))) {
        heldIds.push(slot.id);
        continue;
      }
      try {
        await post(url, shiftDiscordPayload(slot));
        await remember(db, slot.id, now);
        sent.push(slot.id);
        console.log("[shift-discord] sent", slot.id);
      } catch {
        console.error("[shift-discord] notify failed");
        await release(db, slot.id);
        return { sent, due: dueIds, held: heldIds, error: "webhook rejected" };
      }
    }
    return { sent, due: dueIds, held: heldIds };
  } catch {
    console.error("[shift-discord] failed");
    return { sent, due: [], held: heldIds, error: "failed" };
  }
}
