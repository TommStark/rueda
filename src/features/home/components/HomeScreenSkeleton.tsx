import { View } from 'react-native';
import Skeleton from '../../../shared/components/Skeleton';
import { styles } from '../styles/HomeScreenSkeleton.styles';

export default function HomeScreenSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <Skeleton width={100} height={12} />
          <Skeleton width={20} height={20} borderRadius={10} />
        </View>
        <Skeleton width={200} height={40} style={{ marginVertical: 8 }} />
        <View style={styles.changeRow}>
          <Skeleton width={60} height={20} borderRadius={10} />
          <Skeleton width={120} height={20} />
        </View>
      </View>

      <View style={styles.bannersContainer}>
        <Skeleton
          width={280}
          height={72}
          borderRadius={16}
          style={{ marginRight: 12 }}
        />
        <Skeleton
          width={280}
          height={72}
          borderRadius={16}
          style={{ marginRight: 12 }}
        />
        <Skeleton width={280} height={72} borderRadius={16} />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Skeleton width={120} height={20} />
          <Skeleton width={60} height={16} />
        </View>
        <View style={styles.topMoversRow}>
          {[1, 2, 3, 4, 5].map(i => (
            <View key={i} style={styles.topMoverCard}>
              <Skeleton width={48} height={48} borderRadius={24} />
              <Skeleton width={60} height={16} style={{ marginTop: 8 }} />
              <Skeleton width={80} height={12} style={{ marginTop: 4 }} />
              <Skeleton width={70} height={18} style={{ marginTop: 6 }} />
              <Skeleton width={50} height={14} style={{ marginTop: 4 }} />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Skeleton width={140} height={20} />
          <Skeleton width={80} height={16} />
        </View>
        <View style={styles.activityContainer}>
          {[1, 2, 3, 4].map(i => (
            <View key={i} style={styles.activityItem}>
              <View style={styles.activityLeft}>
                <Skeleton width={40} height={40} borderRadius={20} />
                <View style={styles.activityInfo}>
                  <Skeleton width={100} height={16} />
                  <Skeleton width={80} height={12} style={{ marginTop: 4 }} />
                </View>
              </View>
              <View style={styles.activityRight}>
                <Skeleton width={80} height={16} />
                <Skeleton width={60} height={12} style={{ marginTop: 4 }} />
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
