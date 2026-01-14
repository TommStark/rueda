import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  headerTitle: {
    fontWeight: '600',
    color: colors.text.quaternary,
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  statusIconContainer: {
    marginTop: 40,
    marginBottom: 24,
  },
  statusIconOuterCircle: {
    width: 100,
    height: 100,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusIconInnerCircle: {
    width: 75,
    height: 75,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusTitle: {
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 16,
  },
  statusBadgeText: {
    color: colors.text.inverse,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  statusMessage: {
    textAlign: 'center',
    color: colors.text.tertiary,
    marginBottom: 32,
    lineHeight: 22,
  },
  detailsCard: {
    width: '100%',
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  detailLabel: {
    color: colors.text.quaternary,
    fontSize: 14,
  },
  detailValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailValue: {
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  detailValueBuy: {
    color: colors.status.success,
    fontWeight: '600',
  },
  detailValueSell: {
    color: colors.status.error,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.medium,
  },
  totalContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  totalAmount: {
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  totalLabel: {
    color: colors.text.quaternary,
  },
  primaryButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 6,
    backgroundColor: colors.primary,
    marginBottom: 16,
  },
  primaryButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },
});
