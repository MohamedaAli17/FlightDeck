import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface RestaurantReviews {
  [restaurantId: number]: Review[];
}

interface ReviewsContextType {
  reviews: RestaurantReviews;
  addReview: (restaurantId: number, review: Omit<Review, 'id'>) => Promise<void>;
  getReviews: (restaurantId: number) => Review[];
  clearReviews: (restaurantId: number) => Promise<void>;
  clearAllReviews: () => Promise<void>;
  cleanupInvalidReviews: () => Promise<void>;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};

export const ReviewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<RestaurantReviews>({});

  // Load reviews from AsyncStorage on mount
  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const storedReviews = await AsyncStorage.getItem('restaurant_reviews');
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  const saveReviews = async (newReviews: RestaurantReviews) => {
    try {
      await AsyncStorage.setItem('restaurant_reviews', JSON.stringify(newReviews));
    } catch (error) {
      console.error('Error saving reviews:', error);
    }
  };

  const addReview = async (restaurantId: number, reviewData: Omit<Review, 'id'>) => {
    const restaurantReviews = reviews[restaurantId] || [];
    const newReview: Review = {
      ...reviewData,
      id: Date.now(), // Use timestamp as unique ID
    };

    const updatedReviews = {
      ...reviews,
      [restaurantId]: [newReview, ...restaurantReviews],
    };

    setReviews(updatedReviews);
    await saveReviews(updatedReviews);
  };

  const getReviews = (restaurantId: number): Review[] => {
    return reviews[restaurantId] || [];
  };

  const clearReviews = async (restaurantId: number) => {
    const updatedReviews = { ...reviews };
    delete updatedReviews[restaurantId];
    setReviews(updatedReviews);
    await saveReviews(updatedReviews);
  };

  const clearAllReviews = async () => {
    setReviews({});
    await AsyncStorage.removeItem('restaurant_reviews');
  };

  const cleanupInvalidReviews = async () => {
    const cleanedReviews: RestaurantReviews = {};
    
    for (const [restaurantId, restaurantReviews] of Object.entries(reviews)) {
      const validReviews = restaurantReviews.filter((review: Review) => !isNaN(new Date(review.date).getTime()));
      if (validReviews.length > 0) {
        cleanedReviews[parseInt(restaurantId)] = validReviews;
      }
    }
    
    setReviews(cleanedReviews);
    await saveReviews(cleanedReviews);
  };

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        addReview,
        getReviews,
        clearReviews,
        clearAllReviews,
        cleanupInvalidReviews,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
};

