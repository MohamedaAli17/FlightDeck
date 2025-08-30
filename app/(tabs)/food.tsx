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
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useAuth } from '../../contexts/AuthContext';
import { router } from 'expo-router';
import RestaurantLogo from '../../components/RestaurantLogo';
import AuthModal from '../../components/AuthModal';

export default function FoodScreen() {
  const colorScheme = useColorScheme();
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);



  const restaurants = [
    {
      id: 1,
      name: 'One Flew South',
      description: 'Upscale Southern cuisine with creative twists',
      rating: 4.6,
      distance: '3 min walk',
      price: '$$$',
      cuisine: 'Southern',
      image: require('../../assets/images/restaurant-logos/one-flew-south-logo-HORZ.png'),
      recommended: true,
      hours: '11:00 AM - 9:00 PM',
      location: 'Concourse E',
      phone: '+1 (404) 555-0123',
      website: 'www.oneflewsouth.com',
    },
    {
      id: 2,
      name: 'Paschal\'s Restaurant',
      description: 'Atlanta institution serving soul food since 1947',
      rating: 4.4,
      distance: '4 min walk',
      price: '$$',
      cuisine: 'Southern',
      image: require('../../assets/images/restaurant-logos/paschals.png'),
      recommended: true,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0124',
      website: 'www.paschals.com',
    },
    {
      id: 3,
      name: 'Phillips Seafood',
      description: 'Fresh seafood specializing in Maryland crab cakes',
      rating: 4.3,
      distance: '5 min walk',
      price: '$$$',
      cuisine: 'Seafood',
      image: require('../../assets/images/restaurant-logos/phillips-seafood-logo.jpg'),
      recommended: true,
      hours: '11:00 AM - 9:30 PM',
      location: 'Concourse C',
      phone: '+1 (404) 555-0125',
      website: 'www.phillipsseafood.com',
    },
    {
      id: 4,
      name: 'The Varsity',
      description: 'Atlanta\'s famous drive-in with chili dogs and burgers',
      rating: 4.2,
      distance: '2 min walk',
      price: '$',
      cuisine: 'American',
      image: require('../../assets/images/restaurant-logos/varsity.webp'),
      recommended: true,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse F',
      phone: '+1 (404) 555-0126',
      website: 'www.thevarsity.com',
    },
    {
      id: 5,
      name: 'Sweet Auburn BBQ',
      description: 'Authentic Georgia barbecue with local flavors',
      rating: 4.5,
      distance: '6 min walk',
      price: '$$',
      cuisine: 'BBQ',
      image: require('../../assets/images/restaurant-logos/Sweet Auburn BBQ.png'),
      recommended: true,
      hours: '10:00 AM - 9:00 PM',
      location: 'Concourse D',
      phone: '+1 (404) 555-0127',
      website: 'www.sweetauburnbbq.com',
    },
    {
      id: 6,
      name: 'Chick-fil-A',
      description: 'Original Atlanta-born chicken sandwich chain',
      rating: 4.4,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Fast Food',
      image: require('../../assets/images/restaurant-logos/chick-fil-a-logo-red-1280x720_1400x400.webp'),
      recommended: false,
      hours: '5:00 AM - 11:00 PM',
      location: 'Multiple Locations',
      phone: '+1 (404) 555-0128',
      website: 'www.chick-fil-a.com',
    },
    {
      id: 7,
      name: 'PF Chang\'s',
      description: 'Asian fusion cuisine and hand-rolled sushi',
      rating: 4.1,
      distance: '8 min walk',
      price: '$$',
      cuisine: 'Asian',
      image: require('../../assets/images/restaurant-logos/pf-changs-logo-logo-png-transparent.png'),
      recommended: false,
      hours: '11:00 AM - 10:00 PM',
      location: 'Concourse B',
      phone: '+1 (404) 555-0129',
      website: 'www.pfchangs.com',
    },
    {
      id: 8,
      name: 'TGI Friday\'s',
      description: 'Casual American dining with signature cocktails',
      rating: 4.0,
      distance: '5 min walk',
      price: '$$',
      cuisine: 'American',
      image: null, // Will use fallback icon
      recommended: false,
      hours: '7:00 AM - 10:00 PM',
      location: 'Concourse C',
      phone: '+1 (404) 555-0130',
      website: 'www.tgifridays.com',
    },
    {
      id: 9,
      name: 'Café Intermezzo',
      description: 'European-style café with desserts and coffee',
      rating: 4.3,
      distance: '4 min walk',
      price: '$$',
      cuisine: 'Café',
      image: null, // Will use fallback icon
      recommended: true,
      hours: '5:00 AM - 11:00 PM',
      location: 'Concourse B',
      phone: '+1 (404) 555-0131',
      website: 'www.cafeintermezzo.com',
    },
    {
      id: 10,
      name: 'Starbucks',
      description: 'Premium coffee, teas, and light breakfast options',
      rating: 4.2,
      distance: '1 min walk',
      price: '$',
      cuisine: 'Coffee',
      image: null, // Will use fallback icon
      recommended: false,
      hours: '4:30 AM - 11:30 PM',
      location: 'Multiple Locations',
      phone: '+1 (404) 555-0132',
      website: 'www.starbucks.com',
    },
    {
      id: 11,
      name: 'Qdoba Mexican Eats',
      description: 'Fresh Mexican food with customizable bowls and burritos',
      rating: 4.0,
      distance: '3 min walk',
      price: '$',
      cuisine: 'Mexican',
      image: null, // Will use fallback icon
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0133',
      website: 'www.qdoba.com',
    },
    {
      id: 12,
      name: 'Burger King',
      description: 'Flame-grilled burgers and fast food favorites',
      rating: 3.8,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Fast Food',
      image: null, // Will use fallback icon
      recommended: false,
      hours: '5:00 AM - 11:00 PM',
      location: 'Concourse T',
      phone: '+1 (404) 555-0134',
      website: 'www.burgerking.com',
    },
    {
      id: 13,
      name: 'Popeyes Louisiana Kitchen',
      description: 'Spicy Louisiana-style fried chicken and seafood',
      rating: 4.1,
      distance: '4 min walk',
      price: '$',
      cuisine: 'Fast Food',
      image: null, // Will use fallback icon
      recommended: false,
      hours: '6:00 AM - 10:30 PM',
      location: 'Concourse D',
      phone: '+1 (404) 555-0135',
      website: 'www.popeyes.com',
    },
    {
      id: 14,
      name: 'Atlanta ChopHouse',
      description: 'Premium steakhouse with fine wines and cocktails',
      rating: 4.7,
      distance: '10 min walk',
      price: '$$$$',
      cuisine: 'Steakhouse',
      image: null, // Will use fallback icon
      recommended: true,
      hours: '11:00 AM - 9:00 PM',
      location: 'Concourse C',
      phone: '+1 (404) 555-0136',
      website: 'www.atlantachophouse.com',
    },
    {
      id: 15,
      name: 'Panda Express',
      description: 'American Chinese fast food with fresh wok cooking',
      rating: 4.0,
      distance: '3 min walk',
      price: '$',
      cuisine: 'Asian',
      image: null, // Will use fallback icon
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse F',
      phone: '+1 (404) 555-0137',
      website: 'www.pandaexpress.com',
    },
    {
      id: 16,
      name: 'Arby\'s',
      description: 'Roast beef sandwiches and curly fries',
      rating: 3.9,
      distance: '5 min walk',
      price: '$',
      cuisine: 'Fast Food',
      image: null, // Will use fallback icon
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse E',
      phone: '+1 (404) 555-0138',
      website: 'www.arbys.com',
    },
    {
      id: 17,
      name: 'Dunkin\'',
      description: 'Coffee, donuts, and breakfast sandwiches',
      rating: 4.1,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Coffee',
      image: null, // Will use fallback icon
      recommended: false,
      hours: '4:00 AM - 11:00 PM',
      location: 'Multiple Locations',
      phone: '+1 (404) 555-0139',
      website: 'www.dunkindonuts.com',
    },
    {
      id: 18,
      name: 'Ecco',
      description: 'Mediterranean cuisine with fresh ingredients and wine',
      rating: 4.5,
      distance: '7 min walk',
      price: '$$$',
      cuisine: 'Mediterranean',
      image: null, // Will use fallback icon
      recommended: true,
      hours: '11:00 AM - 9:30 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0140',
      website: 'www.ecco.com',
    },
  ];

  interface Restaurant {
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
  }

  const handleRestaurantPress = (restaurant: Restaurant) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    router.push({
      pathname: '/restaurant-detail',
      params: { id: restaurant.id }
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
          Food & Drink
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
          placeholder="Search restaurants..."
          placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>



      {/* Restaurant List */}
      <ScrollView style={styles.restaurantList} showsVerticalScrollIndicator={false}>
        {restaurants.map((restaurant) => (
          <TouchableOpacity
            key={restaurant.id}
            style={[styles.restaurantCard, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}
            onPress={() => handleRestaurantPress(restaurant)}
          >
            {/* Restaurant Image */}
            <View style={styles.imageContainer}>
              {restaurant.image ? (
                <Image 
                  source={restaurant.image} 
                  style={styles.restaurantImage}
                  resizeMode="contain"
                />
              ) : (
                <RestaurantLogo 
                  name={restaurant.name}
                  cuisine={restaurant.cuisine}
                  size={80}
                />
              )}
              {restaurant.recommended && (
                <View style={[styles.recommendedBadge, { backgroundColor: Colors[colorScheme ?? 'light'].accent }]}>
                  <Text style={[styles.recommendedText, { color: Colors[colorScheme ?? 'light'].primary }]}>
                    Recommended
                  </Text>
                </View>
              )}
            </View>

            {/* Restaurant Info */}
            <View style={styles.restaurantInfo}>
              <View style={styles.restaurantHeader}>
                <Text style={[styles.restaurantName, { color: Colors[colorScheme ?? 'light'].text }]}>
                  {restaurant.name}
                </Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color={Colors[colorScheme ?? 'light'].accent} />
                  <Text style={[styles.rating, { color: Colors[colorScheme ?? 'light'].text }]}>
                    {restaurant.rating}
                  </Text>
                </View>
              </View>

              <Text style={[styles.restaurantDescription, { color: Colors[colorScheme ?? 'light'].icon }]}>
                {restaurant.description}
              </Text>

              <View style={styles.restaurantDetails}>
                <View style={styles.detailRow}>
                  <Text style={[styles.cuisine, { color: Colors[colorScheme ?? 'light'].accentSecondary }]}>
                    {restaurant.cuisine}
                  </Text>
                  <Text style={[styles.price, { color: Colors[colorScheme ?? 'light'].icon }]}>
                    {restaurant.price}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <View style={styles.locationContainer}>
                    <Ionicons name="location" size={14} color={Colors[colorScheme ?? 'light'].icon} />
                    <Text style={[styles.location, { color: Colors[colorScheme ?? 'light'].icon }]}>
                      {restaurant.location}
                    </Text>
                  </View>
                  <Text style={[styles.distance, { color: Colors[colorScheme ?? 'light'].icon }]}>
                    {restaurant.distance}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <View style={styles.hoursContainer}>
                    <Ionicons name="time" size={14} color={Colors[colorScheme ?? 'light'].icon} />
                    <Text style={[styles.hours, { color: Colors[colorScheme ?? 'light'].icon }]}>
                      {restaurant.hours}
                    </Text>
                  </View>
                </View>
              </View>
            </View>


          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <AuthModal 
        visible={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
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

  restaurantList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  restaurantCard: {
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
  restaurantImage: {
    width: 80,
    height: 80,
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
  restaurantInfo: {
    flex: 1,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  restaurantName: {
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
  restaurantDescription: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  restaurantDetails: {
    gap: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cuisine: {
    fontSize: 12,
    fontWeight: '600',
  },
  price: {
    fontSize: 12,
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
}); 