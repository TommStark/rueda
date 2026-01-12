import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  logoContainer: {
    marginRight: 12,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderLogo: {
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
  },
  colorPlaceholderText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -0.5,
  },
  infoContainer: {
    flex: 1,
  },
  ticker: {
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 3,
    letterSpacing: -0.3,
    color: "#1a1a1a",
  },
  name: {
    color: "#666",
    fontSize: 13,
    fontWeight: "500",
  },
  rightSection: {
    alignItems: "flex-end",
    marginRight: 8,
  },
  chevronContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 4,
    letterSpacing: -0.3,
    color: "#1a1a1a",
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
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
