import { Snackbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { useToast } from '../context/ToastContext';
import { colors } from '../theme/colors';

export default function Toast() {
  const { visible, message, type, hideToast } = useToast();

  const backgroundColor = useMemo(() => {
    switch (type) {
      case 'success':
        return colors.positive;
      case 'error':
        return colors.negative;
      case 'info':
      default:
        return colors.text.primary;
    }
  }, [type]);

  return (
    <Snackbar
      visible={visible}
      onDismiss={hideToast}
      duration={2000}
      style={[styles.snackbar, { backgroundColor }]}
      action={{
        label: '',
        onPress: hideToast,
      }}
    >
      {message}
    </Snackbar>
  );
}

const styles = StyleSheet.create({
  snackbar: {
    marginBottom: 20,
  },
});
