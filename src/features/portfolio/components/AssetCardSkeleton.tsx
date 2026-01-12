import { View, StyleSheet } from "react-native";
import Skeleton from "../../../shared/components/Skeleton";
import { colors } from "../../../shared/theme/colors";

export default function AssetCardSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Skeleton width={48} height={48} borderRadius={24} />
          <View style={styles.info}>
            <Skeleton width={60} height={18} style={{ marginBottom: 6 }} />
            <Skeleton width={80} height={14} />
          </View>
        </View>
        <View style={styles.rightSection}>
          <Skeleton width={80} height={18} style={{ marginBottom: 6 }} />
          <Skeleton width={90} height={14} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.card,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
    shadowColor: colors.shadow.color,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  info: {
    gap: 6,
  },
  ticker: {
    width: 60,
    height: 18,
  },
  quantity: {
    width: 80,
    height: 14,
  },
  rightSection: {
    alignItems: "flex-end",
    gap: 6,
  },
  value: {
    width: 80,
    height: 18,
  },
  change: {
    width: 90,
    height: 14,
  },
});
