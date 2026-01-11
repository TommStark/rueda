import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function PortfolioScreen() {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="briefcase" size={48} color="#6200ee" />
      <Text variant="headlineMedium">Portfolio</Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Mis activos e inversiones
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
