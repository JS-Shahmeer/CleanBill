import type { DocStatus, DocType } from '@data/schema';

/**
 * R05: overdue is a DERIVED display state, never stored. Unpaid + issued +
 * due_date < today's local calendar date. Draft and Paid are never overdue.
 */
export function isOverdue(params: { status: DocStatus; dueDate: string | null; today?: Date }): boolean {
  const { status, dueDate } = params;
  if (status !== 'unpaid' || !dueDate) return false;
  const today = params.today ?? new Date();
  const todayStr = toLocalDateString(today);
  return dueDate < todayStr;
}

export function toLocalDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Label shown to the user: Draft, Sent, Unpaid, Overdue, Paid, Approved, Declined. */
export function displayStatus(params: { status: DocStatus; dueDate: string | null; today?: Date }): string {
  if (isOverdue(params)) return 'Overdue';
  const labels: Record<DocStatus, string> = {
    draft: 'Draft',
    sent: 'Sent',
    unpaid: 'Unpaid',
    paid: 'Paid',
    approved: 'Approved',
    declined: 'Declined',
  };
  return labels[params.status];
}

/** R06: quote status changes are manual only — never set automatically by the app. */
export const quoteStatusTransitions: Record<string, DocStatus[]> = {
  draft: ['sent', 'approved', 'declined'],
  sent: ['approved', 'declined', 'draft'],
  approved: ['declined'], // conversion itself does not change quote status (R07)
  declined: ['sent', 'draft'],
};

export function canTransitionQuoteStatus(from: DocStatus, to: DocStatus): boolean {
  return quoteStatusTransitions[from]?.includes(to) ?? false;
}

/** Every new document starts as a draft, invoice or quote alike (CB-04). */
export function initialStatusForDocType(_docType: DocType): DocStatus {
  return 'draft';
}

/** CB-04: issuing a draft invoice sets Unpaid unless it's marked paid in the same action. */
export function statusOnIssue(docType: DocType, markedPaid: boolean): DocStatus {
  if (docType === 'quote') return 'sent';
  return markedPaid ? 'paid' : 'unpaid';
}
