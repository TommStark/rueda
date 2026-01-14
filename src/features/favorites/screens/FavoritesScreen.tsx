import { View, FlatList, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import GreenStatusBar from "../../../shared/components/GreenStatusBar";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "../../../shared/hooks/useTranslation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
import { useFavorites } from "../../../shared/context/FavoritesContext";
import { useMarket } from "../../market/hooks/useMarket";
import FavoriteAssetRow from "../components/FavoriteAssetRow";
import { MarketAsset } from "../../market/types/market.types";
import { colors } from "../../../shared/theme/colors";
import { styles } from "../styles/FavoritesScreen.styles";

type FavoritesNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function FavoritesScreen() {
  const { t } = useTranslation("favorites");
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
      <Ionicons name="star-outline" size={64} color={colors.text.quaternary} />
      <Text style={styles.emptyTitle}>{t("empty.title")}</Text>
      <Text style={styles.emptySubtitle}>{t("empty.subtitle")}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <GreenStatusBar />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("title")}</Text>
      </View>

      <View style={styles.tableHeader}>
        <Text style={styles.columnHeader}>{t("table.asset")}</Text>
        <Text style={styles.columnHeader}>{t("table.trend")}</Text>
        <Text style={styles.columnHeaderRight}>{t("table.price")}</Text>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{t("loading")}</Text>
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
