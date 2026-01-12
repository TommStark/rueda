import { StyleSheet } from "react-native";
import { colors } from "../../../shared/theme/colors";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.card,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: colors.shadow.color,
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
