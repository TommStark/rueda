import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MarketAsset } from "../../market/types/market.types";
import {
  getTickerIcon,
  hasTickerIcon,
  getTickerColor,
} from "../../../shared/utils/icons";
import { useFavorites } from "../../../shared/context/FavoritesContext";
import MiniTrendChart from "./MiniTrendChart";

interface FavoriteAssetRowProps {
  asset: MarketAsset;
  onPress: () => void;
}

export default function FavoriteAssetRow({
  asset,
  onPress,
}: FavoriteAssetRowProps) {
  const { toggleFavorite } = useFavorites();
  const tickerIcon = getTickerIcon(asset.ticker);
  const hasIcon = hasTickerIcon(asset.ticker);
  const tickerColor = getTickerColor(asset.ticker);

  const priceChange =
    ((asset.last_price - asset.close_price) / asset.close_price) * 100;
  const isPositive = priceChange >= 0;

  const handleStarPress = (e: any) => {
    e.stopPropagation();
    toggleFavorite(asset.ticker);
  };

  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.assetSection}>
        <View style={styles.logoContainer}>
          {hasIcon && tickerIcon ? (
            <Image source={tickerIcon} style={styles.logo} />
          ) : tickerColor ? (
            <View style={[styles.logo, { backgroundColor: tickerColor }]}>
              <Text style={styles.logoText}>
                {asset.ticker.substring(0, 2).toUpperCase()}
              </Text>
            </View>
          ) : (
            <View style={[styles.logo, styles.placeholderLogo]}>
              <Text style={styles.logoTextPlaceholder}>
                {asset.ticker.substring(0, 2)}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.assetInfo}>
          <Text style={styles.ticker}>{asset.ticker}</Text>
          <Text style={styles.assetName} numberOfLines={1}>
            {asset.name}
          </Text>
        </View>
      </View>

      <View style={styles.trendSection}>
        <MiniTrendChart isPositive={isPositive} />
        <Text
          style={[
            styles.changeText,
            isPositive ? styles.changePositive : styles.changeNegative,
          ]}
        >
          {isPositive ? "+" : ""}
          {priceChange.toFixed(1)}%
        </Text>
      </View>

      <View style={styles.priceSection}>
        <Text style={styles.price}>
          $
          {asset.last_price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
      </View>
      <View style={styles.starSection}>
        <TouchableOpacity onPress={handleStarPress} style={styles.starButton}>
          <MaterialCommunityIcons name="star" size={20} color="#FF9500" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
    backgroundColor: "#fff",
  },
  assetSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
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
  },
  logoText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -0.5,
  },
  logoTextPlaceholder: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
  },
  assetInfo: {
    flex: 1,
  },
  ticker: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 2,
    letterSpacing: -0.3,
  },
  assetName: {
    fontSize: 12,
    color: "#999",
    fontWeight: "500",
  },
  trendSection: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  changeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  changePositive: {
    color: "#4caf50",
  },
  changeNegative: {
    color: "#f44336",
  },
  priceSection: {
    width: 100,
    alignItems: "flex-end",
    gap: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1a1a1a",
    letterSpacing: -0.3,
  },
  starButton: {
    padding: 2,
  },
  starSection: {
    marginLeft: 8,
    alignItems: "center",
  },
});
