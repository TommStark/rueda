import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { PaperProvider, Text } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { APP_NAME, APP_VERSION } from "@env";

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
          <View style={styles.content}>
            <MaterialCommunityIcons name="grain" size={80} color="#6200ee" />
            <Text variant="displayLarge" style={styles.title}>
              {APP_NAME}
            </Text>
            <Text variant="bodyMedium" style={styles.version}>
              {APP_VERSION}
            </Text>
          </View>
          <StatusBar style="auto" />
        </SafeAreaView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  title: {
    fontWeight: "bold",
  },
  version: {
    color: "#666",
  },
});
