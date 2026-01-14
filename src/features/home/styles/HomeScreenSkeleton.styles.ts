import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  balanceCard: {
    backgroundColor: colors.background.card,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bannersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  topMoversRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  topMoverCard: {
    width: 100,
    padding: 12,
    backgroundColor: colors.background.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border.light,
    alignItems: 'center',
  },
  activityContainer: {
    backgroundColor: colors.background.card,
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activityInfo: {
    gap: 4,
  },
  activityRight: {
    alignItems: 'flex-end',
  },
});
