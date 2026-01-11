export type AssetType = "ALL" | "STOCK" | "CRYPTO" | "GAINER";

export interface MarketAsset {
  id: number;
  ticker: string;
  name: string;
  logo: string;
  last_price: number;
  close_price: number;
  price_change_percentage: number;
  type: AssetType;
}

export interface Instrument {
  id: number;
  ticker: string;
  name: string;
  last_price: number;
  close_price: number;
}

export interface PortfolioPosition {
  ticker: string;
  quantity: number;
  avg_cost_price: number;
  last_price: number;
}

export interface SearchResult {
  id: number;
  ticker: string;
  name: string;
}

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
