import { NavigatorScreenParams } from "@react-navigation/native";
import { PortfolioPosition } from "../features/portfolio/types/portfolio.types";
import { MarketAsset } from "../features/market/types/market.types";
import { OrderHistoryItem } from "../features/history/types/history.types";

export type BottomTabParamList = {
  Home: undefined;
  Market: undefined;
  Favorites: undefined;
  Portfolio: undefined;
  History: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<BottomTabParamList> | undefined;
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
