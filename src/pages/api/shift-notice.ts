import { env } from "cloudflare:workers";
import type { APIRoute } from "astro";
import { notifyDueShifts } from "@/lib/shift-discord-run";

export const prerender = false;

// ponytail: cron が来なくても、この GET で今の枠を送る。イベント後にファイルごと消す。
export const GET: APIRoute = async ({ url }) => {
  const report = await notifyDueShifts(env, Date.now(), {
    force: url.searchParams.has("force"),
  });
  return new Response(JSON.stringify(report), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
};
