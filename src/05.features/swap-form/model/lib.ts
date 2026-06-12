const AMOUNT_PATTERN = /^\d*\.?\d*$/;
const MAX_AMOUNT_LENGTH = 20;

/**
 * Normalizes raw keyboard input into a valid amount string.
 * Returns `null` when the input must be rejected (the keystroke is ignored).
 */
export const sanitizeAmountInput = (raw: string): string | null => {
  const normalized = raw.replace(",", ".").trim();
  if (normalized === "") return "";
  if (normalized.length > MAX_AMOUNT_LENGTH) return null;
  if (!AMOUNT_PATTERN.test(normalized)) return null;
  return normalized;
};

export const isPositiveAmount = (value: string): boolean => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) && parsed > 0;
};

/** Trims trailing zeros of a decimal string: "0.00154000" -> "0.00154". */
export const formatAmount = (value: string): string => {
  if (!value.includes(".")) return value;
  const trimmed = value.replace(/0+$/, "").replace(/\.$/, "");
  return trimmed === "" ? "0" : trimmed;
};
