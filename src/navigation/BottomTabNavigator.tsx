import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { colors } from "../shared/theme/colors";
import HomeScreen from "../features/home/screens/HomeScreen";
import MarketScreen from "../features/market/screens/MarketScreen";
import PortfolioScreen from "../features/portfolio/screens/PortfolioScreen";
import FavoritesScreen from "../features/favorites/screens/FavoritesScreen";
import HistoryScreen from "../features/history/screens/HistoryScreen";
import { BottomTabParamList } from "./types";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.tertiary,
        headerShown: false,
        tabBarStyle: {
          height: 73,
          paddingBottom: 30,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Inicio",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={MarketScreen}
        options={{
          title: "Market",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="chart-line-variant"
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: "Favoritos",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.centralButtonContainer}>
              <View style={styles.centralButtonOuter}>
                <View style={styles.centralButton}>
                  <MaterialCommunityIcons
                    name="star"
                    size={28}
                    color={colors.text.inverse}
                  />
                </View>
              </View>
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          title: "Portfolio",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="briefcase-outline"
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: "Historial",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  centralButtonContainer: {
    position: "absolute",
    bottom: -10,
    alignItems: "center",
    justifyContent: "center",
  },
  centralButtonOuter: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(98, 0, 238, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  centralButton: {
    width: 48,
    height: 48,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
