import { Text, View } from 'react-native';

import { statusColorKey } from '@ui/theme';

const bg: Record<keyof typeof statusColorKey, string> = {
  draft: 'bg-neutral/15',
  sent: 'bg-warning/15',
  unpaid: 'bg-warning/15',
  overdue: 'bg-danger/15',
  paid: 'bg-success/15',
  approved: 'bg-success/15',
  declined: 'bg-danger/15',
};

const text: Record<keyof typeof statusColorKey, string> = {
  draft: 'text-neutral',
  sent: 'text-warning',
  unpaid: 'text-warning',
  overdue: 'text-danger',
  paid: 'text-success',
  approved: 'text-success',
  declined: 'text-danger',
};

type Status = keyof typeof statusColorKey;

export function StatusBadge({ status, label }: { status: Status; label: string }) {
  return (
    <View className={`self-start rounded-full px-2.5 py-1 ${bg[status]}`}>
      <Text className={`text-xs font-semibold ${text[status]}`}>{label}</Text>
    </View>
  );
}
