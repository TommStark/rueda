import { StyleSheet } from "react-native";
import { colors } from "../../../shared/theme/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.tertiary,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
    color: colors.text.secondary,
    marginBottom: 2,
  },
  subtitle: {
    color: colors.text.quaternary,
    fontSize: 12,
  },
  amount: {
    fontWeight: "bold",
  },
  positive: {
    color: colors.positive,
  },
  negative: {
    color: colors.text.secondary,
  },
});
