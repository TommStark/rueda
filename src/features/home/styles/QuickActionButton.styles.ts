import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 8,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainerPrimary: {
    backgroundColor: "#6200ee",
  },
  iconContainerSecondary: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  label: {
    fontSize: 12,
    color: "#333",
  },
});
