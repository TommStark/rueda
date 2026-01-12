import { View, TouchableOpacity, Image } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../shared/theme/colors";
import { MarketAsset } from "../../market/types/market.types";
import {
  getTickerIcon,
  hasTickerIcon,
  getTickerColor,
} from "../../../shared/utils/icons";
import { useFavorites } from "../../../shared/context/FavoritesContext";
import MiniTrendChart from "./MiniTrendChart";
import { styles } from "../styles/FavoriteAssetRow.styles";

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
          <MaterialCommunityIcons
            name="star"
            size={20}
            color={colors.favorite}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
