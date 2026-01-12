import { View, Image } from "react-native";
import { Text } from "react-native-paper";
import { PortfolioPosition } from "../types/portfolio.types";
import {
  getTickerIcon,
  hasTickerIcon,
  getTickerColor,
} from "../../../shared/utils/icons";
import { styles } from "../styles/AssetCard.styles";

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
