import { View, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';
import { MarketAsset } from '../../market/types/market.types';
import { getTickerIcon, hasTickerIcon } from '../../../shared/utils/icons';
import { calcInstrumentReturn } from '../../../shared/utils/financialCalculations';
import { styles } from '../styles/FavoriteItemCompact.styles';

interface FavoriteItemCompactProps {
  asset: MarketAsset;
  onPress: () => void;
}

export default function FavoriteItemCompact({
  asset,
  onPress,
}: FavoriteItemCompactProps) {
  const tickerIcon = getTickerIcon(asset.ticker);
  const hasIcon = hasTickerIcon(asset.ticker);

  const priceChange = calcInstrumentReturn(asset.last_price, asset.close_price);
  const isPositive = priceChange >= 0;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          {hasIcon && tickerIcon ? (
            <Image source={tickerIcon} style={styles.icon} />
          ) : (
            <View style={[styles.icon, styles.placeholderIcon]}>
              <Text style={styles.placeholderText}>
                {asset.ticker.substring(0, 2)}
              </Text>
            </View>
          )}
        </View>
        <Text variant="bodyMedium" style={styles.ticker}>
          {asset.ticker}
        </Text>
      </View>
      <View style={styles.rightSection}>
        <Text variant="bodyMedium" style={styles.price}>
          $
          {asset.last_price.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
        <View style={styles.changeContainer}>
          <MaterialCommunityIcons
            name={isPositive ? 'trending-up' : 'trending-down'}
            size={14}
            color={isPositive ? colors.positive : colors.negative}
          />
          <Text
            variant="bodySmall"
            style={[
              styles.change,
              isPositive ? styles.positive : styles.negative,
            ]}
          >
            {isPositive ? '+' : ''}
            {priceChange.toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
