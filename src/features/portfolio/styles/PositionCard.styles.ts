import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  ticker: {
    fontWeight: "bold",
  },
  value: {
    fontWeight: "bold",
  },
  details: {
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    color: "#666",
  },
  profitLoss: {
    fontWeight: "600",
  },
  positive: {
    color: "#4caf50",
  },
  negative: {
    color: "#f44336",
  },
});
