import { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
import {
  OrderSide,
  OrderType,
  OrderStatus,
} from "../../orders/types/orders.types";
import { createOrder } from "../../orders/api/orders.api";
import {
  getTickerIcon,
  hasTickerIcon,
  getTickerColor,
} from "../../../shared/utils/icons";
import SwipeButton from "rn-swipe-button";
import { useOrderHistory } from "../../history/context/OrderHistoryContext";
import { useFavorites } from "../../../shared/context/FavoritesContext";

type NewOrderRouteProp = RouteProp<RootStackParamList, "NewOrder">;
type NewOrderNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type InputMode = "QTY" | "UNIT";

export default function NewOrderScreen() {
  const navigation = useNavigation<NewOrderNavigationProp>();
  const route = useRoute<NewOrderRouteProp>();
  const { asset } = route.params;
  const { addOrder } = useOrderHistory();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [side, setSide] = useState<OrderSide>("BUY");
  const [orderType, setOrderType] = useState<OrderType>("MARKET");
  const [inputMode, setInputMode] = useState<InputMode>("QTY");
  const [quantity, setQuantity] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [limitPrice, setLimitPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOrderTypeMenu, setShowOrderTypeMenu] = useState(false);

  const tickerIcon = getTickerIcon(asset.ticker);
  const hasIcon = hasTickerIcon(asset.ticker);
  const tickerColor = getTickerColor(asset.ticker);

  const priceChange =
    ((asset.last_price - asset.close_price) / asset.close_price) * 100;
  const isPositive = priceChange >= 0;

  const availableBalance = 5420.5;

  const calculateQuantity = (amount: string): number => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) return 0;
    return Math.floor(amountNum / asset.last_price);
  };

  const calculateTotal = (qty: string): number => {
    const qtyNum = parseInt(qty);
    if (isNaN(qtyNum) || qtyNum <= 0) return 0;
    const price =
      orderType === "LIMIT" && limitPrice
        ? parseFloat(limitPrice)
        : asset.last_price;
    return qtyNum * price;
  };

  const getEstimatedTotal = (): number => {
    if (inputMode === "QTY" && quantity) {
      return calculateTotal(quantity);
    } else if (inputMode === "UNIT" && totalAmount) {
      return parseFloat(totalAmount) || 0;
    }
    return 0;
  };

  const getQuantityToSubmit = (): number => {
    if (inputMode === "QTY") {
      return parseInt(quantity) || 0;
    } else {
      return calculateQuantity(totalAmount);
    }
  };

  const handleSubmitOrder = async () => {
    const qtyToSubmit = getQuantityToSubmit();

    if (qtyToSubmit <= 0) {
      alert("Please enter a valid quantity");
      return;
    }

    if (orderType === "LIMIT" && !limitPrice) {
      alert("Please enter a limit price");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        instrument_id: asset.id,
        side,
        type: orderType,
        quantity: qtyToSubmit,
        ...(orderType === "LIMIT" && { price: parseFloat(limitPrice) }),
      };

      const result = await createOrder(orderData);

      const orderHistoryItem = {
        id: result.id,
        ticker: asset.ticker,
        instrumentId: asset.id,
        side,
        type: orderType,
        quantity: qtyToSubmit,
        price: orderType === "LIMIT" ? parseFloat(limitPrice) : undefined,
        executedPrice: asset.last_price,
        timestamp: Date.now(),
        status: result.status,
        assetName: asset.name,
      };

      await addOrder(orderHistoryItem);

      navigation.replace("OrderReceipt", { order: orderHistoryItem });
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to create order");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const handleToggleFavorite = () => {
    toggleFavorite(asset.ticker);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Order</Text>
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={styles.favoriteButton}
        >
          <MaterialCommunityIcons
            name={isFavorite(asset.ticker) ? "star" : "star-outline"}
            size={24}
            color="#FF9500"
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.assetHeader}>
          <View style={styles.assetIconContainer}>
            {hasIcon && tickerIcon ? (
              <Image source={tickerIcon} style={styles.assetIcon} />
            ) : tickerColor ? (
              <View
                style={[styles.assetIcon, { backgroundColor: tickerColor }]}
              >
                <Text style={styles.assetIconText}>
                  {asset.ticker.substring(0, 2).toUpperCase()}
                </Text>
              </View>
            ) : (
              <View style={[styles.assetIcon, styles.assetIconPlaceholder]}>
                <Text style={styles.assetIconText}>
                  {asset.ticker.substring(0, 2).toUpperCase()}
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.assetTicker}>{asset.ticker}</Text>
          <View style={styles.assetPriceRow}>
            <Text style={styles.assetPrice}>
              ${asset.last_price.toFixed(2)}
            </Text>
            <Text
              style={[
                styles.assetChange,
                isPositive ? styles.changePositive : styles.changeNegative,
              ]}
            >
              {isPositive ? "+" : ""}
              {priceChange.toFixed(2)}%
            </Text>
          </View>
        </View>

        <View style={styles.sideToggle}>
          <TouchableOpacity
            style={[
              styles.sideButton,
              styles.sideButtonLeft,
              side === "BUY" && styles.sideButtonActiveBuy,
            ]}
            onPress={() => setSide("BUY")}
          >
            <Text
              style={[
                styles.sideButtonText,
                side === "BUY" && styles.sideButtonTextActive,
              ]}
            >
              Buy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sideButton,
              styles.sideButtonRight,
              side === "SELL" && styles.sideButtonActiveSell,
            ]}
            onPress={() => setSide("SELL")}
          >
            <Text
              style={[
                styles.sideButtonText,
                side === "SELL" && styles.sideButtonTextActive,
              ]}
            >
              Sell
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ORDER TYPE</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowOrderTypeMenu(!showOrderTypeMenu)}
          >
            <Text style={styles.dropdownText}>
              {orderType === "MARKET" ? "Market Order" : "Limit Order"}
            </Text>
            <Ionicons
              name={showOrderTypeMenu ? "chevron-up" : "chevron-down"}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
          {showOrderTypeMenu && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity
                style={[
                  styles.dropdownItem,
                  orderType === "MARKET" && styles.dropdownItemActive,
                ]}
                onPress={() => {
                  setOrderType("MARKET");
                  setShowOrderTypeMenu(false);
                  setLimitPrice("");
                }}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    orderType === "MARKET" && styles.dropdownItemTextActive,
                  ]}
                >
                  Market Order
                </Text>
                {orderType === "MARKET" && (
                  <Ionicons name="checkmark" size={20} color="#6200ee" />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.dropdownItem,
                  orderType === "LIMIT" && styles.dropdownItemActive,
                ]}
                onPress={() => {
                  setOrderType("LIMIT");
                  setShowOrderTypeMenu(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    orderType === "LIMIT" && styles.dropdownItemTextActive,
                  ]}
                >
                  Limit Order
                </Text>
                {orderType === "LIMIT" && (
                  <Ionicons name="checkmark" size={20} color="#6200ee" />
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <Text style={styles.inputLabel}>SHARES</Text>
              <TouchableOpacity
                style={styles.unitToggle}
                onPress={() =>
                  setInputMode(inputMode === "QTY" ? "UNIT" : "QTY")
                }
              >
                <Text style={styles.unitToggleText}>
                  {inputMode === "QTY" ? "UNIT" : "QTY"}
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              value={inputMode === "QTY" ? quantity : totalAmount}
              onChangeText={(text) => {
                if (inputMode === "QTY") {
                  setQuantity(text.replace(/[^0-9]/g, ""));
                } else {
                  setTotalAmount(text.replace(/[^0-9.]/g, ""));
                }
              }}
              placeholder={inputMode === "QTY" ? "10" : "1000.00"}
              keyboardType="numeric"
            />
            <Text style={styles.inputHint}>
              {inputMode === "QTY" ? "Qty" : "Per Share"}
            </Text>
          </View>

          {orderType === "LIMIT" && (
            <View style={styles.inputGroup}>
              <View style={styles.inputHeader}>
                <Text style={styles.inputLabel}>PRICE</Text>
                <View style={styles.unitToggle}>
                  <Text style={styles.unitToggleText}>UNIT</Text>
                </View>
              </View>
              <TextInput
                style={styles.input}
                value={limitPrice}
                onChangeText={(text) =>
                  setLimitPrice(text.replace(/[^0-9.]/g, ""))
                }
                placeholder="148.50"
                keyboardType="numeric"
              />
              <Text style={styles.inputHint}>Per Share</Text>
            </View>
          )}
        </View>

        <View style={styles.totalSection}>
          <View style={styles.totalHeader}>
            <Text style={styles.totalLabel}>ESTIMATED TOTAL</Text>
            <Ionicons
              name="information-circle-outline"
              size={16}
              color="#999"
            />
          </View>
          <Text style={styles.totalAmount}>
            $
            {getEstimatedTotal().toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
          <View style={styles.balanceRow}>
            <View style={styles.balanceDot} />
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Text style={styles.balanceAmount}>
              $
              {availableBalance.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </Text>
          </View>
        </View>

        <SwipeButton
          containerStyles={styles.swipeButton}
          disabled={isSubmitting}
          disableResetOnTap={true}
          height={60}
          onSwipeSuccess={handleSubmitOrder}
          railBackgroundColor="#6200ee"
          railBorderColor="#6200ee"
          railFillBackgroundColor="#8c3eff"
          railFillBorderColor="#8c3eff"
          shouldResetAfterSuccess={true}
          swipeSuccessThreshold={70}
          thumbIconBackgroundColor="#fff"
          thumbIconBorderColor="#6200ee"
          title="Slide to Review Order"
          titleColor="#fff"
          titleFontSize={16}
          width="100%"
          railStyles={{
            borderRadius: 30,
          }}
          thumbIconStyles={{
            borderRadius: 26,
          }}
        />
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  favoriteButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  assetHeader: {
    alignItems: "center",
    paddingVertical: 24,
  },
  assetIconContainer: {
    marginBottom: 12,
  },
  assetIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  assetIconPlaceholder: {
    backgroundColor: "#e0e0e0",
  },
  assetIconText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
  },
  assetTicker: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  assetPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  assetPrice: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  assetChange: {
    fontSize: 14,
    fontWeight: "700",
  },
  changePositive: {
    color: "#4caf50",
  },
  changeNegative: {
    color: "#f44336",
  },
  sideToggle: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 12,
  },
  sideButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "transparent",
  },
  sideButtonLeft: {},
  sideButtonRight: {},
  sideButtonActiveBuy: {
    backgroundColor: "#e3f2fd",
    borderColor: "#2196f3",
  },
  sideButtonActiveSell: {
    backgroundColor: "#fce4ec",
    borderColor: "#f44336",
  },
  sideButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#666",
  },
  sideButtonTextActive: {
    color: "#1a1a1a",
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#999",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  dropdownMenu: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    overflow: "hidden",
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dropdownItemActive: {
    backgroundColor: "#f5f5f5",
  },
  dropdownItemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  dropdownItemTextActive: {
    color: "#6200ee",
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  inputGroup: {
    flex: 1,
  },
  inputHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#999",
    letterSpacing: 0.5,
  },
  unitToggle: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#e3f2fd",
    borderRadius: 6,
  },
  unitToggleText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#2196f3",
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 6,
  },
  inputHint: {
    fontSize: 12,
    color: "#999",
    fontWeight: "500",
  },
  totalSection: {
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  totalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#999",
    letterSpacing: 0.5,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 16,
    letterSpacing: -1,
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  balanceDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4caf50",
  },
  balanceLabel: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
    flex: 1,
  },
  balanceAmount: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  swipeButton: {
    marginBottom: 20,
    alignSelf: "center",
  },
  submitButton: {
    backgroundColor: "#6200ee",
    borderRadius: 16,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
  },
  resultContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  statusBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 32,
  },
  statusFilled: {
    backgroundColor: "#e8f5e9",
  },
  statusPending: {
    backgroundColor: "#fff3e0",
  },
  statusRejected: {
    backgroundColor: "#ffebee",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1a1a1a",
  },
  resultLabel: {
    fontSize: 13,
    color: "#999",
    marginBottom: 8,
    fontWeight: "600",
  },
  resultValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 32,
  },
  doneButton: {
    backgroundColor: "#6200ee",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 48,
  },
  doneButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
  },
});
