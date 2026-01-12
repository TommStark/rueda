import { StyleSheet } from "react-native";
import { colors } from "../../../shared/theme/colors";

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
    color: colors.text.tertiary,
  },
  errorTitle: {
    marginTop: 8,
  },
  errorMessage: {
    color: colors.text.tertiary,
    textAlign: "center",
  },
  subtitle: {
    color: colors.text.tertiary,
    textAlign: "center",
  },
});
