import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 6,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 12,
  },
  logoWrapper: {
    position: "relative",
    width: 48,
    height: 48,
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: "hidden",
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderLogo: {
    backgroundColor: "#e0e0e0",
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  colorPlaceholderText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -0.5,
  },
  statusBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    flex: 1,
    gap: 2,
  },
  rightSection: {
    justifyContent: "center",
  },
  ticker: {
    fontWeight: "700",
    fontSize: 16,
    color: "#1a1a1a",
  },
  orderType: {
    color: "#666",
    fontSize: 13,
  },
  date: {
    color: "#999",
    fontSize: 12,
  },
  quantity: {
    fontWeight: "600",
    fontSize: 15,
    color: "#1a1a1a",
  },
  status: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  arrow: {
    marginLeft: 4,
  },
});
