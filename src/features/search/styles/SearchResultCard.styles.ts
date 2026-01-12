import { StyleSheet } from "react-native";
import { colors } from "../../../shared/theme/colors";

export const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  content: {
    gap: 4,
  },
  ticker: {
    fontWeight: "bold",
  },
  name: {
    color: colors.text.tertiary,
  },
});
