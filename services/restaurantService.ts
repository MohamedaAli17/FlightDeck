import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc,
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  rating: number;
  distance: string;
  price: string;
  cuisine: string;
  image?: string;
  recommended: boolean;
  hours: string;
  location: string;
  phone: string;
  website: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface RestaurantFormData {
  name: string;
  description: string;
  rating: number;
  distance: string;
  price: string;
  cuisine: string;
  image?: string;
  recommended: boolean;
  hours: string;
  location: string;
  phone: string;
  website: string;
  tags: string[];
}

class RestaurantService {
  private collectionName = 'restaurants';

  // Get all restaurants
  async getAllRestaurants(): Promise<Restaurant[]> {
    try {
      const restaurantsRef = collection(db, this.collectionName);
      const q = query(restaurantsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Restaurant[];
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      throw new Error('Failed to fetch restaurants');
    }
  }

  // Get active restaurants only
  async getActiveRestaurants(): Promise<Restaurant[]> {
    try {
      const restaurantsRef = collection(db, this.collectionName);
      const q = query(
        restaurantsRef, 
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Restaurant[];
    } catch (error) {
      console.error('Error fetching active restaurants:', error);
      throw new Error('Failed to fetch active restaurants');
    }
  }

  // Get restaurant by ID
  async getRestaurantById(id: string): Promise<Restaurant | null> {
    try {
      const restaurantRef = doc(db, this.collectionName, id);
      const restaurantSnap = await getDoc(restaurantRef);
      
      if (restaurantSnap.exists()) {
        return {
          id: restaurantSnap.id,
          ...restaurantSnap.data()
        } as Restaurant;
      }
      return null;
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      throw new Error('Failed to fetch restaurant');
    }
  }

  // Add new restaurant
  async addRestaurant(restaurantData: RestaurantFormData): Promise<string> {
    try {
      const restaurantsRef = collection(db, this.collectionName);
      const docRef = await addDoc(restaurantsRef, {
        ...restaurantData,
        status: 'active',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error adding restaurant:', error);
      throw new Error('Failed to add restaurant');
    }
  }

  // Update restaurant
  async updateRestaurant(id: string, restaurantData: Partial<RestaurantFormData>): Promise<void> {
    try {
      const restaurantRef = doc(db, this.collectionName, id);
      await updateDoc(restaurantRef, {
        ...restaurantData,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating restaurant:', error);
      throw new Error('Failed to update restaurant');
    }
  }

  // Delete restaurant
  async deleteRestaurant(id: string): Promise<void> {
    try {
      const restaurantRef = doc(db, this.collectionName, id);
      await deleteDoc(restaurantRef);
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      throw new Error('Failed to delete restaurant');
    }
  }

  // Update restaurant status
  async updateRestaurantStatus(id: string, status: 'active' | 'inactive' | 'pending'): Promise<void> {
    try {
      const restaurantRef = doc(db, this.collectionName, id);
      await updateDoc(restaurantRef, {
        status,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating restaurant status:', error);
      throw new Error('Failed to update restaurant status');
    }
  }

  // Search restaurants
  async searchRestaurants(searchTerm: string): Promise<Restaurant[]> {
    try {
      const restaurantsRef = collection(db, this.collectionName);
      const q = query(
        restaurantsRef,
        where('status', '==', 'active'),
        orderBy('name')
      );
      const querySnapshot = await getDocs(q);
      
      const restaurants = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Restaurant[];

      // Filter by search term (Firebase doesn't support full-text search)
      return restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching restaurants:', error);
      throw new Error('Failed to search restaurants');
    }
  }

  // Get restaurants by cuisine
  async getRestaurantsByCuisine(cuisine: string): Promise<Restaurant[]> {
    try {
      const restaurantsRef = collection(db, this.collectionName);
      const q = query(
        restaurantsRef,
        where('cuisine', '==', cuisine),
        where('status', '==', 'active'),
        orderBy('name')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Restaurant[];
    } catch (error) {
      console.error('Error fetching restaurants by cuisine:', error);
      throw new Error('Failed to fetch restaurants by cuisine');
    }
  }

  // Get restaurants by location
  async getRestaurantsByLocation(location: string): Promise<Restaurant[]> {
    try {
      const restaurantsRef = collection(db, this.collectionName);
      const q = query(
        restaurantsRef,
        where('location', '==', location),
        where('status', '==', 'active'),
        orderBy('name')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Restaurant[];
    } catch (error) {
      console.error('Error fetching restaurants by location:', error);
      throw new Error('Failed to fetch restaurants by location');
    }
  }
}

export const restaurantService = new RestaurantService();

