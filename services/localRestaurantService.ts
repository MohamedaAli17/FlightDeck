// Local restaurant service that manages restaurants in memory
// This works with the existing restaurant data structure in food.tsx

export interface LocalRestaurant {
  id: number;
  name: string;
  description: string;
  rating: number;
  distance: string;
  price: string;
  cuisine: string;
  image: any | null;
  recommended: boolean;
  hours: string;
  location: string;
  phone: string;
  website: string;
  active: boolean; // New field for soft delete
}

class LocalRestaurantService {
  private restaurants: LocalRestaurant[] = [];
  private nextId: number = 200; // Start from 200 to avoid conflicts with existing IDs

  // Initialize with existing restaurants
  initializeRestaurants(existingRestaurants: LocalRestaurant[]) {
    this.restaurants = [...existingRestaurants];
    // Find the highest ID to set nextId correctly
    const maxId = Math.max(...existingRestaurants.map(r => r.id));
    this.nextId = maxId + 1;
  }

  // Get all restaurants
  getAllRestaurants(): LocalRestaurant[] {
    return [...this.restaurants];
  }

  // Get active restaurants only
  getActiveRestaurants(): LocalRestaurant[] {
    return this.restaurants.filter(restaurant => restaurant.active);
  }

  // Get restaurant by ID
  getRestaurantById(id: number): LocalRestaurant | null {
    return this.restaurants.find(restaurant => restaurant.id === id) || null;
  }

  // Add new restaurant
  addRestaurant(restaurantData: Omit<LocalRestaurant, 'id'>): number {
    console.log('LocalRestaurantService: Adding restaurant:', restaurantData);
    const newRestaurant: LocalRestaurant = {
      id: this.nextId++,
      ...restaurantData
    };
    this.restaurants.unshift(newRestaurant); // Add to beginning
    console.log('LocalRestaurantService: Restaurant added with ID:', newRestaurant.id);
    console.log('LocalRestaurantService: Total restaurants now:', this.restaurants.length);
    return newRestaurant.id;
  }

  // Update restaurant
  updateRestaurant(id: number, restaurantData: Partial<LocalRestaurant>): boolean {
    const index = this.restaurants.findIndex(restaurant => restaurant.id === id);
    if (index !== -1) {
      this.restaurants[index] = { ...this.restaurants[index], ...restaurantData };
      return true;
    }
    return false;
  }

  // Delete restaurant (soft delete - mark as inactive)
  deleteRestaurant(id: number): boolean {
    const restaurant = this.restaurants.find(r => r.id === id);
    if (restaurant) {
      restaurant.active = false;
      return true;
    }
    return false;
  }

  // Activate restaurant
  activateRestaurant(id: number): boolean {
    const restaurant = this.restaurants.find(r => r.id === id);
    if (restaurant) {
      restaurant.active = true;
      return true;
    }
    return false;
  }

  // Search restaurants
  searchRestaurants(searchTerm: string): LocalRestaurant[] {
    const term = searchTerm.toLowerCase();
    return this.restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(term) ||
      restaurant.description.toLowerCase().includes(term) ||
      restaurant.cuisine.toLowerCase().includes(term) ||
      restaurant.location.toLowerCase().includes(term)
    );
  }

  // Get restaurants by cuisine
  getRestaurantsByCuisine(cuisine: string): LocalRestaurant[] {
    return this.restaurants.filter(restaurant => 
      restaurant.cuisine.toLowerCase() === cuisine.toLowerCase()
    );
  }

  // Get restaurants by location
  getRestaurantsByLocation(location: string): LocalRestaurant[] {
    return this.restaurants.filter(restaurant => 
      restaurant.location.toLowerCase() === location.toLowerCase()
    );
  }

  // Get unique cuisines
  getUniqueCuisines(): string[] {
    return [...new Set(this.restaurants.map(r => r.cuisine))];
  }

  // Get unique locations
  getUniqueLocations(): string[] {
    return [...new Set(this.restaurants.map(r => r.location))];
  }

  // Get unique prices
  getUniquePrices(): string[] {
    return [...new Set(this.restaurants.map(r => r.price))];
  }

  // Get recommended restaurants
  getRecommendedRestaurants(): LocalRestaurant[] {
    return this.restaurants.filter(restaurant => restaurant.recommended);
  }

  // Get restaurants by rating
  getRestaurantsByMinRating(minRating: number): LocalRestaurant[] {
    return this.restaurants.filter(restaurant => restaurant.rating >= minRating);
  }
}

export const localRestaurantService = new LocalRestaurantService();
