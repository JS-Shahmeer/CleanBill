import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Button } from '@ui/components/Button';
import { Input } from '@ui/components/Input';
import { businessProfileSchema } from '@domain/validation';

/** Screen 01: Welcome / Business setup (CB-01). First-time launch -> business form -> save -> Home. */
export default function OnboardingScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    const result = businessProfileSchema.safeParse({
      name,
      currencyCode: 'AUD',
      gstEnabled: false,
      taxRateBps: 1000,
    });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? 'Check the form and try again');
      return;
    }
    setError(null);
    setSaving(true);
    try {
      // businessRepo.create(result.data) lands with the Data module repositories in M2.
      router.replace('/(tabs)');
    } finally {
      setSaving(false);
    }
  }

  return (
    <ScrollView className="flex-1 bg-bg px-6 pt-16 dark:bg-[#0B1220]" contentContainerClassName="pb-12">
      <Text className="mb-1 text-3xl font-bold text-ink dark:text-white">Welcome to CleanBill</Text>
      <Text className="mb-8 text-sm text-ink-muted">
        Set up your business profile. You can change any of this later in Settings.
      </Text>

      <Input
        label="Business name"
        required
        value={name}
        onChangeText={setName}
        placeholder="e.g. Shining Clean Co."
        error={error ?? undefined}
      />

      <View className="mt-4">
        <Button label="Get started" onPress={handleSave} loading={saving} fullWidth />
      </View>
    </ScrollView>
  );
}
