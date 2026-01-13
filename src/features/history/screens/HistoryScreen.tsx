import React, { useState, useMemo } from "react";
import { View, FlatList, ScrollView } from "react-native";
import { Text, Button, Chip } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../shared/theme/colors";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "../../../shared/hooks/useTranslation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useOrderHistory } from "../context/OrderHistoryContext";
import HistoryCard from "../components/HistoryCard";
import AppHeader from "../../../shared/components/AppHeader";
import { OrderHistoryItem, OrderStatus } from "../types/history.types";
import { RootStackParamList } from "../../../navigation/types";
import { styles } from "../styles/HistoryScreen.styles";

type HistoryScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

type FilterType = "ALL" | OrderStatus;

export default function HistoryScreen() {
  const { t } = useTranslation("history");
  const navigation = useNavigation<HistoryScreenNavigationProp>();
  const { orders, clearHistory, isLoading } = useOrderHistory();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("ALL");

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setSelectedFilter("ALL");
      };
    }, [])
  );

  const filteredOrders = useMemo(() => {
    if (selectedFilter === "ALL") return orders;
    return orders.filter((order) => order.status === selectedFilter);
  }, [orders, selectedFilter]);

  const groupedOrders = useMemo(() => {
    const groups: { [key: string]: OrderHistoryItem[] } = {};
    filteredOrders.forEach((order) => {
      const date = new Date(order.timestamp);
      const monthYear = date
        .toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
        .toUpperCase();
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(order);
    });
    return groups;
  }, [filteredOrders]);

  const handleOrderPress = (order: OrderHistoryItem) => {
    navigation.navigate("OrderReceipt", { order });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppHeader screenName={t("title")} />
        <View style={styles.centerContainer}>
          <Text variant="bodyMedium">{t("loading")}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderFilters = () => (
    <View style={styles.filtersWrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        <Chip
          selected={selectedFilter === "ALL"}
          onPress={() => setSelectedFilter("ALL")}
          style={[
            styles.filterChip,
            selectedFilter === "ALL" && styles.filterChipSelectedAll,
          ]}
          textStyle={[
            styles.filterChipText,
            selectedFilter === "ALL" && styles.filterChipTextSelected,
          ]}
          mode={selectedFilter === "ALL" ? "flat" : "outlined"}
        >
          {t("filters.all")}
        </Chip>
        <Chip
          selected={selectedFilter === "FILLED"}
          onPress={() => setSelectedFilter("FILLED")}
          style={[
            styles.filterChip,
            selectedFilter === "FILLED" && styles.filterChipSelectedFilled,
          ]}
          textStyle={[
            styles.filterChipText,
            selectedFilter === "FILLED" && styles.filterChipTextSelected,
          ]}
          mode={selectedFilter === "FILLED" ? "flat" : "outlined"}
        >
          {t("filters.filled")}
        </Chip>
        <Chip
          selected={selectedFilter === "PENDING"}
          onPress={() => setSelectedFilter("PENDING")}
          style={[
            styles.filterChip,
            selectedFilter === "PENDING" && styles.filterChipSelectedPending,
          ]}
          textStyle={[
            styles.filterChipText,
            selectedFilter === "PENDING" && styles.filterChipTextSelected,
          ]}
          mode={selectedFilter === "PENDING" ? "flat" : "outlined"}
        >
          {t("filters.pending")}
        </Chip>
        <Chip
          selected={selectedFilter === "REJECTED"}
          onPress={() => setSelectedFilter("REJECTED")}
          style={[
            styles.filterChip,
            selectedFilter === "REJECTED" && styles.filterChipSelectedRejected,
          ]}
          textStyle={[
            styles.filterChipText,
            selectedFilter === "REJECTED" && styles.filterChipTextSelected,
          ]}
          mode={selectedFilter === "REJECTED" ? "flat" : "outlined"}
        >
          {t("filters.rejected")}
        </Chip>
      </ScrollView>
    </View>
  );

  if (orders.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppHeader screenName={t("title")} />
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons
            name="history"
            size={64}
            color={colors.border.dark}
          />
          <Text variant="headlineMedium" style={styles.emptyTitle}>
            {t("empty.title")}
          </Text>
          <Text variant="bodyMedium" style={styles.emptySubtitle}>
            {t("empty.subtitle")}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const getEmptyFilterMessage = () => {
    switch (selectedFilter) {
      case "FILLED":
        return t("emptyFilters.filled");
      case "PENDING":
        return t("emptyFilters.pending");
      case "REJECTED":
        return t("emptyFilters.rejected");
      default:
        return t("empty.subtitle");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <AppHeader screenName={t("title")} />
      <View style={styles.container}>
        {renderFilters()}
        {filteredOrders.length === 0 ? (
          <View style={styles.centerContainer}>
            <MaterialCommunityIcons
              name="filter-off-outline"
              size={48}
              color={colors.border.dark}
            />
            <Text variant="bodyMedium" style={styles.emptyFilterText}>
              {getEmptyFilterMessage()}
            </Text>
          </View>
        ) : (
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 0 }}
          >
            {Object.entries(groupedOrders).map(([monthYear, monthOrders]) => (
              <View key={monthYear}>
                <Text variant="labelMedium" style={styles.monthHeader}>
                  {monthYear}
                </Text>
                {monthOrders.map((order) => (
                  <HistoryCard
                    key={order.id}
                    order={order}
                    onPress={() => handleOrderPress(order)}
                  />
                ))}
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
