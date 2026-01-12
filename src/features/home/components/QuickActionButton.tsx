import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../styles/QuickActionButton.styles";

interface QuickActionButtonProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
}

export default function QuickActionButton({
  icon,
  label,
  onPress,
  variant = "secondary",
}: QuickActionButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          isPrimary
            ? styles.iconContainerPrimary
            : styles.iconContainerSecondary,
        ]}
      >
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={isPrimary ? "#fff" : "#333"}
        />
      </View>
      <Text variant="bodySmall" style={styles.label}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
