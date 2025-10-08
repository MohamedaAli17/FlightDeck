import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { router } from 'expo-router';
import { useContent } from '../../contexts/ContentContext';
import { LocalShop } from '../../services/localShopService';

export default function ShoppingScreen() {
  const colorScheme = useColorScheme();
  const { shops } = useContent();
  
  // Fallback shops data (in case context is not available)
  const fallbackShops: LocalShop[] = [
    {
      id: 1,
      name: 'Atlanta News & Gifts',
      description: 'Souvenirs, books, magazines, and Atlanta-themed gifts',
      rating: 4.3,
      distance: '2 min walk',
      category: 'Gifts',
      image: '🎁',
      recommended: true,
      hours: '5:00 AM - 11:00 PM',
      location: 'Concourse A',
      offers: ['10% off Atlanta merchandise'],
      active: true,
    },
    {
      id: 2,
      name: 'CNN News Store',
      description: 'CNN branded merchandise and news items',
      rating: 4.1,
      distance: '3 min walk',
      category: 'Gifts',
      image: '📺',
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse A',
      offers: ['Free CNN mug with $25 purchase'],
      active: true,
    },
    {
      id: 3,
      name: 'MAC Cosmetics',
      description: 'Professional makeup and beauty products',
      rating: 4.5,
      distance: '5 min walk',
      category: 'Beauty',
      image: '💄',
      recommended: true,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse B',
      offers: ['Free makeup consultation'],
      active: true,
    },
    {
      id: 4,
      name: 'Best Buy Express',
      description: 'Electronics, headphones, and travel tech',
      rating: 4.2,
      distance: '4 min walk',
      category: 'Electronics',
      image: '📱',
      recommended: true,
      hours: '5:00 AM - 11:00 PM',
      location: 'Concourse B',
      offers: ['Price match guarantee', 'Free phone setup'],
      active: true,
    },
    {
      id: 5,
      name: 'Brookstone',
      description: 'Travel gadgets, massage chairs, and tech accessories',
      rating: 4.4,
      distance: '6 min walk',
      category: 'Electronics',
      image: '🔌',
      recommended: true,
      hours: '6:00 AM - 10:30 PM',
      location: 'Concourse C',
      offers: ['Free product demos'],
      active: true,
    },
    {
      id: 6,
      name: 'Sunglass Hut',
      description: 'Designer sunglasses and eyewear',
      rating: 4.3,
      distance: '3 min walk',
      category: 'Fashion',
      image: '🕶️',
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse D',
      offers: ['Buy one get one 50% off'],
      active: true,
    },
    {
      id: 7,
      name: 'Johnston & Murphy',
      description: 'Premium shoes and leather accessories',
      rating: 4.6,
      distance: '7 min walk',
      category: 'Fashion',
      image: '👞',
      recommended: true,
      hours: '6:00 AM - 9:30 PM',
      location: 'Concourse E',
      offers: ['Free shoe shine service'],
      active: true,
    },
    {
      id: 8,
      name: 'Coach',
      description: 'Luxury handbags, wallets, and accessories',
      rating: 4.7,
      distance: '8 min walk',
      category: 'Luxury',
      image: '👜',
      recommended: true,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse F',
      offers: ['Complimentary gift wrapping'],
      active: true,
    },
    {
      id: 9,
      name: 'Victoria\'s Secret',
      description: 'Lingerie, beauty products, and loungewear',
      rating: 4.2,
      distance: '5 min walk',
      category: 'Fashion',
      image: '💗',
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse T',
      offers: ['Free tote with $75 purchase'],
      active: true,
    },
    {
      id: 10,
      name: 'Tumi',
      description: 'Premium luggage and travel accessories',
      rating: 4.8,
      distance: '4 min walk',
      category: 'Travel',
      image: '🧳',
      recommended: true,
      hours: '5:30 AM - 10:30 PM',
      location: 'Concourse B',
      offers: ['Lifetime repair program'],
      active: true,
    },
    {
      id: 11,
      name: 'Pandora',
      description: 'Jewelry, charms, and personalized accessories',
      rating: 4.4,
      distance: '6 min walk',
      category: 'Jewelry',
      image: '💍',
      recommended: true,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse C',
      offers: ['Free jewelry cleaning'],
      active: true,
    },
    {
      id: 12,
      name: 'Hudson News',
      description: 'Newspapers, magazines, snacks, and convenience items',
      rating: 4.0,
      distance: '2 min walk',
      category: 'Convenience',
      image: '📰',
      recommended: false,
      hours: '5:00 AM - 11:30 PM',
      location: 'Multiple Locations',
      offers: ['Buy 2 drinks get 1 free snack'],
      active: true,
    },
    {
      id: 13,
      name: 'Duty Free Americas',
      description: 'International duty-free shopping with spirits, perfumes, and chocolates',
      rating: 4.3,
      distance: '9 min walk',
      category: 'Duty Free',
      image: '🛒',
      recommended: true,
      hours: '5:00 AM - 11:00 PM',
      location: 'International Terminal',
      offers: ['Tax-free shopping for international travelers'],
      active: true,
    },
    {
      id: 14,
      name: 'Lacoste',
      description: 'French sportswear and polo shirts',
      rating: 4.5,
      distance: '7 min walk',
      category: 'Fashion',
      image: '🐊',
      recommended: false,
      hours: '6:00 AM - 9:30 PM',
      location: 'Concourse E',
      offers: ['Student discount available'],
      active: true,
    },
    {
      id: 15,
      name: 'Tech on the Go',
      description: 'Phone repairs, chargers, and tech support',
      rating: 4.1,
      distance: '3 min walk',
      category: 'Electronics',
      image: '🔧',
      recommended: true,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse A',
      offers: ['Free phone diagnosis'],
      active: true,
    },
    {
      id: 16,
      name: 'Atlanta Braves Clubhouse Shop',
      description: 'Official Atlanta Braves merchandise and memorabilia',
      rating: 4.6,
      distance: '5 min walk',
      category: 'Sports',
      image: '⚾',
      recommended: true,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse D',
      offers: ['Exclusive airport jerseys'],
      active: true,
    },
    {
      id: 17,
      name: 'Spanx',
      description: 'Shapewear, leggings, and comfortable clothing',
      rating: 4.4,
      distance: '6 min walk',
      category: 'Fashion',
      image: '👗',
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse B',
      offers: ['Try before you fly fitting service'],
      active: true,
    },
    {
      id: 18,
      name: 'InMotion Entertainment',
      description: 'Headphones, speakers, and mobile accessories',
      rating: 4.3,
      distance: '4 min walk',
      category: 'Electronics',
      image: '🎧',
      recommended: true,
      hours: '5:30 AM - 11:00 PM',
      location: 'Concourse C',
      offers: ['Listen before you buy'],
      active: true,
    },
  ];

  // Filter to only show active shops, use fallback if context is empty
  const activeShops = shops.length > 0 
    ? shops.filter(shop => shop.active)
    : fallbackShops.filter(shop => shop.active);

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    concourse: '',
    category: '',
    rating: 0,
  });

  // Get unique values for filters
  const concourses = [...new Set(activeShops.map(s => s.location))];
  const categories = [...new Set(activeShops.map(s => s.category))];

  // Filter shops based on search and filters
  const filteredShops = activeShops.filter(shop => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Concourse filter
    const matchesConcourse = activeFilters.concourse === '' || 
      shop.location === activeFilters.concourse;

    // Category filter
    const matchesCategory = activeFilters.category === '' || 
      shop.category === activeFilters.category;

    // Rating filter
    const matchesRating = activeFilters.rating === 0 || 
      shop.rating >= activeFilters.rating;

    return matchesSearch && matchesConcourse && matchesCategory && matchesRating;
  });

  const clearFilters = () => {
    setActiveFilters({
      concourse: '',
      category: '',
      rating: 0,
    });
  };

  const hasActiveFilters = activeFilters.concourse !== '' || 
    activeFilters.category !== '' || 
    activeFilters.rating > 0;

  const handleShopPress = (shop: any) => {
    router.push({
      pathname: '/shop-detail',
      params: { id: shop.id }
    } as any);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons 
            name="arrow-back" 
            size={24} 
            color={Colors[colorScheme ?? 'light'].text} 
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Shopping
        </Text>
        <TouchableOpacity onPress={() => setShowFilterModal(true)}>
          <Ionicons 
            name="filter" 
            size={24} 
            color={Colors[colorScheme ?? 'light'].text} 
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
        <Ionicons 
          name="search" 
          size={20} 
          color={Colors[colorScheme ?? 'light'].icon} 
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.searchInput, { color: Colors[colorScheme ?? 'light'].text }]}
          placeholder="Search shops..."
          placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>



      {/* Active Filters Display */}
      {hasActiveFilters && (
        <View style={styles.activeFiltersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {activeFilters.concourse && (
              <View style={[styles.filterChip, { backgroundColor: Colors[colorScheme ?? 'light'].accent }]}>
                <Text style={[styles.filterChipText, { color: Colors[colorScheme ?? 'light'].primary }]}>
                  {activeFilters.concourse}
                </Text>
                <TouchableOpacity 
                  onPress={() => setActiveFilters(prev => ({ ...prev, concourse: '' }))}
                  style={styles.filterChipClose}
                >
                  <Ionicons name="close" size={14} color={Colors[colorScheme ?? 'light'].primary} />
                </TouchableOpacity>
              </View>
            )}
            {activeFilters.category && (
              <View style={[styles.filterChip, { backgroundColor: Colors[colorScheme ?? 'light'].accent }]}>
                <Text style={[styles.filterChipText, { color: Colors[colorScheme ?? 'light'].primary }]}>
                  {activeFilters.category}
                </Text>
                <TouchableOpacity 
                  onPress={() => setActiveFilters(prev => ({ ...prev, category: '' }))}
                  style={styles.filterChipClose}
                >
                  <Ionicons name="close" size={14} color={Colors[colorScheme ?? 'light'].primary} />
                </TouchableOpacity>
              </View>
            )}
            {activeFilters.rating > 0 && (
              <View style={[styles.filterChip, { backgroundColor: Colors[colorScheme ?? 'light'].accent }]}>
                <Text style={[styles.filterChipText, { color: Colors[colorScheme ?? 'light'].primary }]}>
                  {activeFilters.rating}+ Stars
                </Text>
                <TouchableOpacity 
                  onPress={() => setActiveFilters(prev => ({ ...prev, rating: 0 }))}
                  style={styles.filterChipClose}
                >
                  <Ionicons name="close" size={14} color={Colors[colorScheme ?? 'light'].primary} />
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity 
              style={[styles.clearFiltersButton, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}
              onPress={clearFilters}
            >
              <Text style={[styles.clearFiltersText, { color: Colors[colorScheme ?? 'light'].text }]}>
                Clear All
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* Shop List */}
      <ScrollView style={styles.shopList} showsVerticalScrollIndicator={false}>
        {filteredShops.length > 0 ? (
          filteredShops.map((shop) => (
          <TouchableOpacity
            key={shop.id}
            style={[styles.shopCard, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}
            onPress={() => handleShopPress(shop)}
          >
            {/* Shop Image */}
            <View style={styles.imageContainer}>
              <Text style={styles.shopImage}>{shop.image}</Text>
              {shop.recommended && (
                <View style={[styles.recommendedBadge, { backgroundColor: Colors[colorScheme ?? 'light'].accent }]}>
                  <Text style={[styles.recommendedText, { color: Colors[colorScheme ?? 'light'].primary }]}>
                    Recommended
                  </Text>
                </View>
              )}
            </View>

            {/* Shop Info */}
            <View style={styles.shopInfo}>
              <View style={styles.shopHeader}>
                <Text style={[styles.shopName, { color: Colors[colorScheme ?? 'light'].text }]}>
                  {shop.name}
                </Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color={Colors[colorScheme ?? 'light'].accent} />
                  <Text style={[styles.rating, { color: Colors[colorScheme ?? 'light'].text }]}>
                    {shop.rating}
                  </Text>
                </View>
              </View>

              <Text style={[styles.shopDescription, { color: Colors[colorScheme ?? 'light'].icon }]}>
                {shop.description}
              </Text>

              <View style={styles.shopDetails}>
                <View style={styles.detailRow}>
                  <Text style={[styles.category, { color: Colors[colorScheme ?? 'light'].accentSecondary }]}>
                    {shop.category}
                  </Text>
                  <Text style={[styles.distance, { color: Colors[colorScheme ?? 'light'].icon }]}>
                    {shop.distance}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <View style={styles.locationContainer}>
                    <Ionicons name="location" size={14} color={Colors[colorScheme ?? 'light'].icon} />
                    <Text style={[styles.location, { color: Colors[colorScheme ?? 'light'].icon }]}>
                      {shop.location}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <View style={styles.hoursContainer}>
                    <Ionicons name="time" size={14} color={Colors[colorScheme ?? 'light'].icon} />
                    <Text style={[styles.hours, { color: Colors[colorScheme ?? 'light'].icon }]}>
                      {shop.hours}
                    </Text>
                  </View>
                </View>

                {/* Offers */}
                {shop.offers.length > 0 && (
                  <View style={styles.offersContainer}>
                    {shop.offers.map((offer, index) => (
                      <View key={index} style={[styles.offerBadge, { backgroundColor: Colors[colorScheme ?? 'light'].accent }]}>
                        <Text style={[styles.offerText, { color: Colors[colorScheme ?? 'light'].primary }]}>
                          {offer}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>

            {/* Action Button */}
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
              onPress={() => handleShopPress(shop)}
            >
              <Text style={[styles.actionButtonText, { color: Colors[colorScheme ?? 'light'].background }]}>
                Shop Now
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))
        ) : (
          <View style={styles.noResultsContainer}>
            <Ionicons 
              name="search-outline" 
              size={48} 
              color={Colors[colorScheme ?? 'light'].icon} 
            />
            <Text style={[styles.noResultsTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
              No shops found
            </Text>
            <Text style={[styles.noResultsSubtitle, { color: Colors[colorScheme ?? 'light'].icon }]}>
              {searchQuery ? `No shops match "${searchQuery}"` : 'Try adjusting your filters'}
            </Text>
            {(searchQuery || hasActiveFilters) && (
              <TouchableOpacity 
                style={[styles.clearAllButton, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
                onPress={() => {
                  setSearchQuery('');
                  clearFilters();
                }}
              >
                <Text style={[styles.clearAllButtonText, { color: Colors[colorScheme ?? 'light'].background }]}>
                  Clear Search & Filters
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      {/* Filter Modal */}
      {showFilterModal && (
        <View style={styles.modalOverlay}>
          <View style={[styles.filterModal, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
            <View style={styles.filterModalHeader}>
              <Text style={[styles.filterModalTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                Filter Shops
              </Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Ionicons 
                  name="close" 
                  size={24} 
                  color={Colors[colorScheme ?? 'light'].text} 
                />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.filterModalContent}>
              {/* Concourse Filter */}
              <View style={styles.filterSection}>
                <Text style={[styles.filterSectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Concourse
                </Text>
                <View style={styles.filterOptions}>
                  <TouchableOpacity
                    style={[
                      styles.filterOption,
                      activeFilters.concourse === '' && { backgroundColor: Colors[colorScheme ?? 'light'].primary }
                    ]}
                    onPress={() => setActiveFilters(prev => ({ ...prev, concourse: '' }))}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      { color: activeFilters.concourse === '' ? Colors[colorScheme ?? 'light'].background : Colors[colorScheme ?? 'light'].text }
                    ]}>
                      All Concourses
                    </Text>
                  </TouchableOpacity>
                  {concourses.map((concourse) => (
                    <TouchableOpacity
                      key={concourse}
                      style={[
                        styles.filterOption,
                        activeFilters.concourse === concourse && { backgroundColor: Colors[colorScheme ?? 'light'].primary }
                      ]}
                      onPress={() => setActiveFilters(prev => ({ ...prev, concourse }))}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        { color: activeFilters.concourse === concourse ? Colors[colorScheme ?? 'light'].background : Colors[colorScheme ?? 'light'].text }
                      ]}>
                        {concourse}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Category Filter */}
              <View style={styles.filterSection}>
                <Text style={[styles.filterSectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Category
                </Text>
                <View style={styles.filterOptions}>
                  <TouchableOpacity
                    style={[
                      styles.filterOption,
                      activeFilters.category === '' && { backgroundColor: Colors[colorScheme ?? 'light'].primary }
                    ]}
                    onPress={() => setActiveFilters(prev => ({ ...prev, category: '' }))}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      { color: activeFilters.category === '' ? Colors[colorScheme ?? 'light'].background : Colors[colorScheme ?? 'light'].text }
                    ]}>
                      All Categories
                    </Text>
                  </TouchableOpacity>
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={category}
                      style={[
                        styles.filterOption,
                        activeFilters.category === category && { backgroundColor: Colors[colorScheme ?? 'light'].primary }
                      ]}
                      onPress={() => setActiveFilters(prev => ({ ...prev, category }))}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        { color: activeFilters.category === category ? Colors[colorScheme ?? 'light'].background : Colors[colorScheme ?? 'light'].text }
                      ]}>
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Rating Filter */}
              <View style={styles.filterSection}>
                <Text style={[styles.filterSectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Minimum Rating
                </Text>
                <View style={styles.filterOptions}>
                  <TouchableOpacity
                    style={[
                      styles.filterOption,
                      activeFilters.rating === 0 && { backgroundColor: Colors[colorScheme ?? 'light'].primary }
                    ]}
                    onPress={() => setActiveFilters(prev => ({ ...prev, rating: 0 }))}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      { color: activeFilters.rating === 0 ? Colors[colorScheme ?? 'light'].background : Colors[colorScheme ?? 'light'].text }
                    ]}>
                      Any Rating
                    </Text>
                  </TouchableOpacity>
                  {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                    <TouchableOpacity
                      key={rating}
                      style={[
                        styles.filterOption,
                        activeFilters.rating === rating && { backgroundColor: Colors[colorScheme ?? 'light'].primary }
                      ]}
                      onPress={() => setActiveFilters(prev => ({ ...prev, rating }))}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        { color: activeFilters.rating === rating ? Colors[colorScheme ?? 'light'].background : Colors[colorScheme ?? 'light'].text }
                      ]}>
                        {rating}+ Stars
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            <View style={styles.filterModalFooter}>
              <TouchableOpacity
                style={[styles.filterButton, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}
                onPress={clearFilters}
              >
                <Text style={[styles.filterButtonText, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Clear All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
                onPress={() => setShowFilterModal(false)}
              >
                <Text style={[styles.filterButtonText, { color: Colors[colorScheme ?? 'light'].background }]}>
                  Apply Filters
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },

  shopList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  shopCard: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  shopImage: {
    fontSize: 48,
    width: 80,
    height: 80,
    textAlign: 'center',
    lineHeight: 80,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  recommendedBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recommendedText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  shopInfo: {
    flex: 1,
  },
  shopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  shopDescription: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  shopDetails: {
    gap: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 12,
    marginLeft: 4,
  },
  distance: {
    fontSize: 12,
  },
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hours: {
    fontSize: 12,
    marginLeft: 4,
  },
  offersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  offerBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  offerText: {
    fontSize: 10,
    fontWeight: '600',
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  // Filter styles
  activeFiltersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  filterChipClose: {
    padding: 2,
  },
  clearFiltersButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  clearFiltersText: {
    fontSize: 12,
    fontWeight: '600',
  },
  // No results styles
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  noResultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  noResultsSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  clearAllButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  clearAllButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  // Modal styles
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  filterModal: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  filterModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  filterModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterModalContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  filterOptionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  filterModalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    gap: 12,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 
