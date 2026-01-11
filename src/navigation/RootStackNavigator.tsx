import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import AllAssetsScreen from "../features/portfolio/screens/AllAssetsScreen";
import NewOrderScreen from "../features/market/screens/NewOrderScreen";
import { PortfolioPosition } from "../features/portfolio/types/portfolio.types";
import { MarketAsset } from "../features/market/types/market.types";

export type RootStackParamList = {
  MainTabs: undefined;
  AllAssets: {
    assets: PortfolioPosition[];
  };
  NewOrder: {
    asset: MarketAsset;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="AllAssets" component={AllAssetsScreen} />
      <Stack.Screen name="NewOrder" component={NewOrderScreen} />
    </Stack.Navigator>
  );
}
