import { StyleSheet, View, ScrollView } from "react-native";
import { Chip } from "react-native-paper";
import { AssetType, ASSET_TYPE } from "../types/market.types";

interface FilterTabsProps {
  selectedType: AssetType;
  onTypeChange: (type: AssetType) => void;
}

const FILTER_OPTIONS: { label: string; value: AssetType }[] = [
  { label: "All", value: ASSET_TYPE.ALL },
  { label: "Stocks", value: ASSET_TYPE.STOCK },
  { label: "Crypto", value: ASSET_TYPE.CRYPTO },
  { label: "Gainers", value: ASSET_TYPE.GAINER },
];

export default function FilterTabs({
  selectedType,
  onTypeChange,
}: FilterTabsProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {FILTER_OPTIONS.map((option) => (
          <Chip
            key={option.value}
            selected={selectedType === option.value}
            onPress={() => onTypeChange(option.value)}
            style={[
              styles.chip,
              selectedType === option.value && styles.chipSelected,
            ]}
            textStyle={[
              styles.chipText,
              selectedType === option.value && styles.chipTextSelected,
            ]}
            mode={selectedType === option.value ? "flat" : "outlined"}
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
