import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@rueda:favorites";

interface FavoritesContextValue {
  favorites: string[];
  toggleFavorite: (ticker: string) => Promise<void>;
  isFavorite: (ticker: string) => boolean;
  clearFavorites: () => Promise<void>;
  isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined
);

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setFavorites(parsed);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = useCallback(async (ticker: string) => {
    try {
      setFavorites((prev) => {
        const normalizedTicker = ticker.toUpperCase();
        const isFav = prev.includes(normalizedTicker);
        const updated = isFav
          ? prev.filter((t) => t !== normalizedTicker)
          : [...prev, normalizedTicker];

        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  }, []);

  const isFavorite = useCallback(
    (ticker: string) => {
      return favorites.includes(ticker.toUpperCase());
    },
    [favorites]
  );

  const clearFavorites = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setFavorites([]);
    } catch (error) {
      console.error("Error clearing favorites:", error);
    }
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        isLoading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
}
