import { env } from "cloudflare:workers";
import {
  diaryDiscordPayload,
  diaryPublishNotice,
  type DiaryNoticeMark,
} from "@/lib/diary-discord";

type NoticeKv = {
  get(key: string): Promise<unknown>;
  set(key: string, value: unknown): Promise<void>;
};

function noticeKey(id: string): string {
  return `notice:${id}`;
}

async function readMark(
  kv: NoticeKv,
  id: string,
): Promise<DiaryNoticeMark | null> {
  try {
    const value = await kv.get(noticeKey(id));
    return value === "sent" || value === "armed" ? value : null;
  } catch {
    console.error("[diary-discord] notice state unreadable");
    return null;
  }
}

async function writeMark(
  kv: NoticeKv,
  id: string,
  mark: DiaryNoticeMark,
): Promise<void> {
  try {
    await kv.set(noticeKey(id), mark);
  } catch {
    console.error("[diary-discord] notice state unwritable");
  }
}

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
      handler: async (
        event: { collection: string; content: Record<string, unknown> },
        ctx: { kv: NoticeKv },
      ) => {
        if (event.collection !== "diary") return;
        const id = text(event.content.id) || text(event.content.slug);
        if (!id) {
          await notify(event.content);
          return;
        }
        const decision = diaryPublishNotice({
          mark: await readMark(ctx.kv, id),
          publishedAt: text(event.content.publishedAt),
          updatedAt: text(event.content.updatedAt),
        });
        if (decision === "skip") return;
        if (decision === "send") {
          try {
            await notify(event.content);
          } catch {
            console.error("[diary-discord] notify failed");
            return;
          }
        }
        await writeMark(ctx.kv, id, "sent");
      },
    },
    "content:afterUnpublish": {
      errorPolicy: "continue" as const,
      timeout: 10_000,
      handler: async (
        event: { collection: string; content: Record<string, unknown> },
        ctx: { kv: NoticeKv },
      ) => {
        if (event.collection !== "diary") return;
        const id = text(event.content.id) || text(event.content.slug);
        if (!id) return;
        await writeMark(ctx.kv, id, "armed");
      },
    },
  },
};
