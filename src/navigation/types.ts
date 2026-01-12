import { PortfolioPosition } from "../features/portfolio/types/portfolio.types";
import { MarketAsset } from "../features/market/types/market.types";
import { OrderHistoryItem } from "../features/history/types/history.types";

export type RootStackParamList = {
  MainTabs: undefined;
  AllAssets: {
    assets: PortfolioPosition[];
  };
  NewOrder: {
    asset: MarketAsset;
  };
  OrderReceipt: {
    order: OrderHistoryItem;
  };
};
