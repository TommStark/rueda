import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.tertiary,
    backgroundColor: colors.background.card,
  },
  assetSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    marginRight: 12,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderLogo: {
    backgroundColor: colors.border.medium,
  },
  logoText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text.inverse,
    letterSpacing: -0.5,
  },
  logoTextPlaceholder: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text.tertiary,
  },
  assetInfo: {
    flex: 1,
  },
  ticker: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text.primary,
    marginBottom: 2,
    letterSpacing: -0.3,
  },
  assetName: {
    fontSize: 12,
    color: colors.text.quaternary,
    fontWeight: '500',
  },
  trendSection: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingLeft: 17,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  changePositive: {
    color: colors.positive,
  },
  changeNegative: {
    color: colors.negative,
  },
  priceSection: {
    width: 100,
    alignItems: 'flex-end',
    gap: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text.primary,
    letterSpacing: -0.3,
  },
  starButton: {
    padding: 2,
  },
  starSection: {
    marginLeft: 8,
    alignItems: 'center',
  },
});
