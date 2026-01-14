import { View, ScrollView } from 'react-native';
import { Chip } from 'react-native-paper';
import { useTranslation } from '../../../shared/hooks/useTranslation';
import { SortType, SORT_TYPE } from '../types/market.types';
import { styles } from '../styles/FilterTabs.styles';

interface FilterTabsProps {
  selectedSort: SortType;
  onSortChange: (sort: SortType) => void;
}

export default function FilterTabs({
  selectedSort,
  onSortChange,
}: FilterTabsProps) {
  const { t } = useTranslation('market');

  const SORT_OPTIONS: { label: string; value: SortType }[] = [
    { label: t('filters.all'), value: SORT_TYPE.ALL },
    { label: t('filters.gainers'), value: SORT_TYPE.GAINERS },
    { label: t('filters.losers'), value: SORT_TYPE.LOSERS },
    { label: t('filters.az'), value: SORT_TYPE.A_Z },
    { label: t('filters.price'), value: SORT_TYPE.PRICE },
  ];
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {SORT_OPTIONS.map(option => (
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
            mode={selectedSort === option.value ? 'flat' : 'outlined'}
          >
            {option.label}
          </Chip>
        ))}
      </ScrollView>
    </View>
  );
}
