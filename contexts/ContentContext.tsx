import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { localRestaurantService, LocalRestaurant } from '../services/localRestaurantService';
import { localShopService, LocalShop } from '../services/localShopService';

interface ContentContextType {
  restaurants: LocalRestaurant[];
  shops: LocalShop[];
  addRestaurant: (restaurant: Omit<LocalRestaurant, 'id'>) => void;
  addShop: (shop: Omit<LocalShop, 'id'>) => void;
  deleteRestaurant: (id: number) => void;
  deleteShop: (id: number) => void;
  activateRestaurant: (id: number) => void;
  activateShop: (id: number) => void;
  updateRestaurant: (id: number, restaurant: Partial<LocalRestaurant>) => void;
  updateShop: (id: number, shop: Partial<LocalShop>) => void;
  refreshContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

interface ContentProviderProps {
  children: ReactNode;
  initialRestaurants: LocalRestaurant[];
  initialShops: LocalShop[];
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ 
  children, 
  initialRestaurants,
  initialShops
}) => {
  const [restaurants, setRestaurants] = useState<LocalRestaurant[]>([]);
  const [shops, setShops] = useState<LocalShop[]>([]);

  useEffect(() => {
    // Initialize the local services with the provided data
    localRestaurantService.initializeRestaurants(initialRestaurants);
    localShopService.initializeShops(initialShops);
    setRestaurants(localRestaurantService.getAllRestaurants());
    setShops(localShopService.getAllShops());
  }, [initialRestaurants, initialShops]);

  const addRestaurant = (restaurant: Omit<LocalRestaurant, 'id'>) => {
    console.log('ContentContext: Adding restaurant:', restaurant);
    localRestaurantService.addRestaurant(restaurant);
    const updatedRestaurants = localRestaurantService.getAllRestaurants();
    console.log('ContentContext: Updated restaurants count:', updatedRestaurants.length);
    setRestaurants(updatedRestaurants);
  };

  const addShop = (shop: Omit<LocalShop, 'id'>) => {
    console.log('ContentContext: Adding shop:', shop);
    localShopService.addShop(shop);
    const updatedShops = localShopService.getAllShops();
    console.log('ContentContext: Updated shops count:', updatedShops.length);
    setShops(updatedShops);
  };

  const deleteRestaurant = (id: number) => {
    localRestaurantService.deleteRestaurant(id);
    setRestaurants(localRestaurantService.getAllRestaurants());
  };

  const deleteShop = (id: number) => {
    localShopService.deleteShop(id);
    setShops(localShopService.getAllShops());
  };

  const activateRestaurant = (id: number) => {
    localRestaurantService.activateRestaurant(id);
    setRestaurants(localRestaurantService.getAllRestaurants());
  };

  const activateShop = (id: number) => {
    localShopService.activateShop(id);
    setShops(localShopService.getAllShops());
  };

  const updateRestaurant = (id: number, restaurant: Partial<LocalRestaurant>) => {
    localRestaurantService.updateRestaurant(id, restaurant);
    setRestaurants(localRestaurantService.getAllRestaurants());
  };

  const updateShop = (id: number, shop: Partial<LocalShop>) => {
    localShopService.updateShop(id, shop);
    setShops(localShopService.getAllShops());
  };

  const refreshContent = () => {
    setRestaurants(localRestaurantService.getAllRestaurants());
    setShops(localShopService.getAllShops());
  };

  return (
    <ContentContext.Provider value={{
      restaurants,
      shops,
      addRestaurant,
      addShop,
      deleteRestaurant,
      deleteShop,
      activateRestaurant,
      activateShop,
      updateRestaurant,
      updateShop,
      refreshContent
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
