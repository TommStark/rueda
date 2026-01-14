import { View, StyleSheet } from 'react-native';
import Skeleton from '../../../shared/components/Skeleton';
import { colors } from '../../../shared/theme/colors';

export default function PortfolioBalanceSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.balanceCard}>
        <View style={styles.content}>
          <Skeleton width={120} height={12} style={{ marginBottom: 12 }} />
          <Skeleton width={180} height={40} style={{ marginBottom: 12 }} />
          <View style={styles.changeRow}>
            <Skeleton width={50} height={24} borderRadius={6} />
            <Skeleton width={100} height={16} />
          </View>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <Skeleton width={70} height={80} borderRadius={12} />
        <Skeleton width={70} height={80} borderRadius={12} />
        <Skeleton width={70} height={80} borderRadius={12} />
        <Skeleton width={70} height={80} borderRadius={12} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  balanceCard: {
    backgroundColor: colors.background.card,
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 24,
    padding: 24,
    borderRadius: 20,
    shadowColor: colors.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  content: {
    gap: 12,
  },
  balanceLabel: {
    width: 120,
    height: 12,
  },
  balanceAmount: {
    width: 180,
    height: 40,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  currencyBadge: {
    width: 50,
    height: 24,
    borderRadius: 6,
  },
  changeText: {
    width: 100,
    height: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  actionButton: {
    width: 70,
    height: 80,
    borderRadius: 12,
  },
});
