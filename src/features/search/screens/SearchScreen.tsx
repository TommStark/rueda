import { useState } from "react";
import { View, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { Text, Searchbar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSearch, useSearchError } from "../hooks/useSearch";
import SearchResultCard from "../components/SearchResultCard";
import SearchResultSkeleton from "../components/SearchResultSkeleton";
import { SearchResult } from "../types/search.types";
import { useDebouncedValue } from "../../../shared/hooks/useDebouncedValue";
import { styles } from "../styles/SearchScreen.styles";

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
        <View style={styles.listContent}>
          {Array.from({ length: 5 }).map((_, index) => (
            <SearchResultSkeleton key={index} />
          ))}
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
