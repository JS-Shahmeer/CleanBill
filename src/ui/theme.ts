/**
 * CleanBill design tokens — "Fresh Teal" palette.
 * Mirrors tailwind.config.js colors 1:1, for places that need raw hex
 * (native modules, PDF templates, chart/status colors) instead of className.
 *
 * Source of truth for the palette lives in the project's module-breakdown doc.
 */

export const palette = {
  light: {
    primary: '#0EA5A4',
    primaryPressed: '#0B7F7E',
    primarySoft: '#E6F7F6',
    accent: '#6366F1',
    background: '#F7FAFC',
    surface: '#FFFFFF',
    border: '#E2E8F0',
    text: '#0F172A',
    textMuted: '#64748B',
    success: '#16A34A',
    warning: '#F59E0B',
    danger: '#DC2626',
    neutral: '#94A3B8',
  },
  dark: {
    primary: '#2DD4BF',
    primaryPressed: '#14B8A6',
    primarySoft: '#12302F',
    accent: '#818CF8',
    background: '#0B1220',
    surface: '#111A2E',
    border: '#1F2A44',
    text: '#F1F5F9',
    textMuted: '#94A3B8',
    success: '#4ADE80',
    warning: '#FBBF24',
    danger: '#F87171',
    neutral: '#64748B',
  },
} as const;

export type ThemeMode = keyof typeof palette;
export type Palette = (typeof palette)[ThemeMode];

/** Status -> token key, used by StatusBadge and the dashboard cards. */
export const statusColorKey = {
  draft: 'neutral',
  sent: 'warning',
  unpaid: 'warning',
  overdue: 'danger',
  paid: 'success',
  approved: 'success',
  declined: 'danger',
} as const satisfies Record<string, keyof Palette>;

export const spacing = (n: number) => n * 8;

export const radius = {
  card: 12,
  btn: 10,
};

export const fontSize = {
  xl: 28,
  lg: 20,
  md: 16,
  sm: 14,
  xs: 12,
};

export const minTouchTarget = 48;
