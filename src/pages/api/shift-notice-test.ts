import { sendShiftTest } from "@/lib/shift-discord-run";
import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

/** 一度だけ。本番の送信済みにはしない。確認したらこの経路は消す。 */
export const GET: APIRoute = async () => {
  const result = await sendShiftTest(env);
  const status = result.ok || result.error === "already sent" ? 200 : 502;
  return new Response(JSON.stringify(result), {
    status,
    headers: { "content-type": "application/json" },
  });
};
