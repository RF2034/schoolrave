import assert from "node:assert/strict";
import { test } from "node:test";
import { formatDate, plainExcerpt } from "./portal-format.ts";

test("formatDate は曜日つきで固定書式を返す", () => {
  assert.equal(formatDate("2026-10-20T12:00:00Z"), "2026/10/20 (火)");
  assert.equal(formatDate(null), "");
  assert.equal(formatDate("not-a-date"), "");
});

test("plainExcerpt は本文ブロックだけを連結して切り詰める", () => {
  const body = [
    { _type: "block", children: [{ text: "こんにちは" }, { text: "世界" }] },
    { _type: "image" },
    { _type: "block", children: [{ text: "二行目" }] },
  ];
  assert.equal(plainExcerpt(body), "こんにちは世界 二行目");
  assert.equal(plainExcerpt(body, 5), "こんにちは…");
  assert.equal(plainExcerpt(undefined), "");
});
