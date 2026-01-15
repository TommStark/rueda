import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';

export const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    backgroundColor: colors.background.card,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text.tertiary,
  },
  colorPlaceholderText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text.inverse,
    letterSpacing: -0.5,
  },
  infoContainer: {
    flex: 1,
  },
  ticker: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 3,
    letterSpacing: -0.3,
    color: colors.text.primary,
  },
  name: {
    color: colors.text.tertiary,
    fontSize: 13,
    fontWeight: '500',
  },
  rightSection: {
    alignItems: 'flex-end',
    marginRight: 8,
  },
  chevronContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: -0.3,
    color: colors.text.primary,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  change: {
    fontWeight: '700',
    fontSize: 13,
  },
  positive: {
    color: colors.positive,
  },
  negative: {
    color: colors.negative,
  },
});
