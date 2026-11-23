import { useRouter } from 'expo-router';
import { FilePlus } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';

import { Button } from '@ui/components/Button';
import { Card } from '@ui/components/Card';
import { MoneyText } from '@ui/components/MoneyText';

/**
 * CB-06: outstanding unpaid balance, paid this month, overdue, latest
 * documents, Create Invoice/Quote. Dashboard figures derive from saved
 * invoices (not yet wired to the repository in this M1 pass — see
 * src/features/dashboard for the real data hook landing in M3).
 */
export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-bg dark:bg-[#0B1220]" contentContainerClassName="p-4 pb-24">
      <Text className="mb-4 text-2xl font-bold text-ink dark:text-white">Home</Text>

      <View className="mb-4 flex-row gap-3">
        <Card className="flex-1">
          <Text className="mb-1 text-xs font-medium text-ink-muted">Outstanding</Text>
          <MoneyText cents={0} className="text-xl font-bold" />
        </Card>
        <Card className="flex-1">
          <Text className="mb-1 text-xs font-medium text-ink-muted">Paid this month</Text>
          <MoneyText cents={0} className="text-xl font-bold text-success" />
        </Card>
      </View>

      <Card className="mb-6">
        <Text className="mb-1 text-xs font-medium text-ink-muted">Overdue</Text>
        <MoneyText cents={0} className="text-xl font-bold text-danger" />
      </Card>

      <Button
        label="Create invoice or quote"
        onPress={() => router.push('/document/new/edit')}
      />

      <Text className="mb-2 mt-6 text-base font-semibold text-ink dark:text-white">Recent documents</Text>
      <Card>
        <View className="items-center py-6">
          <FilePlus size={24} color="#94A3B8" />
          <Text className="mt-2 text-sm text-ink-muted">Nothing here yet</Text>
        </View>
      </Card>
    </ScrollView>
  );
}
