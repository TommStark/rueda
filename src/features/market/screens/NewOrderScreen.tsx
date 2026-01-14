import { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../../shared/theme/colors';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useTranslation } from '../../../shared/hooks/useTranslation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { OrderSide, OrderType } from '../../history/types/history.types';
import { getTickerIcon, hasTickerIcon } from '../../../shared/utils/icons';
import SwipeButton from 'rn-swipe-button';
import { useOrderHistory } from '../../history/context/OrderHistoryContext';
import { useFavorites } from '../../../shared/context/FavoritesContext';
import { usePortfolio } from '../../portfolio/hooks/usePortfolio';
import { createOrder } from '../api/orders.api';
import {
  calcInstrumentReturn,
  calcMarketValue,
  calcQtyFromAmount,
} from '../../../shared/utils/financialCalculations';
import { styles } from '../styles/NewOrderScreen.styles';

type NewOrderRouteProp = RouteProp<RootStackParamList, 'NewOrder'>;
type NewOrderNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function NewOrderScreen() {
  const { t } = useTranslation('market');
  const navigation = useNavigation<NewOrderNavigationProp>();
  const route = useRoute<NewOrderRouteProp>();
  const { asset } = route.params;
  const { addOrder } = useOrderHistory();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { data: portfolioData } = usePortfolio();

  const [side, setSide] = useState<OrderSide>('BUY');
  const [orderType, setOrderType] = useState<OrderType>('MARKET');
  const [quantity, setQuantity] = useState<number>(0);
  const [investmentAmount, setInvestmentAmount] = useState<string>('');
  const [limitPrice, setLimitPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOrderTypeMenu, setShowOrderTypeMenu] = useState(false);

  const tickerIcon = getTickerIcon(asset.ticker);
  const hasIcon = hasTickerIcon(asset.ticker);

  const priceChange = calcInstrumentReturn(asset.last_price, asset.close_price);
  const isPositive = priceChange >= 0;

  const totalPortfolioValue =
    portfolioData?.reduce(
      (sum, pos) => sum + calcMarketValue(pos.quantity, pos.last_price),
      0
    ) || 0;

  const availableBalance = totalPortfolioValue;

  const getCurrentPrice = () => {
    return orderType === 'LIMIT' && limitPrice
      ? parseFloat(limitPrice)
      : asset.last_price;
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    const total = newQuantity * getCurrentPrice();
    setInvestmentAmount(total > 0 ? total.toFixed(2) : '');
  };

  const handleInvestmentAmountChange = (amount: string) => {
    setInvestmentAmount(amount);
    const amountNum = parseFloat(amount);
    if (!isNaN(amountNum) && amountNum > 0) {
      const calculatedQty = calcQtyFromAmount(amountNum, getCurrentPrice());
      setQuantity(calculatedQty);
    } else {
      setQuantity(0);
    }
  };

  const handlePercentagePress = (percentage: number) => {
    const amount = availableBalance * percentage;
    handleInvestmentAmountChange(amount.toFixed(2));
  };

  const incrementQuantity = () => {
    handleQuantityChange(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      handleQuantityChange(quantity - 1);
    }
  };

  const getEstimatedTotal = (): number => {
    return quantity * getCurrentPrice();
  };

  const handleSubmitOrder = async () => {
    if (quantity <= 0) {
      alert(t('validation.invalidQuantity'));
      return;
    }

    if (orderType === 'LIMIT' && !limitPrice) {
      alert(t('validation.invalidPrice'));
      return;
    }

    const estimatedTotal = getEstimatedTotal();
    if (side === 'BUY' && estimatedTotal > availableBalance) {
      alert(
        `${t('validation.insufficientFunds')}${availableBalance.toLocaleString(
          'es-AR',
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        )}`
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const orderRequest = {
        instrument_id: asset.id,
        side,
        type: orderType,
        quantity: quantity,
        ...(orderType === 'LIMIT' && limitPrice
          ? { price: parseFloat(limitPrice) }
          : {}),
      };

      const result = await createOrder(orderRequest);

      const orderHistoryItem = {
        id: result.id,
        ticker: asset.ticker,
        instrumentId: asset.id,
        side,
        type: orderType,
        quantity: quantity,
        price: orderType === 'LIMIT' ? parseFloat(limitPrice) : undefined,
        executedPrice: asset.last_price,
        timestamp: Date.now(),
        status: result.status,
        assetName: asset.name,
      };

      await addOrder(orderHistoryItem);

      navigation.replace('OrderReceipt', { order: orderHistoryItem });
    } catch {
      alert(t('validation.orderFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const handleToggleFavorite = () => {
    toggleFavorite(asset.ticker);
  };

  useEffect(() => {
    setQuantity(0);
    setInvestmentAmount('');
  }, [side]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('newOrder.title')}</Text>
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={styles.favoriteButton}
        >
          <MaterialCommunityIcons
            name={isFavorite(asset.ticker) ? 'star' : 'star-outline'}
            size={24}
            color={colors.favorite}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.assetHeader}>
          <View style={styles.assetIconContainer}>
            {hasIcon && tickerIcon ? (
              <Image source={tickerIcon} style={styles.assetIcon} />
            ) : (
              <View style={[styles.assetIcon, styles.assetIconPlaceholder]}>
                <Text style={styles.assetIconText}>
                  {asset.ticker.substring(0, 2).toUpperCase()}
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.assetTicker}>{asset.ticker}</Text>
          <Text style={styles.assetName}>{asset.name}</Text>
          <View style={styles.assetPriceRow}>
            <Text style={styles.assetPrice}>
              ${asset.last_price.toFixed(2)}
            </Text>
            <Text
              style={[
                styles.assetChange,
                isPositive ? styles.changePositive : styles.changeNegative,
              ]}
            >
              {isPositive ? '+' : ''}
              {priceChange.toFixed(2)}%
            </Text>
          </View>
        </View>

        <View style={styles.sideToggle}>
          <TouchableOpacity
            style={[
              styles.sideButton,
              side === 'BUY' && styles.sideButtonActiveBuy,
            ]}
            onPress={() => setSide('BUY')}
          >
            <Text
              style={[
                styles.sideButtonText,
                side === 'BUY' && styles.sideButtonTextActive,
              ]}
            >
              {t('newOrder.buy')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sideButton,
              side === 'SELL' && styles.sideButtonActiveSell,
            ]}
            onPress={() => setSide('SELL')}
          >
            <Text
              style={[
                styles.sideButtonText,
                side === 'SELL' && styles.sideButtonTextActive,
              ]}
            >
              {t('newOrder.sell')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t('newOrder.orderType')}</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowOrderTypeMenu(!showOrderTypeMenu)}
          >
            <Text style={styles.dropdownText}>
              {orderType === 'MARKET'
                ? t('newOrder.marketOrder')
                : t('newOrder.limitOrder')}
            </Text>
            <Ionicons
              name={showOrderTypeMenu ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={colors.text.quaternary}
            />
          </TouchableOpacity>
          {showOrderTypeMenu && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity
                style={[
                  styles.dropdownItem,
                  orderType === 'MARKET' && styles.dropdownItemActive,
                ]}
                onPress={() => {
                  setOrderType('MARKET');
                  setShowOrderTypeMenu(false);
                  setLimitPrice('');
                }}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    orderType === 'MARKET' && styles.dropdownItemTextActive,
                  ]}
                >
                  {t('newOrder.marketOrder')}
                </Text>
                {orderType === 'MARKET' && (
                  <Ionicons name="checkmark" size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.dropdownItem,
                  orderType === 'LIMIT' && styles.dropdownItemActive,
                ]}
                onPress={() => {
                  setOrderType('LIMIT');
                  setShowOrderTypeMenu(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    orderType === 'LIMIT' && styles.dropdownItemTextActive,
                  ]}
                >
                  {t('newOrder.limitOrder')}
                </Text>
                {orderType === 'LIMIT' && (
                  <Ionicons name="checkmark" size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>

        {orderType === 'LIMIT' && (
          <View style={styles.limitPriceSection}>
            <Text style={styles.inputLabel}>{t('newOrder.limitPrice')}</Text>
            <TextInput
              style={styles.limitPriceInput}
              value={limitPrice}
              onChangeText={text => setLimitPrice(text.replace(/[^0-9.]/g, ''))}
              placeholder="$0.00"
              keyboardType="numeric"
            />
            <Text style={styles.inputHint}>Precio por acción</Text>
          </View>
        )}

        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>{t('newOrder.quantity')}</Text>
          <View style={styles.quantityInputContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={decrementQuantity}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.quantityInput}
              value={quantity.toString()}
              onChangeText={text => {
                const num = parseInt(text.replace(/[^0-9]/g, '')) || 0;
                handleQuantityChange(num);
              }}
              placeholder="0"
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={incrementQuantity}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>
            {side === 'SELL' ? t('newOrder.totalToSell') : t('newOrder.total')}
          </Text>
          <View style={styles.amountInputContainer}>
            <TextInput
              style={[
                styles.amountInput,
                side === 'SELL' && styles.amountInputDisabled,
              ]}
              value={investmentAmount}
              onChangeText={handleInvestmentAmountChange}
              placeholder="$0"
              keyboardType="numeric"
              editable={side === 'BUY'}
            />
            {side === 'BUY' && (
              <View style={styles.percentageChips}>
                <TouchableOpacity
                  style={styles.percentageChip}
                  onPress={() => handlePercentagePress(0.25)}
                >
                  <Text style={styles.percentageChipText}>25%</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.percentageChip}
                  onPress={() => handlePercentagePress(0.5)}
                >
                  <Text style={styles.percentageChipText}>50%</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.percentageChip}
                  onPress={() => handlePercentagePress(1.0)}
                >
                  <Text style={styles.percentageChipText}>100%</Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.availableBalanceRow}>
              <Text style={styles.availableBalanceLabel}>
                {t('newOrder.availableBalance')}
              </Text>
              <Text style={styles.availableBalanceAmount}>
                $
                {availableBalance.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </Text>
            </View>
            {side === 'BUY' && getEstimatedTotal() > availableBalance && (
              <View style={styles.errorContainer}>
                <Ionicons
                  name="alert-circle"
                  size={16}
                  color={colors.negative}
                />
                <Text style={styles.errorText}>
                  {t('validation.insufficientFundsWarning')}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.swipeButtonContainer}>
        <SwipeButton
          disabled={
            isSubmitting ||
            quantity <= 0 ||
            (side === 'BUY' && getEstimatedTotal() > availableBalance)
          }
          disableResetOnTap={true}
          height={30}
          onSwipeSuccess={handleSubmitOrder}
          railBackgroundColor={
            isSubmitting ||
            quantity <= 0 ||
            (side === 'BUY' && getEstimatedTotal() > availableBalance)
              ? colors.border.medium
              : colors.primary
          }
          railBorderColor={
            isSubmitting ||
            quantity <= 0 ||
            (side === 'BUY' && getEstimatedTotal() > availableBalance)
              ? colors.border.medium
              : colors.primary
          }
          railFillBackgroundColor={colors.primaryLight}
          railFillBorderColor={colors.primaryLight}
          shouldResetAfterSuccess={false}
          swipeSuccessThreshold={90}
          thumbIconBackgroundColor={
            isSubmitting || quantity <= 0
              ? colors.background.secondary
              : colors.primaryLight
          }
          thumbIconBorderColor="transparent"
          title={t('newOrder.swipeToConfirm')}
          titleColor={colors.text.inverse}
          titleFontSize={13}
        />
      </View>
    </SafeAreaView>
  );
}
