import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import RootStackNavigator from "./src/navigation/RootStackNavigator";
import { queryClient } from "./src/shared/config/queryClient";
import { OrderHistoryProvider } from "./src/features/history/context/OrderHistoryContext";
import { FavoritesProvider } from "./src/shared/context/FavoritesContext";
import { ToastProvider } from "./src/shared/context/ToastContext";
import Toast from "./src/shared/components/Toast";
import { colors } from "./src/shared/theme/colors";
import "./src/shared/config/i18n";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <FavoritesProvider>
          <OrderHistoryProvider>
            <SafeAreaProvider>
              <PaperProvider>
                <NavigationContainer>
                  <RootStackNavigator />
                  <StatusBar style="dark" />
                </NavigationContainer>
                <Toast />
              </PaperProvider>
            </SafeAreaProvider>
          </OrderHistoryProvider>
        </FavoritesProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
