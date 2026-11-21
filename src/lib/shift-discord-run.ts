import {
  dueShifts,
  parseShiftCsv,
  shiftDiscordPayload,
} from "./shift-discord.ts";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/1O6Pl5W10lLasni7azFAHcyKXQNZsM91ufCCVIGrvm6Q/export?format=csv&gid=1053159720";

type NoticeRow = { sent_at?: string; ok?: number };

type Statement = {
  bind(...values: unknown[]): Statement;
  run(): Promise<{ meta?: { changes?: number }; results?: unknown[] }>;
  all(): Promise<{ results?: NoticeRow[] }>;
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
        sent_at TEXT NOT NULL,
        ok INTEGER NOT NULL DEFAULT 0
      )`,
    )
    .run();
  try {
    await db
      .prepare(
        `ALTER TABLE shift_notice ADD COLUMN ok INTEGER NOT NULL DEFAULT 0`,
      )
      .run();
  } catch {
    // 列は既にある
  }
}

async function notice(db: ShiftDb, id: string): Promise<NoticeRow | null> {
  const got = await db
    .prepare(`SELECT sent_at, ok FROM shift_notice WHERE slot = ?`)
    .bind(id)
    .all();
  return got.results?.[0] ?? null;
}

async function claim(db: ShiftDb, id: string, now: number): Promise<boolean> {
  const sentAt = new Date(now).toISOString();
  await db
    .prepare(
      `INSERT INTO shift_notice (slot, sent_at, ok) VALUES (?, ?, 0)
       ON CONFLICT(slot) DO NOTHING`,
    )
    .bind(id, sentAt)
    .run();
  let row = await notice(db, id);
  if (!row || Number(row.ok) === 1) return false;
  if (row.sent_at !== sentAt) {
    // ponytail: 送る前に残った行は取り直す。同時に2分来たら1通余分に出ることがある。
    await db
      .prepare(
        `UPDATE shift_notice SET sent_at = ? WHERE slot = ? AND ok = 0 AND sent_at = ?`,
      )
      .bind(sentAt, id, row.sent_at)
      .run();
    row = await notice(db, id);
  }
  return row?.sent_at === sentAt && Number(row.ok) !== 1;
}

async function markSent(db: ShiftDb, id: string): Promise<void> {
  await db
    .prepare(`UPDATE shift_notice SET ok = 1 WHERE slot = ?`)
    .bind(id)
    .run();
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

/** 開始5分前から終了までの枠を、その場でシートを読んで1回送る。失敗した枠は次の分でやり直す。 */
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
    const loaded = await readSlots();
    if ("error" in loaded) {
      console.error("[shift-discord]", loaded.error);
      return;
    }
    const due = dueShifts(loaded.slots, now);
    if (due.length === 0) return;
    await ready(db);
    for (const slot of due) {
      if (!(await claim(db, slot.id, now))) continue;
      try {
        await post(url, shiftDiscordPayload(slot));
        await markSent(db, slot.id);
        console.log("[shift-discord] sent", slot.id);
      } catch {
        console.error("[shift-discord] notify failed");
        await release(db, slot.id);
      }
    }
  } catch {
    console.error("[shift-discord] failed");
  }
}
