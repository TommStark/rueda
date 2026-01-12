import { View, FlatList, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
import { useFavorites } from "../../../shared/context/FavoritesContext";
import { useMarket } from "../../market/hooks/useMarket";
import FavoriteAssetRow from "../components/FavoriteAssetRow";
import { MarketAsset } from "../../market/types/market.types";
import { styles } from "../styles/FavoritesScreen.styles";

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
