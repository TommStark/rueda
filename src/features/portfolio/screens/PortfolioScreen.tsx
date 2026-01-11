import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import { Text, ActivityIndicator, Card } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { usePortfolio, usePortfolioError } from "../hooks/usePortfolio";
import PositionCard from "../components/PositionCard";
import { PortfolioPosition } from "../../../shared/types/api.types";

export default function PortfolioScreen() {
  const { data, isLoading, error, refetch, isRefetching } = usePortfolio();
  const apiError = usePortfolioError(error);

  const totalValue = data?.reduce(
    (sum, pos) => sum + pos.quantity * pos.last_price,
    0
  );
  const totalCost = data?.reduce(
    (sum, pos) => sum + pos.quantity * pos.avg_cost_price,
    0
  );
  const totalProfitLoss = (totalValue || 0) - (totalCost || 0);
  const totalProfitLossPercent =
    totalCost && totalCost > 0 ? (totalProfitLoss / totalCost) * 100 : 0;
  const isPositive = totalProfitLoss >= 0;

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text variant="bodyMedium" style={styles.loadingText}>
          Cargando portfolio...
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
          {apiError?.message || "Error al cargar portfolio"}
        </Text>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <MaterialCommunityIcons name="briefcase" size={48} color="#6200ee" />
        <Text variant="headlineMedium">Portfolio vacío</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          No tienes posiciones abiertas
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.summaryCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.summaryTitle}>
            Resumen del Portfolio
          </Text>
          <View style={styles.summaryRow}>
            <Text variant="bodyMedium" style={styles.label}>
              Valor total:
            </Text>
            <Text variant="titleLarge" style={styles.totalValue}>
              ${totalValue?.toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text variant="bodySmall" style={styles.label}>
              P&L Total:
            </Text>
            <Text
              variant="bodyMedium"
              style={[
                styles.profitLoss,
                isPositive ? styles.positive : styles.negative,
              ]}
            >
              {isPositive ? "+" : ""}${totalProfitLoss.toFixed(2)} (
              {isPositive ? "+" : ""}
              {totalProfitLossPercent.toFixed(2)}%)
            </Text>
          </View>
        </Card.Content>
      </Card>
      <FlatList
        data={data}
        keyExtractor={(item: PortfolioPosition) => item.ticker}
        renderItem={({ item }) => <PositionCard position={item} />}
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
  summaryCard: {
    margin: 16,
    marginBottom: 8,
  },
  summaryTitle: {
    fontWeight: "bold",
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  totalValue: {
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 8,
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
  label: {
    color: "#666",
  },
  profitLoss: {
    fontWeight: "600",
  },
  positive: {
    color: "#4caf50",
  },
  negative: {
    color: "#f44336",
  },
});
