import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  placeholderIcon: {
    backgroundColor: colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.tertiary,
  },
  ticker: {
    fontWeight: '600',
    color: colors.text.secondary,
  },
  rightSection: {
    alignItems: 'flex-end',
    gap: 2,
  },
  price: {
    fontWeight: '600',
    color: colors.text.primary,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  change: {
    fontSize: 12,
    fontWeight: '500',
  },
  positive: {
    color: colors.positive,
  },
  negative: {
    color: colors.negative,
  },
});
