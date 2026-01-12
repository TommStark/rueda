import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
    shadowColor: "#000",
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
    backgroundColor: "#f5f5f5",
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
    color: "#fff",
    letterSpacing: -0.5,
  },
  info: {
    gap: 4,
  },
  ticker: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1a1a1a",
    letterSpacing: -0.3,
  },
  quantity: {
    fontSize: 13,
    color: "#999",
    fontWeight: "500",
  },
  rightSection: {
    alignItems: "flex-end",
    gap: 4,
  },
  value: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1a1a1a",
    letterSpacing: -0.3,
  },
  change: {
    fontWeight: "700",
    fontSize: 13,
  },
  positive: {
    color: "#4caf50",
  },
  negative: {
    color: "#f44336",
  },
});
