import { StyleSheet } from "react-native";
import { colors } from "../../../shared/theme/colors";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background.tertiary,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 24,
  },
  iconImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  colorPlaceholder: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text.inverse,
    letterSpacing: -0.5,
  },
  info: {
    gap: 4,
  },
  ticker: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.text.primary,
    letterSpacing: -0.3,
  },
  quantity: {
    fontSize: 13,
    color: colors.text.quaternary,
    fontWeight: "500",
  },
  rightSection: {
    alignItems: "flex-end",
    gap: 4,
  },
  value: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.text.primary,
    letterSpacing: -0.3,
  },
  change: {
    fontWeight: "700",
    fontSize: 13,
  },
  positive: {
    color: colors.positive,
  },
  negative: {
    color: colors.negative,
  },
});
