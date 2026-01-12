import { StyleSheet } from "react-native";
import { colors } from "../../../shared/theme/colors";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 16,
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
  balanceLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text.quaternary,
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  balanceAmount: {
    fontSize: 44,
    fontWeight: "800",
    color: colors.text.primary,
    marginBottom: 14,
    letterSpacing: -1,
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  currencyBadge: {
    backgroundColor: colors.background.tertiary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  currencyText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.text.tertiary,
  },
  changeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  changeText: {
    fontSize: 14,
    fontWeight: "600",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  assetsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  assetsTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.text.primary,
    letterSpacing: -0.5,
  },
  seeAllText: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: "700",
  },
  assetsList: {
    gap: 0,
  },
  loadingText: {
    marginTop: 8,
    color: colors.text.tertiary,
  },
  errorTitle: {
    marginTop: 8,
  },
  errorMessage: {
    color: colors.text.tertiary,
    textAlign: "center",
  },
  subtitle: {
    color: colors.text.tertiary,
  },
  positive: {
    color: colors.positive,
  },
  negative: {
    color: colors.negative,
  },
});
