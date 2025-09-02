import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoriteRestaurant {
  id: number;
  name: string;
  description: string;
  rating: number;
  distance: string;
  price: string;
  cuisine: string;
  location: string;
  hours: string;
  phone: string;
  website: string;
  addedAt: string;
}

interface FavoritesContextType {
  favorites: FavoriteRestaurant[];
  addToFavorites: (restaurant: Omit<FavoriteRestaurant, 'addedAt'>) => Promise<void>;
  removeFromFavorites: (restaurantId: number) => Promise<void>;
  isFavorite: (restaurantId: number) => boolean;
  clearFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteRestaurant[]>([]);

  // Load favorites from AsyncStorage on mount
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.warn('Failed to load favorites from storage:', error);
    }
  };

  const saveFavorites = async (newFavorites: FavoriteRestaurant[]) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.warn('Failed to save favorites to storage:', error);
    }
  };

  const addToFavorites = async (restaurant: Omit<FavoriteRestaurant, 'addedAt'>) => {
    const newFavorite: FavoriteRestaurant = {
      ...restaurant,
      addedAt: new Date().toISOString(),
    };

    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);
    await saveFavorites(updatedFavorites);
  };

  const removeFromFavorites = async (restaurantId: number) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== restaurantId);
    setFavorites(updatedFavorites);
    await saveFavorites(updatedFavorites);
  };

  const isFavorite = (restaurantId: number) => {
    return favorites.some(fav => fav.id === restaurantId);
  };

  const clearFavorites = async () => {
    setFavorites([]);
    await AsyncStorage.removeItem('favorites');
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
