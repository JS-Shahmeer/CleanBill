import { documentSchema, validateDiscountAgainstSubtotal } from '@domain/validation';

describe('validation (R03)', () => {
  // CB-T04: a draft with due date before issue date cannot be issued.
  it('rejects a due date before the issue date', () => {
    const result = documentSchema.safeParse({
      docType: 'invoice',
      clientId: 'client-1',
      issueDate: '2026-06-15',
      dueDate: '2026-06-10',
      items: [{ description: 'Standard clean', quantity: 1, rateMinor: 10000 }],
    });
    expect(result.success).toBe(false);
  });

  it('accepts a due date equal to or after the issue date', () => {
    const result = documentSchema.safeParse({
      docType: 'invoice',
      clientId: 'client-1',
      issueDate: '2026-06-15',
      dueDate: '2026-06-15',
      items: [{ description: 'Standard clean', quantity: 1, rateMinor: 10000 }],
    });
    expect(result.success).toBe(true);
  });

  it('requires at least one line item', () => {
    const result = documentSchema.safeParse({
      docType: 'invoice',
      clientId: 'client-1',
      issueDate: '2026-06-15',
      items: [],
    });
    expect(result.success).toBe(false);
  });

  it('rejects a discount larger than the subtotal', () => {
    expect(validateDiscountAgainstSubtotal(5000, 6000)).not.toBeNull();
    expect(validateDiscountAgainstSubtotal(5000, 5000)).toBeNull();
  });

  it('allows a zero-priced courtesy line item', () => {
    const result = documentSchema.safeParse({
      docType: 'invoice',
      clientId: 'client-1',
      issueDate: '2026-06-15',
      items: [{ description: 'Goodwill gesture', quantity: 1, rateMinor: 0 }],
    });
    expect(result.success).toBe(true);
  });
});
