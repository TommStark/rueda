import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    width: 100,
    padding: 12,
    backgroundColor: colors.background.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border.light,
    alignItems: 'center',
    gap: 6,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  iconText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.inverse,
  },
  ticker: {
    fontWeight: 'bold',
    color: colors.text.secondary,
  },
  name: {
    fontSize: 10,
    color: colors.text.quaternary,
    textAlign: 'center',
  },
  price: {
    fontWeight: '600',
    marginTop: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  change: {
    fontSize: 11,
    fontWeight: '600',
  },
  positive: {
    color: colors.positive,
  },
  negative: {
    color: colors.negative,
  },
});
