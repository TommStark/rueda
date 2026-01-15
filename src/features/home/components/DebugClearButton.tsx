import React from 'react';
import { useOrderHistory } from '../../orders/context/OrderHistoryContext';
import { useFavorites } from '../../favorites/context/FavoritesContext';
import { useDebugMode } from '../../../shared/hooks/useDebugMode';
import { useToast } from '../../../shared/context/ToastContext';
import { useTranslation } from '../../../shared/hooks/useTranslation';

export function useDebugClear() {
  const { clearHistory } = useOrderHistory();
  const { clearFavorites } = useFavorites();
  const { showToast } = useToast();
  const { t } = useTranslation('common');

  const handleDebugActivated = React.useCallback(() => {
    showToast(t('toast.debugActivated'), 'info', 3000);
  }, [showToast, t]);

  const { showDebugButton, handleBellPress, hideDebugButton } =
    useDebugMode(handleDebugActivated);

  const handleClearAllData = async () => {
    await Promise.all([clearHistory(), clearFavorites()]);
    hideDebugButton();
    showToast(t('toast.dataCleared'), 'success', 2000);
  };

  return {
    showDebugButton,
    handleBellPress,
    handleClearAllData,
  };
}
