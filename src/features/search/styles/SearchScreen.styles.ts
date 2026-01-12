import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  searchbar: {
    elevation: 2,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 16,
  },
  listContent: {
    paddingBottom: 16,
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
    textAlign: "center",
  },
});
