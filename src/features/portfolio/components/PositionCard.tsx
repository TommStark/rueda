import { View } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { PortfolioPosition } from '../types/portfolio.types';
import { useTranslation } from '../../../shared/hooks/useTranslation';
import {
  calcMarketValue,
  calcCostBasis,
} from '../../../shared/utils/financialCalculations';
import { styles } from '../styles/PositionCard.styles';

interface PositionCardProps {
  position: PortfolioPosition;
}

export default function PositionCard({ position }: PositionCardProps) {
  const { t } = useTranslation('portfolio');
  const currentValue = calcMarketValue(position.quantity, position.last_price);
  const costBasis = calcCostBasis(position.quantity, position.avg_cost_price);
  const profitLoss = currentValue - costBasis;
  const profitLossPercent = costBasis > 0 ? (profitLoss / costBasis) * 100 : 0;
  const isPositive = profitLoss >= 0;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.ticker}>
            {position.ticker}
          </Text>
          <Text variant="titleMedium" style={styles.value}>
            ${currentValue.toFixed(2)}
          </Text>
        </View>
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Text variant="bodySmall" style={styles.label}>
              {t('positionCard.labels.quantity')}:
            </Text>
            <Text variant="bodySmall">{position.quantity}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text variant="bodySmall" style={styles.label}>
              {t('positionCard.labels.avgPrice')}:
            </Text>
            <Text variant="bodySmall">
              ${position.avg_cost_price.toFixed(2)}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text variant="bodySmall" style={styles.label}>
              {t('positionCard.labels.currentPrice')}:
            </Text>
            <Text variant="bodySmall">${position.last_price.toFixed(2)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text variant="bodySmall" style={styles.label}>
              {t('positionCard.labels.pnl')}:
            </Text>
            <Text
              variant="bodySmall"
              style={[
                styles.profitLoss,
                isPositive ? styles.positive : styles.negative,
              ]}
            >
              {isPositive ? '+' : ''}${profitLoss.toFixed(2)} (
              {isPositive ? '+' : ''}
              {profitLossPercent.toFixed(2)}%)
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}
