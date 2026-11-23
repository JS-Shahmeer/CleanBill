import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text } from 'react-native';

/** Screen 05: rendered document preview, print-safe A4 PDF, save/share, edit. Built in M4. */
export default function DocumentPreviewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <ScrollView className="flex-1 bg-bg px-4 pt-6 dark:bg-[#0B1220]">
      <Text className="text-xl font-bold text-ink dark:text-white">Preview {id}</Text>
      <Text className="mt-2 text-sm text-ink-muted">PDF rendering and share land in M4.</Text>
    </ScrollView>
  );
}
