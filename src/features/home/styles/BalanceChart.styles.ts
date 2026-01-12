import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../shared/theme/colors";

const PADDING = 20;

export const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: PADDING,
    marginTop: 8,
  },
  label: {
    fontSize: 10,
    color: colors.text.quaternary,
  },
});
