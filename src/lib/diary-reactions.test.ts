import assert from "node:assert/strict";
import { test } from "node:test";
import { isReaction, toggleReaction } from "./diary-reactions.ts";

test("知っている絵文字だけ付け外しできる", () => {
  assert.equal(isReaction("👍"), false);
  assert.deepEqual(toggleReaction([], "👍"), []);
  assert.deepEqual(toggleReaction([], "🦑"), ["🦑"]);
  assert.deepEqual(toggleReaction(["🦑", "🧿"], "🦑"), ["🧿"]);
  assert.deepEqual(toggleReaction(["🪼"], "🪩"), ["🪼", "🪩"]);
});
