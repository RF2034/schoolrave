import { env } from "cloudflare:workers";
import type { APIRoute } from "astro";
import { notifyDueShifts } from "@/lib/shift-discord-run";

export const prerender = false;

// ponytail: cron が来なくても、この GET で今の枠を送る。イベント後にファイルごと消す。
export const GET: APIRoute = async () => {
  const report = await notifyDueShifts(env);
  return new Response(JSON.stringify(report), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
};
