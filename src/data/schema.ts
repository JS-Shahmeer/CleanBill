import { sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/**
 * CleanBill local schema (SQLite via expo-sqlite + Drizzle).
 * Mirrors the developer brief section 04: one business, many clients,
 * service presets, documents (invoice/quote) with line items and
 * snapshotted client/tax data, and at most one payment per document.
 *
 * Money is stored in integer minor units (cents) everywhere — never floats.
 * Dates are stored as ISO 8601 strings ('YYYY-MM-DD' for calendar dates).
 */

// Exactly one row ever exists in this table (enforced in the repository, not the schema).
export const businessProfile = sqliteTable('business_profile', {
  id: text('id').primaryKey(), // fixed constant id, see data/repositories/businessRepo.ts
  name: text('name').notNull(),
  owner: text('owner'),
  email: text('email'),
  phone: text('phone'),
  address: text('address'),
  abn: text('abn'),
  logoPath: text('logo_path'),
  currencyCode: text('currency_code').notNull().default('AUD'),
  gstEnabled: integer('gst_enabled', { mode: 'boolean' }).notNull().default(false),
  taxRateBps: integer('tax_rate_bps').notNull().default(1000), // 10.00% default AU GST
  defaultTerms: text('default_terms'),
  createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
  updatedAt: text('updated_at').notNull().default(sql`(current_timestamp)`),
});

export const clients = sqliteTable('clients', {
  id: text('id').primaryKey(), // UUID
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  billingAddress: text('billing_address'),
  serviceAddress: text('service_address'),
  createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
  deletedAt: text('deleted_at'), // soft delete: keep row so historical snapshots resolve, CB-08
});

export const pricingModeValues = ['fixed', 'hour', 'per_unit'] as const;
export type PricingMode = (typeof pricingModeValues)[number];

export const servicePresets = sqliteTable('service_presets', {
  id: text('id').primaryKey(), // UUID
  label: text('label').notNull(),
  category: text('category').notNull(), // standard | deep | end_of_lease | office | window | carpet | hourly | custom
  pricingMode: text('pricing_mode').$type<PricingMode>().notNull().default('fixed'),
  unitRateMinor: integer('unit_rate_minor').notNull().default(0),
  enabled: integer('enabled', { mode: 'boolean' }).notNull().default(true),
  createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
});

export const docTypeValues = ['invoice', 'quote'] as const;
export type DocType = (typeof docTypeValues)[number];

export const docStatusValues = ['draft', 'sent', 'unpaid', 'paid', 'approved', 'declined'] as const;
export type DocStatus = (typeof docStatusValues)[number];

export const discountTypeValues = ['fixed', 'percent'] as const;
export type DiscountType = (typeof discountTypeValues)[number];

export const documents = sqliteTable('documents', {
  id: text('id').primaryKey(), // UUID
  docType: text('doc_type').$type<DocType>().notNull(),
  displayNumber: text('display_number').notNull().unique(), // e.g. INV-0001 / QUO-0001, allocated transactionally (R04)
  clientId: text('client_id').references(() => clients.id),
  // Immutable copy of the client's details at issue time (CB-08 / R07): name, email, phone, billingAddress, serviceAddress.
  clientSnapshot: text('client_snapshot', { mode: 'json' }).notNull(),
  issueDate: text('issue_date').notNull(), // DATE
  dueDate: text('due_date'), // DATE, required for invoices, validated > issueDate (R03)
  status: text('status').$type<DocStatus>().notNull().default('draft'),
  currency: text('currency').notNull().default('AUD'),
  discountType: text('discount_type').$type<DiscountType>(),
  discountValueMinor: integer('discount_value_minor'), // cents if fixed, basis points if percent
  // Snapshot of the tax config used to compute this document (R02): { gstEnabled, taxRateBps }.
  taxSnapshot: text('tax_snapshot', { mode: 'json' }).notNull(),
  subtotalMinor: integer('subtotal_minor').notNull().default(0),
  totalMinor: integer('total_minor').notNull().default(0),
  notes: text('notes'),
  sourceQuoteId: text('source_quote_id'), // set on an invoice created via quote conversion (R07)
  createdAt: text('created_at').notNull().default(sql`(current_timestamp)`),
  updatedAt: text('updated_at').notNull().default(sql`(current_timestamp)`),
});

export const documentItems = sqliteTable('document_items', {
  id: text('id').primaryKey(), // UUID
  documentId: text('document_id')
    .notNull()
    .references(() => documents.id, { onDelete: 'cascade' }),
  sortOrder: integer('sort_order').notNull().default(0),
  description: text('description').notNull(),
  quantity: real('quantity').notNull().default(1), // fixed-precision decimal, stored as text in the domain layer's Decimal wrapper
  rateMinor: integer('rate_minor').notNull(), // price snapshot at the time the line was added — editing a preset never changes this
  totalMinor: integer('total_minor').notNull(), // rounded once, per R01
});

export const paymentMethodValues = ['cash', 'bank_transfer', 'card', 'other'] as const;
export type PaymentMethod = (typeof paymentMethodValues)[number];

export const payments = sqliteTable('payments', {
  id: text('id').primaryKey(), // UUID
  documentId: text('document_id')
    .notNull()
    .unique() // V1: at most one payment record per document (full payment only)
    .references(() => documents.id, { onDelete: 'cascade' }),
  paidAt: text('paid_at').notNull(), // DATE
  method: text('method').$type<PaymentMethod>().notNull(),
  reference: text('reference'),
  notes: text('notes'),
});

export const settings = sqliteTable('settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(), // JSON-encoded; see data/repositories/settingsRepo.ts for known keys
});
