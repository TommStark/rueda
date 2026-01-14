import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import AllAssetsScreen from '../features/portfolio/screens/AllAssetsScreen';
import NewOrderScreen from '../features/market/screens/NewOrderScreen';
import OrderReceiptScreen from '../features/orders/screens/OrderReceiptScreen';
import { RootStackParamList } from './types';

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
      <Stack.Screen name="OrderReceipt" component={OrderReceiptScreen} />
    </Stack.Navigator>
  );
}
