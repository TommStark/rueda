import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    backgroundColor: "#fff",
    paddingTop: 16,
  },
  searchbar: {
    marginHorizontal: 16,
    marginBottom: 8,
    elevation: 0,
    backgroundColor: "#f5f5f5",
  },
  searchInput: {
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sectionTitle: {
    color: "#666",
    fontWeight: "600",
  },
  sectionSubtitle: {
    color: "#999",
  },
  listContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 12,
  },
  loadingText: {
    color: "#666",
  },
  errorMessage: {
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },
  emptyText: {
    color: "#666",
    marginTop: 8,
  },
});
