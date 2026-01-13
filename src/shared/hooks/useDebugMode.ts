import { useState, useRef, useEffect } from "react";

interface UseDebugModeReturn {
  showDebugButton: boolean;
  handleBellPress: () => void;
  hideDebugButton: () => void;
}

export function useDebugMode(
  onDebugActivated?: () => void
): UseDebugModeReturn {
  const [bellTapCount, setBellTapCount] = useState(0);
  const [showDebugButton, setShowDebugButton] = useState(false);
  const bellTapTimerRef = useRef<NodeJS.Timeout | null>(null);
  const debugButtonTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleBellPress = () => {
    if (bellTapTimerRef.current) {
      clearTimeout(bellTapTimerRef.current);
    }

    const newCount = bellTapCount + 1;
    setBellTapCount(newCount);

    if (newCount === 3) {
      setShowDebugButton(true);
      setBellTapCount(0);
      onDebugActivated?.();

      if (debugButtonTimerRef.current) {
        clearTimeout(debugButtonTimerRef.current);
      }

      debugButtonTimerRef.current = setTimeout(() => {
        setShowDebugButton(false);
      }, 15000);
    } else {
      bellTapTimerRef.current = setTimeout(() => {
        setBellTapCount(0);
      }, 3000);
    }
  };

  const hideDebugButton = () => {
    setShowDebugButton(false);
    if (debugButtonTimerRef.current) {
      clearTimeout(debugButtonTimerRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (bellTapTimerRef.current) {
        clearTimeout(bellTapTimerRef.current);
      }
      if (debugButtonTimerRef.current) {
        clearTimeout(debugButtonTimerRef.current);
      }
    };
  }, []);

  return {
    showDebugButton,
    handleBellPress,
    hideDebugButton,
  };
}
