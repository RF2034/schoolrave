export const REACTIONS = [
  { emoji: "🦑", label: "いか" },
  { emoji: "🪩", label: "ミラーボール" },
  { emoji: "🪼", label: "くらげ" },
  { emoji: "🪤", label: "ねずみ捕り" },
  { emoji: "🧿", label: "ナザール" },
] as const;

const EMOJI = new Set<string>(REACTIONS.map((item) => item.emoji));

export function isReaction(value: string): boolean {
  return EMOJI.has(value);
}

/** 同じ絵文字をもう一度選ぶと外す。知らない絵文字はそのまま。 */
export function toggleReaction(
  current: readonly string[],
  emoji: string,
): string[] {
  if (!isReaction(emoji)) return [...current];
  return current.includes(emoji)
    ? current.filter((item) => item !== emoji)
    : [...current, emoji];
}
