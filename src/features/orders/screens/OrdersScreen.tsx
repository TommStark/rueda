import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function OrdersScreen() {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="file-document" size={48} color="#6200ee" />
      <Text variant="headlineMedium">Órdenes</Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Historial de órdenes
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 16,
  },
  subtitle: {
    color: "#666",
  },
});
