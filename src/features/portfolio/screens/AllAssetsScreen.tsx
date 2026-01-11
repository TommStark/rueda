import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import AssetCard from "../components/AssetCard";
import { RootStackParamList } from "../../../navigation/RootStackNavigator";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fafafa",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1a1a1a",
    letterSpacing: -0.3,
  },
  placeholder: {
    width: 40,
  },
  listContent: {
    paddingTop: 8,
  },
});
