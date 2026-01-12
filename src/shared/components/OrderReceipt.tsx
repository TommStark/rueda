import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OrderHistoryItem } from "../../features/history/types/history.types";
import { RootStackParamList } from "../../navigation/types";

interface OrderReceiptProps {
  order: OrderHistoryItem;
}

type OrderReceiptNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function OrderReceipt({ order }: OrderReceiptProps) {
  const navigation = useNavigation<OrderReceiptNavigationProp>();

  const getStatusIcon = () => {
    switch (order.status) {
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

  const getStatusColor = () => {
    switch (order.status) {
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

  const getStatusTitle = () => {
    switch (order.status) {
      case "FILLED":
        return "Order Filled";
      case "REJECTED":
        return "Order Rejected";
      case "PENDING":
        return "Order Pending";
      default:
        return "Order Status";
    }
  };

  const getStatusBadge = () => {
    switch (order.status) {
      case "FILLED":
        return "CONFIRMED";
      case "REJECTED":
        return "FAILED";
      case "PENDING":
        return "PROCESSING";
      default:
        return "";
    }
  };

  const getStatusMessage = () => {
    switch (order.status) {
      case "FILLED":
        return `Your ${order.type.toLowerCase()} order to ${order.side.toLowerCase()} ${
          order.ticker
        } has been fully executed.`;
      case "REJECTED":
        return `Your ${order.type.toLowerCase()} order to ${order.side.toLowerCase()} ${
          order.ticker
        } was rejected.`;
      case "PENDING":
        return `Your ${order.type.toLowerCase()} order to ${order.side.toLowerCase()} ${
          order.ticker
        } is being processed.`;
      default:
        return "";
    }
  };

  const totalSpent = order.executedPrice * order.quantity;

  const handleClose = () => {
    navigation.goBack();
  };

  const handleBackToMarkets = () => {
    navigation.navigate("MainTabs");
  };

  const handleViewPortfolio = () => {
    navigation.navigate("MainTabs");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <View style={{ width: 24 }} />
        <Text variant="titleMedium" style={styles.headerTitle}>
          Order Status Confirmation
        </Text>
        <TouchableOpacity onPress={handleClose}>
          <Ionicons name="close" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statusIconContainer}>
          <View
            style={[
              styles.statusIconCircle,
              { backgroundColor: getStatusColor() },
            ]}
          >
            <MaterialCommunityIcons
              name={getStatusIcon()}
              size={48}
              color="#fff"
            />
          </View>
        </View>

        <Text variant="headlineMedium" style={styles.statusTitle}>
          {getStatusTitle()}
        </Text>

        <View
          style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}
        >
          <Text style={styles.statusBadgeText}>{getStatusBadge()}</Text>
        </View>

        <Text variant="bodyMedium" style={styles.statusMessage}>
          {getStatusMessage()}
        </Text>

        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text variant="bodySmall" style={styles.detailLabel}>
              Order ID
            </Text>
            <View style={styles.detailValueContainer}>
              <Text variant="bodyMedium" style={styles.detailValue}>
                {order.id}
              </Text>
              <MaterialCommunityIcons
                name="content-copy"
                size={16}
                color="#999"
              />
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text variant="bodySmall" style={styles.detailLabel}>
              Asset Pair
            </Text>
            <View style={styles.detailValueContainer}>
              <MaterialCommunityIcons
                name="bitcoin"
                size={16}
                color="#FF9500"
                style={{ marginRight: 4 }}
              />
              <Text variant="bodyMedium" style={styles.detailValue}>
                {order.ticker}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text variant="bodySmall" style={styles.detailLabel}>
              Side
            </Text>
            <Text
              variant="bodyMedium"
              style={[
                styles.detailValue,
                {
                  color: order.side === "BUY" ? "#00C853" : "#FF3B30",
                  fontWeight: "600",
                },
              ]}
            >
              {order.side}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text variant="bodySmall" style={styles.detailLabel}>
              Type
            </Text>
            <Text variant="bodyMedium" style={styles.detailValue}>
              {order.type} Order
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text variant="bodySmall" style={styles.detailLabel}>
              Quantity
            </Text>
            <Text variant="bodyMedium" style={styles.detailValue}>
              {order.quantity}{" "}
              {order.ticker.includes("/")
                ? order.ticker.split("/")[0]
                : "Shares"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text variant="bodySmall" style={styles.detailLabel}>
              Avg. Price
            </Text>
            <Text variant="bodyMedium" style={styles.detailValue}>
              $
              {order.executedPrice.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </View>
        </View>

        <View style={styles.totalContainer}>
          <Text variant="headlineLarge" style={styles.totalAmount}>
            $
            {totalSpent.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
          <Text variant="bodySmall" style={styles.totalLabel}>
            Total Spent
          </Text>
        </View>

        <Button
          mode="contained"
          onPress={handleBackToMarkets}
          style={styles.primaryButton}
          labelStyle={styles.primaryButtonLabel}
        >
          Back to Markets
        </Button>

        <TouchableOpacity onPress={handleViewPortfolio}>
          <Text style={styles.linkText}>View Portfolio</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontWeight: "600",
    color: "#999",
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
    paddingHorizontal: 24,
  },
  statusIconContainer: {
    marginTop: 40,
    marginBottom: 24,
  },
  statusIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  statusTitle: {
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 16,
  },
  statusBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  statusMessage: {
    textAlign: "center",
    color: "#666",
    marginBottom: 32,
    lineHeight: 22,
  },
  detailsCard: {
    width: "100%",
    backgroundColor: "#fafafa",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  detailLabel: {
    color: "#999",
    fontSize: 14,
  },
  detailValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailValue: {
    color: "#1a1a1a",
    fontSize: 14,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  totalContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  totalAmount: {
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  totalLabel: {
    color: "#999",
  },
  primaryButton: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 6,
    backgroundColor: "#6200ee",
    marginBottom: 16,
  },
  primaryButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  linkText: {
    color: "#6200ee",
    fontSize: 15,
    fontWeight: "600",
  },
});
