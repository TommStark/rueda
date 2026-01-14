import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PortfolioScreen from '../screens/PortfolioScreen';
import AllAssetsScreen from '../screens/AllAssetsScreen';
import { PortfolioPosition } from '../types/portfolio.types';

export type PortfolioStackParamList = {
  PortfolioMain: undefined;
  AllAssets: {
    assets: PortfolioPosition[];
  };
};

const Stack = createNativeStackNavigator<PortfolioStackParamList>();

export default function PortfolioStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="PortfolioMain" component={PortfolioScreen} />
      <Stack.Screen name="AllAssets" component={AllAssetsScreen} />
    </Stack.Navigator>
  );
}
