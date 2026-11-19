import { env } from "cloudflare:workers";
import {
  diaryDiscordPayload,
  diaryPublishNotice,
  missedDiaryNotice,
  type DiaryNoticeMark,
} from "@/lib/diary-discord";

type NoticeKv = {
  get(key: string): Promise<unknown>;
  set(key: string, value: unknown): Promise<void>;
  list(prefix?: string): Promise<Array<{ key: string; value: unknown }>>;
};

type DiaryEntry = {
  id: string;
  slug: string | null;
  status: string;
  data: Record<string, unknown>;
  publishedAt: string | null;
  updatedAt: string;
};

type DiaryCtx = {
  kv: NoticeKv;
  content?: {
    list(
      collection: string,
      options?: { limit?: number },
    ): Promise<{ items: DiaryEntry[] }>;
  };
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
  if (!url) throw new Error("webhook missing");
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
    throw new Error("webhook rejected");
  }
}

/** 2026-11-20 06:00 JST の一度きり。あさみごりの公開で次の人に飛ばなかった分。 */
const RETRY_ASAMIGORI = "retryAsamigori";

function markOf(value: unknown): DiaryNoticeMark | null {
  return value === "sent" || value === "armed" ? value : null;
}

async function sendMissed(ctx: DiaryCtx, exceptId: string): Promise<void> {
  if (!ctx.content) return;
  let items: DiaryEntry[];
  let stored: Array<{ key: string; value: unknown }>;
  try {
    [{ items }, stored] = await Promise.all([
      ctx.content.list("diary", { limit: 100 }),
      ctx.kv.list("notice:"),
    ]);
  } catch {
    console.error("[diary-discord] missed notices unreadable");
    return;
  }
  const marks = new Map(
    stored.map((entry) => [entry.key.slice("notice:".length), entry.value]),
  );
  for (const item of items) {
    if (item.id === exceptId) continue;
    if (
      !missedDiaryNotice({
        mark: markOf(marks.get(item.id)),
        publishedAt: item.publishedAt ?? "",
        status: item.status,
      })
    ) {
      continue;
    }
    try {
      await notify({
        id: item.id,
        slug: item.slug ?? "",
        data: item.data,
      });
    } catch {
      console.error("[diary-discord] notify failed");
      continue;
    }
    await writeMark(ctx.kv, item.id, "sent");
  }
}

export default {
  hooks: {
    "content:afterPublish": {
      errorPolicy: "continue" as const,
      timeout: 30_000,
      handler: async (
        event: { collection: string; content: Record<string, unknown> },
        ctx: DiaryCtx,
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
        let delivered = decision !== "send";
        if (decision === "send") {
          try {
            await notify(event.content);
            await writeMark(ctx.kv, id, "sent");
            delivered = true;
          } catch {
            console.error("[diary-discord] notify failed");
          }
        } else if (decision === "seal") {
          await writeMark(ctx.kv, id, "sent");
        }
        // ponytail: 公開100件まで。超えたら list の cursor で続きを見る。
        await sendMissed(ctx, delivered ? id : "");
      },
    },
    cron: {
      timeout: 30_000,
      handler: async (event: {
        name: string;
        data?: Record<string, unknown>;
      }) => {
        if (event.name !== RETRY_ASAMIGORI) return;
        const data = event.data ?? {};
        console.log("[diary-discord] retry mention");
        await notify({
          id: text(data.id),
          slug: text(data.slug),
          data: {
            title: data.title,
            kumi: data.kumi,
            name: data.name,
          },
        });
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
