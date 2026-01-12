import { View, TouchableOpacity, Image } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { OrderHistoryItem } from "../types/history.types";
import {
  getTickerIcon,
  hasTickerIcon,
  getTickerColor,
} from "../../../shared/utils/icons";
import { styles } from "../styles/HistoryCard.styles";

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

  const localIcon = getTickerIcon(order.ticker);
  const hasLocalIcon = hasTickerIcon(order.ticker);
  const tickerColor = getTickerColor(order.ticker);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.logoWrapper}>
        <View style={styles.logoContainer}>
          {hasLocalIcon && localIcon ? (
            <Image source={localIcon} style={styles.logo} />
          ) : tickerColor ? (
            <View style={[styles.logo, { backgroundColor: tickerColor }]}>
              <Text style={styles.colorPlaceholderText}>
                {order.ticker.substring(0, 2).toUpperCase()}
              </Text>
            </View>
          ) : (
            <View style={[styles.logo, styles.placeholderLogo]}>
              <Text style={styles.placeholderText}>
                {order.ticker.substring(0, 2)}
              </Text>
            </View>
          )}
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(order.status) },
          ]}
        >
          <MaterialCommunityIcons
            name={getStatusIcon(order.status)}
            size={14}
            color="#fff"
          />
        </View>
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
