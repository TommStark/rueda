import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RecentActivity } from '../types/home.types';
import { styles } from '../styles/ActivityItem.styles';
import { colors } from '../../../shared/theme/colors';

interface ActivityItemProps {
  activity: RecentActivity;
}

export default function ActivityItem({ activity }: ActivityItemProps) {
  const isPositive = activity.amount > 0;

  const getIconBackgroundColor = () => {
    switch (activity.type) {
      case 'buy':
        return colors.activity.buy.background;
      case 'sell':
        return colors.activity.sell.background;
      case 'deposit':
        return colors.activity.deposit.background;
      case 'withdraw':
        return colors.activity.withdraw.background;
      default:
        return colors.background.secondary;
    }
  };

  const getIconColor = () => {
    switch (activity.type) {
      case 'buy':
        return colors.activity.buy.icon;
      case 'sell':
        return colors.activity.sell.icon;
      case 'deposit':
        return colors.activity.deposit.icon;
      case 'withdraw':
        return colors.activity.withdraw.icon;
      default:
        return colors.text.tertiary;
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: getIconBackgroundColor() },
        ]}
      >
        <MaterialCommunityIcons
          name={activity.icon as any}
          size={24}
          color={getIconColor()}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text variant="bodyMedium" style={styles.title}>
          {activity.title}
        </Text>
        <Text variant="bodySmall" style={styles.subtitle}>
          {activity.subtitle}
        </Text>
      </View>
      <Text
        variant="titleSmall"
        style={[styles.amount, isPositive ? styles.positive : styles.negative]}
      >
        {isPositive ? '+' : ''}${Math.abs(activity.amount).toFixed(2)}
      </Text>
    </View>
  );
}
