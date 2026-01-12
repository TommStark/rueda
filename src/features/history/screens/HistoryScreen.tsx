import { useState, useMemo } from "react";
import { View, FlatList, ScrollView } from "react-native";
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
import { styles } from "../styles/HistoryScreen.styles";

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
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <AppHeader screenName="Order History" />
      <View style={styles.container}>
        {renderFilters()}
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
      </View>
    </SafeAreaView>
  );
}
