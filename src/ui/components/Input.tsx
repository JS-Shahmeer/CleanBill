import { Text, TextInput, View, type TextInputProps } from 'react-native';

type Props = TextInputProps & {
  label: string;
  error?: string;
  required?: boolean;
};

/**
 * Inline field error, disabled-submit pattern handled by the caller's form —
 * this component only renders the error text and keeps the entered value
 * (section 07: "preserve user input on error").
 */
export function Input({ label, error, required, className, ...props }: Props) {
  return (
    <View className="mb-4">
      <Text className="mb-1.5 text-sm font-medium text-ink-muted">
        {label}
        {required ? ' *' : ''}
      </Text>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor="#94A3B8"
        className={`min-h-[48px] rounded-btn border px-3.5 text-base text-ink dark:text-white ${
          error ? 'border-danger' : 'border-border dark:border-[#1F2A44]'
        } ${className ?? ''}`}
        {...props}
      />
      {error ? <Text className="mt-1 text-xs text-danger">{error}</Text> : null}
    </View>
  );
}
