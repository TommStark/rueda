import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import InstrumentsScreen from "../features/instruments/screens/InstrumentsScreen";
import PortfolioScreen from "../features/portfolio/screens/PortfolioScreen";
import SearchScreen from "../features/search/screens/SearchScreen";
import OrdersScreen from "../features/orders/screens/OrdersScreen";

export type BottomTabParamList = {
  Instruments: undefined;
  Portfolio: undefined;
  Search: undefined;
  Orders: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#6200ee",
        tabBarInactiveTintColor: "#666",
        headerShown: true,
        headerStyle: {
          backgroundColor: "#6200ee",
        },
        headerTintColor: "#fff",
      }}
    >
      <Tab.Screen
        name="Instruments"
        component={InstrumentsScreen}
        options={{
          title: "Instrumentos",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="chart-line"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          title: "Portfolio",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="briefcase"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: "Buscar",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          title: "Órdenes",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="file-document"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
