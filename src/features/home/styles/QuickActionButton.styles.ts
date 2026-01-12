import { StyleSheet } from "react-native";
import { colors } from "../../../shared/theme/colors";

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
    backgroundColor: colors.primary,
  },
  iconContainerSecondary: {
    backgroundColor: colors.background.primary,
    borderWidth: 1,
    borderColor: colors.border.medium,
  },
  label: {
    fontSize: 12,
    color: colors.text.secondary,
  },
});
