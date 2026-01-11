import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { PortfolioPosition } from "../types/portfolio.types";

interface PositionCardProps {
  position: PortfolioPosition;
}

export default function PositionCard({ position }: PositionCardProps) {
  const currentValue = position.quantity * position.last_price;
  const costBasis = position.quantity * position.avg_cost_price;
  const profitLoss = currentValue - costBasis;
  const profitLossPercent = (profitLoss / costBasis) * 100;
  const isPositive = profitLoss >= 0;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.ticker}>
            {position.ticker}
          </Text>
          <Text variant="titleMedium" style={styles.value}>
            ${currentValue.toFixed(2)}
          </Text>
        </View>
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Text variant="bodySmall" style={styles.label}>
              Cantidad:
            </Text>
            <Text variant="bodySmall">{position.quantity}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text variant="bodySmall" style={styles.label}>
              Precio promedio:
            </Text>
            <Text variant="bodySmall">
              ${position.avg_cost_price.toFixed(2)}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text variant="bodySmall" style={styles.label}>
              Precio actual:
            </Text>
            <Text variant="bodySmall">${position.last_price.toFixed(2)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text variant="bodySmall" style={styles.label}>
              P&L:
            </Text>
            <Text
              variant="bodySmall"
              style={[
                styles.profitLoss,
                isPositive ? styles.positive : styles.negative,
              ]}
            >
              {isPositive ? "+" : ""}${profitLoss.toFixed(2)} (
              {isPositive ? "+" : ""}
              {profitLossPercent.toFixed(2)}%)
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  ticker: {
    fontWeight: "bold",
  },
  value: {
    fontWeight: "bold",
  },
  details: {
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
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
