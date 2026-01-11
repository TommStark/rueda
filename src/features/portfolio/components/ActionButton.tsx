import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

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
          color={variant === "primary" ? "#fff" : "#333"}
        />
      </TouchableOpacity>
      <Text variant="bodySmall" style={styles.label}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 8,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: "#6200ee",
  },
  secondaryButton: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
});
