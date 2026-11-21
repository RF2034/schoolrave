import handler from "@emdash-cms/cloudflare/worker";
import { notifyDueShifts } from "@/lib/shift-discord-run";

type Scheduled = NonNullable<ExportedHandler["scheduled"]>;

const emdashScheduled = handler.scheduled;

export default {
  ...handler,
  scheduled(controller, env, ctx) {
    ctx.waitUntil(notifyDueShifts(env));
    return emdashScheduled?.call(handler, controller, env, ctx);
  },
} satisfies ExportedHandler & { scheduled: Scheduled };
