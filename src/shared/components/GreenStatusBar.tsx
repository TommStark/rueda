import { View, Platform, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../theme/colors";

export default function GreenStatusBar() {
  const insets = useSafeAreaInsets();

  if (Platform.OS !== "ios") {
    return null;
  }

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: insets.top,
        backgroundColor: colors.primary,
        zIndex: 1000,
      }}
    />
  );
}
