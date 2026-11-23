import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text } from 'react-native';

/** Screen 07 detail: add/edit client, addresses, document history. Full form lands in M2. */
export default function ClientDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const isNew = id === 'new';
  return (
    <ScrollView className="flex-1 bg-bg px-4 pt-6 dark:bg-[#0B1220]">
      <Text className="text-xl font-bold text-ink dark:text-white">{isNew ? 'New client' : `Client ${id}`}</Text>
      <Text className="mt-2 text-sm text-ink-muted">Client form and document history land in M2.</Text>
    </ScrollView>
  );
}
