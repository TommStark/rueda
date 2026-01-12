import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  subtitle: {
    color: "#999",
    fontSize: 12,
  },
  amount: {
    fontWeight: "bold",
  },
  positive: {
    color: "#4caf50",
  },
  negative: {
    color: "#333",
  },
});
