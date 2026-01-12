import { View, StyleSheet } from "react-native";
import Skeleton from "../../../shared/components/Skeleton";

export default function SearchResultSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Skeleton width={80} height={18} style={{ marginBottom: 8 }} />
        <Skeleton width={150} height={14} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  content: {
    gap: 8,
  },
  ticker: {
    width: 80,
    height: 18,
  },
  name: {
    width: 150,
    height: 14,
  },
});
