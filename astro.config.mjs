// @ts-check
import process from "node:process";
import node from "@astrojs/node";
import react from "@astrojs/react";
import { access } from "@emdash-cms/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import emdash, { local } from "emdash/astro";
import { sqlite } from "emdash/db";
import { loadEnv } from "vite";

const dev = process.argv.includes("dev");
// astro.config 評価時は .env がまだ process.env に入っていない。
const env = loadEnv(dev ? "development" : "production", process.cwd(), "");
const ACCESS_AUDIENCE_ENV = "CF_ACCESS_AUDIENCE";

/** 本番は Access。開発でチームドメインが空なら付けず、dev-bypass を残す。 */
function cloudflareAccessAuth() {
  const teamDomain = env.CF_ACCESS_TEAM_DOMAIN ?? "";
  const audience = env[ACCESS_AUDIENCE_ENV] ?? "";
  if (dev) {
    return teamDomain
      ? access({ teamDomain, audienceEnvVar: ACCESS_AUDIENCE_ENV })
      : undefined;
  }

  /** @type {string[]} */
  const missing = [];
  if (!teamDomain) missing.push("CF_ACCESS_TEAM_DOMAIN");
  if (!audience) missing.push(ACCESS_AUDIENCE_ENV);
  if (missing.length > 0) {
    throw new Error(
      `Cloudflare Access の環境変数が未設定です: ${missing.join(", ")}`,
    );
  }

  return access({ teamDomain, audienceEnvVar: ACCESS_AUDIENCE_ENV });
}

const auth = cloudflareAccessAuth();

export default defineConfig({
  // EmDash は管理画面と API を実行時に返すためアダプタ付きの server 出力が必須。
  // 公開ページは各ルートで `export const prerender = true` を付けて静的生成する。
  output: "server",
  adapter: node({ mode: "standalone" }),
  // v7 の既定は JSX と同じ空白削除。v5 の HTML 圧縮に合わせる。
  compressHTML: true,
  integrations: [
    react(),
    emdash({
      database: sqlite({ url: "file:./data.db" }),
      storage: local({
        directory: "./uploads",
        baseUrl: "/_emdash/api/media/file",
      }),
      ...(auth ? { auth } : {}),
    }),
  ],
  redirects: {
    "/": "/2026",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  devToolbar: { enabled: false },
});
