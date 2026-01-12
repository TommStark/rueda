import { View } from "react-native";
import { Card, Text, Chip } from "react-native-paper";
import { Order } from "../types/orders.types";
import { styles } from "../styles/OrderCard.styles";
import { colors } from "../../../shared/theme/colors";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "FILLED":
        return colors.status.success;
      case "PENDING":
        return colors.status.warning;
      case "REJECTED":
        return colors.status.error;
      default:
        return colors.text.tertiary;
    }
  };

  const getSideColor = (side: string) => {
    return side === "BUY" ? colors.buy : colors.sell;
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
