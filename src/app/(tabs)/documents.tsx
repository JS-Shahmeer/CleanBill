import { useRouter } from 'expo-router';
import { FileText } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { EmptyState } from '@ui/components/EmptyState';

type Tab = 'invoices' | 'quotes';

/** CB-04 / CB-05: Documents list with Invoice/Quote tabs, search, filter, duplicate, status actions. */
export default function DocumentsScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('invoices');

  return (
    <View className="flex-1 bg-bg dark:bg-[#0B1220]">
      <View className="px-4 pb-2 pt-4">
        <Text className="mb-4 text-2xl font-bold text-ink dark:text-white">Documents</Text>
        <View className="flex-row rounded-btn bg-primary-soft p-1 dark:bg-[#12302F]">
          {(['invoices', 'quotes'] as const).map((t) => (
            <Pressable
              key={t}
              onPress={() => setTab(t)}
              className={`flex-1 items-center rounded-btn py-2 ${tab === t ? 'bg-surface dark:bg-[#111A2E]' : ''}`}
            >
              <Text
                className={`text-sm font-semibold capitalize ${
                  tab === t ? 'text-primary' : 'text-ink-muted'
                }`}
              >
                {t}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <EmptyState
        icon={FileText}
        title={tab === 'invoices' ? 'No invoices yet' : 'No quotes yet'}
        body={
          tab === 'invoices'
            ? 'Create your first invoice to start getting paid.'
            : 'Send a quote to a client to get started.'
        }
        actionLabel={tab === 'invoices' ? 'Create invoice' : 'Create quote'}
        onAction={() => router.push('/document/new/edit')}
      />
    </View>
  );
}
