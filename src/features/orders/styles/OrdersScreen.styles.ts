import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  listContent: {
    paddingVertical: 8,
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
});
