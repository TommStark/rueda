import { View } from 'react-native';
import { colors } from '../../../shared/theme/colors';
import { styles } from '../styles/HomeScreenSkeleton.styles';

function SkeletonBox({
  width,
  height,
  style,
}: {
  width: number | string;
  height: number;
  style?: any;
}) {
  return (
    <View
      style={[
        {
          width,
          height,
          backgroundColor: colors.border.light,
          borderRadius: 4,
        },
        style,
      ]}
    />
  );
}

export default function HomeScreenSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <SkeletonBox width={100} height={12} />
          <SkeletonBox width={20} height={20} style={{ borderRadius: 10 }} />
        </View>
        <SkeletonBox width={200} height={40} style={{ marginVertical: 8 }} />
        <View style={styles.changeRow}>
          <SkeletonBox width={60} height={20} style={{ borderRadius: 10 }} />
          <SkeletonBox width={120} height={20} />
        </View>
      </View>

      <View style={styles.bannersContainer}>
        <SkeletonBox
          width={280}
          height={72}
          style={{ borderRadius: 16, marginRight: 12 }}
        />
        <SkeletonBox
          width={280}
          height={72}
          style={{ borderRadius: 16, marginRight: 12 }}
        />
        <SkeletonBox width={280} height={72} style={{ borderRadius: 16 }} />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <SkeletonBox width={120} height={20} />
          <SkeletonBox width={60} height={16} />
        </View>
        <View style={styles.topMoversRow}>
          {[1, 2, 3, 4, 5].map(i => (
            <View key={i} style={styles.topMoverCard}>
              <SkeletonBox
                width={48}
                height={48}
                style={{ borderRadius: 24 }}
              />
              <SkeletonBox width={60} height={16} style={{ marginTop: 8 }} />
              <SkeletonBox width={80} height={12} style={{ marginTop: 4 }} />
              <SkeletonBox width={70} height={18} style={{ marginTop: 6 }} />
              <SkeletonBox width={50} height={14} style={{ marginTop: 4 }} />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <SkeletonBox width={140} height={20} />
          <SkeletonBox width={80} height={16} />
        </View>
        <View style={styles.activityContainer}>
          {[1, 2, 3, 4].map(i => (
            <View key={i} style={styles.activityItem}>
              <View style={styles.activityLeft}>
                <SkeletonBox
                  width={40}
                  height={40}
                  style={{ borderRadius: 20 }}
                />
                <View style={styles.activityInfo}>
                  <SkeletonBox width={100} height={16} />
                  <SkeletonBox
                    width={80}
                    height={12}
                    style={{ marginTop: 4 }}
                  />
                </View>
              </View>
              <View style={styles.activityRight}>
                <SkeletonBox width={80} height={16} />
                <SkeletonBox width={60} height={12} style={{ marginTop: 4 }} />
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
