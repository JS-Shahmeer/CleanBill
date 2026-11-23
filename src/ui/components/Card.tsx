import { View, type ViewProps } from 'react-native';

export function Card({ className = '', ...props }: ViewProps & { className?: string }) {
  return (
    <View
      className={`rounded-card border border-border bg-surface p-4 shadow-sm dark:border-[#1F2A44] dark:bg-[#111A2E] ${className}`}
      {...props}
    />
  );
}
