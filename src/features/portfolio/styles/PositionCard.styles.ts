import { StyleSheet } from "react-native";
import { colors } from "../../../shared/theme/colors";

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
    color: colors.text.tertiary,
  },
  profitLoss: {
    fontWeight: "600",
  },
  positive: {
    color: colors.positive,
  },
  negative: {
    color: colors.negative,
  },
});
