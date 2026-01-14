import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../../shared/theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from '../../../shared/hooks/useTranslation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TopMoverCard from '../components/TopMoverCard';
import ActivityItem from '../components/ActivityItem';
import PromoBanner from '../components/PromoBanner';
import InfoBanner from '../components/InfoBanner';
import HomeScreenSkeleton from '../components/HomeScreenSkeleton';
import FavoriteItemCompact from '../components/FavoriteItemCompact';
import AppHeader from '../../../shared/components/AppHeader';
import GreenStatusBar from '../../../shared/components/GreenStatusBar';
import { getTickerIcon, hasTickerIcon } from '../../../shared/utils/icons';
import { usePortfolio } from '../../portfolio/hooks/usePortfolio';
import { useOrderHistory } from '../../history/context/OrderHistoryContext';
import { useMarket } from '../../market/hooks/useMarket';
import { useFavorites } from '../../../shared/context/FavoritesContext';
import { useDebugClear } from '../components/DebugClearButton';
import { RootStackParamList } from '../../../navigation/types';
import {
  calcInstrumentReturn,
  calcMarketValue,
  calcCostBasis,
} from '../../../shared/utils/financialCalculations';
import { styles } from '../styles/HomeScreen.styles';

export default function HomeScreen() {
  const { t } = useTranslation('home');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [hideBalance, setHideBalance] = React.useState(false);

  const { data: portfolioData, isLoading: portfolioLoading } = usePortfolio();
  const { orders } = useOrderHistory();
  const { data: instruments } = useMarket();
  const { favorites } = useFavorites();

  const { showDebugButton, handleBellPress, handleClearAllData } =
    useDebugClear();

  const totalValue =
    portfolioData?.reduce(
      (sum, pos) => sum + calcMarketValue(pos.quantity, pos.last_price),
      0
    ) || 0;

  const totalCostValue =
    portfolioData?.reduce(
      (sum, pos) => sum + calcCostBasis(pos.quantity, pos.avg_cost_price),
      0
    ) || 0;

  const totalChange = totalValue - totalCostValue;
  const totalChangePercent =
    totalCostValue > 0 ? (totalChange / totalCostValue) * 100 : 0;
  const isPositiveChange = totalChange >= 0;

  const topGainers =
    instruments
      ?.map(inst => {
        const tickerIcon = getTickerIcon(inst.ticker);
        const hasIcon = hasTickerIcon(inst.ticker);

        return {
          ticker: inst.ticker,
          name: inst.name,
          price: inst.last_price,
          change: inst.last_price - inst.close_price,
          changePercentage: calcInstrumentReturn(
            inst.last_price,
            inst.close_price
          ),
          icon: '📈',
          tickerIcon,
          hasTickerIcon: hasIcon,
        };
      })
      .sort((a, b) => b.changePercentage - a.changePercentage)
      .slice(0, 5) || [];

  const favoriteAssets =
    instruments?.filter(inst => favorites.includes(inst.ticker)).slice(0, 2) ||
    [];

  const recentOrders = orders.slice(0, 4).map(order => {
    const orderAmount = order.quantity * (order.price || order.executedPrice);
    return {
      id: order.id,
      type: order.side.toLowerCase() as 'buy' | 'sell' | 'deposit' | 'withdraw',
      title: `${order.side} ${order.ticker}`,
      subtitle: `${order.quantity} shares`,
      amount: order.side === 'BUY' ? -orderAmount : orderAmount,
      date: new Date(order.timestamp).toLocaleDateString(),
      icon: order.side === 'BUY' ? 'arrow-down' : 'arrow-up',
    };
  });

  const handleViewAllActivity = () => {
    navigation.navigate('MainTabs', { screen: 'History' });
  };

  const handleViewAllFavorites = () => {
    navigation.navigate('MainTabs', { screen: 'Favorites' });
  };

  const handleFavoritePress = (ticker: string) => {
    const asset = instruments?.find(inst => inst.ticker === ticker);
    if (asset) {
      navigation.navigate('NewOrder', { asset });
    }
  };

  const handleTopMoverPress = (ticker: string) => {
    const asset = instruments?.find(inst => inst.ticker === ticker);
    if (asset) {
      navigation.navigate('NewOrder', { asset });
    }
  };

  if (portfolioLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <GreenStatusBar />
        <AppHeader screenName="Home" />
        <HomeScreenSkeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <GreenStatusBar />
      <AppHeader screenName="" onNotificationPress={handleBellPress} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ backgroundColor: colors.primary }}
      >
        <LinearGradient
          colors={colors.gradient.homeBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.35 }}
          style={styles.gradientBackground}
        >
          <View style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <View style={styles.balanceLabelRow}>
                <Text variant="bodySmall" style={styles.balanceLabel}>
                  {t('balance.label')}
                </Text>
                <View style={styles.availableBadge}>
                  <Ionicons name="trending-up" size={12} color={colors.white} />
                  {hideBalance ? (
                    <Text style={styles.availableText}>••••••</Text>
                  ) : (
                    <Text style={styles.availableText}>
                      {totalChangePercent.toFixed(1)}%
                    </Text>
                  )}
                </View>
              </View>
              <TouchableOpacity onPress={() => setHideBalance(!hideBalance)}>
                <Ionicons
                  name={hideBalance ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={colors.text.tertiary}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.balanceAmount}>
              {hideBalance
                ? '••••••'
                : `$${totalValue.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
            </Text>
            <View style={styles.changeContainer}>
              <View style={styles.currencyBadge}>
                <Text style={styles.currencyText}>ARS</Text>
              </View>
              <View style={styles.changeRow}>
                <Ionicons
                  name={isPositiveChange ? 'trending-up' : 'trending-down'}
                  size={16}
                  color={isPositiveChange ? colors.positive : colors.negative}
                />
                <Text
                  style={[
                    styles.changeText,
                    isPositiveChange ? styles.positive : styles.negative,
                  ]}
                >
                  {hideBalance
                    ? '•••'
                    : `${isPositiveChange ? '+' : ''}$${Math.abs(
                        totalChange
                      ).toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                      })} (${
                        isPositiveChange ? '+' : ''
                      }${totalChangePercent.toFixed(1)}%)`}
                </Text>
              </View>
            </View>
          </View>

          <InfoBanner />

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                {t('topMovers.title')}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('MainTabs', { screen: 'Market' })
                }
              >
                <Text variant="bodySmall" style={styles.seeAllButton}>
                  {t('topMovers.seeAll')}
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.topMoversContainer}
            >
              {topGainers.map(mover => (
                <TouchableOpacity
                  key={mover.ticker}
                  onPress={() => handleTopMoverPress(mover.ticker)}
                >
                  <TopMoverCard mover={mover} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                {t('favorites.title')}
              </Text>
              <TouchableOpacity onPress={handleViewAllFavorites}>
                <Text variant="bodySmall" style={styles.seeAllButton}>
                  {t('favorites.viewAll')}
                </Text>
              </TouchableOpacity>
            </View>
            {favoriteAssets.length > 0 ? (
              <View style={styles.favoritesContainer}>
                {favoriteAssets.map(asset => (
                  <FavoriteItemCompact
                    key={asset.ticker}
                    asset={asset}
                    onPress={() => handleFavoritePress(asset.ticker)}
                  />
                ))}
              </View>
            ) : (
              <View style={styles.emptyFavoritesContainer}>
                <Ionicons
                  name="star-outline"
                  size={40}
                  color={colors.text.quaternary}
                />
                <Text variant="bodyMedium" style={styles.emptyFavoritesTitle}>
                  {t('favorites.emptyTitle')}
                </Text>
                <Text variant="bodySmall" style={styles.emptyFavoritesMessage}>
                  {t('favorites.emptyMessage')}
                </Text>
              </View>
            )}
          </View>

          <PromoBanner />

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                {t('recentActivity.title')}
              </Text>
              <TouchableOpacity onPress={handleViewAllActivity}>
                <Text variant="bodySmall" style={styles.seeAllButton}>
                  {t('recentActivity.viewHistory')}
                </Text>
              </TouchableOpacity>
            </View>
            {recentOrders.length > 0 ? (
              <View style={styles.activityContainer}>
                {recentOrders.map(activity => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </View>
            ) : (
              <View style={styles.emptyActivityContainer}>
                <Ionicons
                  name="receipt-outline"
                  size={48}
                  color={colors.text.quaternary}
                />
                <Text variant="titleMedium" style={styles.emptyActivityTitle}>
                  {t('recentActivity.emptyTitle')}
                </Text>
                <Text variant="bodySmall" style={styles.emptyActivityMessage}>
                  {t('recentActivity.emptyMessage')}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.protectionSection}>
            <Ionicons
              name="shield-checkmark"
              size={16}
              color={colors.positive}
              style={styles.protectionIcon}
            />
            <Text style={styles.protectionText}>
              {t('protection.description')}
            </Text>
          </View>

          {showDebugButton && (
            <View style={styles.section}>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleClearAllData}
              >
                <Ionicons
                  name="trash-outline"
                  size={20}
                  color={colors.text.inverse}
                />
                <Text style={styles.clearButtonText}>Limpiar Todo</Text>
              </TouchableOpacity>
            </View>
          )}
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}
