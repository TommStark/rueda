import { View, FlatList, RefreshControl, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../shared/theme/colors";
import { useOrders, useOrdersError } from "../hooks/useOrders";
import OrderCard from "../components/OrderCard";
import OrderCardSkeleton from "../components/OrderCardSkeleton";
import { Order } from "../types/orders.types";
import { styles } from "../styles/OrdersScreen.styles";

export default function OrdersScreen() {
  const { data, isLoading, error, refetch, isRefetching } = useOrders();
  const apiError = useOrdersError(error);

  if (isLoading) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.listContent}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <OrderCardSkeleton key={index} />
        ))}
      </ScrollView>
    );
  }

  if (error && !data) {
    return (
      <View style={styles.centerContainer}>
        <MaterialCommunityIcons
          name="alert-circle"
          size={48}
          color={colors.status.error}
        />
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
          color={colors.primary}
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
