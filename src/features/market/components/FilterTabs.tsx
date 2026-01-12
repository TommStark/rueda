import { StyleSheet, View, ScrollView } from "react-native";
import { Chip } from "react-native-paper";
import { SortType, SORT_TYPE } from "../types/market.types";

interface FilterTabsProps {
  selectedSort: SortType;
  onSortChange: (sort: SortType) => void;
}

const SORT_OPTIONS: { label: string; value: SortType }[] = [
  { label: "All", value: SORT_TYPE.ALL },
  { label: "Top Gainers", value: SORT_TYPE.GAINERS },
  { label: "Top Losers", value: SORT_TYPE.LOSERS },
  { label: "A-Z", value: SORT_TYPE.A_Z },
  { label: "Price", value: SORT_TYPE.PRICE },
];

export default function FilterTabs({
  selectedSort,
  onSortChange,
}: FilterTabsProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {SORT_OPTIONS.map((option) => (
          <Chip
            key={option.value}
            selected={selectedSort === option.value}
            onPress={() => onSortChange(option.value)}
            style={[
              styles.chip,
              selectedSort === option.value && styles.chipSelected,
            ]}
            textStyle={[
              styles.chipText,
              selectedSort === option.value && styles.chipTextSelected,
            ]}
            mode={selectedSort === option.value ? "flat" : "outlined"}
          >
            {option.label}
          </Chip>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    borderRadius: 20,
    borderColor: "#e0e0e0",
  },
  chipSelected: {
    backgroundColor: "#6200ee",
  },
  chipText: {
    fontSize: 14,
  },
  chipTextSelected: {
    color: "#fff",
  },
});
