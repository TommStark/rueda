import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  centralButtonContainer: {
    position: 'absolute',
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centralButtonOuter: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primaryLightAlpha,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centralButton: {
    width: 48,
    height: 48,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
