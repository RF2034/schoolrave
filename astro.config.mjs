// @ts-check
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { access, d1, r2 } from "@emdash-cms/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import emdash from "emdash/astro";

export default defineConfig({
  // 交換日記と管理画面だけ実行時に描く。公開ページは prerender して dist に残す。
  output: "server",
  adapter: cloudflare({
    // 画像はビルド時に埋め込む。実行時の Images バインディングは足さない。
    imageService: "compile",
  }),
  compressHTML: true,
  integrations: [
    react(),
    emdash({
      // 複製の読み取り位置に固定されると、公開した日記が一覧に出ない。本体を読む。
      database: d1({ binding: "DB", session: "disabled" }),
      // 画像も動画もこの 1 つ。既定の 50MB。超えたファイルはアップロード時に拒否する。
      storage: r2({ binding: "MEDIA" }),
      maxUploadSize: 50 * 1024 * 1024,
      auth: access({
        teamDomain: "schoolrave.cloudflareaccess.com",
        audienceEnvVar: "CF_ACCESS_AUDIENCE",
        // Author。Access を通った人は自分の日記を公開できる。
        defaultRole: 30,
      }),
      middleware: { outer: "./src/middleware/admin-view-site.ts" },
    }),
  ],
  redirects: {
    "/": "/2026/",
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      rolldownOptions: {
        output: {
          // kysely を分割するとチャンク同士の循環 import で Worker が起動時に落ちる。
          manualChunks(id) {
            if (id.replaceAll("\\", "/").includes("/node_modules/kysely/")) {
              return "kysely";
            }
          },
        },
      },
    },
  },
  devToolbar: { enabled: false },
});
