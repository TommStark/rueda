import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  greetingSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greeting: {
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subGreeting: {
    color: "#999",
  },
  balanceCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  balanceLabel: {
    color: "#999",
    marginBottom: 8,
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  balanceAmount: {
    fontWeight: "bold",
    color: "#333",
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
    backgroundColor: "#e8f5e9",
  },
  changeChipNegative: {
    backgroundColor: "#ffebee",
  },
  changeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  changeTextPositive: {
    color: "#4caf50",
  },
  changeTextNegative: {
    color: "#f44336",
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
    color: "#333",
  },
  seeAllButton: {
    color: "#6200ee",
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
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
});
