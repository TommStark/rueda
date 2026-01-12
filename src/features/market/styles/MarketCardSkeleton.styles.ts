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
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  ticker: {
    width: 60,
    height: 18,
    marginBottom: 6,
  },
  name: {
    width: 120,
    height: 14,
  },
  rightSection: {
    alignItems: "flex-end",
  },
  price: {
    width: 80,
    height: 18,
    marginBottom: 6,
  },
  change: {
    width: 60,
    height: 14,
  },
});
