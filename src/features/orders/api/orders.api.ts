import apiClient from "../../../shared/api/client";
import { API_ENDPOINTS } from "../../../shared/constants/api";
import { Order, CreateOrderRequest } from "../types/orders.types";

export const fetchOrders = async (signal?: AbortSignal): Promise<Order[]> => {
  const response = await apiClient.get<Order[]>(API_ENDPOINTS.ORDERS, {
    signal,
  });
  return response.data;
};

export const createOrder = async (
  orderData: CreateOrderRequest
): Promise<Order> => {
  const response = await apiClient.post<Order>(API_ENDPOINTS.ORDERS, orderData);
  return response.data;
};
