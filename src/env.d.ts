/// <reference types="astro/client" />

declare namespace Cloudflare {
  interface Env {
    DB: {
      prepare(query: string): { run(): Promise<unknown> };
    };
    DISCORD_DIARY_WEBHOOK_URL?: string;
  }
}
