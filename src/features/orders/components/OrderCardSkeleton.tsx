import { View, StyleSheet } from "react-native";
import Skeleton from "../../../shared/components/Skeleton";

export default function OrderCardSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Skeleton width={80} height={16} />
          <Skeleton width={90} height={28} borderRadius={14} />
        </View>
        <View style={styles.details}>
          <Skeleton width="100%" height={14} style={{ marginBottom: 8 }} />
          <Skeleton width="100%" height={14} style={{ marginBottom: 8 }} />
          <Skeleton width="100%" height={14} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    padding: 16,
  },
  content: {
    gap: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderId: {
    width: 80,
    height: 16,
  },
  statusChip: {
    width: 90,
    height: 28,
    borderRadius: 14,
  },
  details: {
    gap: 8,
  },
  detailRow: {
    width: "100%",
    height: 14,
  },
});
