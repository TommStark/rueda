import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OrderHistoryItem } from '../types/history.types';
import { useToast } from '../../../shared/context/ToastContext';
import { useTranslation } from '../../../shared/hooks/useTranslation';

const STORAGE_KEY = '@rueda:order_history';

interface OrderHistoryContextValue {
  orders: OrderHistoryItem[];
  addOrder: (order: OrderHistoryItem) => Promise<void>;
  clearHistory: () => Promise<void>;
  isLoading: boolean;
}

const OrderHistoryContext = createContext<OrderHistoryContextValue | undefined>(
  undefined
);

interface OrderHistoryProviderProps {
  children: ReactNode;
}

export function OrderHistoryProvider({ children }: OrderHistoryProviderProps) {
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();
  const { t } = useTranslation('common');

  const loadOrders = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setOrders(parsed);
      }
    } catch {
      showToast(t('toast.storageLoadFailed'), 'error');
      await AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, [showToast, t]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const addOrder = useCallback(
    async (order: OrderHistoryItem) => {
      setOrders(prev => {
        const updated = [order, ...prev];
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated)).catch(() => {
          showToast(t('toast.storageSaveFailed'), 'error');
        });
        return updated;
      });
    },
    [showToast, t]
  );

  const clearHistory = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setOrders([]);
    } catch {
      showToast(t('toast.storageClearFailed'), 'error');
    }
  }, [showToast, t]);

  return (
    <OrderHistoryContext.Provider
      value={{ orders, addOrder, clearHistory, isLoading }}
    >
      {children}
    </OrderHistoryContext.Provider>
  );
}

export function useOrderHistory() {
  const context = useContext(OrderHistoryContext);
  if (!context) {
    throw new Error('useOrderHistory must be used within OrderHistoryProvider');
  }
  return context;
}
