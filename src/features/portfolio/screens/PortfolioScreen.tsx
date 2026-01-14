import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../shared/theme/colors';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from '../../../shared/hooks/useTranslation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { usePortfolio, usePortfolioError } from '../hooks/usePortfolio';
import AssetCard from '../components/AssetCard';
import AssetCardSkeleton from '../components/AssetCardSkeleton';
import PortfolioBalanceSkeleton from '../components/PortfolioBalanceSkeleton';
import SimpleBalanceChart from '../components/SimpleBalanceChart';
import AppHeader from '../../../shared/components/AppHeader';
import GreenStatusBar from '../../../shared/components/GreenStatusBar';
import { PortfolioPosition } from '../types/portfolio.types';
import { RootStackParamList } from '../../../navigation/types';
import {
  calcMarketValue,
  calcCostBasis,
} from '../../../shared/utils/financialCalculations';
import { styles } from '../styles/PortfolioScreen.styles';

export default function PortfolioScreen() {
  const { t } = useTranslation('portfolio');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data, isLoading, error } = usePortfolio();
  const apiError = usePortfolioError(error);

  const totalValue = data?.reduce(
    (sum, pos) => sum + calcMarketValue(pos.quantity, pos.last_price),
    0
  );

  const totalCostValue = data?.reduce(
    (sum, pos) => sum + calcCostBasis(pos.quantity, pos.avg_cost_price),
    0
  );

  const totalChange = (totalValue || 0) - (totalCostValue || 0);
  const totalChangePercent =
    totalCostValue && totalCostValue > 0
      ? (totalChange / totalCostValue) * 100
      : 0;
  const isPositive = totalChange >= 0;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppHeader screenName="Portfolio" />
        <View style={styles.container}>
          <PortfolioBalanceSkeleton />
          <View style={styles.assetsHeader}>
            <View
              style={{
                width: 120,
                height: 20,
                backgroundColor: colors.border.light,
                borderRadius: 4,
              }}
            />
          </View>
          <ScrollView
            style={styles.assetsList}
            showsVerticalScrollIndicator={false}
          >
            {Array.from({ length: 3 }).map((_, index) => (
              <AssetCardSkeleton key={index} />
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  if (error && !data) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle" size={48} color={colors.status.error} />
          <Text variant="headlineSmall" style={styles.errorTitle}>
            {t('errors.title')}
          </Text>
          <Text variant="bodyMedium" style={styles.errorMessage}>
            {apiError?.message || t('errors.loading')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!data || data.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Ionicons name="briefcase-outline" size={48} color={colors.primary} />
          <Text variant="headlineMedium">{t('empty.title')}</Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {t('empty.subtitle')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const groupedData = data.reduce((acc, position) => {
    const existing = acc.find(p => p.ticker === position.ticker);
    if (existing) {
      existing.quantity += position.quantity;
    } else {
      acc.push({ ...position });
    }
    return acc;
  }, [] as PortfolioPosition[]);

  const displayedAssets = groupedData.slice(0, 3);
  const hasMoreAssets = groupedData.length > 3;

  const handleSeeAll = () => {
    navigation.navigate('AllAssets', { assets: groupedData });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <GreenStatusBar />
      <AppHeader screenName="Portfolio" />
      <View style={styles.container}>
        <View style={styles.balanceCard}>
          <Text variant="bodySmall" style={styles.balanceLabel}>
            {t('balance.label')}
          </Text>
          <Text style={styles.balanceAmount}>
            $
            {totalValue?.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
          <View style={styles.changeContainer}>
            <View style={styles.currencyBadge}>
              <Text style={styles.currencyText}>ARS</Text>
            </View>
            <View style={styles.changeRow}>
              <Ionicons
                name={isPositive ? 'trending-up' : 'trending-down'}
                size={16}
                color={isPositive ? colors.positive : colors.negative}
              />
              <Text
                style={[
                  styles.changeText,
                  isPositive ? styles.positive : styles.negative,
                ]}
              >
                {isPositive ? '+' : ''}$
                {Math.abs(totalChange).toLocaleString('en-US', {
                  minimumFractionDigits: 0,
                })}{' '}
                ({isPositive ? '+' : ''}
                {totalChangePercent.toFixed(1)}%)
              </Text>
            </View>
          </View>
          <SimpleBalanceChart width={280} height={70} />
        </View>

        <View style={styles.assetsHeader}>
          <Text style={styles.assetsTitle}>{t('assets.title')}</Text>
          {hasMoreAssets && (
            <TouchableOpacity onPress={handleSeeAll}>
              <Text style={styles.seeAllText}>{t('assets.seeAll')}</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          style={styles.assetsList}
          showsVerticalScrollIndicator={false}
        >
          {displayedAssets.map((position, index) => (
            <AssetCard
              key={`${position.ticker}-${index}`}
              position={position}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
