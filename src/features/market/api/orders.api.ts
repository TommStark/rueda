import apiClient from '../../../api/client';
import { API_ENDPOINTS } from '../../../api/constants/api';
import { OrderStatus } from '../../orders/types/history.types';

export interface CreateOrderRequest {
  instrument_id: number;
  side: 'BUY' | 'SELL';
  type: 'MARKET' | 'LIMIT';
  quantity: number;
  price?: number;
}

export interface CreateOrderResponse {
  id: string;
  status: OrderStatus;
}

export const createOrder = async (
  orderData: CreateOrderRequest,
  signal?: AbortSignal
): Promise<CreateOrderResponse> => {
  const response = await apiClient.post<CreateOrderResponse>(
    API_ENDPOINTS.ORDERS,
    orderData,
    { signal }
  );
  return response.data;
};
