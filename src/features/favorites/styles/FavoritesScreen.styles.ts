import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text.primary,
    letterSpacing: -0.5,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  columnHeader: {
    flex: 1,
    fontSize: 11,
    fontWeight: '700',
    color: colors.text.quaternary,
    letterSpacing: 0.5,
  },
  columnHeaderRight: {
    width: 80,
    fontSize: 11,
    fontWeight: '700',
    color: colors.text.quaternary,
    letterSpacing: 0.5,
    textAlign: 'right',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: colors.text.quaternary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.text.quaternary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
