export type OrderSide = 'BUY' | 'SELL';
export type OrderType = 'MARKET' | 'LIMIT';
export type OrderStatus = 'FILLED' | 'REJECTED' | 'PENDING';

export interface OrderHistoryItem {
  id: string;
  ticker: string;
  instrumentId: number;
  side: OrderSide;
  type: OrderType;
  quantity: number;
  price?: number;
  executedPrice: number;
  timestamp: number;
  status: OrderStatus;
  assetName?: string;
}
