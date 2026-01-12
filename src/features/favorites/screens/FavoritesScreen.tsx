import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
import { useFavorites } from "../../../shared/context/FavoritesContext";
import { useMarket } from "../../market/hooks/useMarket";
import FavoriteAssetRow from "../components/FavoriteAssetRow";
import { MarketAsset } from "../../market/types/market.types";

type FavoritesNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function FavoritesScreen() {
  const navigation = useNavigation<FavoritesNavigationProp>();
  const { favorites } = useFavorites();
  const { data: marketAssets, isLoading } = useMarket();

  const favoriteAssets = marketAssets?.filter((asset) =>
    favorites.includes(asset.ticker.toUpperCase())
  );

  const handleAssetPress = (asset: MarketAsset) => {
    navigation.navigate("NewOrder", { asset });
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No Favorites Yet</Text>
      <Text style={styles.emptySubtitle}>
        Add assets to your favorites by tapping the star icon
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
      </View>

      <View style={styles.tableHeader}>
        <Text style={styles.columnHeader}>ASSET</Text>
        <Text style={styles.columnHeader}>TREND (24H)</Text>
        <Text style={styles.columnHeaderRight}>PRICE</Text>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteAssets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <FavoriteAssetRow
              asset={item}
              onPress={() => handleAssetPress(item)}
            />
          )}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={
            !favoriteAssets?.length && styles.emptyListContent
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1a1a1a",
    letterSpacing: -0.5,
  },
  tableHeader: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#fafafa",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  columnHeader: {
    flex: 1,
    fontSize: 11,
    fontWeight: "700",
    color: "#999",
    letterSpacing: 0.5,
  },
  columnHeaderRight: {
    width: 80,
    fontSize: 11,
    fontWeight: "700",
    color: "#999",
    letterSpacing: 0.5,
    textAlign: "right",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 14,
    color: "#999",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    lineHeight: 20,
  },
});
