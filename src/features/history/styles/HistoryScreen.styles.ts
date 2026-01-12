import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
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
  filtersWrapper: {
    height: 60,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  filterChip: {
    marginRight: 8,
    borderRadius: 20,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
    height: 36,
  },
  filterChipSelectedAll: {
    backgroundColor: "#6200ee",
  },
  filterChipSelectedFilled: {
    backgroundColor: "#00C853",
  },
  filterChipSelectedPending: {
    backgroundColor: "#FF9500",
  },
  filterChipSelectedRejected: {
    backgroundColor: "#FF3B30",
  },
  filterChipText: {
    fontSize: 14,
    color: "#666",
  },
  filterChipTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  monthHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#999",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  emptyTitle: {
    marginTop: 16,
    color: "#666",
  },
  emptySubtitle: {
    color: "#999",
    textAlign: "center",
  },
});
