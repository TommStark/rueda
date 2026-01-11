import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import RootStackNavigator from "./src/navigation/RootStackNavigator";
import { queryClient } from "./src/shared/config/queryClient";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <PaperProvider>
          <NavigationContainer>
            <RootStackNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
