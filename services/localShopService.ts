// Local shop service that manages shops in memory
// This works with the existing shop data structure in shopping.tsx

export interface LocalShop {
  id: number;
  name: string;
  description: string;
  rating: number;
  distance: string;
  category: string;
  image: string;
  recommended: boolean;
  hours: string;
  location: string;
  offers: string[];
  active: boolean; // New field for soft delete
}

class LocalShopService {
  private shops: LocalShop[] = [];
  private nextId: number = 200; // Start from 200 to avoid conflicts with existing IDs

  // Initialize with existing shops
  initializeShops(existingShops: LocalShop[]) {
    this.shops = [...existingShops];
    // Find the highest ID to set nextId correctly
    const maxId = Math.max(...existingShops.map(s => s.id));
    this.nextId = maxId + 1;
  }

  // Get all shops
  getAllShops(): LocalShop[] {
    return [...this.shops];
  }

  // Get active shops only
  getActiveShops(): LocalShop[] {
    return this.shops.filter(shop => shop.active);
  }

  // Get shop by ID
  getShopById(id: number): LocalShop | null {
    return this.shops.find(shop => shop.id === id) || null;
  }

  // Add new shop
  addShop(shopData: Omit<LocalShop, 'id'>): number {
    console.log('LocalShopService: Adding shop:', shopData);
    const newShop: LocalShop = {
      id: this.nextId++,
      ...shopData
    };
    this.shops.unshift(newShop); // Add to beginning
    console.log('LocalShopService: Shop added with ID:', newShop.id);
    console.log('LocalShopService: Total shops now:', this.shops.length);
    return newShop.id;
  }

  // Update shop
  updateShop(id: number, shopData: Partial<LocalShop>): boolean {
    const index = this.shops.findIndex(shop => shop.id === id);
    if (index !== -1) {
      this.shops[index] = { ...this.shops[index], ...shopData };
      return true;
    }
    return false;
  }

  // Delete shop (soft delete - mark as inactive)
  deleteShop(id: number): boolean {
    const shop = this.shops.find(s => s.id === id);
    if (shop) {
      shop.active = false;
      return true;
    }
    return false;
  }

  // Activate shop
  activateShop(id: number): boolean {
    const shop = this.shops.find(s => s.id === id);
    if (shop) {
      shop.active = true;
      return true;
    }
    return false;
  }

  // Search shops
  searchShops(searchTerm: string): LocalShop[] {
    const term = searchTerm.toLowerCase();
    return this.shops.filter(shop =>
      shop.name.toLowerCase().includes(term) ||
      shop.description.toLowerCase().includes(term) ||
      shop.category.toLowerCase().includes(term) ||
      shop.location.toLowerCase().includes(term)
    );
  }

  // Get shops by category
  getShopsByCategory(category: string): LocalShop[] {
    return this.shops.filter(shop => 
      shop.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Get shops by location
  getShopsByLocation(location: string): LocalShop[] {
    return this.shops.filter(shop => 
      shop.location.toLowerCase() === location.toLowerCase()
    );
  }

  // Get unique categories
  getUniqueCategories(): string[] {
    return [...new Set(this.shops.map(s => s.category))];
  }

  // Get unique locations
  getUniqueLocations(): string[] {
    return [...new Set(this.shops.map(s => s.location))];
  }

  // Get recommended shops
  getRecommendedShops(): LocalShop[] {
    return this.shops.filter(shop => shop.recommended);
  }

  // Get shops by rating
  getShopsByMinRating(minRating: number): LocalShop[] {
    return this.shops.filter(shop => shop.rating >= minRating);
  }
}

export const localShopService = new LocalShopService();
