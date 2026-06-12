import { formatAmount, isPositiveAmount, sanitizeAmountInput } from "../lib";

describe("sanitizeAmountInput", () => {
  it("accepts plain integers and decimals", () => {
    expect(sanitizeAmountInput("100")).toBe("100");
    expect(sanitizeAmountInput("0.015")).toBe("0.015");
    expect(sanitizeAmountInput(".5")).toBe(".5");
  });

  it("normalizes a comma to a dot", () => {
    expect(sanitizeAmountInput("1,5")).toBe("1.5");
  });

  it("returns empty string for cleared input", () => {
    expect(sanitizeAmountInput("")).toBe("");
    expect(sanitizeAmountInput("   ")).toBe("");
  });

  it("rejects invalid characters", () => {
    expect(sanitizeAmountInput("12a")).toBeNull();
    expect(sanitizeAmountInput("-5")).toBeNull();
    expect(sanitizeAmountInput("1e5")).toBeNull();
  });

  it("rejects a second decimal point", () => {
    expect(sanitizeAmountInput("1.2.3")).toBeNull();
  });

  it("rejects overly long input", () => {
    expect(sanitizeAmountInput("1".repeat(21))).toBeNull();
  });
});

describe("isPositiveAmount", () => {
  it("is true only for values greater than zero", () => {
    expect(isPositiveAmount("0.1")).toBe(true);
    expect(isPositiveAmount("100")).toBe(true);
    expect(isPositiveAmount("0")).toBe(false);
    expect(isPositiveAmount("0.0")).toBe(false);
    expect(isPositiveAmount("")).toBe(false);
    expect(isPositiveAmount(".")).toBe(false);
  });
});

describe("formatAmount", () => {
  it("trims trailing zeros after the decimal point", () => {
    expect(formatAmount("0.00154000")).toBe("0.00154");
    expect(formatAmount("1.000")).toBe("1");
  });

  it("keeps integers untouched", () => {
    expect(formatAmount("100")).toBe("100");
  });

  it("collapses an all-zero fraction to zero", () => {
    expect(formatAmount("0.000")).toBe("0");
  });
});
