import { defineConfig } from "cf/config";

/**
 * Secret-like files were detected but not read or migrated: .env, .env.example, .env.local. Only `secrets.required` entries are migrated.
 * @see https://developers.cloudflare.com/workers/configuration/secrets/
 */

export default defineConfig({
  worker: {
    name: "schoolrave",
    compatibilityDate: "2026-09-13",
    workersDev: false,
    observability: {
      enabled: true,
    },
  },
});
