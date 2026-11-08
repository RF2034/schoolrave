import { defineMiddleware } from "astro:middleware";

// ponytail: EmDash の「サイトを表示」は href="/" 固定。パス設定が付くまで、管理画面の描画後に差し替える。
// ponytail: 投稿者欄も外せない。未割り当てにすると権限30は公開できないので、欄だけ隠す。所有者はログイン中の人のまま。
const SCRIPT = `<script>
(() => {
  const next = "/portal/diary";
  const fix = () => {
    for (const link of document.querySelectorAll('a[href="/"]')) {
      const label = link.textContent || "";
      if (!label.includes("サイトを表示") && !label.includes("View Site")) continue;
      link.setAttribute("href", next);
    }
    for (const section of document.querySelectorAll("section")) {
      const heading = section.querySelector("h3, [data-sortable-heading]");
      const label = (heading?.textContent || "").trim();
      if (label !== "投稿者" && label !== "Ownership") continue;
      section.hidden = true;
    }
  };
  const start = () => {
    fix();
    new MutationObserver(fix).observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
</script>`;

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  if (!context.url.pathname.startsWith("/_emdash/admin")) return response;
  const type = response.headers.get("content-type") ?? "";
  if (!type.includes("text/html") || !response.body) return response;
  const html = await response.text();
  const body = html.includes("</body>")
    ? html.replace("</body>", `${SCRIPT}</body>`)
    : html + SCRIPT;
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});
