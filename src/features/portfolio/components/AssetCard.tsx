import { StyleSheet, View, Image } from "react-native";
import { Text } from "react-native-paper";
import { PortfolioPosition } from "../types/portfolio.types";
import {
  getTickerIcon,
  hasTickerIcon,
  getTickerColor,
} from "../../../shared/utils/icons";

interface AssetCardProps {
  position: PortfolioPosition;
}

const getAssetIcon = (ticker: string): string => {
  const iconMap: Record<string, string> = {
    AAPL: "🍎",
    BTC: "₿",
    MELI: "💛",
    KO: "🥤",
    TSLA: "🚗",
    NVDA: "💚",
    MSFT: "🪟",
    GOOGL: "🔍",
    AMZN: "📦",
  };
  return iconMap[ticker] || "📊";
};

export default function AssetCard({ position }: AssetCardProps) {
  const currentValue = position.quantity * position.last_price;
  const priceChange = position.last_price - position.close_price;
  const priceChangePercent = (priceChange / position.close_price) * 100;
  const isPositive = priceChange >= 0;

  const tickerIcon = getTickerIcon(position.ticker);
  const hasIcon = hasTickerIcon(position.ticker);
  const tickerColor = getTickerColor(position.ticker);

  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <View
          style={[
            styles.iconContainer,
            tickerColor && { backgroundColor: tickerColor },
          ]}
        >
          {hasIcon && tickerIcon ? (
            <Image source={tickerIcon} style={styles.iconImage} />
          ) : tickerColor ? (
            <Text style={styles.colorPlaceholder}>
              {position.ticker.substring(0, 2).toUpperCase()}
            </Text>
          ) : (
            <Text style={styles.icon}>{getAssetIcon(position.ticker)}</Text>
          )}
        </View>
        <View style={styles.info}>
          <Text variant="titleMedium" style={styles.ticker}>
            {position.ticker}
          </Text>
          <Text variant="bodySmall" style={styles.quantity}>
            {position.quantity} shares
          </Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text variant="titleMedium" style={styles.value}>
          ${currentValue.toLocaleString("en-US", { minimumFractionDigits: 0 })}
        </Text>
        <Text
          variant="bodySmall"
          style={[
            styles.change,
            isPositive ? styles.positive : styles.negative,
          ]}
        >
          {isPositive ? "+" : ""}$
          {Math.abs(priceChange * position.quantity).toLocaleString("en-US", {
            minimumFractionDigits: 0,
          })}{" "}
          ({isPositive ? "+" : ""}
          {priceChangePercent.toFixed(1)}%)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 24,
  },
  iconImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  colorPlaceholder: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -0.5,
  },
  info: {
    gap: 4,
  },
  ticker: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1a1a1a",
    letterSpacing: -0.3,
  },
  quantity: {
    fontSize: 13,
    color: "#999",
    fontWeight: "500",
  },
  rightSection: {
    alignItems: "flex-end",
    gap: 4,
  },
  value: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1a1a1a",
    letterSpacing: -0.3,
  },
  change: {
    fontWeight: "700",
    fontSize: 13,
  },
  positive: {
    color: "#4caf50",
  },
  negative: {
    color: "#f44336",
  },
});
