import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="magnify" size={48} color="#6200ee" />
      <Text variant="headlineMedium">Buscar</Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Buscador de activos por ticker
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
