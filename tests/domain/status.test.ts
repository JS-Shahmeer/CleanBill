import { canTransitionQuoteStatus, isOverdue } from '@domain/status';

describe('status (R05, R06)', () => {
  it('is never overdue when draft, regardless of due date', () => {
    expect(isOverdue({ status: 'draft', dueDate: '2020-01-01' })).toBe(false);
  });

  it('is never overdue when paid', () => {
    expect(isOverdue({ status: 'paid', dueDate: '2020-01-01' })).toBe(false);
  });

  it('is overdue when unpaid and due date is before today', () => {
    const today = new Date('2026-06-15T00:00:00');
    expect(isOverdue({ status: 'unpaid', dueDate: '2026-06-14', today })).toBe(true);
  });

  it('is not overdue when unpaid and due date is today or later', () => {
    const today = new Date('2026-06-15T00:00:00');
    expect(isOverdue({ status: 'unpaid', dueDate: '2026-06-15', today })).toBe(false);
    expect(isOverdue({ status: 'unpaid', dueDate: '2026-06-16', today })).toBe(false);
  });

  it('only allows manual, documented quote status transitions', () => {
    expect(canTransitionQuoteStatus('draft', 'sent')).toBe(true);
    expect(canTransitionQuoteStatus('sent', 'approved')).toBe(true);
    expect(canTransitionQuoteStatus('approved', 'sent')).toBe(false);
    expect(canTransitionQuoteStatus('declined', 'approved')).toBe(false);
  });
});
