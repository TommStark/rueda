import { useLocalSearchParams } from 'expo-router';
import { useOrderHistory } from '../context/OrderHistoryContext';
import OrderReceipt from '../components/OrderReceipt';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function OrderReceiptScreen() {
  const { orderId } = useLocalSearchParams<{ orderId?: string | string[] }>();
  const { orders, isLoading } = useOrderHistory();

  const normalizedOrderId = Array.isArray(orderId) ? orderId[0] : orderId;
  const order = orders.find(o => String(o.id) === String(normalizedOrderId));

  if (!normalizedOrderId) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
        <View style={{ gap: 12 }}>
          <Text variant="titleMedium">No se pudo cargar el recibo</Text>
          <Text variant="bodyMedium">Falta el identificador de la orden.</Text>
          <Button mode="contained" onPress={() => router.back()}>
            Volver
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
            {isLoading ? 'Cargando recibo…' : 'Orden no encontrada'}
          </Text>
          {!isLoading ? (
            <Text variant="bodyMedium">Order ID: {normalizedOrderId}</Text>
          ) : null}
          <Button mode="contained" onPress={() => router.back()}>
            Volver
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return <OrderReceipt order={order} />;
}
