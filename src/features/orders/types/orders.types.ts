export type OrderSide = "BUY" | "SELL";
export type OrderType = "MARKET" | "LIMIT";
export type OrderStatus = "PENDING" | "REJECTED" | "FILLED";

export interface CreateOrderRequest {
  instrument_id: number;
  side: OrderSide;
  type: OrderType;
  quantity: number;
  price?: number;
}

export interface Order {
  id: string;
  instrument_id: number;
  side: OrderSide;
  type: OrderType;
  quantity: number;
  price?: number;
  status: OrderStatus;
}
