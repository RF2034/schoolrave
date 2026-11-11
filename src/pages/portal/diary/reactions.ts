import { env } from "cloudflare:workers";
import { isReaction } from "@/lib/diary-reactions";
import type { APIRoute } from "astro";

export const prerender = false;

const COOKIE = "diary_react";
const ID = /^[A-Za-z0-9]{10,40}$/;

interface Statement {
  bind(...values: unknown[]): Statement;
  run(): Promise<unknown>;
  all<T>(): Promise<{ results?: T[] }>;
  first<T>(): Promise<T | null>;
}

function db() {
  return env.DB as { prepare(query: string): Statement };
}

async function ready() {
  // ponytail: 絵文字は EmDash の like 以外を拒否される。この表が上限。増やすなら REACTIONS と揃える。
  await db()
    .prepare(
      `CREATE TABLE IF NOT EXISTS diary_comment_reactions (
        comment_id TEXT NOT NULL,
        emoji TEXT NOT NULL,
        voter TEXT NOT NULL,
        PRIMARY KEY (comment_id, emoji, voter)
      )`,
    )
    .run();
}

function voterId(
  cookies: Parameters<APIRoute>[0]["cookies"],
  secure: boolean,
): string {
  const existing = cookies.get(COOKIE)?.value;
  if (existing && /^[a-f0-9]{32}$/.test(existing)) return existing;
  const id = crypto.randomUUID().replaceAll("-", "");
  cookies.set(COOKIE, id, {
    path: "/portal/diary",
    httpOnly: true,
    sameSite: "lax",
    secure,
    maxAge: 60 * 60 * 24 * 400,
  });
  return id;
}

function commentIds(raw: string): string[] {
  const ids = raw
    .split(",")
    .map((id) => id.trim())
    .filter((id) => ID.test(id));
  return [...new Set(ids)].slice(0, 100);
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function snapshot(ids: string[], voter: string) {
  const marks = ids.map(() => "?").join(",");
  const counts: Record<string, Record<string, number>> = {};
  const mine: Record<string, string[]> = {};
  if (ids.length === 0) return { counts, mine };

  const counted = await db()
    .prepare(
      `SELECT comment_id, emoji, COUNT(*) AS n
       FROM diary_comment_reactions
       WHERE comment_id IN (${marks})
       GROUP BY comment_id, emoji`,
    )
    .bind(...ids)
    .all<{ comment_id: string; emoji: string; n: number }>();
  for (const row of counted.results ?? []) {
    const bucket = counts[row.comment_id] ?? {};
    bucket[row.emoji] = Number(row.n);
    counts[row.comment_id] = bucket;
  }

  const own = await db()
    .prepare(
      `SELECT comment_id, emoji
       FROM diary_comment_reactions
       WHERE voter = ? AND comment_id IN (${marks})`,
    )
    .bind(voter, ...ids)
    .all<{ comment_id: string; emoji: string }>();
  for (const row of own.results ?? []) {
    const list = mine[row.comment_id] ?? [];
    list.push(row.emoji);
    mine[row.comment_id] = list;
  }
  return { counts, mine };
}

export const GET: APIRoute = async ({ url, cookies }) => {
  await ready();
  const voter = voterId(cookies, url.protocol === "https:");
  return json(
    await snapshot(commentIds(url.searchParams.get("ids") ?? ""), voter),
  );
};

export const POST: APIRoute = async ({ request, cookies, url }) => {
  const origin = request.headers.get("origin");
  if (origin && origin !== url.origin) return json({ error: "origin" }, 403);

  let body: { commentId?: unknown; emoji?: unknown };
  try {
    body = (await request.json()) as { commentId?: unknown; emoji?: unknown };
  } catch {
    return json({ error: "json" }, 400);
  }
  const commentId = typeof body.commentId === "string" ? body.commentId : "";
  const emoji = typeof body.emoji === "string" ? body.emoji : "";
  if (!ID.test(commentId) || !isReaction(emoji))
    return json({ error: "invalid" }, 400);

  await ready();
  const comment = await db()
    .prepare(
      `SELECT id FROM _emdash_comments
       WHERE id = ? AND collection = 'diary' AND status = 'approved'`,
    )
    .bind(commentId)
    .first<{ id: string }>();
  if (!comment) return json({ error: "missing" }, 404);

  const voter = voterId(cookies, url.protocol === "https:");
  const existing = await db()
    .prepare(
      `SELECT 1 AS ok FROM diary_comment_reactions
       WHERE comment_id = ? AND emoji = ? AND voter = ?`,
    )
    .bind(commentId, emoji, voter)
    .first<{ ok: number }>();
  if (existing) {
    await db()
      .prepare(
        `DELETE FROM diary_comment_reactions
         WHERE comment_id = ? AND emoji = ? AND voter = ?`,
      )
      .bind(commentId, emoji, voter)
      .run();
  } else {
    await db()
      .prepare(
        `INSERT INTO diary_comment_reactions (comment_id, emoji, voter) VALUES (?, ?, ?)`,
      )
      .bind(commentId, emoji, voter)
      .run();
  }
  return json(await snapshot([commentId], voter));
};
