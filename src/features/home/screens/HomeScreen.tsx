import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../shared/theme/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "../../../shared/hooks/useTranslation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import TopMoverCard from "../components/TopMoverCard";
import ActivityItem from "../components/ActivityItem";
import PromoBanner from "../components/PromoBanner";
import AppHeader from "../../../shared/components/AppHeader";
import {
  getTickerIcon,
  hasTickerIcon,
  getTickerColor,
} from "../../../shared/utils/icons";
import { usePortfolio } from "../../portfolio/hooks/usePortfolio";
import { useOrderHistory } from "../../history/context/OrderHistoryContext";
import { useMarket } from "../../market/hooks/useMarket";
import { RootStackParamList } from "../../../navigation/types";
import { styles } from "../styles/HomeScreen.styles";

export default function HomeScreen() {
  const { t } = useTranslation("home");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [hideBalance, setHideBalance] = React.useState(false);

  const { data: portfolioData, isLoading: portfolioLoading } = usePortfolio();
  const { orders } = useOrderHistory();
  const { data: instruments, isLoading: instrumentsLoading } = useMarket();

  const totalValue =
    portfolioData?.reduce(
      (sum, pos) => sum + pos.quantity * pos.last_price,
      0
    ) || 0;

  const totalCostValue =
    portfolioData?.reduce(
      (sum, pos) => sum + pos.quantity * pos.avg_cost_price,
      0
    ) || 0;

  const totalChange = totalValue - totalCostValue;
  const totalChangePercent =
    totalCostValue > 0 ? (totalChange / totalCostValue) * 100 : 0;
  const isPositiveChange = totalChange >= 0;

  const topGainers =
    instruments
      ?.map((inst) => {
        const tickerIcon = getTickerIcon(inst.ticker);
        const tickerColor = getTickerColor(inst.ticker);
        const hasIcon = hasTickerIcon(inst.ticker);

        return {
          ticker: inst.ticker,
          name: inst.name,
          price: inst.last_price,
          changePercentage:
            ((inst.last_price - inst.close_price) / inst.close_price) * 100,
          icon: "📈",
          tickerIcon,
          hasTickerIcon: hasIcon,
          color: { icon: tickerIcon, background: tickerColor || "#f0f0f0" },
        };
      })
      .sort((a, b) => b.changePercentage - a.changePercentage)
      .slice(0, 5) || [];

  const recentOrders = orders.slice(0, 4).map((order) => ({
    id: order.id,
    type: order.side.toLowerCase() as "buy" | "sell" | "deposit" | "withdraw",
    title: `${order.side} ${order.ticker}`,
    subtitle: `${order.quantity} shares`,
    amount: order.quantity * (order.price || order.executedPrice),
    date: new Date(order.timestamp).toLocaleDateString(),
    icon: order.side === "BUY" ? "arrow-up" : "arrow-down",
  }));

  const handleViewAllActivity = () => {
    navigation.navigate("History" as any);
  };

  if (portfolioLoading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <AppHeader screenName="Home" />
        <View style={styles.centerContainer}>
          <Text>{t("loading")}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <AppHeader screenName="Home" />
      <View style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <View style={styles.balanceLabelRow}>
            <Text variant="bodySmall" style={styles.balanceLabel}>
              {t("balance.label")}
            </Text>
            <View style={styles.availableBadge}>
              <Ionicons name="trending-up" size={12} color={colors.positive} />
              <Text style={styles.availableText}>
                {totalChangePercent.toFixed(1)}%
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setHideBalance(!hideBalance)}>
            <Ionicons
              name={hideBalance ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={colors.text.tertiary}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.balanceAmount}>
          {hideBalance
            ? "••••••"
            : `$${totalValue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
        </Text>
        <View style={styles.changeContainer}>
          <View style={styles.currencyBadge}>
            <Text style={styles.currencyText}>ARS</Text>
          </View>
          <View style={styles.changeRow}>
            <Ionicons
              name={isPositiveChange ? "trending-up" : "trending-down"}
              size={16}
              color={isPositiveChange ? colors.positive : colors.negative}
            />
            <Text
              style={[
                styles.changeText,
                isPositiveChange ? styles.positive : styles.negative,
              ]}
            >
              {hideBalance
                ? "•••"
                : `${isPositiveChange ? "+" : ""}$${Math.abs(
                    totalChange
                  ).toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                  })} (${
                    isPositiveChange ? "+" : ""
                  }${totalChangePercent.toFixed(1)}%)`}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PromoBanner />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              {t("topMovers.title")}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Market" as any)}
            >
              <Text variant="bodySmall" style={styles.seeAllButton}>
                {t("topMovers.seeAll")}
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.topMoversContainer}
          >
            {topGainers.map((mover) => (
              <TopMoverCard key={mover.ticker} mover={mover} />
            ))}
          </ScrollView>
        </View>

        {recentOrders.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                {t("recentActivity.title")}
              </Text>
              <TouchableOpacity onPress={handleViewAllActivity}>
                <Text variant="bodySmall" style={styles.seeAllButton}>
                  {t("recentActivity.viewHistory")}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.activityContainer}>
              {recentOrders.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
