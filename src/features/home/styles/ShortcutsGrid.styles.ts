import { StyleSheet } from "react-native";
import { colors } from "../../../shared/theme/colors";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  button: {
    width: "31%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.background.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.text.secondary,
    textAlign: "center",
  },
});
