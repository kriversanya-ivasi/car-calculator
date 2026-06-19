export function formatNumber(value: number, fractionDigits = 0): string {
  if (!isFinite(value) || isNaN(value)) return "—";
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

export function parseNumber(value: string): number {
  if (!value) return 0;
  const cleaned = value.replace(/\s/g, "").replace(",", ".");
  const n = Number(cleaned);
  return isNaN(n) ? 0 : n;
}
