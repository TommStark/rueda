export type AssetType = "ALL" | "STOCK" | "CRYPTO" | "GAINER";

export const ASSET_TYPE = {
  ALL: "ALL" as AssetType,
  STOCK: "STOCK" as AssetType,
  CRYPTO: "CRYPTO" as AssetType,
  GAINER: "GAINER" as AssetType,
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
