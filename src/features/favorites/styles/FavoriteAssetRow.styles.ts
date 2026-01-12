import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
    backgroundColor: "#fff",
  },
  assetSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
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
  },
  logoText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -0.5,
  },
  logoTextPlaceholder: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
  },
  assetInfo: {
    flex: 1,
  },
  ticker: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 2,
    letterSpacing: -0.3,
  },
  assetName: {
    fontSize: 12,
    color: "#999",
    fontWeight: "500",
  },
  trendSection: {
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingLeft: 17,
  },
  changeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  changePositive: {
    color: "#4caf50",
  },
  changeNegative: {
    color: "#f44336",
  },
  priceSection: {
    width: 100,
    alignItems: "flex-end",
    gap: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1a1a1a",
    letterSpacing: -0.3,
  },
  starButton: {
    padding: 2,
  },
  starSection: {
    marginLeft: 8,
    alignItems: "center",
  },
});
