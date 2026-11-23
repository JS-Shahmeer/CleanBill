import type { businessProfile, clients } from '@data/schema';

/**
 * CB-08 / R07: documents carry an immutable copy of the client and tax
 * config at issue time, so editing or deleting a client, or editing a
 * business's tax settings, never retroactively changes an existing
 * document. These types are the JSON shape stored in
 * documents.clientSnapshot / documents.taxSnapshot.
 */

export type ClientSnapshot = {
  name: string;
  email: string | null;
  phone: string | null;
  billingAddress: string | null;
  serviceAddress: string | null;
};

export function snapshotClient(client: typeof clients.$inferSelect): ClientSnapshot {
  return {
    name: client.name,
    email: client.email,
    phone: client.phone,
    billingAddress: client.billingAddress,
    serviceAddress: client.serviceAddress,
  };
}

export type TaxSnapshot = {
  gstEnabled: boolean;
  taxRateBps: number;
};

export function snapshotTax(business: typeof businessProfile.$inferSelect): TaxSnapshot {
  return { gstEnabled: business.gstEnabled, taxRateBps: business.taxRateBps };
}

export type BusinessSnapshot = {
  name: string;
  owner: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  abn: string | null;
  logoPath: string | null;
  currencyCode: string;
};

/** Used by the PDF renderer so a reissued PDF for an old document matches what was true then. */
export function snapshotBusiness(business: typeof businessProfile.$inferSelect): BusinessSnapshot {
  return {
    name: business.name,
    owner: business.owner,
    email: business.email,
    phone: business.phone,
    address: business.address,
    abn: business.abn,
    logoPath: business.logoPath,
    currencyCode: business.currencyCode,
  };
}
