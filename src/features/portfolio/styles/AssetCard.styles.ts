import { StyleSheet } from "react-native";
import { colors } from "../../../shared/theme/colors";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginVertical: 4,
    borderRadius: 12,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e8e8e8",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 24,
  },
  iconImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  colorPlaceholder: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text.inverse,
    letterSpacing: -0.3,
  },
  info: {
    gap: 4,
  },
  ticker: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text.primary,
    letterSpacing: -0.2,
  },
  quantity: {
    fontSize: 12,
    color: colors.text.tertiary,
    fontWeight: "400",
  },
  rightSection: {
    alignItems: "flex-end",
    gap: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text.primary,
    letterSpacing: -0.2,
  },
  change: {
    fontWeight: "600",
    fontSize: 12,
  },
  positive: {
    color: colors.positive,
  },
  negative: {
    color: colors.negative,
  },
});
