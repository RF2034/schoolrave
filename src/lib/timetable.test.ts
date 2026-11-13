import assert from "node:assert/strict";
import { test } from "node:test";
import { parseTimetableCsv } from "./timetable.ts";

const CSV = [
  "日,フロア,開始,終了,名前,内容,メモ",
  "2日目,フロア2,16:00,17:00,仮・カイ,Disco,",
  "1日目,フロア1,23:30,25:00,仮・レン,Drum & Bass,",
  '1日目,フロア1,21:00,22:00,"仮・アオイ, Jr",House,',
  "3日目,フロア1,10:00,11:00,仮・レン,Morning,",
  ",,,,,,",
  "前日,フロア2,20:00,21:00,仮・ミオ,Chill,",
].join("\n");

test("日とフロアでまとめ、開始時刻順に並べる", () => {
  const view = parseTimetableCsv(CSV);
  assert.equal(view.error, undefined);
  assert.deepEqual(
    view.days.map((day) => day.day),
    ["1日目", "2日目", "3日目", "前日"],
  );
  const first = view.days[0].floors[0];
  assert.equal(first.floor, "フロア1");
  assert.deepEqual(
    first.slots.map((slot) => slot.start),
    ["21:00", "23:30"],
  );
  assert.equal(first.slots[0].name, "仮・アオイ, Jr");
  assert.equal(view.days[1].floors[0].floor, "フロア2");
});

test("列名が無いCSVはエラーにする", () => {
  const view = parseTimetableCsv("名前,開始\n仮,21:00\n");
  assert.equal(view.error, "タイムテーブルの列名が読めませんでした。");
  assert.deepEqual(view.days, []);
});
