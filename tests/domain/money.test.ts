import { calculateDocumentTotals, discountAmountMinor, lineTotalMinor } from '@domain/money';

describe('money (R01, R02)', () => {
  // CB-T02: 2.5 hours × A$40.00 = A$100.00 before discounts/tax.
  it('rounds a line total once, half up', () => {
    expect(lineTotalMinor(2.5, 4000)).toBe(10000);
    expect(lineTotalMinor(1.005, 100)).toBe(101); // 100.5 cents -> 101
  });

  it('caps a fixed discount at the subtotal (R03)', () => {
    expect(discountAmountMinor(5000, { type: 'fixed', valueMinor: 9000 })).toBe(5000);
  });

  it('computes a percent discount in basis points', () => {
    expect(discountAmountMinor(10000, { type: 'percent', bps: 1000 })).toBe(1000); // 10%
  });

  // CB-T03: discount plus configured tax produces identical editor, saved record and PDF totals.
  it('applies discount before tax, in the documented order', () => {
    const result = calculateDocumentTotals({
      lineItems: [{ quantity: 2, rateMinor: 5000 }], // $100.00
      discount: { type: 'percent', bps: 1000 }, // 10% off -> $90.00 taxable base
      tax: { gstEnabled: true, taxRateBps: 1000 }, // 10% GST -> $9.00
    });

    expect(result.subtotalMinor).toBe(10000);
    expect(result.discountMinor).toBe(1000);
    expect(result.taxableBaseMinor).toBe(9000);
    expect(result.gstMinor).toBe(900);
    expect(result.totalMinor).toBe(9900);
  });

  it('skips GST entirely when the business has it disabled', () => {
    const result = calculateDocumentTotals({
      lineItems: [{ quantity: 1, rateMinor: 10000 }],
      discount: null,
      tax: { gstEnabled: false, taxRateBps: 1000 },
    });
    expect(result.gstMinor).toBe(0);
    expect(result.totalMinor).toBe(10000);
  });
});
