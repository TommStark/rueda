import { View, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import AssetCard from "../components/AssetCard";
import { RootStackParamList } from "../../../navigation/types";
import { styles } from "../styles/AllAssetsScreen.styles";

export default function AllAssetsScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "AllAssets">>();
  const { assets } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Assets</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={assets}
        keyExtractor={(item, index) => `${item.ticker}-${index}`}
        renderItem={({ item }) => <AssetCard position={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
