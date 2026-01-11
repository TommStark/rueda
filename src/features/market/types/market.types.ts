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
