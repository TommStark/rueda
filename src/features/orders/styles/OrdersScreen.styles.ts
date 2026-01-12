import { StyleSheet } from "react-native";
import { colors } from "../../../shared/theme/colors";

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
  },
});
