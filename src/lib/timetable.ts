export type TimetableSlot = {
  start: string;
  end: string;
  name: string;
  note: string;
};

export type TimetableFloor = {
  floor: string;
  slots: TimetableSlot[];
};

export type TimetableDay = {
  day: string;
  floors: TimetableFloor[];
};

export type TimetableView = {
  days: TimetableDay[];
  error?: string;
};

const SHEET_ID = "1QhrFKHY6GbuuWYnzNZQOjVKqZ5t3kgN7RO7poJfWDFc";

export const TIMETABLE_SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit?usp=sharing`;

const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;

const DAY_ORDER = ["1日目", "2日目", "3日目"];
const FLOOR_ORDER = ["フロア1", "フロア2"];

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          quoted = false;
        }
      } else {
        cell += c;
      }
      continue;
    }
    if (c === '"') {
      quoted = true;
    } else if (c === ",") {
      row.push(cell);
      cell = "";
    } else if (c === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (c !== "\r") {
      cell += c;
    }
  }
  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

function minutes(value: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

function rank(order: readonly string[], value: string): number {
  const index = order.indexOf(value);
  return index < 0 ? order.length : index;
}

export function parseTimetableCsv(csv: string): TimetableView {
  const table = parseCsv(csv).filter((row) =>
    row.some((cell) => cell.trim() !== ""),
  );
  if (table.length === 0) return { days: [] };
  const header = table[0].map((cell) => cell.trim());
  const column = (name: string) => header.indexOf(name);
  const dayCol = column("日");
  const floorCol = column("フロア");
  if (dayCol < 0 || floorCol < 0) {
    return { days: [], error: "タイムテーブルの列名が読めませんでした。" };
  }
  const startCol = column("開始");
  const endCol = column("終了");
  const nameCol = column("名前");
  const noteCol = column("内容");
  const at = (row: string[], col: number) =>
    col < 0 ? "" : (row[col] ?? "").trim();

  const byDay = new Map<string, Map<string, TimetableSlot[]>>();
  for (const row of table.slice(1)) {
    const day = at(row, dayCol);
    const floor = at(row, floorCol);
    const slot = {
      start: at(row, startCol),
      end: at(row, endCol),
      name: at(row, nameCol),
      note: at(row, noteCol),
    };
    if (
      !day &&
      !floor &&
      !slot.start &&
      !slot.end &&
      !slot.name &&
      !slot.note
    ) {
      continue;
    }
    if (!day || !floor) continue;
    const floors = byDay.get(day) ?? new Map<string, TimetableSlot[]>();
    const slots = floors.get(floor) ?? [];
    slots.push(slot);
    floors.set(floor, slots);
    byDay.set(day, floors);
  }

  const days = [...byDay.entries()]
    .sort(
      ([a], [b]) =>
        rank(DAY_ORDER, a) - rank(DAY_ORDER, b) || a.localeCompare(b, "ja"),
    )
    .map(([day, floors]) => ({
      day,
      floors: [...floors.entries()]
        .sort(
          ([a], [b]) =>
            rank(FLOOR_ORDER, a) - rank(FLOOR_ORDER, b) ||
            a.localeCompare(b, "ja"),
        )
        .map(([floor, slots]) => ({
          floor,
          slots: slots
            .map((slot, order) => ({ slot, order }))
            .sort((a, b) => {
              const startA = minutes(a.slot.start);
              const startB = minutes(b.slot.start);
              if (startA === null && startB === null) return a.order - b.order;
              if (startA === null) return 1;
              if (startB === null) return -1;
              return startA - startB || a.order - b.order;
            })
            .map(({ slot }) => slot),
        })),
    }));

  return { days };
}

export async function loadTimetable(): Promise<TimetableView> {
  try {
    const res = await fetch(CSV_URL, {
      redirect: "follow",
      cf: { cacheEverything: true, cacheTtl: 60 },
    } as RequestInit);
    if (!res.ok)
      return { days: [], error: "タイムテーブルを取得できませんでした。" };
    return parseTimetableCsv(await res.text());
  } catch {
    return { days: [], error: "タイムテーブルを取得できませんでした。" };
  }
}
