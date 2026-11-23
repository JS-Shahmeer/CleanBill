import { ChevronRight, DollarSign, FileText, HelpCircle, Shield, Store } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Card } from '@ui/components/Card';

type Row = { icon: LucideIcon; label: string; sub: string };

const rows: Row[] = [
  { icon: Store, label: 'Business details', sub: 'Name, contact, logo, ABN' },
  { icon: DollarSign, label: 'Currency and tax', sub: 'AUD, GST toggle and rate' },
  { icon: FileText, label: 'Invoice numbering', sub: 'Prefix and next number' },
  { icon: FileText, label: 'Service pricing', sub: 'Edit your cleaning service rates' },
  { icon: FileText, label: 'Payment instructions', sub: 'Shown on invoices and quotes' },
  { icon: Shield, label: 'Privacy', sub: 'Local-only storage, delete your data' },
  { icon: HelpCircle, label: 'Help', sub: 'How CleanBill works offline' },
];

/** CB-01 / CB-08: business details, currency, tax, numbering, service pricing, payment instructions, privacy/help. */
export default function SettingsScreen() {
  return (
    <ScrollView className="flex-1 bg-bg dark:bg-[#0B1220]" contentContainerClassName="p-4 pb-24">
      <Text className="mb-4 text-2xl font-bold text-ink dark:text-white">Settings</Text>
      <Card className="divide-y divide-border p-0 dark:divide-[#1F2A44]">
        {rows.map((row) => (
          <Pressable key={row.label} className="min-h-[48px] flex-row items-center px-4 py-3.5">
            <row.icon size={20} color="#0EA5A4" />
            <View className="ml-3 flex-1">
              <Text className="text-base text-ink dark:text-white">{row.label}</Text>
              <Text className="text-xs text-ink-muted">{row.sub}</Text>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </Pressable>
        ))}
      </Card>
      <Text className="mt-6 text-center text-xs text-ink-muted">
        CleanBill stores everything on this device only. Uninstalling the app or losing your phone
        will delete your records.
      </Text>
    </ScrollView>
  );
}
