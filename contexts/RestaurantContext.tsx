import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { localRestaurantService, LocalRestaurant } from '../services/localRestaurantService';

interface RestaurantContextType {
  restaurants: LocalRestaurant[];
  addRestaurant: (restaurant: Omit<LocalRestaurant, 'id'>) => void;
  deleteRestaurant: (id: number) => void;
  updateRestaurant: (id: number, restaurant: Partial<LocalRestaurant>) => void;
  refreshRestaurants: () => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

interface RestaurantProviderProps {
  children: ReactNode;
  initialRestaurants: LocalRestaurant[];
}

export const RestaurantProvider: React.FC<RestaurantProviderProps> = ({ 
  children, 
  initialRestaurants 
}) => {
  const [restaurants, setRestaurants] = useState<LocalRestaurant[]>([]);

  useEffect(() => {
    // Initialize the local service with the provided restaurants
    localRestaurantService.initializeRestaurants(initialRestaurants);
    setRestaurants(localRestaurantService.getAllRestaurants());
  }, [initialRestaurants]);

  const addRestaurant = (restaurant: Omit<LocalRestaurant, 'id'>) => {
    console.log('RestaurantContext: Adding restaurant:', restaurant);
    localRestaurantService.addRestaurant(restaurant);
    const updatedRestaurants = localRestaurantService.getAllRestaurants();
    console.log('RestaurantContext: Updated restaurants count:', updatedRestaurants.length);
    setRestaurants(updatedRestaurants);
  };

  const deleteRestaurant = (id: number) => {
    localRestaurantService.deleteRestaurant(id);
    setRestaurants(localRestaurantService.getAllRestaurants());
  };

  const updateRestaurant = (id: number, restaurant: Partial<LocalRestaurant>) => {
    localRestaurantService.updateRestaurant(id, restaurant);
    setRestaurants(localRestaurantService.getAllRestaurants());
  };

  const refreshRestaurants = () => {
    setRestaurants(localRestaurantService.getAllRestaurants());
  };

  return (
    <RestaurantContext.Provider value={{
      restaurants,
      addRestaurant,
      deleteRestaurant,
      updateRestaurant,
      refreshRestaurants
    }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurants = () => {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error('useRestaurants must be used within a RestaurantProvider');
  }
  return context;
};
