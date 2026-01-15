import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { queryClient } from '../src/api/config/queryClient';
import { FavoritesProvider } from '../src/features/favorites/context/FavoritesContext';
import { OrderHistoryProvider } from '../src/features/orders/context/OrderHistoryContext';
import Toast from '../src/shared/components/Toast';
import { ToastProvider } from '../src/shared/context/ToastContext';
import '../src/config/i18n';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <FavoritesProvider>
          <OrderHistoryProvider>
            <SafeAreaProvider>
              <PaperProvider>
                <Stack
                  screenOptions={{
                    headerShown: false,
                  }}
                />
                <StatusBar style="dark" />
                <Toast />
              </PaperProvider>
            </SafeAreaProvider>
          </OrderHistoryProvider>
        </FavoritesProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
