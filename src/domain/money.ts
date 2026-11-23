import Decimal from 'decimal.js';

/**
 * Money (R01): every rate and total is an integer of minor units (cents).
 * Quantity is a fixed-precision decimal (never a binary float). Each line
 * total is rounded exactly once, half-up, at the point it's computed —
 * never re-rounded later.
 */

export type Cents = number; // always an integer; branded only in comments, Zod enforces at the edges

export function toCents(amount: string | number): Cents {
  return new Decimal(amount).mul(100).toDecimalPlaces(0, Decimal.ROUND_HALF_UP).toNumber();
}

export function formatCents(cents: Cents, currency = 'AUD'): string {
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency }).format(cents / 100);
}

/** Quantity × rate, rounded once to the nearest cent. */
export function lineTotalMinor(quantity: string | number, rateMinor: Cents): Cents {
  return new Decimal(quantity).mul(rateMinor).toDecimalPlaces(0, Decimal.ROUND_HALF_UP).toNumber();
}

export function sumMinor(values: Cents[]): Cents {
  return values.reduce((a, b) => a + b, 0);
}

export type DiscountInput = { type: 'fixed'; valueMinor: Cents } | { type: 'percent'; bps: number } | null;

/** Discount amount in minor units, given a subtotal. Never negative, never > subtotal (R03, enforced by caller). */
export function discountAmountMinor(subtotalMinor: Cents, discount: DiscountInput): Cents {
  if (!discount) return 0;
  if (discount.type === 'fixed') return Math.min(discount.valueMinor, subtotalMinor);
  const amount = new Decimal(subtotalMinor).mul(discount.bps).div(10_000).toDecimalPlaces(0, Decimal.ROUND_HALF_UP);
  return Math.min(amount.toNumber(), subtotalMinor);
}

export type TaxConfig = { gstEnabled: boolean; taxRateBps: number };

/**
 * R02 calculation order: line totals → subtotal → discount → taxable base →
 * GST → grand total. Line prices are tax-exclusive when GST is enabled.
 */
export function calculateDocumentTotals(params: {
  lineItems: Array<{ quantity: string | number; rateMinor: Cents }>;
  discount: DiscountInput;
  tax: TaxConfig;
}) {
  const lineTotals = params.lineItems.map((li) => lineTotalMinor(li.quantity, li.rateMinor));
  const subtotalMinor = sumMinor(lineTotals);
  const discountMinor = discountAmountMinor(subtotalMinor, params.discount);
  const taxableBaseMinor = subtotalMinor - discountMinor;
  const gstMinor = params.tax.gstEnabled
    ? new Decimal(taxableBaseMinor).mul(params.tax.taxRateBps).div(10_000).toDecimalPlaces(0, Decimal.ROUND_HALF_UP).toNumber()
    : 0;
  const totalMinor = taxableBaseMinor + gstMinor;

  return { lineTotals, subtotalMinor, discountMinor, taxableBaseMinor, gstMinor, totalMinor };
}
