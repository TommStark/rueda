import { View } from 'react-native';
import Skeleton from '../../../shared/components/Skeleton';
import { styles } from '../styles/MarketCardSkeleton.styles';

export default function MarketCardSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Skeleton width={40} height={40} borderRadius={20} />
          <View style={styles.infoContainer}>
            <Skeleton width={60} height={18} style={{ marginBottom: 6 }} />
            <Skeleton width={120} height={14} />
          </View>
        </View>
        <View style={styles.rightSection}>
          <Skeleton width={80} height={18} style={{ marginBottom: 6 }} />
          <Skeleton width={60} height={14} />
        </View>
      </View>
    </View>
  );
}
