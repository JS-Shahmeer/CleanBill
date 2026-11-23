import { z } from 'zod';

/**
 * Zod schemas used both in the form (react-hook-form resolver) and again in
 * the domain/repository layer before persistence — section 07: "All form
 * validations are performed before persistence and repeated at the
 * data/domain layer."
 */

const emailField = z
  .string()
  .trim()
  .email('Enter a valid email')
  .optional()
  .or(z.literal('')); // optional field: blank is fine, an invalid value is not

export const businessProfileSchema = z.object({
  name: z.string().trim().min(1, 'Business name is required'),
  owner: z.string().trim().optional(),
  email: emailField,
  phone: z.string().trim().optional(),
  address: z.string().trim().optional(),
  abn: z.string().trim().optional(),
  logoPath: z.string().trim().optional().nullable(),
  currencyCode: z.string().length(3).default('AUD'),
  gstEnabled: z.boolean().default(false),
  taxRateBps: z.number().int().min(0).max(10_000),
  defaultTerms: z.string().trim().optional(),
});

export const clientSchema = z.object({
  name: z.string().trim().min(1, 'Client name is required'),
  email: emailField,
  phone: z.string().trim().optional(),
  billingAddress: z.string().trim().optional(),
  serviceAddress: z.string().trim().optional(),
});

export const servicePresetSchema = z.object({
  label: z.string().trim().min(1, 'Service name is required'),
  category: z.string().trim().min(1),
  pricingMode: z.enum(['fixed', 'hour', 'per_unit']),
  unitRateMinor: z.number().int().min(0, 'Rate cannot be negative'),
  enabled: z.boolean().default(true),
});

export const lineItemSchema = z.object({
  description: z.string().trim().min(1, 'Description is required').max(500, 'Description is too long'),
  quantity: z.number().positive('Quantity must be greater than zero'),
  rateMinor: z.number().int().min(0, 'Rate cannot be negative'),
});

export const documentSchema = z
  .object({
    docType: z.enum(['invoice', 'quote']),
    clientId: z.string().min(1, 'Select a client'),
    issueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date'),
    dueDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional()
      .nullable(),
    items: z.array(lineItemSchema).min(1, 'Add at least one item'),
    discountType: z.enum(['fixed', 'percent']).optional().nullable(),
    discountValueMinor: z.number().int().min(0).optional().nullable(),
    notes: z.string().trim().max(5000).optional(),
  })
  // R03: due date must not be before issue date.
  .refine((doc) => !doc.dueDate || doc.dueDate >= doc.issueDate, {
    message: 'Due date cannot be before the issue date',
    path: ['dueDate'],
  });

/** R03: discount can never exceed the subtotal. Call after totals are computed. */
export function validateDiscountAgainstSubtotal(subtotalMinor: number, discountMinor: number): string | null {
  if (discountMinor > subtotalMinor) return 'Discount cannot be larger than the subtotal';
  if (discountMinor < 0) return 'Discount cannot be negative';
  return null;
}

export const markPaidSchema = z.object({
  paidAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date'),
  method: z.enum(['cash', 'bank_transfer', 'card', 'other']),
  reference: z.string().trim().max(200).optional(),
  notes: z.string().trim().max(1000).optional(),
});

export type BusinessProfileInput = z.infer<typeof businessProfileSchema>;
export type ClientInput = z.infer<typeof clientSchema>;
export type ServicePresetInput = z.infer<typeof servicePresetSchema>;
export type DocumentInput = z.infer<typeof documentSchema>;
export type MarkPaidInput = z.infer<typeof markPaidSchema>;
