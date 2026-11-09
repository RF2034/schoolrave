import assert from "node:assert/strict";
import { test } from "node:test";
import { groupComplete } from "./check-group.ts";

test("グループは中身が全部付いたときだけ完了", () => {
  assert.equal(groupComplete([]), false);
  assert.equal(groupComplete([false]), false);
  assert.equal(groupComplete([true, false]), false);
  assert.equal(groupComplete([true]), true);
  assert.equal(groupComplete([true, true]), true);
});
