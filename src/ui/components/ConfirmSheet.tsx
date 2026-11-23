import { Modal, Text, View } from 'react-native';

import { Button } from './Button';

/**
 * Section 07 "Deletion: Confirm scope, perform cascade safely" and
 * section 06 destructive-action confirmation. Used for delete and
 * status-reversal actions (e.g. Mark Paid -> reverse to unpaid).
 */
export function ConfirmSheet({
  visible,
  title,
  body,
  confirmLabel = 'Delete',
  destructive = true,
  loading,
  onCancel,
  onConfirm,
}: {
  visible: boolean;
  title: string;
  body: string;
  confirmLabel?: string;
  destructive?: boolean;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View className="flex-1 items-center justify-end bg-black/40 sm:justify-center">
        <View className="w-full max-w-md rounded-t-2xl bg-surface p-6 dark:bg-[#111A2E] sm:rounded-2xl">
          <Text className="mb-2 text-lg font-semibold text-ink dark:text-white">{title}</Text>
          <Text className="mb-6 text-sm text-ink-muted">{body}</Text>
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Button label="Cancel" variant="secondary" onPress={onCancel} fullWidth />
            </View>
            <View className="flex-1">
              <Button
                label={confirmLabel}
                variant={destructive ? 'danger' : 'primary'}
                loading={loading}
                onPress={onConfirm}
                fullWidth
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
