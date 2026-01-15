import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';

export const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.negative,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  clearButtonText: {
    color: colors.text.inverse,
    fontSize: 16,
    fontWeight: '700',
  },
});
