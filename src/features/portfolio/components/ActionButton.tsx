import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../shared/theme/colors";
import { styles } from "../styles/ActionButton.styles";

interface ActionButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
  variant?: "primary" | "secondary";
}

export default function ActionButton({
  icon,
  label,
  onPress,
  variant = "secondary",
}: ActionButtonProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          variant === "primary" ? styles.primaryButton : styles.secondaryButton,
        ]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Ionicons
          name={icon}
          size={24}
          color={
            variant === "primary" ? colors.text.inverse : colors.text.secondary
          }
        />
      </TouchableOpacity>
      <Text variant="bodySmall" style={styles.label}>
        {label}
      </Text>
    </View>
  );
}
