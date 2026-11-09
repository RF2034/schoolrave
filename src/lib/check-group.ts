export function groupComplete(checked: readonly boolean[]): boolean {
  return checked.length > 0 && checked.every(Boolean);
}
