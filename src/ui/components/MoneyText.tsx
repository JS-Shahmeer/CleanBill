import { Text, type TextProps } from 'react-native';

import { formatCents } from '@domain/money';

export function MoneyText({
  cents,
  currency = 'AUD',
  className = '',
  ...props
}: TextProps & { cents: number; currency?: string; className?: string }) {
  return (
    <Text className={`text-ink dark:text-white ${className}`} {...props}>
      {formatCents(cents, currency)}
    </Text>
  );
}
