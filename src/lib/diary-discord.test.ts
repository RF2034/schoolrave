import assert from "node:assert/strict";
import { test } from "node:test";
import { diaryDiscordPayload, nextDiaryMention } from "./diary-discord.ts";

test("同じ組の次の人を指す。最後は先頭に戻る", () => {
  assert.equal(nextDiaryMention("1組", "うさえ"), "624628070414024717");
  assert.equal(nextDiaryMention("1組", "よほた"), "258972154421444609");
  assert.equal(nextDiaryMention("2組", "youzeo4"), "439009179827699712");
  assert.equal(
    nextDiaryMention("2組", "ＳＵＧＡＣＨＡＮ"),
    "992361066732453938",
  );
  assert.equal(nextDiaryMention("5組", "メジェド"), "477111503548579843");
  assert.equal(nextDiaryMention("5組", " メジエド "), "477111503548579843");
  assert.equal(nextDiaryMention("6組", "オガ@Nero"), "366867831184424973");
});

test("表にない名前と、順番から外した人はメンションしない", () => {
  assert.equal(nextDiaryMention("5組", "\u91d6(KTN)"), null);
  assert.equal(nextDiaryMention("1組", "たろう"), null);
  assert.equal(nextDiaryMention("2組", "うさえ"), null);
});

test("通知は次の人だけを鳴らせる", () => {
  const payload = diaryDiscordPayload({
    title: "今日",
    kumi: "1組",
    name: "よほた",
    slug: "abc",
  });
  assert.match(payload.content, /<@258972154421444609>/);
  assert.deepEqual(payload.allowed_mentions, {
    parse: [],
    users: ["258972154421444609"],
  });
  assert.match(
    payload.content,
    /https:\/\/schoolrave\.net\/portal\/diary\/abc/,
  );
  const quiet = diaryDiscordPayload({
    title: "@everyone",
    kumi: "5組",
    name: "\u91d6(KTN)",
    slug: "",
  });
  assert.deepEqual(quiet.allowed_mentions.users, []);
  assert.equal(quiet.content.includes("<@"), false);
  assert.match(quiet.content, /https:\/\/schoolrave\.net\/portal\/diary$/);
});
