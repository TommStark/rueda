import { useLocalSearchParams } from 'expo-router';
import { useOrderHistory } from '../context/OrderHistoryContext';
import OrderReceipt from '../components/OrderReceipt';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTranslation } from '../../../shared/hooks/useTranslation';

export default function OrderReceiptScreen() {
  const { orderId } = useLocalSearchParams<{ orderId?: string | string[] }>();
  const { orders, isLoading } = useOrderHistory();
  const { t } = useTranslation('common');

  const normalizedOrderId = Array.isArray(orderId) ? orderId[0] : orderId;
  const order = orders.find(o => String(o.id) === String(normalizedOrderId));

  if (!normalizedOrderId) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
        <View style={{ gap: 12 }}>
          <Text variant="titleMedium">
            {t('orderReceipt.screen.missingIdTitle')}
          </Text>
          <Text variant="bodyMedium">
            {t('orderReceipt.screen.missingIdSubtitle')}
          </Text>
          <Button mode="contained" onPress={() => router.back()}>
            {t('actions.back')}
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  if (isLoading || !order) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
        <View style={{ gap: 12 }}>
          <Text variant="titleMedium">
            {isLoading
              ? t('orderReceipt.screen.loading')
              : t('orderReceipt.screen.notFound')}
          </Text>
          {!isLoading ? (
            <Text variant="bodyMedium">
              {t('orderReceipt.screen.orderIdLabel', {
                orderId: String(normalizedOrderId),
              })}
            </Text>
          ) : null}
          <Button mode="contained" onPress={() => router.back()}>
            {t('actions.back')}
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return <OrderReceipt order={order} />;
}
