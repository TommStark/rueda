import { useState, useCallback, useMemo } from 'react';
import { View, FlatList } from 'react-native';
import { Text, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../../shared/theme/colors';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from '../../../shared/hooks/useTranslation';
import { useMarket, useMarketError } from '../hooks/useMarket';
import MarketCard from '../components/MarketCard';
import MarketCardSkeleton from '../components/MarketCardSkeleton';
import FilterTabs from '../components/FilterTabs';
import AppHeader from '../../../shared/components/AppHeader';
import GreenStatusBar from '../../../shared/components/GreenStatusBar';
import { MarketAsset, SortType, SORT_TYPE } from '../types/market.types';
import { useDebouncedValue } from '../../../shared/hooks/useDebouncedValue';
import { RootStackParamList } from '../../../navigation/types';
import { styles } from '../styles/MarketScreen.styles';

type MarketScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function MarketScreen() {
  const { t } = useTranslation('market');
  const navigation = useNavigation<MarketScreenNavigationProp>();
  const [selectedSort, setSelectedSort] = useState<SortType>(SORT_TYPE.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebouncedValue(searchQuery, 500);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setSearchQuery('');
        setSelectedSort(SORT_TYPE.ALL);
      };
    }, [])
  );

  const { data, isLoading, error, refetch, isRefetching } =
    useMarket(debouncedSearch);

  const apiError = useMarketError(error);

  const sortAssets = (
    assets: MarketAsset[],
    sortType: SortType
  ): MarketAsset[] => {
    const sorted = [...assets];

    switch (sortType) {
      case SORT_TYPE.GAINERS:
        return sorted.sort((a, b) => {
          const changeA =
            ((a.last_price - a.close_price) / a.close_price) * 100;
          const changeB =
            ((b.last_price - b.close_price) / b.close_price) * 100;
          return changeB - changeA;
        });
      case SORT_TYPE.LOSERS:
        return sorted.sort((a, b) => {
          const changeA =
            ((a.last_price - a.close_price) / a.close_price) * 100;
          const changeB =
            ((b.last_price - b.close_price) / b.close_price) * 100;
          return changeA - changeB;
        });
      case SORT_TYPE.A_Z:
        return sorted.sort((a, b) => a.ticker.localeCompare(b.ticker));
      case SORT_TYPE.PRICE:
        return sorted.sort((a, b) => b.last_price - a.last_price);
      case SORT_TYPE.ALL:
      default:
        return sorted;
    }
  };

  const allAssets = useMemo(() => {
    return sortAssets(data || [], selectedSort);
  }, [data, selectedSort]);

  const renderAssetsList = () => {
    if (isLoading) {
      return (
        <View>
          {Array.from({ length: 8 }).map((_, index) => (
            <MarketCardSkeleton key={index} />
          ))}
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.loadingContainer}>
          <MaterialCommunityIcons
            name="alert-circle"
            size={48}
            color={colors.status.error}
          />
          <Text variant="bodyMedium" style={styles.errorMessage}>
            {apiError?.message || t('errors.loading')}
          </Text>
        </View>
      );
    }

    if (allAssets.length === 0) {
      return (
        <View style={styles.loadingContainer}>
          <MaterialCommunityIcons
            name="chart-line-variant"
            size={48}
            color={colors.text.quaternary}
          />
          <Text variant="bodyMedium" style={styles.emptyText}>
            {t('errors.notFound')}
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={allAssets}
        keyExtractor={(item: MarketAsset, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <MarketCard
            asset={item}
            onPress={() => navigation.navigate('NewOrder', { asset: item })}
          />
        )}
        onRefresh={refetch}
        refreshing={isRefetching}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <GreenStatusBar />
      <AppHeader screenName="Market" />
      <View style={styles.headerContainer}>
        <Searchbar
          placeholder={t('search.placeholder')}
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          inputStyle={styles.searchInput}
        />
        <FilterTabs
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
        />
        <View style={styles.sectionHeader}>
          <Text variant="labelMedium" style={styles.sectionTitle}>
            {t('section.trending')}
          </Text>
          <Text variant="labelSmall" style={styles.sectionSubtitle}>
            {t('section.last24h')}
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>{renderAssetsList()}</View>
    </SafeAreaView>
  );
}
