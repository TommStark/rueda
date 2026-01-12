import { View, TouchableOpacity, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { styles } from "./styles/OrderReceipt.styles";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "../hooks/useTranslation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OrderHistoryItem } from "../../features/history/types/history.types";
import { RootStackParamList } from "../../navigation/types";

interface OrderReceiptProps {
  order: OrderHistoryItem;
}

type OrderReceiptNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function OrderReceipt({ order }: OrderReceiptProps) {
  const { t } = useTranslation("common");
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
        return colors.status.success;
      case "REJECTED":
        return colors.status.error;
      case "PENDING":
        return colors.status.warning;
      default:
        return colors.text.quaternary;
    }
  };

  const getStatusTitle = () => {
    switch (order.status) {
      case "FILLED":
        return t("orderReceipt.status.filled");
      case "REJECTED":
        return t("orderReceipt.status.rejected");
      case "PENDING":
        return t("orderReceipt.status.pending");
      default:
        return t("orderReceipt.status.default");
    }
  };

  const getStatusBadge = () => {
    switch (order.status) {
      case "FILLED":
        return t("orderReceipt.badge.confirmed");
      case "REJECTED":
        return t("orderReceipt.badge.failed");
      case "PENDING":
        return t("orderReceipt.badge.processing");
      default:
        return "";
    }
  };

  const getStatusMessage = () => {
    const type = order.type.toLowerCase();
    const side = order.side.toLowerCase();
    const ticker = order.ticker;

    switch (order.status) {
      case "FILLED":
        return `Tu orden ${type} para ${side} ${ticker} ha sido ejecutada completamente.`;
      case "REJECTED":
        return `Tu orden ${type} para ${side} ${ticker} fue rechazada.`;
      case "PENDING":
        return `Tu orden ${type} para ${side} ${ticker} está siendo procesada.`;
      default:
        return "";
    }
  };

  const totalSpent = order.executedPrice * order.quantity;

  const handleClose = () => {
    navigation.goBack();
  };

  const handleBackToMarkets = () => {
    navigation.goBack();
  };

  const handleViewPortfolio = () => {
    navigation.navigate("MainTabs", { screen: "Portfolio" });
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <View style={{ width: 24 }} />
        <Text variant="titleMedium" style={styles.headerTitle}>
          {t("orderReceipt.title")}
        </Text>
        <TouchableOpacity onPress={handleClose}>
          <Ionicons name="close" size={24} color={colors.text.tertiary} />
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
              styles.statusIconOuterCircle,
              { backgroundColor: getStatusColor() + "17" },
            ]}
          >
            <View
              style={[
                styles.statusIconInnerCircle,
                { backgroundColor: getStatusColor() },
              ]}
            >
              <MaterialCommunityIcons
                name={getStatusIcon()}
                size={32}
                color={colors.text.inverse}
              />
            </View>
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
              {t("orderReceipt.details.orderId")}
            </Text>
            <View style={styles.detailValueContainer}>
              <Text variant="bodyMedium" style={styles.detailValue}>
                {order.id}
              </Text>
              <MaterialCommunityIcons
                name="content-copy"
                size={16}
                color={colors.text.quaternary}
              />
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text variant="bodySmall" style={styles.detailLabel}>
              {t("orderReceipt.details.assetPair")}
            </Text>
            <View style={styles.detailValueContainer}>
              <MaterialCommunityIcons
                name="bitcoin"
                size={16}
                color={colors.status.warning}
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
              {t("orderReceipt.details.side")}
            </Text>
            <Text
              variant="bodyMedium"
              style={[
                styles.detailValue,
                order.side === "BUY"
                  ? styles.detailValueBuy
                  : styles.detailValueSell,
              ]}
            >
              {order.side}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text variant="bodySmall" style={styles.detailLabel}>
              {t("orderReceipt.details.type")}
            </Text>
            <Text variant="bodyMedium" style={styles.detailValue}>
              {order.type} {t("orderReceipt.details.order")}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text variant="bodySmall" style={styles.detailLabel}>
              {t("orderReceipt.details.quantity")}
            </Text>
            <Text variant="bodyMedium" style={styles.detailValue}>
              {order.quantity}{" "}
              {order.ticker.includes("/")
                ? order.ticker.split("/")[0]
                : t("orderReceipt.details.shares")}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text variant="bodySmall" style={styles.detailLabel}>
              {t("orderReceipt.details.avgPrice")}
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
            {t("orderReceipt.totalSpent")}
          </Text>
        </View>

        <Button
          mode="contained"
          onPress={handleBackToMarkets}
          style={styles.primaryButton}
          labelStyle={styles.primaryButtonLabel}
        >
          {t("orderReceipt.backToMarkets")}
        </Button>

        <TouchableOpacity onPress={handleViewPortfolio}>
          <Text style={styles.linkText}>{t("orderReceipt.viewPortfolio")}</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
