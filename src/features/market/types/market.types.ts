export type AssetType = "ACCIONES" | "MONEDA";
export type SortType = "ALL" | "GAINERS" | "LOSERS" | "A-Z" | "PRICE";

export const SORT_TYPE = {
  ALL: "ALL" as SortType,
  GAINERS: "GAINERS" as SortType,
  LOSERS: "LOSERS" as SortType,
  A_Z: "A-Z" as SortType,
  PRICE: "PRICE" as SortType,
};

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
