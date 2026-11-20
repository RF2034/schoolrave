/// <reference types="astro/client" />

declare namespace Cloudflare {
  interface Env {
    DB: {
      prepare(query: string): { run(): Promise<unknown> };
    };
    DISCORD_DIARY_WEBHOOK_URL?: string;
    /** 2026-11-24 00:00 JST まで。チャンネル 1572179336109228073 の Webhook。 */
    DISCORD_DIARY_EVENT_WEBHOOK_URL?: string;
  }
}
