import { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Text, ActivityIndicator, Searchbar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSearch, useSearchError } from "../hooks/useSearch";
import SearchResultCard from "../components/SearchResultCard";
import { SearchResult } from "../types/search.types";
import { useDebouncedValue } from "../../../shared/hooks/useDebouncedValue";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebouncedValue(searchQuery, 500);
  const { data, isLoading, error } = useSearch(
    debouncedQuery,
    debouncedQuery.length > 0
  );
  const apiError = useSearchError(error);

  const renderContent = () => {
    if (!searchQuery) {
      return (
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons name="magnify" size={48} color="#6200ee" />
          <Text variant="headlineMedium">Buscar</Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Ingresa un ticker para buscar
          </Text>
        </View>
      );
    }

    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" />
          <Text variant="bodyMedium" style={styles.loadingText}>
            Buscando...
          </Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons
            name="alert-circle"
            size={48}
            color="#f44336"
          />
          <Text variant="headlineSmall" style={styles.errorTitle}>
            Error
          </Text>
          <Text variant="bodyMedium" style={styles.errorMessage}>
            {apiError?.message || "Error al buscar"}
          </Text>
        </View>
      );
    }

    if (!data || data.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <MaterialCommunityIcons
            name="file-search-outline"
            size={48}
            color="#666"
          />
          <Text variant="headlineMedium">Sin resultados</Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            No se encontraron instrumentos para "{searchQuery}"
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={data}
        keyExtractor={(item: SearchResult) => item.id.toString()}
        renderItem={({ item }) => <SearchResultCard result={item} />}
        contentContainerStyle={styles.listContent}
      />
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Buscar por ticker..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>
      {renderContent()}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  searchbar: {
    elevation: 2,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  loadingText: {
    marginTop: 8,
    color: "#666",
  },
  errorTitle: {
    marginTop: 8,
  },
  errorMessage: {
    color: "#666",
    textAlign: "center",
  },
  subtitle: {
    color: "#666",
    textAlign: "center",
  },
});
