import React from "react";
import { useOrderHistory } from "../../history/context/OrderHistoryContext";
import { useFavorites } from "../../../shared/context/FavoritesContext";
import { useDebugMode } from "../../../shared/hooks/useDebugMode";
import { useToast } from "../../../shared/context/ToastContext";

export function useDebugClear() {
  const { clearHistory } = useOrderHistory();
  const { clearFavorites } = useFavorites();
  const { showToast } = useToast();

  const handleDebugActivated = React.useCallback(() => {
    showToast("🔧 Modo Debug Activado", "info", 3000);
  }, [showToast]);

  const { showDebugButton, handleBellPress, hideDebugButton } =
    useDebugMode(handleDebugActivated);

  const handleClearAllData = async () => {
    await Promise.all([clearHistory(), clearFavorites()]);
    hideDebugButton();
    showToast("✅ Datos eliminados", "success", 2000);
  };

  return {
    showDebugButton,
    handleBellPress,
    handleClearAllData,
  };
}
