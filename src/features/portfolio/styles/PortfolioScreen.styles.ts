import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fafafa",
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
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 24,
    padding: 24,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  balanceLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#999",
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  balanceAmount: {
    fontSize: 44,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 14,
    letterSpacing: -1,
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  currencyBadge: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  currencyText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
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
    color: "#1a1a1a",
    letterSpacing: -0.5,
  },
  seeAllText: {
    fontSize: 15,
    color: "#6200ee",
    fontWeight: "700",
  },
  assetsList: {
    gap: 0,
  },
  loadingText: {
    marginTop: 8,
    color: "#666",
  },
  errorTitle: {
    marginTop: 8,
  },
  errorMessage: {
    color: "#666",
    textAlign: "center",
  },
  subtitle: {
    color: "#666",
  },
  positive: {
    color: "#4caf50",
  },
  negative: {
    color: "#f44336",
  },
});
