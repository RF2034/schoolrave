import { defineConfig, triggers } from "cf/config";

/**
 * Secret-like files were detected but not read or migrated: .env, .env.example, .env.local. Only `secrets.required` entries are migrated.
 * @see https://developers.cloudflare.com/workers/configuration/secrets/
 */

export default defineConfig({
  worker: {
    name: "schoolrave",
    compatibilityDate: "2026-09-13",
    workersDev: false,
    previewUrls: false,
    domains: ["schoolrave.net"],
    // 11/20 09:00 JST から 11/24 08:59 JST まで毎分。wrangler.jsonc と同じ。
    triggers: [triggers.scheduled({ schedule: "* * 20-23 11 *" })],
    observability: {
      enabled: true,
    },
  },
});
