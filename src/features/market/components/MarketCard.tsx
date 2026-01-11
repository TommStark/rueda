import { StyleSheet, View, Image } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MarketAsset } from "../../../shared/types/api.types";

interface MarketCardProps {
  asset: MarketAsset;
}

export default function MarketCard({ asset }: MarketCardProps) {
  const priceChange =
    ((asset.last_price - asset.close_price) / asset.close_price) * 100;
  const isPositive = priceChange >= 0;

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <View style={styles.logoContainer}>
            {asset.logo ? (
              <Image source={{ uri: asset.logo }} style={styles.logo} />
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
              {asset.name}
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  logoContainer: {
    marginRight: 10,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 18,
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
  infoContainer: {
    flex: 1,
  },
  ticker: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  name: {
    color: "#666",
    fontSize: 12,
  },
  rightSection: {
    alignItems: "flex-end",
  },
  price: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  change: {
    fontWeight: "600",
    fontSize: 12,
  },
  positive: {
    color: "#4caf50",
  },
  negative: {
    color: "#f44336",
  },
});
