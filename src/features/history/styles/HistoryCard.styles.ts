import { StyleSheet } from 'react-native';
import { colors } from '../../../shared/theme/colors';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    marginHorizontal: 16,
    marginVertical: 6,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 12,
  },
  logoWrapper: {
    position: 'relative',
    width: 48,
    height: 48,
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderLogo: {
    backgroundColor: colors.border.medium,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.tertiary,
  },
  colorPlaceholderText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text.inverse,
    letterSpacing: -0.5,
  },
  statusBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background.primary,
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flex: 1,
    gap: 2,
  },
  rightSection: {
    justifyContent: 'center',
  },
  ticker: {
    fontWeight: '700',
    fontSize: 16,
    color: colors.text.primary,
  },
  orderType: {
    color: colors.text.tertiary,
    fontSize: 13,
  },
  date: {
    color: colors.text.quaternary,
    fontSize: 12,
  },
  quantity: {
    fontWeight: '600',
    fontSize: 15,
    color: colors.text.primary,
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  arrow: {
    marginLeft: 4,
  },
});
