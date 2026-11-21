import { diaryUserId } from "./diary-discord.ts";
import { parseCsv } from "./timetable.ts";

export type ShiftSlot = {
  id: string;
  start: string;
  end: string;
  names: string[];
  startMs: number;
};

const LEAD_MS = 5 * 60 * 1000;

const TASK = "ゴミ回収・コップ回収・ドリンク補充・加湿器補充";
const DETAIL =
  "ゴミ回収、コップの回収、各ブースのドリンク補充、加湿器の水補充などをしてください。";

function clock(value: string): string | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) return null;
  return `${String(hour).padStart(2, "0")}:${match[2]}`;
}

function slotStart(
  dateText: string,
  timeText: string,
): { id: string; start: string; startMs: number } | null {
  const date = /^(\d{4})\/(\d{1,2})\/(\d{1,2})/.exec(dateText.trim());
  const start = clock(timeText);
  if (!date || !start) return null;
  const year = Number(date[1]);
  const month = Number(date[2]);
  const day = Number(date[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  const [hour, minute] = start.split(":");
  const startMs = Date.UTC(
    year,
    month - 1,
    day,
    Number(hour) - 9,
    Number(minute),
  );
  if (Number.isNaN(startMs)) return null;
  const id = `${date[1]}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${start}`;
  return { id, start, startMs };
}

/** ゴミ・コップ回収シフトの CSV。同じ開始時刻は1枠にまとめる。終了は先の行。 */
export function parseShiftCsv(csv: string): ShiftSlot[] {
  const rows = parseCsv(csv);
  const headerIndex = rows.findIndex((row) =>
    row.some((cell) => cell.trim() === "開始"),
  );
  if (headerIndex < 0) return [];
  const header = rows[headerIndex].map((cell) => cell.trim());
  const column = (name: string) => header.indexOf(name);
  const dateCol = column("日付");
  const startCol = column("開始");
  const endCol = column("終了");
  if (dateCol < 0 || startCol < 0) return [];
  const who = header
    .map((name, index) => ({ name, index }))
    .filter(({ name }) => name.startsWith("担当"))
    .map(({ index }) => index);
  const at = (row: string[], col: number) =>
    col < 0 ? "" : (row[col] ?? "").trim();

  const byId = new Map<string, ShiftSlot>();
  for (const row of rows.slice(headerIndex + 1)) {
    const when = slotStart(at(row, dateCol), at(row, startCol));
    const end = clock(at(row, endCol));
    if (!when || !end) continue;
    const names = who
      .map((col) => at(row, col))
      .filter((name) => name.length > 0);
    if (names.length === 0) continue;
    const prev = byId.get(when.id);
    if (!prev) {
      byId.set(when.id, { ...when, end, names });
      continue;
    }
    // ponytail: 同じ開始の2行目以降は名前だけ足す。終了が違っても先の行のまま。
    for (const name of names) {
      if (!prev.names.includes(name)) prev.names.push(name);
    }
  }
  return [...byId.values()];
}

function endMs(slot: ShiftSlot): number {
  const [sh, sm] = slot.start.split(":").map(Number);
  const [eh, em] = slot.end.split(":").map(Number);
  let delta = (eh * 60 + em - (sh * 60 + sm)) * 60 * 1000;
  if (delta <= 0) delta += 24 * 60 * 60 * 1000;
  return slot.startMs + delta;
}

/** 開始の5分前から、終了まで。遅れた分でも、その枠のあいだは出す。 */
export function dueShifts(slots: ShiftSlot[], now: number): ShiftSlot[] {
  return slots.filter(
    (slot) =>
      slot.names.length > 0 &&
      now >= slot.startMs - LEAD_MS &&
      now < endMs(slot),
  );
}

export function shiftDiscordPayload(slot: {
  start: string;
  end: string;
  names: string[];
}): { content: string; allowed_mentions: { parse: []; users: string[] } } {
  const users: string[] = [];
  const shown = slot.names.map((name) => {
    const id = diaryUserId(name);
    if (!id) return name;
    if (!users.includes(id)) users.push(id);
    return `<@${id}>`;
  });
  return {
    content: [
      `${slot.start}–${slot.end} ${TASK}`,
      shown.join(" "),
      DETAIL,
    ].join("\n"),
    allowed_mentions: { parse: [], users },
  };
}
