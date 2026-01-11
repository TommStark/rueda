import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useOrders, useOrdersError } from "../hooks/useOrders";
import OrderCard from "../components/OrderCard";
import { Order } from "../../../shared/types/api.types";

export default function OrdersScreen() {
  const { data, isLoading, error, refetch, isRefetching } = useOrders();
  const apiError = useOrdersError(error);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text variant="bodyMedium" style={styles.loadingText}>
          Cargando órdenes...
        </Text>
      </View>
    );
  }

  if (error && !data) {
    return (
      <View style={styles.centerContainer}>
        <MaterialCommunityIcons name="alert-circle" size={48} color="#f44336" />
        <Text variant="headlineSmall" style={styles.errorTitle}>
          Error
        </Text>
        <Text variant="bodyMedium" style={styles.errorMessage}>
          {apiError?.message || "Error al cargar órdenes"}
        </Text>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <MaterialCommunityIcons
          name="file-document"
          size={48}
          color="#6200ee"
        />
        <Text variant="headlineMedium">Sin órdenes</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          No tienes órdenes registradas
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item: Order) => item.id}
        renderItem={({ item }) => <OrderCard order={item} />}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 16,
  },
  listContent: {
    paddingVertical: 8,
  },
  loadingText: {
    marginTop: 8,
    color: "#666",
  },
  errorTitle: {
    marginTop: 8,
  },
  errorMessage: {
    color: "#666",
    textAlign: "center",
  },
  subtitle: {
    color: "#666",
  },
});
