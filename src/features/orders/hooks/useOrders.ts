import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchOrders, createOrder } from "../api/orders.api";
import { normalizeApiError } from "../../../shared/utils/errors";
import { CreateOrderRequest } from "../../../shared/types/api.types";

export const ORDERS_QUERY_KEY = ["orders"] as const;

export const useOrders = () => {
  return useQuery({
    queryKey: ORDERS_QUERY_KEY,
    queryFn: ({ signal }) => fetchOrders(signal),
    select: (data) => data,
    meta: {
      errorMessage: "Error al cargar órdenes",
    },
    throwOnError: false,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData: CreateOrderRequest) => createOrder(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
    },
    meta: {
      errorMessage: "Error al crear orden",
    },
  });
};

export const useOrdersError = (error: unknown) => {
  if (!error) return null;
  return normalizeApiError(error);
};
