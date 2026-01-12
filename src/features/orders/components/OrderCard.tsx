import { StyleSheet, View } from "react-native";
import { Card, Text, Chip } from "react-native-paper";
import { Order } from "../types/orders.types";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "FILLED":
        return "#4caf50";
      case "PENDING":
        return "#ff9800";
      case "REJECTED":
        return "#f44336";
      default:
        return "#666";
    }
  };

  const getSideColor = (side: string) => {
    return side === "BUY" ? "#2196f3" : "#f44336";
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "FILLED":
        return "Ejecutada";
      case "PENDING":
        return "Pendiente";
      case "REJECTED":
        return "Rechazada";
      default:
        return status;
    }
  };

  const getSideLabel = (side: string) => {
    return side === "BUY" ? "Compra" : "Venta";
  };

  const getTypeLabel = (type: string) => {
    return type === "MARKET" ? "Mercado" : "Límite";
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleSmall" style={styles.orderId}>
            Orden #{order.id}
          </Text>
          <Chip
            mode="flat"
            textStyle={[
              styles.statusText,
              { color: getStatusColor(order.status) },
            ]}
            style={[
              styles.statusChip,
              { backgroundColor: `${getStatusColor(order.status)}20` },
            ]}
          >
            {getStatusLabel(order.status)}
          </Chip>
        </View>
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Text variant="bodySmall" style={styles.label}>
              Instrumento ID:
            </Text>
            <Text variant="bodySmall">{order.instrument_id}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text variant="bodySmall" style={styles.label}>
              Tipo:
            </Text>
            <Text
              variant="bodySmall"
              style={[styles.side, { color: getSideColor(order.side) }]}
            >
              {getSideLabel(order.side)}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text variant="bodySmall" style={styles.label}>
              Modalidad:
            </Text>
            <Text variant="bodySmall">{getTypeLabel(order.type)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text variant="bodySmall" style={styles.label}>
              Cantidad:
            </Text>
            <Text variant="bodySmall">{order.quantity}</Text>
          </View>
          {order.price && (
            <View style={styles.detailRow}>
              <Text variant="bodySmall" style={styles.label}>
                Precio:
              </Text>
              <Text variant="bodySmall">${order.price.toFixed(2)}</Text>
            </View>
          )}
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
  orderId: {
    fontWeight: "bold",
    color: "#666",
  },
  statusChip: {
    height: 28,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
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
  side: {
    fontWeight: "600",
  },
});
