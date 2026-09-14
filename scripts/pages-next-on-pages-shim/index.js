#!/usr/bin/env node
// ponytail: Cloudflare のビルドコマンドがまだ `npx @cloudflare/next-on-pages@1` のまま。
// ダッシュボードを `npm run build`（+ wrangler deploy）に切り替えたらこの shim ごと消す。
const { spawnSync } = require("node:child_process");
const { cpSync, mkdirSync, existsSync } = require("node:fs");
const { resolve } = require("node:path");

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log(
    "pages-next-on-pages-shim: astro build -> dist/ and .vercel/output/static",
  );
  process.exit(0);
}

const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const build = spawnSync(npm, ["run", "build"], {
  stdio: "inherit",
  cwd: process.cwd(),
});
if (build.status) process.exit(build.status ?? 1);

const dist = resolve("dist");
if (!existsSync(dist)) {
  console.error("pages-next-on-pages-shim: dist/ missing after astro build");
  process.exit(1);
}

// 旧 Pages 成果物パスを期待するチェック向け
mkdirSync(resolve(".vercel/output"), { recursive: true });
cpSync(dist, resolve(".vercel/output/static"), { recursive: true });
console.log(
  "pages-next-on-pages-shim: astro build -> dist/ and .vercel/output/static",
);
