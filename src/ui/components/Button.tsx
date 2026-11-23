import { ActivityIndicator, Pressable, Text, type PressableProps } from 'react-native';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';

type Props = PressableProps & {
  label: string;
  variant?: Variant;
  loading?: boolean;
  fullWidth?: boolean;
};

const variantStyles: Record<Variant, { container: string; label: string }> = {
  primary: { container: 'bg-primary active:bg-primary-pressed', label: 'text-white' },
  secondary: {
    container: 'bg-transparent border border-primary active:bg-primary-soft',
    label: 'text-primary',
  },
  danger: { container: 'bg-danger active:opacity-90', label: 'text-white' },
  ghost: { container: 'bg-transparent active:bg-primary-soft', label: 'text-primary' },
};

/** Minimum 48px touch target per the brief's non-functional requirements. */
export function Button({ label, variant = 'primary', loading, fullWidth, disabled, ...props }: Props) {
  const styles = variantStyles[variant];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      disabled={disabled || loading}
      className={`min-h-[48px] flex-row items-center justify-center rounded-btn px-5 ${styles.container} ${
        fullWidth ? 'w-full' : ''
      } ${disabled || loading ? 'opacity-50' : ''}`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' || variant === 'danger' ? '#fff' : '#0EA5A4'} />
      ) : (
        <Text className={`text-base font-semibold ${styles.label}`}>{label}</Text>
      )}
    </Pressable>
  );
}
