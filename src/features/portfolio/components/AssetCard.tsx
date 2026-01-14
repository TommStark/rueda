import { View, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { PortfolioPosition } from '../types/portfolio.types';
import { getTickerIcon, hasTickerIcon } from '../../../shared/utils/icons';
import {
  calcMarketValue,
  calcGain,
  calcTotalReturnPct,
} from '../../../shared/utils/financialCalculations';
import { styles } from '../styles/AssetCard.styles';

interface AssetCardProps {
  position: PortfolioPosition;
}

const getAssetIcon = (ticker: string): string => {
  const iconMap: Record<string, string> = {
    AAPL: '🍎',
    BTC: '₿',
    MELI: '💛',
    KO: '🥤',
    TSLA: '🚗',
    NVDA: '💚',
    MSFT: '🪟',
    GOOGL: '🔍',
    AMZN: '📦',
  };
  return iconMap[ticker] || '📊';
};

export default function AssetCard({ position }: AssetCardProps) {
  const currentValue = calcMarketValue(position.quantity, position.last_price);
  const totalGain = calcGain(
    position.quantity,
    position.last_price,
    position.avg_cost_price
  );
  const totalReturn = calcTotalReturnPct(
    position.quantity,
    position.last_price,
    position.avg_cost_price
  );
  const isPositive = totalGain >= 0;

  const tickerIcon = getTickerIcon(position.ticker);
  const hasIcon = hasTickerIcon(position.ticker);

  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          {hasIcon && tickerIcon ? (
            <Image source={tickerIcon} style={styles.iconImage} />
          ) : (
            <Text style={styles.icon}>{getAssetIcon(position.ticker)}</Text>
          )}
        </View>
        <View style={styles.info}>
          <Text variant="titleMedium" style={styles.ticker}>
            {position.ticker}
          </Text>
          <Text variant="bodySmall" style={styles.quantity}>
            {position.quantity.toFixed(2)} shares
          </Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.value}>
          $
          {currentValue.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </Text>
        <Text
          style={[
            styles.change,
            isPositive ? styles.positive : styles.negative,
          ]}
        >
          {isPositive ? '+' : ''}$
          {Math.abs(totalGain).toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}{' '}
          ({isPositive ? '+' : ''}
          {totalReturn.toFixed(1)}%)
        </Text>
      </View>
    </View>
  );
}
