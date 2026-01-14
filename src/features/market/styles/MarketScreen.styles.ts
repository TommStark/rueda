import { StyleSheet } from 'react-native';
import { colors } from '../../../shared/theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  headerContainer: {
    backgroundColor: colors.background.primary,
    paddingTop: 16,
  },
  searchbar: {
    marginHorizontal: 16,
    marginBottom: 8,
    elevation: 0,
    backgroundColor: colors.background.tertiary,
  },
  searchInput: {
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  sectionTitle: {
    color: colors.text.tertiary,
    fontWeight: '600',
  },
  sectionSubtitle: {
    color: colors.text.quaternary,
  },
  listContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 12,
  },
  loadingText: {
    color: colors.text.tertiary,
  },
  errorMessage: {
    color: colors.text.tertiary,
    textAlign: 'center',
    marginTop: 8,
  },
  emptyText: {
    color: colors.text.tertiary,
    marginTop: 8,
  },
});
