import handler from "@emdash-cms/cloudflare/worker";
import { notifyDueShifts, sendShiftTest } from "@/lib/shift-discord-run";

type Scheduled = NonNullable<ExportedHandler["scheduled"]>;

const emdashScheduled = handler.scheduled;

export default {
  ...handler,
  scheduled(controller, env, ctx) {
    ctx.waitUntil(
      (async () => {
        await notifyDueShifts(env);
        const result = await sendShiftTest(env);
        if (result.ok || result.error !== "already sent") {
          console.log("[shift-discord] test", JSON.stringify(result));
        }
      })(),
    );
    return emdashScheduled?.call(handler, controller, env, ctx);
  },
} satisfies ExportedHandler & { scheduled: Scheduled };
