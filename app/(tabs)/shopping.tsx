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

export default function ShoppingScreen() {
  const colorScheme = useColorScheme();

  const [searchQuery, setSearchQuery] = useState('');



  const shops = [
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
    },
  ];

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
        <TouchableOpacity>
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



      {/* Shop List */}
      <ScrollView style={styles.shopList} showsVerticalScrollIndicator={false}>
        {shops.map((shop) => (
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
        ))}
      </ScrollView>
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
}); 
