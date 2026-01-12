import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { OrderHistoryItem } from "../types/history.types";

interface HistoryCardProps {
  order: OrderHistoryItem;
  onPress: () => void;
}

export default function HistoryCard({ order, onPress }: HistoryCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "FILLED":
        return "#00C853";
      case "REJECTED":
        return "#FF3B30";
      case "PENDING":
        return "#FF9500";
      default:
        return "#999";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "FILLED":
        return "check-circle";
      case "REJECTED":
        return "close-circle";
      case "PENDING":
        return "clock-outline";
      default:
        return "help-circle";
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getOrderTypeLabel = () => {
    return `${order.side === "BUY" ? "Buy" : "Sell"} ${
      order.type === "MARKET" ? "Market" : "Limit"
    }`;
  };

  const getQuantityLabel = () => {
    if (order.ticker.includes("/")) {
      return `${order.quantity} ${order.ticker.split("/")[0]}`;
    }
    return `${order.quantity} Shares`;
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={getStatusIcon(order.status)}
          size={24}
          color={getStatusColor(order.status)}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.leftSection}>
            <Text variant="titleMedium" style={styles.ticker}>
              {order.ticker}
            </Text>
            <Text variant="bodySmall" style={styles.orderType}>
              {getOrderTypeLabel()}
            </Text>
            <Text variant="bodySmall" style={styles.date}>
              {formatTime(order.timestamp)}
            </Text>
          </View>

          <View style={styles.rightSection}>
            <Text variant="titleMedium" style={styles.quantity}>
              {getQuantityLabel()}
            </Text>
            <Text
              variant="labelMedium"
              style={[styles.status, { color: getStatusColor(order.status) }]}
            >
              {order.status}
            </Text>
          </View>
        </View>
      </View>

      <MaterialCommunityIcons
        name="chevron-right"
        size={20}
        color="#ccc"
        style={styles.arrow}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 6,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  leftSection: {
    flex: 1,
    gap: 2,
  },
  rightSection: {
    alignItems: "flex-end",
    gap: 4,
  },
  ticker: {
    fontWeight: "700",
    fontSize: 16,
    color: "#1a1a1a",
  },
  orderType: {
    color: "#666",
    fontSize: 13,
  },
  date: {
    color: "#999",
    fontSize: 12,
  },
  quantity: {
    fontWeight: "600",
    fontSize: 15,
    color: "#1a1a1a",
  },
  status: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  arrow: {
    marginLeft: 4,
  },
});
