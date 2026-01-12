import { View, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { usePortfolio, usePortfolioError } from "../hooks/usePortfolio";
import AssetCard from "../components/AssetCard";
import AssetCardSkeleton from "../components/AssetCardSkeleton";
import PortfolioBalanceSkeleton from "../components/PortfolioBalanceSkeleton";
import ActionButton from "../components/ActionButton";
import AppHeader from "../../../shared/components/AppHeader";
import { PortfolioPosition } from "../types/portfolio.types";
import { RootStackParamList } from "../../../navigation/types";
import { styles } from "../styles/PortfolioScreen.styles";

export default function PortfolioScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data, isLoading, error, refetch, isRefetching } = usePortfolio();
  const apiError = usePortfolioError(error);

  const totalValue = data?.reduce(
    (sum, pos) => sum + pos.quantity * pos.last_price,
    0
  );

  const totalYesterdayValue = data?.reduce(
    (sum, pos) => sum + pos.quantity * pos.close_price,
    0
  );

  const totalChange = (totalValue || 0) - (totalYesterdayValue || 0);
  const totalChangePercent =
    totalYesterdayValue && totalYesterdayValue > 0
      ? (totalChange / totalYesterdayValue) * 100
      : 0;
  const isPositive = totalChange >= 0;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppHeader screenName="Portfolio" />
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <PortfolioBalanceSkeleton />
          <View style={styles.assetsHeader}>
            <View
              style={{
                width: 120,
                height: 20,
                backgroundColor: "#f0f0f0",
                borderRadius: 4,
              }}
            />
          </View>
          <View style={styles.assetsList}>
            {Array.from({ length: 3 }).map((_, index) => (
              <AssetCardSkeleton key={index} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (error && !data) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle" size={48} color="#f44336" />
          <Text variant="headlineSmall" style={styles.errorTitle}>
            Error
          </Text>
          <Text variant="bodyMedium" style={styles.errorMessage}>
            {apiError?.message || "Error loading portfolio"}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!data || data.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Ionicons name="briefcase-outline" size={48} color="#6200ee" />
          <Text variant="headlineMedium">Empty Portfolio</Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            You don't have any positions
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const groupedData = data.reduce((acc, position) => {
    const existing = acc.find((p) => p.ticker === position.ticker);
    if (existing) {
      existing.quantity += position.quantity;
    } else {
      acc.push({ ...position });
    }
    return acc;
  }, [] as PortfolioPosition[]);

  const displayedAssets = groupedData.slice(0, 3);
  const hasMoreAssets = groupedData.length > 3;

  const handleSeeAll = () => {
    navigation.navigate("AllAssets", { assets: groupedData });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <AppHeader screenName="Portfolio" />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 0 }}
      >
        <View style={styles.balanceCard}>
          <Text variant="bodySmall" style={styles.balanceLabel}>
            TOTAL BALANCE
          </Text>
          <Text style={styles.balanceAmount}>
            $
            {totalValue?.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
          <View style={styles.changeContainer}>
            <View style={styles.currencyBadge}>
              <Text style={styles.currencyText}>ARS</Text>
            </View>
            <View style={styles.changeRow}>
              <Ionicons
                name={isPositive ? "trending-up" : "trending-down"}
                size={16}
                color="#4caf50"
              />
              <Text style={[styles.changeText, styles.positive]}>
                {isPositive ? "+" : ""}$
                {Math.abs(totalChange).toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                })}{" "}
                ({isPositive ? "+" : ""}
                {totalChangePercent.toFixed(2)}%)
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <ActionButton icon="add" label="Buy" variant="primary" />
          <ActionButton icon="arrow-down" label="Deposit" />
          <ActionButton icon="arrow-up" label="Withdraw" />
          <ActionButton icon="ellipsis-horizontal" label="More" />
        </View>

        <View style={styles.assetsHeader}>
          <Text variant="titleLarge" style={styles.assetsTitle}>
            Your Assets
          </Text>
          {hasMoreAssets && (
            <Text style={styles.seeAllText} onPress={handleSeeAll}>
              See all
            </Text>
          )}
        </View>

        <View style={styles.assetsList}>
          {displayedAssets.map((position, index) => (
            <AssetCard
              key={`${position.ticker}-${index}`}
              position={position}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
