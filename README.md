# CleanBill

Offline-first invoice and quotation maker for independent cleaners, built with React Native (Expo) for Android-first, iOS-compatible delivery. See the [MVP developer brief](../CleanBill_Final_Developer_Brief.docx) for the full product and engineering spec, and the project's module-breakdown doc for the stack rationale and build order.

## Status

**M1 — Foundation** is complete: project setup, theme, navigation shell, local database schema/migrations, and the domain module's business-rule logic with unit tests. Screens are routed but mostly placeholders — full CRUD forms land in M2/M3 per the build order below.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Expo (SDK 58) + React Native + TypeScript |
| Navigation | Expo Router (file-based, typed routes) |
| State | Zustand |
| Database | expo-sqlite + Drizzle ORM, versioned migrations |
| Forms/validation | React Hook Form + Zod |
| Money/dates | decimal.js (integer cents) + date-fns |
| PDF/share | expo-print, expo-sharing |
| Styling | NativeWind (Tailwind for React Native) |
| Testing | Jest (domain unit tests), Maestro planned for device E2E |

## Getting started

```bash
npm install
npm run android   # or: npm run ios / npm run web
```

Requires a development build (not Expo Go) once native modules are added — see `AGENTS.md` for `expo run:android` / EAS build notes.

## Project structure

```
src/
  app/            # Expo Router screens (file-based routing)
  ui/              # design system: theme tokens, reusable components
  domain/          # pure business rules: money, totals, status, validation,
                    # numbering, conversion, snapshots — no UI, no DB import
  data/            # Drizzle schema, migrations, DB client, seed
  device/          # PDF, share, file, permission helpers (M4)
  features/        # feature-specific hooks/components (M2+)
tests/domain/       # unit tests for every business rule (R01–R08)
e2e/                # Maestro flows for CB-T01–CB-T10 (M5)
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run android` / `ios` / `web` | Start the dev server for that platform |
| `npm test` | Run domain-layer unit tests |
| `npx tsc --noEmit` | Typecheck |
| `npm run db:generate` | Generate a new Drizzle migration after editing `src/data/schema.ts` |

## Database and migrations

Schema lives in `src/data/schema.ts` (7 tables, matching brief section 04). After changing it, run `npm run db:generate` to write a new versioned SQL migration into `src/data/migrations/`. **Never edit a migration that has already shipped** — add a new one, so devices that already applied the old one aren't affected. Migrations run automatically on app launch (`src/data/client.ts`), before any screen renders.

## Business rules

Every rule from brief section 05 (R01–R08) is implemented as pure, UI-free TypeScript in `src/domain/` and covered by a unit test in `tests/domain/`. Run `npm test` to verify.

## Build order (solo developer)

1. **M1 Foundation** ✅ — project setup, theme, navigation, DB schema/migrations, error patterns.
2. **M2 Core data** — domain unit tests complete; repositories, business setup, clients, service presets screens.
3. **M3 Invoice flow** — editor, numbering, Documents list, Mark Paid, Home dashboard.
4. **M4 Quotes, PDF and share** — quote conversion, A4 PDF, share sheet, logo picker.
5. **M5 QA and release** — Maestro E2E flows, migration test, signed Android build, handover docs.

## Scope (V1)

No backend, login, cloud sync or payment collection — everything is stored locally on the device. See the developer brief for the full included/excluded feature list and non-functional requirements (offline support, permissions, privacy, accessibility).
