import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { Button } from '@ui/components/Button';

/**
 * Screen 03/04: Create / Edit Invoice or Quote, with the Service Selector.
 * `id` is "new" for a fresh document, or an existing document's id.
 * Full form (client picker, line items, discount, tax, draft/issue) lands
 * in M3 per the build order — this is the M1 routed placeholder.
 */
export default function DocumentEditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const isNew = id === 'new';

  return (
    <ScrollView className="flex-1 bg-bg px-4 pt-6 dark:bg-[#0B1220]">
      <Text className="mb-2 text-xl font-bold text-ink dark:text-white">
        {isNew ? 'New document' : `Edit ${id}`}
      </Text>
      <Text className="mb-6 text-sm text-ink-muted">
        The editor (client, items, discount, tax, totals) is built in M3 — see the Build order
        section of the module breakdown.
      </Text>
      <View className="gap-3">
        <Button label="Close" variant="secondary" onPress={() => router.back()} />
      </View>
    </ScrollView>
  );
}
