import type { DocType } from '@data/schema';

/**
 * R04: invoice/quote numbers are allocated transactionally and unique within
 * one business. Deleting a document never reuses its number — the counter
 * only ever increases. The actual increment happens inside a DB transaction
 * (data/repositories/documentRepo.ts); this is the pure formatting part.
 */
export function formatDocumentNumber(docType: DocType, prefix: string, counter: number): string {
  return `${prefix}${String(counter).padStart(4, '0')}`;
}

export function counterSettingKey(docType: DocType): 'invoice_number_counter' | 'quote_number_counter' {
  return docType === 'invoice' ? 'invoice_number_counter' : 'quote_number_counter';
}

export function prefixSettingKey(docType: DocType): 'invoice_number_prefix' | 'quote_number_prefix' {
  return docType === 'invoice' ? 'invoice_number_prefix' : 'quote_number_prefix';
}
