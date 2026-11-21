import assert from "node:assert/strict";
import { test } from "node:test";
import { diaryUserId } from "./diary-discord.ts";
import {
  dueShifts,
  parseShiftCsv,
  shiftDiscordPayload,
  type ShiftSlot,
} from "./shift-discord.ts";

const CSV = `ゴミ回収、コップ回収、ドリンク補充、加湿器補充シフト
日付,開始,終了,担当1,担当2,担当3,担当4
2026/11/21 (土),21:00,22:00,cigare,あさみごり,ふにゃ,BigMaus
2026/11/21 (土),21:00,22:00,Jackit,ちの,,
2026/11/22 (日),00:00,01:00,ねるよ,kaki,知らない人,
2026/11/22 (日),01:00,02:00,,,,
`;

function at(day: number, hour: number, minute: number): number {
  return Date.UTC(2026, 10, day, hour - 9, minute);
}

test("シートの担当を開始時刻で1枠にまとめる", () => {
  const slots = parseShiftCsv(CSV);
  assert.deepEqual(
    slots.map((slot) => [slot.id, slot.start, slot.end, slot.names]),
    [
      [
        "2026-11-21T21:00",
        "21:00",
        "22:00",
        ["cigare", "あさみごり", "ふにゃ", "BigMaus", "Jackit", "ちの"],
      ],
      ["2026-11-22T00:00", "00:00", "01:00", ["ねるよ", "kaki", "知らない人"]],
    ],
  );
  assert.equal(slots[1].startMs, at(22, 0, 0));
});

test("開始の5分前から、開始の1分後まで出す", () => {
  const [slot] = parseShiftCsv(CSV);
  const start = slot.startMs;
  assert.equal(dueShifts([slot], start - 5 * 60 * 1000).length, 1);
  assert.equal(dueShifts([slot], start - 5 * 60 * 1000 - 1).length, 0);
  assert.equal(dueShifts([slot], start - 1).length, 1);
  assert.equal(dueShifts([slot], start).length, 1);
  assert.equal(dueShifts([slot], start + 60 * 1000 - 1).length, 1);
  assert.equal(dueShifts([slot], start + 60 * 1000).length, 0);
  const empty: ShiftSlot = { ...slot, names: [] };
  assert.equal(dueShifts([empty], start - 1).length, 0);
});

test("担当をメンションし、表にない名前はそのまま出す", () => {
  const payload = shiftDiscordPayload({
    start: "21:00",
    end: "22:00",
    names: ["Jackit", "ちの", "しいたけ", "たもらーむ", "ねるよ", "知らない人"],
  });
  assert.equal(
    payload.content,
    [
      "21:00–22:00 ゴミ回収・コップ回収・ドリンク補充・加湿器補充",
      "<@387261715428933632> <@869222360006410290> <@134983599270264832> <@422741468030173196> <@624628070414024717> 知らない人",
      "ゴミ回収、コップの回収、各ブースのドリンク補充、加湿器の水補充などをしてください。",
    ].join("\n"),
  );
  assert.deepEqual(payload.allowed_mentions.users, [
    "387261715428933632",
    "869222360006410290",
    "134983599270264832",
    "422741468030173196",
    "624628070414024717",
  ]);
  assert.equal(payload.content.includes("@everyone"), false);
});

test("シフト表の表記は交換日記の本人に当たる", () => {
  const ids: Record<string, string> = {
    kaki: "707236648781480069",
    twoway: "727459210589372467",
    "△三角△": "235021051128446976",
    ZuCCa: "1000058609457188944",
    メジエド: "471601317853397003",
    オガ: "737280113229693020",
    きゅーまる: "366867831184424973",
    Telepath: "386883728099639298",
    あさみごり: "1129064791416254494",
  };
  for (const [name, id] of Object.entries(ids)) {
    assert.equal(diaryUserId(name), id, name);
  }
  assert.equal(diaryUserId("知らない人"), null);
});
