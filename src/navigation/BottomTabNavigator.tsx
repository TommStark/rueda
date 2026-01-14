import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { useTranslation } from "../shared/hooks/useTranslation";
import { colors } from "../shared/theme/colors";
import HomeScreen from "../features/home/screens/HomeScreen";
import MarketScreen from "../features/market/screens/MarketScreen";
import PortfolioScreen from "../features/portfolio/screens/PortfolioScreen";
import FavoritesScreen from "../features/favorites/screens/FavoritesScreen";
import HistoryScreen from "../features/history/screens/HistoryScreen";
import { BottomTabParamList } from "./types";
import { styles } from "./styles/BottomTabNavigator.styles";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const { t } = useTranslation("navigation");

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
          title: t("tabs.home"),
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
          title: t("tabs.market"),
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
          title: t("tabs.favorites"),
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
          title: t("tabs.portfolio"),
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
          title: t("tabs.history"),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
