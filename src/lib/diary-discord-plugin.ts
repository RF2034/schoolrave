import { env } from "cloudflare:workers";
import { diaryDiscordPayload } from "@/lib/diary-discord";

function text(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function webhookUrl(): string | null {
  const raw = (env as Cloudflare.Env).DISCORD_DIARY_WEBHOOK_URL;
  if (typeof raw !== "string") return null;
  const url = raw.trim();
  if (
    url.startsWith("https://discord.com/api/webhooks/") ||
    url.startsWith("https://discordapp.com/api/webhooks/")
  ) {
    return url;
  }
  if (url)
    console.error("[diary-discord] webhook URL is not a Discord webhook");
  return null;
}

async function notify(content: Record<string, unknown>): Promise<void> {
  const url = webhookUrl();
  if (!url) return;
  const data =
    content.data && typeof content.data === "object"
      ? (content.data as Record<string, unknown>)
      : {};
  const payload = diaryDiscordPayload({
    title: text(data.title),
    kumi: text(data.kumi),
    name: text(data.name),
    slug: text(content.slug) || text(content.id),
  });
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    console.error("[diary-discord] webhook status", response.status);
  }
}

export default {
  hooks: {
    "content:afterPublish": {
      errorPolicy: "continue" as const,
      timeout: 10_000,
      handler: async (event: {
        collection: string;
        content: Record<string, unknown>;
      }) => {
        if (event.collection !== "diary") return;
        try {
          await notify(event.content);
        } catch {
          console.error("[diary-discord] notify failed");
        }
      },
    },
  },
};
