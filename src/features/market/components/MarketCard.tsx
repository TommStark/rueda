import { View, TouchableOpacity, Image } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../shared/theme/colors";
import { MarketAsset } from "../types/market.types";
import {
  getTickerIcon,
  hasTickerIcon,
  getTickerColor,
} from "../../../shared/utils/icons";
import { styles } from "../styles/MarketCard.styles";

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
              color={isPositive ? colors.positive : colors.negative}
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
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.border.dark}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
