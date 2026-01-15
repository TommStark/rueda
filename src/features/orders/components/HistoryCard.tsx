import { View, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';
import { OrderHistoryItem } from '../types/history.types';
import { getTickerIcon, hasTickerIcon } from '../../../shared/utils/icons';
import { useTranslation } from '../../../shared/hooks/useTranslation';
import { styles } from '../styles/HistoryCard.styles';

interface HistoryCardProps {
  order: OrderHistoryItem;
  onPress: () => void;
}

export default function HistoryCard({ order, onPress }: HistoryCardProps) {
  const { t } = useTranslation('common');

  const capitalize = (value: string) =>
    value.length > 0 ? value[0].toUpperCase() + value.slice(1) : value;

  const sideLabel = capitalize(
    order.side === 'BUY'
      ? t('orderReceipt.values.side.buy')
      : t('orderReceipt.values.side.sell')
  );

  const typeLabel = capitalize(
    order.type === 'MARKET'
      ? t('orderReceipt.values.type.market')
      : t('orderReceipt.values.type.limit')
  );
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'FILLED':
        return colors.status.success;
      case 'REJECTED':
        return colors.status.error;
      case 'PENDING':
        return colors.status.warning;
      default:
        return colors.text.tertiary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'FILLED':
        return 'check-circle';
      case 'REJECTED':
        return 'close-circle';
      case 'PENDING':
        return 'clock-outline';
      default:
        return 'help-circle';
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const getOrderTypeLabel = () => {
    return `${sideLabel} ${typeLabel}`;
  };

  const getQuantityLabel = () => {
    if (order.ticker.includes('/')) {
      return `${order.quantity} ${order.ticker.split('/')[0]}`;
    }
    return `${order.quantity} ${t('orderReceipt.details.shares')}`;
  };

  const localIcon = getTickerIcon(order.ticker);
  const hasLocalIcon = hasTickerIcon(order.ticker);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.logoWrapper}>
        <View style={styles.logoContainer}>
          {hasLocalIcon && localIcon ? (
            <Image source={localIcon} style={styles.logo} />
          ) : (
            <View style={[styles.logo, styles.placeholderLogo]}>
              <Text style={styles.placeholderText}>
                {order.ticker.substring(0, 2)}
              </Text>
            </View>
          )}
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(order.status) },
          ]}
        >
          <MaterialCommunityIcons
            name={getStatusIcon(order.status)}
            size={14}
            color={colors.text.inverse}
          />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.leftSection}>
            <Text variant="titleMedium" style={styles.ticker}>
              {order.ticker}
            </Text>
            <Text variant="bodySmall" style={styles.orderType}>
              {getOrderTypeLabel()}
            </Text>
            <Text variant="bodySmall" style={styles.date}>
              {formatTime(order.timestamp)}
            </Text>
          </View>

          <View style={styles.rightSection}>
            <Text variant="titleMedium" style={styles.quantity}>
              {getQuantityLabel()}
            </Text>
          </View>
        </View>
      </View>

      <MaterialCommunityIcons
        name="chevron-right"
        size={20}
        color={colors.border.dark}
        style={styles.arrow}
      />
    </TouchableOpacity>
  );
}
