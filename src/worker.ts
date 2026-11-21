import handler from "@emdash-cms/cloudflare/worker";
import { notifyDueShifts } from "@/lib/shift-discord-run";

type Scheduled = NonNullable<ExportedHandler["scheduled"]>;

const emdashScheduled = handler.scheduled;

export default {
  ...handler,
  scheduled(controller, env, ctx) {
    const at = controller.scheduledTime || Date.now();
    const job = notifyDueShifts(env, at);
    ctx.waitUntil(job);
    const rest = emdashScheduled?.call(handler, controller, env, ctx);
    return Promise.all([job, rest]).then(() => undefined);
  },
} satisfies ExportedHandler & { scheduled: Scheduled };
