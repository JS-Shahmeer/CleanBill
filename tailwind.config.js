/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#0EA5A4', pressed: '#0B7F7E', soft: '#E6F7F6' },
        accent: '#6366F1',
        surface: '#FFFFFF',
        bg: '#F7FAFC',
        border: '#E2E8F0',
        ink: { DEFAULT: '#0F172A', muted: '#64748B' },
        success: '#16A34A',
        warning: '#F59E0B',
        danger: '#DC2626',
        neutral: '#94A3B8',
      },
      borderRadius: {
        card: '12px',
        btn: '10px',
      },
    },
  },
  plugins: [],
};
