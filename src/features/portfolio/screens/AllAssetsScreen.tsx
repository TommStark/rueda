import { View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ColorStatusBar from '../../../shared/components/ColorStatusBar';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';
import { useMemo } from 'react';
import { router } from 'expo-router';
import { useTranslation } from '../../../shared/hooks/useTranslation';
import AssetCard from '../components/AssetCard';
import { usePortfolio, usePortfolioError } from '../hooks/usePortfolio';
import { PortfolioPosition } from '../types/portfolio.types';
import { styles } from '../styles/AllAssetsScreen.styles';

export default function AllAssetsScreen() {
  const { t } = useTranslation('portfolio');
  const { data, isLoading, error } = usePortfolio();
  const apiError = usePortfolioError(error);

  const assets = useMemo(() => {
    if (!data) return [];

    return data.reduce((acc, position) => {
      const existing = acc.find(p => p.ticker === position.ticker);
      if (existing) {
        existing.quantity += position.quantity;
      } else {
        acc.push({ ...position });
      }
      return acc;
    }, [] as PortfolioPosition[]);
  }, [data]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <ColorStatusBar />
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('assets.title')}</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.listContent}>
          <Text>{t('loading')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !data) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <ColorStatusBar />
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('assets.title')}</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.listContent}>
          <Ionicons
            name="alert-circle"
            size={48}
            color={colors.status.error}
            style={{ alignSelf: 'center', marginBottom: 16 }}
          />
          <Text style={{ textAlign: 'center', color: colors.text.secondary }}>
            {apiError?.message || t('errors.loading')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ColorStatusBar />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('assets.title')}</Text>
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
