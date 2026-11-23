import { Users } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { EmptyState } from '@ui/components/EmptyState';

/** CB-02: client CRUD, document history, prefill into document. */
export default function ClientsScreen() {
  return (
    <View className="flex-1 bg-bg dark:bg-[#0B1220]">
      <View className="px-4 pb-2 pt-4">
        <Text className="text-2xl font-bold text-ink dark:text-white">Clients</Text>
      </View>
      <EmptyState
        icon={Users}
        title="No clients yet"
        body="Add a client here, or inline while creating an invoice."
        actionLabel="Add client"
        onAction={() => {
          // Routed to the client form in M2 — see the module breakdown doc, Data module.
        }}
      />
    </View>
  );
}
