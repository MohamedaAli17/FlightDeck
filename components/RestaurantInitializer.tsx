import React, { useEffect } from 'react';
import { useRestaurants } from '../contexts/RestaurantContext';
import { LocalRestaurant } from '../services/localRestaurantService';

interface RestaurantInitializerProps {
  restaurants: LocalRestaurant[];
}

export const RestaurantInitializer: React.FC<RestaurantInitializerProps> = ({ restaurants }) => {
  const { refreshRestaurants } = useRestaurants();

  useEffect(() => {
    // Initialize restaurants when component mounts
    refreshRestaurants();
  }, [restaurants, refreshRestaurants]);

  return null; // This component doesn't render anything
};
