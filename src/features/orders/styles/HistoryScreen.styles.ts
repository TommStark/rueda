import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.tertiary,
  },
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 16,
  },
  filtersWrapper: {
    height: 60,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  filterChip: {
    marginRight: 8,
    borderRadius: 20,
    borderColor: colors.border.medium,
    backgroundColor: colors.background.primary,
    height: 36,
  },
  filterChipSelectedAll: {
    backgroundColor: colors.primary,
  },
  filterChipSelectedFilled: {
    backgroundColor: colors.status.success,
  },
  filterChipSelectedPending: {
    backgroundColor: colors.status.warning,
  },
  filterChipSelectedRejected: {
    backgroundColor: colors.status.error,
  },
  filterChipText: {
    fontSize: 14,
    color: colors.text.tertiary,
  },
  filterChipTextSelected: {
    color: colors.text.inverse,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  monthHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: colors.text.quaternary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  emptyTitle: {
    marginTop: 16,
    color: colors.text.tertiary,
  },
  emptySubtitle: {
    color: colors.text.quaternary,
    textAlign: 'center',
  },
  emptyFilterText: {
    color: colors.text.tertiary,
    textAlign: 'center',
    fontSize: 14,
    marginTop: 12,
  },
});
