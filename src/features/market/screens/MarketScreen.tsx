import { useState, useCallback, useMemo, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMarket, useMarketError } from "../hooks/useMarket";
import MarketCard from "../components/MarketCard";
import MarketCardSkeleton from "../components/MarketCardSkeleton";
import FilterTabs from "../components/FilterTabs";
import AppHeader from "../../../shared/components/AppHeader";
import { MarketAsset, SortType, SORT_TYPE } from "../types/market.types";
import { useDebouncedValue } from "../../../shared/hooks/useDebouncedValue";
import { RootStackParamList } from "../../../navigation/types";

type MarketScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function MarketScreen() {
  const navigation = useNavigation<MarketScreenNavigationProp>();
  const [selectedSort, setSelectedSort] = useState<SortType>(SORT_TYPE.ALL);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebouncedValue(searchQuery, 500);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setSearchQuery("");
        setSelectedSort(SORT_TYPE.ALL);
      };
    }, [])
  );

  const { data, isLoading, error, refetch, isRefetching } =
    useMarket(debouncedSearch);

  const apiError = useMarketError(error);

  const sortAssets = (
    assets: MarketAsset[],
    sortType: SortType
  ): MarketAsset[] => {
    const sorted = [...assets];

    switch (sortType) {
      case SORT_TYPE.GAINERS:
        return sorted.sort((a, b) => {
          const changeA =
            ((a.last_price - a.close_price) / a.close_price) * 100;
          const changeB =
            ((b.last_price - b.close_price) / b.close_price) * 100;
          return changeB - changeA;
        });
      case SORT_TYPE.LOSERS:
        return sorted.sort((a, b) => {
          const changeA =
            ((a.last_price - a.close_price) / a.close_price) * 100;
          const changeB =
            ((b.last_price - b.close_price) / b.close_price) * 100;
          return changeA - changeB;
        });
      case SORT_TYPE.A_Z:
        return sorted.sort((a, b) => a.ticker.localeCompare(b.ticker));
      case SORT_TYPE.PRICE:
        return sorted.sort((a, b) => b.last_price - a.last_price);
      case SORT_TYPE.ALL:
      default:
        return sorted;
    }
  };

  const allAssets = useMemo(() => {
    return sortAssets(data || [], selectedSort);
  }, [data, selectedSort]);

  const renderAssetsList = () => {
    if (isLoading) {
      return (
        <View>
          {Array.from({ length: 8 }).map((_, index) => (
            <MarketCardSkeleton key={index} />
          ))}
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
        renderItem={({ item }) => (
          <MarketCard
            asset={item}
            onPress={() => navigation.navigate("NewOrder", { asset: item })}
          />
        )}
        onRefresh={refetch}
        refreshing={isRefetching}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <AppHeader screenName="Market" />
      <View style={styles.headerContainer}>
        <Searchbar
          placeholder="Search (e.g., MTR, MOLA)..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          inputStyle={styles.searchInput}
        />
        <FilterTabs
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
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
