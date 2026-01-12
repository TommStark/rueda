import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MarketAsset } from "../types/market.types";
import {
  getTickerIcon,
  hasTickerIcon,
  getTickerColor,
} from "../../../shared/utils/icons";

interface MarketCardProps {
  asset: MarketAsset;
  onPress?: () => void;
}

export default function MarketCard({ asset, onPress }: MarketCardProps) {
  const priceChange =
    ((asset.last_price - asset.close_price) / asset.close_price) * 100;
  const isPositive = priceChange >= 0;

  const localIcon = getTickerIcon(asset.ticker);
  const hasLocalIcon = hasTickerIcon(asset.ticker);
  const tickerColor = getTickerColor(asset.ticker);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <View style={styles.logoContainer}>
            {hasLocalIcon && localIcon ? (
              <Image source={localIcon} style={styles.logo} />
            ) : asset.logo ? (
              <Image source={{ uri: asset.logo }} style={styles.logo} />
            ) : tickerColor ? (
              <View style={[styles.logo, { backgroundColor: tickerColor }]}>
                <Text style={styles.colorPlaceholderText}>
                  {asset.ticker.substring(0, 2).toUpperCase()}
                </Text>
              </View>
            ) : (
              <View style={[styles.logo, styles.placeholderLogo]}>
                <Text style={styles.placeholderText}>
                  {asset.ticker.substring(0, 2)}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text variant="titleMedium" style={styles.ticker}>
              {asset.ticker}
            </Text>
            <Text variant="bodySmall" style={styles.name} numberOfLines={1}>
              {asset.name.length > 16
                ? `${asset.name.substring(0, 16)}...`
                : asset.name}
            </Text>
          </View>
        </View>

        <View style={styles.rightSection}>
          <Text variant="titleMedium" style={styles.price}>
            $
            {asset.last_price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
          <View style={styles.changeContainer}>
            <MaterialCommunityIcons
              name={isPositive ? "trending-up" : "trending-down"}
              size={16}
              color={isPositive ? "#4caf50" : "#f44336"}
            />
            <Text
              variant="bodySmall"
              style={[
                styles.change,
                isPositive ? styles.positive : styles.negative,
              ]}
            >
              {isPositive ? "+" : ""}
              {priceChange.toFixed(2)}%
            </Text>
          </View>
        </View>
        <View style={styles.chevronContainer}>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  logoContainer: {
    marginRight: 12,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderLogo: {
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
  },
  colorPlaceholderText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -0.5,
  },
  infoContainer: {
    flex: 1,
  },
  ticker: {
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 3,
    letterSpacing: -0.3,
    color: "#1a1a1a",
  },
  name: {
    color: "#666",
    fontSize: 13,
    fontWeight: "500",
  },
  rightSection: {
    alignItems: "flex-end",
    marginRight: 8,
  },
  chevronContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 4,
    letterSpacing: -0.3,
    color: "#1a1a1a",
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
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
