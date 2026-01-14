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

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setOrders(parsed);
      }
    } catch {
      // Silently fail - order history is not critical for app functionality
    } finally {
      setIsLoading(false);
    }
  };

  const addOrder = useCallback(async (order: OrderHistoryItem) => {
    setOrders(prev => {
      const updated = [order, ...prev];
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated)).catch(() => {
        // Silently ignore storage errors - order is still added to state
      });
      return updated;
    });
  }, []);

  const clearHistory = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setOrders([]);
    } catch {
      // Silently fail - clearing is not critical
    }
  }, []);

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
