/** ポータルで使う表示用ヘルパー。ロケールを固定して SSR とブラウザの差を出さない。 */

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

export function formatDate(value: Date | string | null | undefined): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}/${m}/${day} (${WEEKDAYS[d.getDay()]})`;
}

/** Portable Text から一覧用の抜粋を作る。 */
export function plainExcerpt(
  blocks:
    Array<{ _type?: string; children?: Array<{ text?: string }> }> | undefined,
  max = 90,
): string {
  const text =
    blocks
      ?.filter((b) => b._type === "block")
      .map((b) => (b.children ?? []).map((c) => c.text ?? "").join(""))
      .join(" ")
      .trim() ?? "";
  return text.length > max ? `${text.slice(0, max)}…` : text;
}
