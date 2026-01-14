import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 16,
  },
  balanceCard: {
    backgroundColor: colors.background.card,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 32,
    padding: 20,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text.tertiary,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 40,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
    letterSpacing: -1.5,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  currencyBadge: {
    backgroundColor: colors.border.light,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  currencyText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text.tertiary,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  assetsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  assetsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    letterSpacing: -0.3,
  },
  seeAllText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  assetsList: {
    flex: 1,
    backgroundColor: colors.background.secondary,
    paddingTop: 8,
  },
  loadingText: {
    marginTop: 8,
    color: colors.text.tertiary,
  },
  errorTitle: {
    marginTop: 8,
  },
  errorMessage: {
    color: colors.text.tertiary,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.text.tertiary,
  },
  positive: {
    color: colors.positive,
  },
  negative: {
    color: colors.negative,
  },
});
