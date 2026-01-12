import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: 100,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    alignItems: "center",
    gap: 6,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  ticker: {
    fontWeight: "bold",
    color: "#333",
  },
  name: {
    fontSize: 10,
    color: "#999",
    textAlign: "center",
  },
  price: {
    fontWeight: "600",
    marginTop: 4,
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  change: {
    fontSize: 11,
    fontWeight: "600",
  },
  positive: {
    color: "#4caf50",
  },
  negative: {
    color: "#f44336",
  },
});
