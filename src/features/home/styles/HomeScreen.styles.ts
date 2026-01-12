import { StyleSheet } from "react-native";
import { colors } from "../../../shared/theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  greetingSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greeting: {
    fontWeight: "bold",
    color: colors.text.secondary,
    marginBottom: 4,
  },
  subGreeting: {
    color: colors.text.quaternary,
  },
  balanceCard: {
    backgroundColor: colors.background.card,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: colors.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  balanceLabel: {
    color: colors.text.quaternary,
    marginBottom: 8,
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  balanceAmount: {
    fontWeight: "bold",
    color: colors.text.secondary,
  },
  changeChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  changeChipPositive: {
    backgroundColor: colors.positiveLight,
  },
  changeChipNegative: {
    backgroundColor: colors.negativeLight,
  },
  changeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  changeTextPositive: {
    color: colors.positive,
  },
  changeTextNegative: {
    color: colors.negative,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: "bold",
    color: colors.text.secondary,
  },
  seeAllButton: {
    color: colors.primary,
    fontWeight: "600",
  },
  quickActionsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  topMoversContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  activityContainer: {
    backgroundColor: colors.background.card,
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
});
