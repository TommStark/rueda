import { useState, useCallback, useMemo } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text, ActivityIndicator, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMarket, useMarketError } from "../hooks/useMarket";
import MarketCard from "../components/MarketCard";
import FilterTabs from "../components/FilterTabs";
import { MarketAsset, AssetType } from "../../../shared/types/api.types";
import { useDebouncedValue } from "../../../shared/hooks/useDebouncedValue";

export default function MarketScreen() {
  const [selectedType, setSelectedType] = useState<AssetType>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebouncedValue(searchQuery, 500);

  const { data, isLoading, error, refetch, isRefetching } = useMarket(
    selectedType,
    debouncedSearch
  );

  const apiError = useMarketError(error);
  const allAssets = data || [];

  const renderAssetsList = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200ee" />
          <Text variant="bodyMedium" style={styles.loadingText}>
            Cargando activos...
          </Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.loadingContainer}>
          <MaterialCommunityIcons
            name="alert-circle"
            size={48}
            color="#f44336"
          />
          <Text variant="bodyMedium" style={styles.errorMessage}>
            {apiError?.message || "Error al cargar activos"}
          </Text>
        </View>
      );
    }

    if (allAssets.length === 0) {
      return (
        <View style={styles.loadingContainer}>
          <MaterialCommunityIcons
            name="chart-line-variant"
            size={48}
            color="#999"
          />
          <Text variant="bodyMedium" style={styles.emptyText}>
            No se encontraron activos
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={allAssets}
        keyExtractor={(item: MarketAsset, index) => `${item.id}-${index}`}
        renderItem={({ item }) => <MarketCard asset={item} />}
        onRefresh={refetch}
        refreshing={isRefetching}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text variant="headlineMedium" style={styles.title}>
            Market
          </Text>
          <MaterialCommunityIcons name="bell-outline" size={24} color="#000" />
        </View>
        <Searchbar
          placeholder="Search (e.g., MTR, MOLA)..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          inputStyle={styles.searchInput}
        />
        <FilterTabs
          selectedType={selectedType}
          onTypeChange={setSelectedType}
        />
        <View style={styles.sectionHeader}>
          <Text variant="labelMedium" style={styles.sectionTitle}>
            TRENDING ASSETS
          </Text>
          <Text variant="labelSmall" style={styles.sectionSubtitle}>
            Last 24h
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>{renderAssetsList()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    backgroundColor: "#fff",
    paddingTop: 16,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontWeight: "bold",
  },
  searchbar: {
    marginHorizontal: 16,
    marginBottom: 8,
    elevation: 0,
    backgroundColor: "#f5f5f5",
  },
  searchInput: {
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sectionTitle: {
    color: "#666",
    fontWeight: "600",
  },
  sectionSubtitle: {
    color: "#999",
  },
  listContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 12,
  },
  loadingText: {
    color: "#666",
  },
  errorMessage: {
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },
  emptyText: {
    color: "#666",
    marginTop: 8,
  },
});
