import { useState, useMemo } from "react";
import { StyleSheet, View, FlatList, ScrollView } from "react-native";
import { Text, Button, Chip } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useOrderHistory } from "../context/OrderHistoryContext";
import HistoryCard from "../components/HistoryCard";
import AppHeader from "../../../shared/components/AppHeader";
import { OrderHistoryItem, OrderStatus } from "../types/history.types";
import { RootStackParamList } from "../../../navigation/types";

type HistoryScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

type FilterType = "ALL" | OrderStatus;

export default function HistoryScreen() {
  const navigation = useNavigation<HistoryScreenNavigationProp>();
  const { orders, clearHistory, isLoading } = useOrderHistory();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("ALL");

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
        <AppHeader screenName="Historial" />
        <View style={styles.centerContainer}>
          <Text variant="bodyMedium">Cargando historial...</Text>
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
          All
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
          Filled
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
          Pending
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
          Rejected
        </Chip>
      </ScrollView>
    </View>
  );

  if (orders.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppHeader screenName="Order History" />
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons name="history" size={64} color="#ccc" />
          <Text variant="headlineMedium" style={styles.emptyTitle}>
            No History
          </Text>
          <Text variant="bodyMedium" style={styles.emptySubtitle}>
            Your executed orders will appear here
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader screenName="Order History" />
      <View style={styles.container}>
        {renderFilters()}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
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
          <View style={styles.bottomPadding} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
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
  filtersWrapper: {
    height: 60,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  filterChip: {
    marginRight: 8,
    borderRadius: 20,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
    height: 36,
  },
  filterChipSelectedAll: {
    backgroundColor: "#6200ee",
  },
  filterChipSelectedFilled: {
    backgroundColor: "#00C853",
  },
  filterChipSelectedPending: {
    backgroundColor: "#FF9500",
  },
  filterChipSelectedRejected: {
    backgroundColor: "#FF3B30",
  },
  filterChipText: {
    fontSize: 14,
    color: "#666",
  },
  filterChipTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  monthHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#999",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  bottomPadding: {
    height: 80,
  },
  emptyTitle: {
    marginTop: 16,
    color: "#666",
  },
  emptySubtitle: {
    color: "#999",
    textAlign: "center",
  },
});
