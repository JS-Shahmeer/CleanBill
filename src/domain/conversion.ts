/**
 * R07: converting an approved quote preserves the original quote untouched
 * and creates a new invoice with its own number and an immutable copy of
 * the quote's line items and notes. CB-05: convert once, or show the
 * existing linked invoice — never create a second one silently.
 *
 * This module is pure planning logic; documentRepo.convertQuoteToInvoice
 * does the actual transactional insert using the plan this returns.
 */

export class QuoteNotApprovedError extends Error {
  constructor() {
    super('Only an approved quote can be converted to an invoice.');
  }
}

export class QuoteAlreadyConvertedError extends Error {
  constructor(public readonly existingInvoiceId: string) {
    super('This quote already has a linked invoice.');
  }
}

/**
 * Guards the conversion before the repository touches the DB. The
 * repository separately re-checks for an existing invoice with
 * sourceQuoteId = quote.id inside the same transaction, to close the race
 * between this check and the insert (CB-05 "convert once").
 */
export function assertCanConvert(quote: { status: string }, existingInvoiceId: string | null) {
  if (existingInvoiceId) throw new QuoteAlreadyConvertedError(existingInvoiceId);
  if (quote.status !== 'approved') throw new QuoteNotApprovedError();
}
