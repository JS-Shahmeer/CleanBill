import { randomUUID } from 'expo-crypto';
import type { ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';

import { servicePresets, settings } from './schema';
import type * as schema from './schema';

/**
 * Seeds categories (CB-03) with pricing mode set but rate left at 0 — "without
 * hard-coded prices" per the brief, so the user sets real rates in Settings
 * before they're used. Also seeds the settings this app needs to boot:
 * invoice/quote numbering counters and the default due-days term.
 * Runs once: skipped whenever service_presets already has rows.
 */
export async function seedIfEmpty(db: ExpoSQLiteDatabase<typeof schema>) {
  const existing = await db.select().from(servicePresets).limit(1);
  if (existing.length > 0) return;

  const categories: Array<{ label: string; category: string }> = [
    { label: 'Standard clean', category: 'standard' },
    { label: 'Deep clean', category: 'deep' },
    { label: 'End of lease clean', category: 'end_of_lease' },
    { label: 'Office clean', category: 'office' },
    { label: 'Window clean', category: 'window' },
    { label: 'Carpet clean', category: 'carpet' },
    { label: 'Hourly rate', category: 'hourly' },
  ];

  await db.transaction(async (tx) => {
    for (const c of categories) {
      await tx.insert(servicePresets).values({
        id: randomUUID(),
        label: c.label,
        category: c.category,
        pricingMode: c.category === 'hourly' ? 'hour' : 'fixed',
        unitRateMinor: 0,
        enabled: true,
      });
    }

    await tx.insert(settings).values([
      { key: 'invoice_number_prefix', value: JSON.stringify('INV-') },
      { key: 'invoice_number_counter', value: JSON.stringify(0) },
      { key: 'quote_number_prefix', value: JSON.stringify('QUO-') },
      { key: 'quote_number_counter', value: JSON.stringify(0) },
      { key: 'default_due_days', value: JSON.stringify(7) },
      { key: 'payment_instructions', value: JSON.stringify('') },
    ]);
  });
}
