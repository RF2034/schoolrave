#!/usr/bin/env node
// ponytail: leftover Pages Git check still runs `npx @cloudflare/next-on-pages@1`.
// Delete this shim when that project is disconnected or switched to `npx next build` / `out`.
const { spawnSync } = require("node:child_process");
const { cpSync, mkdirSync } = require("node:fs");
const { resolve } = require("node:path");

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log("pages-next-on-pages-shim: next build -> out/ and .vercel/output/static");
  process.exit(0);
}

const nextBin = require.resolve("next/dist/bin/next", { paths: [process.cwd()] });
const build = spawnSync(process.execPath, [nextBin, "build"], { stdio: "inherit" });
if (build.status) process.exit(build.status ?? 1);

mkdirSync(resolve(".vercel/output"), { recursive: true });
cpSync(resolve("out"), resolve(".vercel/output/static"), { recursive: true });
