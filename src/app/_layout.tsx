import '../ui/global.css';

import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';

import { runMigrations } from '@data/client';
import { ToastHost } from '@ui/components/Toast';

type BootState = 'loading' | 'ready' | 'error';

export default function RootLayout() {
  const [boot, setBoot] = useState<BootState>('loading');
  const [bootError, setBootError] = useState<string | null>(null);

  useEffect(() => {
    runMigrations()
      .then(() => setBoot('ready'))
      .catch((err) => {
        console.warn('Database migration failed');
        setBootError(err instanceof Error ? err.message : 'Unknown error');
        setBoot('error');
      });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        {boot === 'loading' ? (
          <View className="flex-1 items-center justify-center bg-bg dark:bg-[#0B1220]">
            <Text className="text-ink dark:text-white">Loading CleanBill…</Text>
          </View>
        ) : boot === 'error' ? (
          <View className="flex-1 items-center justify-center bg-bg px-6 dark:bg-[#0B1220]">
            <Text className="mb-2 text-lg font-semibold text-danger">
              CleanBill couldn't start
            </Text>
            <Text className="text-center text-ink-muted">
              {bootError ?? 'A local database error occurred.'}
            </Text>
          </View>
        ) : (
          <>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="onboarding" options={{ presentation: 'fullScreenModal' }} />
              <Stack.Screen name="document/[id]/edit" options={{ presentation: 'modal' }} />
              <Stack.Screen name="document/[id]/preview" />
              <Stack.Screen name="client/[id]" />
            </Stack>
            <ToastHost />
          </>
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
