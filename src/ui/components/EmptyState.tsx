import type { LucideIcon } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { Button } from './Button';

/**
 * Section 07.1: "One clear CTA on first-run/home/list; no fake sample
 * records in production." Used by every list/dashboard screen's empty case.
 */
export function EmptyState({
  icon: Icon,
  title,
  body,
  actionLabel,
  onAction,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-12">
      <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-primary-soft dark:bg-[#12302F]">
        <Icon size={28} color="#0EA5A4" />
      </View>
      <Text className="mb-1 text-center text-lg font-semibold text-ink dark:text-white">{title}</Text>
      <Text className="mb-6 text-center text-sm text-ink-muted">{body}</Text>
      {actionLabel && onAction ? <Button label={actionLabel} onPress={onAction} /> : null}
    </View>
  );
}
