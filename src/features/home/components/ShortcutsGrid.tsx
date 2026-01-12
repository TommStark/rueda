import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../shared/theme/colors";
import { styles } from "../styles/ShortcutsGrid.styles";

interface ShortcutItem {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}

interface ShortcutButtonProps {
  item: ShortcutItem;
}

function ShortcutButton({ item }: ShortcutButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon} size={22} color={colors.primary} />
      </View>
      <Text style={styles.label} numberOfLines={2}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
}

export default function ShortcutsGrid() {
  const shortcuts: ShortcutItem[] = [
    {
      id: "1",
      label: "Recargar SUBE",
      icon: "card",
      onPress: () => console.log("Recargar SUBE"),
    },
    {
      id: "2",
      label: "Pagar servicios",
      icon: "receipt",
      onPress: () => console.log("Pagar servicios"),
    },
    {
      id: "3",
      label: "Recargar celular",
      icon: "phone-portrait",
      onPress: () => console.log("Recargar celular"),
    },
    {
      id: "4",
      label: "Solicitar préstamo",
      icon: "cash",
      onPress: () => console.log("Solicitar préstamo"),
    },
    {
      id: "5",
      label: "Ayuda",
      icon: "help-circle",
      onPress: () => console.log("Ayuda"),
    },
    {
      id: "6",
      label: "Más opciones",
      icon: "ellipsis-horizontal",
      onPress: () => console.log("Más opciones"),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accesos Rápidos</Text>
      <View style={styles.grid}>
        {shortcuts.map((item) => (
          <ShortcutButton key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}
