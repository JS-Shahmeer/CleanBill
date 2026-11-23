import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { create } from 'zustand';

type ToastKind = 'success' | 'error' | 'info';
type ToastState = {
  message: string | null;
  kind: ToastKind;
  show: (message: string, kind?: ToastKind) => void;
  hide: () => void;
};

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  kind: 'info',
  show: (message, kind = 'info') => set({ message, kind }),
  hide: () => set({ message: null }),
}));

/** Convenience wrapper so screens don't import the store directly. */
export const toast = {
  success: (message: string) => useToastStore.getState().show(message, 'success'),
  error: (message: string) => useToastStore.getState().show(message, 'error'),
  info: (message: string) => useToastStore.getState().show(message, 'info'),
};

const kindStyle: Record<ToastKind, string> = {
  success: 'bg-success',
  error: 'bg-danger',
  info: 'bg-ink',
};

/** Mounted once in app/_layout.tsx. Renders nothing while there's no message. */
export function ToastHost() {
  const { message, kind, hide } = useToastStore();

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(hide, 3000);
    return () => clearTimeout(timer);
  }, [message, hide]);

  if (!message) return null;

  return (
    <View pointerEvents="none" className="absolute bottom-8 left-4 right-4 items-center">
      <View className={`rounded-btn px-4 py-3 ${kindStyle[kind]}`}>
        <Text className="text-center text-sm font-medium text-white">{message}</Text>
      </View>
    </View>
  );
}
