import React, { useState, useEffect } from 'react';
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
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useAuth } from '../../contexts/AuthContext';
import { router } from 'expo-router';
import RestaurantLogo from '../../components/RestaurantLogo';
import AuthModal from '../../components/AuthModal';
import { useContent } from '../../contexts/ContentContext';
import { LocalRestaurant } from '../../services/localRestaurantService';

export default function FoodScreen() {
  const colorScheme = useColorScheme();
  const { user } = useAuth();
  const { restaurants } = useContent();
  
  // Fallback restaurants data (in case context is not available)
  const fallbackRestaurants = [
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
      active: true,
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
      active: true,
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
      active: true,
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
      active: true,
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
      active: true,
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
      active: true,
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
      active: true,
    },
    {
      id: 8,
      name: 'TGI Friday\'s',
      description: 'Casual American dining with signature cocktails',
      rating: 4.0,
      distance: '5 min walk',
      price: '$$',
      cuisine: 'American',
      image: null,
      recommended: false,
      hours: '7:00 AM - 10:00 PM',
      location: 'Concourse C',
      phone: '+1 (404) 555-0130',
      website: 'www.tgifridays.com',
      active: true,
    },
    {
      id: 9,
      name: 'Café Intermezzo',
      description: 'European-style café with desserts and coffee',
      rating: 4.3,
      distance: '4 min walk',
      price: '$$',
      cuisine: 'Café',
      image: null,
      recommended: true,
      hours: '5:00 AM - 11:00 PM',
      location: 'Concourse B',
      phone: '+1 (404) 555-0131',
      website: 'www.cafeintermezzo.com',
      active: true,
    },
    {
      id: 10,
      name: 'Starbucks',
      description: 'Premium coffee, teas, and light breakfast options',
      rating: 4.2,
      distance: '1 min walk',
      price: '$',
      cuisine: 'Coffee',
      image: null,
      recommended: false,
      hours: '4:30 AM - 11:30 PM',
      location: 'Multiple Locations',
      phone: '+1 (404) 555-0132',
      website: 'www.starbucks.com',
      active: true,
    },
    {
      id: 11,
      name: 'Qdoba Mexican Eats',
      description: 'Fresh Mexican food with customizable bowls and burritos',
      rating: 4.0,
      distance: '3 min walk',
      price: '$',
      cuisine: 'Mexican',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0133',
      website: 'www.qdoba.com',
      active: true,
    },
    {
      id: 12,
      name: 'Burger King',
      description: 'Flame-grilled burgers and fast food favorites',
      rating: 3.8,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Fast Food',
      image: null,
      recommended: false,
      hours: '5:00 AM - 11:00 PM',
      location: 'Concourse T',
      phone: '+1 (404) 555-0134',
      website: 'www.burgerking.com',
      active: true,
    },
    {
      id: 13,
      name: 'Popeyes Louisiana Kitchen',
      description: 'Spicy Louisiana-style fried chicken and seafood',
      rating: 4.1,
      distance: '4 min walk',
      price: '$',
      cuisine: 'Fast Food',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:30 PM',
      location: 'Concourse D',
      phone: '+1 (404) 555-0135',
      website: 'www.popeyes.com',
      active: true,
    },
    {
      id: 14,
      name: 'Atlanta ChopHouse',
      description: 'Premium steakhouse with fine wines and cocktails',
      rating: 4.7,
      distance: '10 min walk',
      price: '$$$$',
      cuisine: 'Steakhouse',
      image: null,
      recommended: true,
      hours: '11:00 AM - 9:00 PM',
      location: 'Concourse C',
      phone: '+1 (404) 555-0136',
      website: 'www.atlantachophouse.com',
      active: true,
    },
    {
      id: 15,
      name: 'Panda Express',
      description: 'American Chinese fast food with fresh wok cooking',
      rating: 4.0,
      distance: '3 min walk',
      price: '$',
      cuisine: 'Asian',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse F',
      phone: '+1 (404) 555-0137',
      website: 'www.pandaexpress.com',
      active: true,
    },
    {
      id: 16,
      name: 'Arby\'s',
      description: 'Roast beef sandwiches and curly fries',
      rating: 3.9,
      distance: '5 min walk',
      price: '$',
      cuisine: 'Fast Food',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse E',
      phone: '+1 (404) 555-0138',
      website: 'www.arbys.com',
      active: true,
    },
    {
      id: 17,
      name: 'Dunkin\'',
      description: 'Coffee, donuts, and breakfast sandwiches',
      rating: 4.1,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Coffee',
      image: null,
      recommended: false,
      hours: '4:00 AM - 11:00 PM',
      location: 'Multiple Locations',
      phone: '+1 (404) 555-0139',
      website: 'www.dunkindonuts.com',
      active: true,
    },
    {
      id: 18,
      name: 'Ecco',
      description: 'Mediterranean cuisine with fresh ingredients and wine',
      rating: 4.5,
      distance: '7 min walk',
      price: '$$$',
      cuisine: 'Mediterranean',
      image: null,
      recommended: true,
      hours: '11:00 AM - 9:30 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0140',
      website: 'www.ecco.com',
      active: true,
    },
    {
      id: 19,
      name: 'Cat Cora\'s Kitchen',
      description: 'Celebrity chef restaurant featuring Mediterranean-inspired cuisine',
      rating: 4.3,
      distance: '2 min walk',
      price: '$$$',
      cuisine: 'Mediterranean',
      image: null,
      recommended: true,
      hours: '11:00 AM - 9:00 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0141',
      website: 'www.catcoraskitchen.com',
      active: true,
    },
    {
      id: 20,
      name: 'Gordon Biersch Brewery Restaurant',
      description: 'Brewery restaurant with craft beers and American cuisine',
      rating: 4.1,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'American',
      image: null,
      recommended: false,
      hours: '11:00 AM - 10:00 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0142',
      website: 'www.gordonbiersch.com',
      active: true,
    },
    {
      id: 21,
      name: 'Low Country New Southern Cuisine',
      description: 'Authentic Low Country Southern cooking with fresh ingredients',
      rating: 4.4,
      distance: '4 min walk',
      price: '$$',
      cuisine: 'Southern',
      image: null,
      recommended: true,
      hours: '10:00 AM - 9:00 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0143',
      website: 'www.lowcountrycuisine.com',
      active: true,
    },
    {
      id: 22,
      name: 'Boardwalk Fresh Burgers & Fries',
      description: 'Fresh, made-to-order burgers with hand-cut fries',
      rating: 4.0,
      distance: '2 min walk',
      price: '$',
      cuisine: 'American',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0144',
      website: 'www.boardwalkfresh.com',
      active: true,
    },
    {
      id: 23,
      name: 'Varasano\'s Pizzeria',
      description: 'Artisanal Neapolitan-style pizza with fresh ingredients',
      rating: 4.2,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'Italian',
      image: null,
      recommended: false,
      hours: '11:00 AM - 10:00 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0145',
      website: 'www.varasanos.com',
      active: true,
    },
    {
      id: 24,
      name: 'Shake Shack',
      description: 'Premium fast food with burgers, hot dogs, and frozen custard',
      rating: 4.3,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Fast Food',
      image: null,
      recommended: false,
      hours: '6:00 AM - 11:00 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0146',
      website: 'www.shakeshack.com',
      active: true,
    },
    {
      id: 25,
      name: 'Boar\'s Head Deli & Kiosks',
      description: 'Premium deli sandwiches and snacks with quality meats',
      rating: 4.0,
      distance: '1 min walk',
      price: '$',
      cuisine: 'Deli',
      image: null,
      recommended: false,
      hours: '5:00 AM - 11:00 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0147',
      website: 'www.boarshead.com',
      active: true,
    },
    {
      id: 26,
      name: 'Great Wraps',
      description: 'Fresh wraps and sandwiches made to order',
      rating: 3.9,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Sandwiches',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0148',
      website: 'www.greatwraps.com',
      active: true,
    },
    {
      id: 27,
      name: 'Atlanta Bread & Bar',
      description: 'Fresh-baked breads, sandwiches, and coffee',
      rating: 4.1,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Bakery',
      image: null,
      recommended: false,
      hours: '5:00 AM - 10:00 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0149',
      website: 'www.atlantabread.com',
      active: true,
    },
    {
      id: 28,
      name: 'Freshëns',
      description: 'Fresh, healthy food options with smoothies and wraps',
      rating: 4.0,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Healthy',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0150',
      website: 'www.freshens.com',
      active: true,
    },
    {
      id: 29,
      name: 'Caribou Coffee',
      description: 'Premium coffee and tea with pastries and light fare',
      rating: 4.2,
      distance: '1 min walk',
      price: '$',
      cuisine: 'Coffee',
      image: null,
      recommended: false,
      hours: '4:00 AM - 11:00 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0151',
      website: 'www.cariboucoffee.com',
      active: true,
    },
    {
      id: 30,
      name: 'Coffee Bean & Tea Leaf',
      description: 'International coffee and tea with pastries',
      rating: 4.1,
      distance: '1 min walk',
      price: '$',
      cuisine: 'Coffee',
      image: null,
      recommended: false,
      hours: '4:00 AM - 11:00 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0152',
      website: 'www.coffeebean.com',
      active: true,
    },
    {
      id: 31,
      name: 'McDonald\'s',
      description: 'Classic American fast food with burgers and fries',
      rating: 3.8,
      distance: '1 min walk',
      price: '$',
      cuisine: 'Fast Food',
      image: null,
      recommended: false,
      hours: '4:00 AM - 11:00 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0153',
      website: 'www.mcdonalds.com',
      active: true,
    },
    {
      id: 32,
      name: 'Brioche Dorée',
      description: 'French bakery with pastries, sandwiches, and coffee',
      rating: 4.0,
      distance: '2 min walk',
      price: '$',
      cuisine: 'French',
      image: null,
      recommended: false,
      hours: '5:00 AM - 10:00 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0154',
      website: 'www.briochedoree.com',
      active: true,
    },
    {
      id: 33,
      name: 'Piece of Cake',
      description: 'Specialty cakes and desserts with coffee',
      rating: 4.2,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Desserts',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0155',
      website: 'www.pieceofcake.com',
      active: true,
    },
    {
      id: 34,
      name: 'Pinkberry',
      description: 'Frozen yogurt with fresh toppings and flavors',
      rating: 4.0,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Desserts',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0156',
      website: 'www.pinkberry.com',
      active: true,
    },
    {
      id: 35,
      name: 'Goldberg\'s Bagels Deli',
      description: 'Fresh bagels, deli sandwiches, and Jewish specialties',
      rating: 4.1,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Deli',
      image: null,
      recommended: false,
      hours: '5:00 AM - 10:00 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0157',
      website: 'www.goldbergsbagels.com',
      active: true,
    },
    {
      id: 36,
      name: 'Sambazon',
      description: 'Acai bowls, smoothies, and healthy superfood options',
      rating: 4.2,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Healthy',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0158',
      website: 'www.sambazon.com',
      active: true,
    },
    {
      id: 37,
      name: 'Atlanta Hawks Bar and Grill',
      description: 'Sports bar with game day favorites and drinks',
      rating: 4.0,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'Sports Bar',
      image: null,
      recommended: false,
      hours: '11:00 AM - 10:00 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0159',
      website: 'www.hawksbar.com',
      active: true,
    },
    {
      id: 38,
      name: 'Beercode Kitchen & Bar',
      description: 'Craft beer bar with elevated pub food',
      rating: 4.1,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'Gastropub',
      image: null,
      recommended: false,
      hours: '11:00 AM - 10:00 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0160',
      website: 'www.beercode.com',
      active: true,
    },
    {
      id: 39,
      name: 'Asian Chao',
      description: 'Asian street food with fresh ingredients and bold flavors',
      rating: 4.0,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Asian',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0161',
      website: 'www.asianchao.com',
      active: true,
    },
    {
      id: 40,
      name: 'SweetWater Last Call Bar & Grill',
      description: 'Local Atlanta brewery with craft beers and pub food',
      rating: 4.2,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'Brewery',
      image: null,
      recommended: false,
      hours: '11:00 AM - 10:00 PM',
      location: 'Concourse B',
      phone: '+1 (404) 555-0162',
      website: 'www.sweetwaterbrew.com',
      active: true,
    },
    {
      id: 41,
      name: 'Bobby\'s Burger Palace',
      description: 'Celebrity chef burgers with creative toppings and sides',
      rating: 4.1,
      distance: '4 min walk',
      price: '$$',
      cuisine: 'American',
      image: null,
      recommended: false,
      hours: '11:00 AM - 10:00 PM',
      location: 'Concourse B',
      phone: '+1 (404) 555-0163',
      website: 'www.bobbysburgerpalace.com',
      active: true,
    },
    {
      id: 42,
      name: 'Blue Moon Brewhouse',
      description: 'Craft brewery with house-made beers and American cuisine',
      rating: 4.0,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'Brewery',
      image: null,
      recommended: false,
      hours: '11:00 AM - 10:00 PM',
      location: 'Concourse B',
      phone: '+1 (404) 555-0164',
      website: 'www.bluemoonbrewhouse.com',
      active: true,
    },
    {
      id: 43,
      name: 'Auntie Anne\'s',
      description: 'Fresh-baked soft pretzels with dipping sauces',
      rating: 4.0,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Snacks',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse B',
      phone: '+1 (404) 555-0165',
      website: 'www.auntieannes.com',
      active: true,
    },
    {
      id: 44,
      name: 'Atlanta Bread Company Kiosk',
      description: 'Fresh breads, sandwiches, and coffee',
      rating: 4.0,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Bakery',
      image: null,
      recommended: false,
      hours: '5:00 AM - 10:00 PM',
      location: 'Concourse B',
      phone: '+1 (404) 555-0166',
      website: 'www.atlantabread.com',
      active: true,
    },
    {
      id: 45,
      name: 'Banghouse Pizza',
      description: 'Artisanal pizza with fresh toppings and creative combinations',
      rating: 4.1,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'Italian',
      image: null,
      recommended: false,
      hours: '11:00 AM - 10:00 PM',
      location: 'Concourse B',
      phone: '+1 (404) 555-0167',
      website: 'www.banghousepizza.com',
      active: true,
    },
    {
      id: 46,
      name: 'Fresh 2 Order',
      description: 'Fresh, healthy food made to order with quality ingredients',
      rating: 4.2,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Healthy',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse B',
      phone: '+1 (404) 555-0168',
      website: 'www.fresh2order.com',
      active: true,
    },
    {
      id: 47,
      name: 'Popeyes',
      description: 'Louisiana-style fried chicken and seafood',
      rating: 4.0,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Fast Food',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse B',
      phone: '+1 (404) 555-0169',
      website: 'www.popeyes.com',
      active: true,
    },
    {
      id: 48,
      name: 'TGI Friday\'s',
      description: 'Casual American dining with signature cocktails',
      rating: 4.0,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'American',
      image: null,
      recommended: false,
      hours: '7:00 AM - 10:00 PM',
      location: 'Concourse B',
      phone: '+1 (404) 555-0170',
      website: 'www.tgifridays.com',
      active: true,
    },
    {
      id: 49,
      name: 'Wendy\'s',
      description: 'Fresh, never frozen beef burgers and fast food favorites',
      rating: 3.9,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Fast Food',
      image: null,
      recommended: false,
      hours: '5:00 AM - 11:00 PM',
      location: 'Concourse B',
      phone: '+1 (404) 555-0171',
      website: 'www.wendys.com',
      active: true,
    },
    {
      id: 50,
      name: 'Willy\'s Mexican Grill',
      description: 'Fresh Mexican food with customizable burritos and bowls',
      rating: 4.1,
      distance: '3 min walk',
      price: '$',
      cuisine: 'Mexican',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse B',
      phone: '+1 (404) 555-0172',
      website: 'www.willysmexicangrill.com',
      active: true,
    },
    {
      id: 51,
      name: 'Coffee Beanery / Purple Leaf Café',
      description: 'Premium coffee and tea with light fare',
      rating: 4.0,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Coffee',
      image: null,
      recommended: false,
      hours: '4:00 AM - 11:00 PM',
      location: 'Concourse B',
      phone: '+1 (404) 555-0173',
      website: 'www.coffeebeanery.com',
      active: true,
    },
    {
      id: 52,
      name: 'Roast Coffeehouse',
      description: 'Artisanal coffee roasting with fresh brews and pastries',
      rating: 4.2,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Coffee',
      image: null,
      recommended: false,
      hours: '5:00 AM - 10:00 PM',
      location: 'Concourse B',
      phone: '+1 (404) 555-0174',
      website: 'www.roastcoffeehouse.com',
      active: true,
    },
    {
      id: 53,
      name: 'Samuel Adams Bar',
      description: 'Boston brewery bar with craft beers and pub food',
      rating: 4.0,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'Brewery',
      image: null,
      recommended: false,
      hours: '11:00 AM - 10:00 PM',
      location: 'Concourse B',
      phone: '+1 (404) 555-0175',
      website: 'www.samueladams.com',
      active: true,
    },
    {
      id: 54,
      name: 'Proof of the Pudding kiosk(s)',
      description: 'Gourmet catering kiosks with fresh, local ingredients',
      rating: 4.1,
      distance: '2 min walk',
      price: '$$',
      cuisine: 'Gourmet',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse B',
      phone: '+1 (404) 555-0176',
      website: 'www.proofofthepudding.com',
      active: true,
    },
    {
      id: 55,
      name: 'Savannah\'s Candy Kitchen',
      description: 'Handmade candies, fudge, and sweet treats',
      rating: 4.2,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Desserts',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse B',
      phone: '+1 (404) 555-0177',
      website: 'www.savannahscandy.com',
      active: true,
    },
    {
      id: 56,
      name: 'Savi Provisions',
      description: 'Gourmet market with fresh ingredients and prepared foods',
      rating: 4.1,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'Gourmet Market',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse B',
      phone: '+1 (404) 555-0178',
      website: 'www.saviprovisions.com',
      active: true,
    },
    {
      id: 57,
      name: 'Bantam & Biddy',
      description: 'Southern comfort food with a modern twist',
      rating: 4.3,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'Southern',
      image: null,
      recommended: true,
      hours: '10:00 AM - 9:00 PM',
      location: 'Concourse C',
      phone: '+1 (404) 555-0179',
      website: 'www.bantamandbiddy.com',
      active: true,
    },
    {
      id: 58,
      name: 'El Taco (The Original El Taco)',
      description: 'Authentic Mexican tacos with fresh ingredients',
      rating: 4.1,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Mexican',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse C',
      phone: '+1 (404) 555-0180',
      website: 'www.eltaco.com',
      active: true,
    },
    {
      id: 59,
      name: 'Krispy Kreme',
      description: 'Fresh hot glazed donuts and coffee',
      rating: 4.0,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Desserts',
      image: null,
      recommended: false,
      hours: '5:00 AM - 10:00 PM',
      location: 'Concourse C',
      phone: '+1 (404) 555-0181',
      website: 'www.krispykreme.com',
      active: true,
    },
    {
      id: 60,
      name: 'Atlanta Bread Company',
      description: 'Fresh-baked breads, sandwiches, and coffee',
      rating: 4.1,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Bakery',
      image: null,
      recommended: false,
      hours: '5:00 AM - 10:00 PM',
      location: 'Concourse C',
      phone: '+1 (404) 555-0182',
      website: 'www.atlantabread.com',
      active: true,
    },
    {
      id: 61,
      name: 'Auntie Anne\'s',
      description: 'Fresh-baked soft pretzels with dipping sauces',
      rating: 4.0,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Snacks',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse C',
      phone: '+1 (404) 555-0183',
      website: 'www.auntieannes.com',
      active: true,
    },
    {
      id: 62,
      name: 'Carrabba\'s Italian Grill',
      description: 'Authentic Italian cuisine with fresh pasta and sauces',
      rating: 4.2,
      distance: '4 min walk',
      price: '$$',
      cuisine: 'Italian',
      image: null,
      recommended: false,
      hours: '11:00 AM - 10:00 PM',
      location: 'Concourse C',
      phone: '+1 (404) 555-0184',
      website: 'www.carrabbas.com',
      active: true,
    },
    {
      id: 63,
      name: 'Five Guys Burgers & Fries',
      description: 'Fresh beef burgers with unlimited toppings and hand-cut fries',
      rating: 4.3,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'American',
      image: null,
      recommended: false,
      hours: '10:00 AM - 10:00 PM',
      location: 'Concourse C',
      phone: '+1 (404) 555-0185',
      website: 'www.fiveguys.com',
      active: true,
    },
    {
      id: 64,
      name: 'La Madeleine',
      description: 'French bakery and café with pastries and light fare',
      rating: 4.1,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'French',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse C',
      phone: '+1 (404) 555-0186',
      website: 'www.lamadeleine.com',
      active: true,
    },
    {
      id: 65,
      name: 'Longhorn Steakhouse',
      description: 'Western-themed steakhouse with grilled steaks and sides',
      rating: 4.2,
      distance: '5 min walk',
      price: '$$$',
      cuisine: 'Steakhouse',
      image: null,
      recommended: false,
      hours: '11:00 AM - 9:00 PM',
      location: 'Concourse C',
      phone: '+1 (404) 555-0187',
      website: 'www.longhornsteakhouse.com',
      active: true,
    },
    {
      id: 66,
      name: 'Famous Famiglia Pizza',
      description: 'New York-style pizza with fresh ingredients',
      rating: 4.0,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Italian',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse C',
      phone: '+1 (404) 555-0188',
      website: 'www.famousfamiglia.com',
      active: true,
    },
    {
      id: 67,
      name: 'Charley\'s Philly Steaks',
      description: 'Authentic Philadelphia cheesesteaks and hoagies',
      rating: 4.1,
      distance: '3 min walk',
      price: '$',
      cuisine: 'American',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse C',
      phone: '+1 (404) 555-0189',
      website: 'www.charleys.com',
      active: true,
    },
    {
      id: 68,
      name: 'Fresh Healthy Café',
      description: 'Healthy food options with fresh ingredients and smoothies',
      rating: 4.2,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Healthy',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse C',
      phone: '+1 (404) 555-0190',
      website: 'www.freshhealthy.com',
      active: true,
    },
    {
      id: 69,
      name: 'Jersey Mike\'s Subs',
      description: 'Fresh submarine sandwiches with premium meats and cheeses',
      rating: 4.1,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Sandwiches',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse C',
      phone: '+1 (404) 555-0191',
      website: 'www.jerseymikes.com',
      active: true,
    },
    {
      id: 70,
      name: 'Leeann Chin',
      description: 'Chinese cuisine with fresh ingredients and authentic flavors',
      rating: 4.0,
      distance: '3 min walk',
      price: '$',
      cuisine: 'Asian',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse C',
      phone: '+1 (404) 555-0192',
      website: 'www.leeannchin.com',
      active: true,
    },
    {
      id: 71,
      name: 'Links Grill',
      description: 'Sports bar with game day favorites and drinks',
      rating: 4.0,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'Sports Bar',
      image: null,
      recommended: false,
      hours: '11:00 AM - 10:00 PM',
      location: 'Concourse C',
      phone: '+1 (404) 555-0193',
      website: 'www.linksgrill.com',
      active: true,
    },
    {
      id: 72,
      name: 'Sbarro',
      description: 'Italian fast food with pizza, pasta, and salads',
      rating: 3.9,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Italian',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse C',
      phone: '+1 (404) 555-0194',
      website: 'www.sbarro.com',
      active: true,
    },
    {
      id: 73,
      name: 'Salad Works',
      description: 'Fresh salads and healthy food options',
      rating: 4.0,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Healthy',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse C',
      phone: '+1 (404) 555-0195',
      website: 'www.saladworks.com',
      active: true,
    },
    {
      id: 74,
      name: 'Sweet Georgia Juke Joint',
      description: 'Southern soul food with live music atmosphere',
      rating: 4.3,
      distance: '4 min walk',
      price: '$$',
      cuisine: 'Southern',
      image: null,
      recommended: true,
      hours: '11:00 AM - 9:00 PM',
      location: 'Concourse C',
      phone: '+1 (404) 555-0196',
      website: 'www.sweetgeorgiajukejoint.com',
      active: true,
    },
    {
      id: 75,
      name: 'Starbucks',
      description: 'Premium coffee, teas, and light breakfast options',
      rating: 4.2,
      distance: '1 min walk',
      price: '$',
      cuisine: 'Coffee',
      image: null,
      recommended: false,
      hours: '4:30 AM - 11:30 PM',
      location: 'Concourse C',
      phone: '+1 (404) 555-0197',
      website: 'www.starbucks.com',
      active: true,
    },
    {
      id: 76,
      name: 'Savannah\'s Candy Kitchen',
      description: 'Handmade candies, fudge, and sweet treats',
      rating: 4.2,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Desserts',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse C',
      phone: '+1 (404) 555-0198',
      website: 'www.savannahscandy.com',
      active: true,
    },
    {
      id: 77,
      name: 'Chicken + Beer (Ludacris\' restaurant)',
      description: 'Celebrity chef restaurant with Southern fried chicken and craft beers',
      rating: 4.4,
      distance: '5 min walk',
      price: '$$',
      cuisine: 'Southern',
      image: null,
      recommended: true,
      hours: '11:00 AM - 9:00 PM',
      location: 'Concourse D',
      phone: '+1 (404) 555-0199',
      website: 'www.chickenplusbeer.com',
      active: true,
    },
    {
      id: 78,
      name: 'Grindhouse Killer Burgers',
      description: 'Gourmet burgers with creative toppings and fresh ingredients',
      rating: 4.3,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'American',
      image: null,
      recommended: false,
      hours: '11:00 AM - 10:00 PM',
      location: 'Concourse D',
      phone: '+1 (404) 555-0200',
      website: 'www.grindhouseburgers.com',
      active: true,
    },
    {
      id: 79,
      name: 'Mustard Seed BBQ',
      description: 'Authentic BBQ with smoked meats and Southern sides',
      rating: 4.2,
      distance: '4 min walk',
      price: '$$',
      cuisine: 'BBQ',
      image: null,
      recommended: false,
      hours: '10:00 AM - 9:00 PM',
      location: 'Concourse D',
      phone: '+1 (404) 555-0201',
      website: 'www.mustardseedbbq.com',
      active: true,
    },
    {
      id: 80,
      name: 'Harvest + Grounds',
      description: 'Farm-to-table dining with fresh, local ingredients',
      rating: 4.3,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'American',
      image: null,
      recommended: true,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse D',
      phone: '+1 (404) 555-0202',
      website: 'www.harvestandgrounds.com',
      active: true,
    },
    {
      id: 81,
      name: 'Garbanzo Mediterranean Grill',
      description: 'Fresh Mediterranean food with falafel, shawarma, and hummus',
      rating: 4.1,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Mediterranean',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse D',
      phone: '+1 (404) 555-0203',
      website: 'www.garbanzo.com',
      active: true,
    },
    {
      id: 82,
      name: 'Buffalo Wild Wings',
      description: 'Sports bar with wings, burgers, and game day atmosphere',
      rating: 4.0,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'Sports Bar',
      image: null,
      recommended: false,
      hours: '11:00 AM - 10:00 PM',
      location: 'Concourse D',
      phone: '+1 (404) 555-0204',
      website: 'www.buffalowildwings.com',
      active: true,
    },
    {
      id: 83,
      name: 'Chipotle Mexican Grill',
      description: 'Fresh Mexican food with customizable burritos and bowls',
      rating: 4.2,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Mexican',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse D',
      phone: '+1 (404) 555-0205',
      website: 'www.chipotle.com',
      active: true,
    },
    {
      id: 84,
      name: 'Einstein Bros. Bagels',
      description: 'Fresh bagels, sandwiches, and coffee',
      rating: 4.0,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Bakery',
      image: null,
      recommended: false,
      hours: '5:00 AM - 10:00 PM',
      location: 'Concourse D',
      phone: '+1 (404) 555-0206',
      website: 'www.einsteinbros.com',
      active: true,
    },
    {
      id: 85,
      name: 'The Market by Food & Wine',
      description: 'Gourmet market with fresh ingredients and prepared foods',
      rating: 4.3,
      distance: '4 min walk',
      price: '$$',
      cuisine: 'Gourmet Market',
      image: null,
      recommended: true,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse D',
      phone: '+1 (404) 555-0207',
      website: 'www.foodandwine.com',
      active: true,
    },
    {
      id: 86,
      name: '40/40 Club',
      description: 'Upscale sports bar with premium dining and entertainment',
      rating: 4.2,
      distance: '5 min walk',
      price: '$$$',
      cuisine: 'Sports Bar',
      image: null,
      recommended: false,
      hours: '11:00 AM - 10:00 PM',
      location: 'Concourse D',
      phone: '+1 (404) 555-0208',
      website: 'www.4040club.com',
      active: true,
    },
    {
      id: 87,
      name: 'Terrapin Brewery',
      description: 'Local Athens brewery with craft beers and pub food',
      rating: 4.1,
      distance: '4 min walk',
      price: '$$',
      cuisine: 'Brewery',
      image: null,
      recommended: false,
      hours: '11:00 AM - 10:00 PM',
      location: 'Concourse D',
      phone: '+1 (404) 555-0209',
      website: 'www.terrapinbeer.com',
      active: true,
    },
    {
      id: 88,
      name: 'Aunt Annie\'s',
      description: 'Fresh-baked soft pretzels with dipping sauces',
      rating: 4.0,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Snacks',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse D',
      phone: '+1 (404) 555-0210',
      website: 'www.auntieannes.com',
      active: true,
    },
    {
      id: 89,
      name: 'Asian Chao',
      description: 'Asian street food with fresh ingredients and bold flavors',
      rating: 4.0,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Asian',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse D',
      phone: '+1 (404) 555-0211',
      website: 'www.asianchao.com',
      active: true,
    },
    {
      id: 90,
      name: 'Atlanta Braves All Star Grill',
      description: 'Baseball-themed sports bar with game day favorites',
      rating: 4.1,
      distance: '4 min walk',
      price: '$$',
      cuisine: 'Sports Bar',
      image: null,
      recommended: false,
      hours: '11:00 AM - 10:00 PM',
      location: 'Concourse D',
      phone: '+1 (404) 555-0212',
      website: 'www.bravesgrill.com',
      active: true,
    },
    {
      id: 91,
      name: 'KOHO',
      description: 'Korean BBQ and Asian fusion cuisine',
      rating: 4.2,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'Asian',
      image: null,
      recommended: false,
      hours: '11:00 AM - 9:00 PM',
      location: 'Concourse D',
      phone: '+1 (404) 555-0213',
      website: 'www.koho.com',
      active: true,
    },
    {
      id: 92,
      name: 'Wolfgang Puck Grab & Go Kiosk',
      description: 'Celebrity chef grab-and-go options with premium ingredients',
      rating: 4.3,
      distance: '2 min walk',
      price: '$$',
      cuisine: 'Gourmet',
      image: null,
      recommended: true,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse D',
      phone: '+1 (404) 555-0214',
      website: 'www.wolfgangpuck.com',
      active: true,
    },
    {
      id: 93,
      name: 'Ecco',
      description: 'European fine dining with Mediterranean cuisine and wine',
      rating: 4.5,
      distance: '6 min walk',
      price: '$$$',
      cuisine: 'Mediterranean',
      image: null,
      recommended: true,
      hours: '11:00 AM - 9:30 PM',
      location: 'Concourse F',
      phone: '+1 (404) 555-0215',
      website: 'www.ecco.com',
      active: true,
    },
    {
      id: 94,
      name: 'The Pecan Bistro',
      description: 'Southern bistro with pecan-inspired dishes and local flavors',
      rating: 4.3,
      distance: '4 min walk',
      price: '$$',
      cuisine: 'Southern',
      image: null,
      recommended: true,
      hours: '10:00 AM - 9:00 PM',
      location: 'Concourse F',
      phone: '+1 (404) 555-0216',
      website: 'www.pecanbistro.com',
      active: true,
    },
    {
      id: 95,
      name: 'Jekyll Island Seafood',
      description: 'Fresh coastal seafood with Georgia flavors',
      rating: 4.2,
      distance: '5 min walk',
      price: '$$$',
      cuisine: 'Seafood',
      image: null,
      recommended: false,
      hours: '11:00 AM - 9:00 PM',
      location: 'Concourse F',
      phone: '+1 (404) 555-0217',
      website: 'www.jekyllislandseafood.com',
      active: true,
    },
    {
      id: 96,
      name: 'Lorena Garcia Tapas Bar',
      description: 'Celebrity chef tapas with Latin American flavors',
      rating: 4.4,
      distance: '4 min walk',
      price: '$$$',
      cuisine: 'Latin American',
      image: null,
      recommended: true,
      hours: '11:00 AM - 9:00 PM',
      location: 'Concourse F',
      phone: '+1 (404) 555-0218',
      website: 'www.lorenagarcia.com',
      active: true,
    },
    {
      id: 97,
      name: 'Maison Mathis',
      description: 'French bakery and café with authentic pastries',
      rating: 4.1,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'French',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse F',
      phone: '+1 (404) 555-0219',
      website: 'www.maisonmathis.com',
      active: true,
    },
    {
      id: 98,
      name: 'Pei Wei Asian Diner',
      description: 'Fresh Asian cuisine with wok cooking and bold flavors',
      rating: 4.0,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Asian',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse F',
      phone: '+1 (404) 555-0220',
      website: 'www.peiwei.com',
      active: true,
    },
    {
      id: 99,
      name: 'Burger King',
      description: 'Flame-grilled burgers and fast food favorites',
      rating: 3.8,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Fast Food',
      image: null,
      recommended: false,
      hours: '5:00 AM - 11:00 PM',
      location: 'Concourse F',
      phone: '+1 (404) 555-0221',
      website: 'www.burgerking.com',
      active: true,
    },
    {
      id: 100,
      name: 'Atlanta Bread Company',
      description: 'Fresh-baked breads, sandwiches, and coffee',
      rating: 4.1,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Bakery',
      image: null,
      recommended: false,
      hours: '5:00 AM - 10:00 PM',
      location: 'Concourse F',
      phone: '+1 (404) 555-0222',
      website: 'www.atlantabread.com',
      active: true,
    },
    {
      id: 101,
      name: 'Starbucks',
      description: 'Premium coffee, teas, and light breakfast options',
      rating: 4.2,
      distance: '1 min walk',
      price: '$',
      cuisine: 'Coffee',
      image: null,
      recommended: false,
      hours: '4:30 AM - 11:30 PM',
      location: 'Concourse F',
      phone: '+1 (404) 555-0223',
      website: 'www.starbucks.com',
      active: true,
    },
    {
      id: 102,
      name: 'Grindhouse Killer Burgers',
      description: 'Gourmet burgers with creative toppings and fresh ingredients',
      rating: 4.3,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'American',
      image: null,
      recommended: false,
      hours: '11:00 AM - 10:00 PM',
      location: 'Concourse T',
      phone: '+1 (404) 555-0224',
      website: 'www.grindhouseburgers.com',
      active: true,
    },
    {
      id: 103,
      name: 'Atlanta Stillhouse',
      description: 'Craft distillery with house-made spirits and Southern cuisine',
      rating: 4.2,
      distance: '4 min walk',
      price: '$$$',
      cuisine: 'Southern',
      image: null,
      recommended: true,
      hours: '11:00 AM - 9:00 PM',
      location: 'Concourse T',
      phone: '+1 (404) 555-0225',
      website: 'www.atlantastillhouse.com',
      active: true,
    },
    {
      id: 104,
      name: 'Uncle Maddio\'s Pizza',
      description: 'Artisanal pizza with fresh ingredients and creative toppings',
      rating: 4.1,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'Italian',
      image: null,
      recommended: false,
      hours: '11:00 AM - 10:00 PM',
      location: 'Concourse T',
      phone: '+1 (404) 555-0226',
      website: 'www.unclemaddios.com',
      active: true,
    },
    {
      id: 105,
      name: 'Goldberg\'s Bagel Company & Deli',
      description: 'Fresh bagels, deli sandwiches, and Jewish specialties',
      rating: 4.1,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Deli',
      image: null,
      recommended: false,
      hours: '5:00 AM - 10:00 PM',
      location: 'Concourse T',
      phone: '+1 (404) 555-0227',
      website: 'www.goldbergsbagels.com',
      active: true,
    },
    {
      id: 106,
      name: 'Bojangles',
      description: 'Southern fried chicken and biscuits with Cajun flavors',
      rating: 4.0,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Fast Food',
      image: null,
      recommended: false,
      hours: '5:00 AM - 11:00 PM',
      location: 'Concourse T',
      phone: '+1 (404) 555-0228',
      website: 'www.bojangles.com',
      active: true,
    },
    {
      id: 107,
      name: 'Cantina Loredo Mexican Restaurant',
      description: 'Authentic Mexican cuisine with fresh ingredients and margaritas',
      rating: 4.2,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'Mexican',
      image: null,
      recommended: false,
      hours: '11:00 AM - 10:00 PM',
      location: 'Concourse T',
      phone: '+1 (404) 555-0229',
      website: 'www.cantinaloredo.com',
      active: true,
    },
    {
      id: 108,
      name: 'Dunkin\'',
      description: 'Coffee, donuts, and breakfast sandwiches',
      rating: 4.1,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Coffee',
      image: null,
      recommended: false,
      hours: '4:00 AM - 11:00 PM',
      location: 'Concourse T',
      phone: '+1 (404) 555-0230',
      website: 'www.dunkindonuts.com',
      active: true,
    },
    {
      id: 109,
      name: 'Harvest & Grounds',
      description: 'Farm-to-table dining with fresh, local ingredients',
      rating: 4.3,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'American',
      image: null,
      recommended: true,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse T',
      phone: '+1 (404) 555-0231',
      website: 'www.harvestandgrounds.com',
      active: true,
    },
    {
      id: 110,
      name: 'Jamba Juice',
      description: 'Fresh fruit smoothies and healthy food options',
      rating: 4.0,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Healthy',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse T',
      phone: '+1 (404) 555-0232',
      website: 'www.jambajuice.com',
      active: true,
    },
    {
      id: 111,
      name: 'Papi\'s Caribbean Cafe',
      description: 'Authentic Caribbean cuisine with tropical flavors',
      rating: 4.2,
      distance: '4 min walk',
      price: '$$',
      cuisine: 'Caribbean',
      image: null,
      recommended: false,
      hours: '11:00 AM - 9:00 PM',
      location: 'Concourse T',
      phone: '+1 (404) 555-0233',
      website: 'www.papiscaribbean.com',
      active: true,
    },
    {
      id: 112,
      name: 'Pizzaboxx',
      description: 'Artisanal pizza with creative combinations and fresh ingredients',
      rating: 4.1,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'Italian',
      image: null,
      recommended: false,
      hours: '11:00 AM - 10:00 PM',
      location: 'Concourse T',
      phone: '+1 (404) 555-0234',
      website: 'www.pizzaboxx.com',
      active: true,
    },
    {
      id: 113,
      name: 'Subway',
      description: 'Fresh submarine sandwiches with customizable ingredients',
      rating: 3.9,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Sandwiches',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse T',
      phone: '+1 (404) 555-0235',
      website: 'www.subway.com',
      active: true,
    },
    {
      id: 114,
      name: 'Tropical Smoothie Cafe',
      description: 'Fresh smoothies and healthy food with tropical flavors',
      rating: 4.0,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Healthy',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse T',
      phone: '+1 (404) 555-0236',
      website: 'www.tropicalsmoothie.com',
      active: true,
    },
    {
      id: 115,
      name: 'Vino Volo',
      description: 'Wine bar with wine flights and light food pairings',
      rating: 4.2,
      distance: '3 min walk',
      price: '$$$',
      cuisine: 'Wine Bar',
      image: null,
      recommended: true,
      hours: '11:00 AM - 9:00 PM',
      location: 'Concourse T',
      phone: '+1 (404) 555-0237',
      website: 'www.vinovolo.com',
      active: true,
    },
    {
      id: 116,
      name: 'Blue Moon Brewhouse',
      description: 'Craft brewery with house-made beers and American cuisine',
      rating: 4.0,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'Brewery',
      image: null,
      recommended: false,
      hours: '11:00 AM - 10:00 PM',
      location: 'Concourse E',
      phone: '+1 (404) 555-0238',
      website: 'www.bluemoonbrewhouse.com',
      active: true,
    },
    {
      id: 117,
      name: 'Boar\'s Head',
      description: 'Premium deli sandwiches and snacks with quality meats',
      rating: 4.0,
      distance: '1 min walk',
      price: '$',
      cuisine: 'Deli',
      image: null,
      recommended: false,
      hours: '5:00 AM - 11:00 PM',
      location: 'Concourse E',
      phone: '+1 (404) 555-0239',
      website: 'www.boarshead.com',
      active: true,
    },
    {
      id: 118,
      name: 'Qdoba Mexican Eats',
      description: 'Fresh Mexican food with customizable bowls and burritos',
      rating: 4.0,
      distance: '3 min walk',
      price: '$',
      cuisine: 'Mexican',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse E',
      phone: '+1 (404) 555-0240',
      website: 'www.qdoba.com',
      active: true,
    },
    {
      id: 119,
      name: 'Panda Express',
      description: 'American Chinese fast food with fresh wok cooking',
      rating: 4.0,
      distance: '3 min walk',
      price: '$',
      cuisine: 'Asian',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse E',
      phone: '+1 (404) 555-0241',
      website: 'www.pandaexpress.com',
      active: true,
    },
    {
      id: 120,
      name: 'Arby\'s',
      description: 'Roast beef sandwiches and curly fries',
      rating: 3.9,
      distance: '5 min walk',
      price: '$',
      cuisine: 'Fast Food',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse E',
      phone: '+1 (404) 555-0242',
      website: 'www.arbys.com',
      active: true,
    },
    {
      id: 121,
      name: 'McDonald\'s',
      description: 'Classic American fast food with burgers and fries',
      rating: 3.8,
      distance: '1 min walk',
      price: '$',
      cuisine: 'Fast Food',
      image: null,
      recommended: false,
      hours: '4:00 AM - 11:00 PM',
      location: 'Concourse E',
      phone: '+1 (404) 555-0243',
      website: 'www.mcdonalds.com',
      active: true,
    },
    {
      id: 122,
      name: 'Villa Italian Kitchen',
      description: 'Authentic Italian cuisine with fresh pasta and sauces',
      rating: 4.1,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'Italian',
      image: null,
      recommended: false,
      hours: '11:00 AM - 10:00 PM',
      location: 'Concourse E',
      phone: '+1 (404) 555-0244',
      website: 'www.villaitalian.com',
      active: true,
    },
    {
      id: 123,
      name: 'Nathan\'s Famous',
      description: 'New York hot dogs and classic American fare',
      rating: 4.0,
      distance: '2 min walk',
      price: '$',
      cuisine: 'American',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse E',
      phone: '+1 (404) 555-0245',
      website: 'www.nathansfamous.com',
      active: true,
    },
    {
      id: 124,
      name: 'Caribou Coffee',
      description: 'Premium coffee and tea with pastries and light fare',
      rating: 4.2,
      distance: '1 min walk',
      price: '$',
      cuisine: 'Coffee',
      image: null,
      recommended: false,
      hours: '4:00 AM - 11:00 PM',
      location: 'Concourse E',
      phone: '+1 (404) 555-0246',
      website: 'www.cariboucoffee.com',
      active: true,
    },
    {
      id: 125,
      name: 'T.G.I. Friday\'s',
      description: 'Casual American dining with signature cocktails',
      rating: 4.0,
      distance: '3 min walk',
      price: '$$',
      cuisine: 'American',
      image: null,
      recommended: false,
      hours: '7:00 AM - 10:00 PM',
      location: 'Concourse E',
      phone: '+1 (404) 555-0247',
      website: 'www.tgifridays.com',
      active: true,
    },
    {
      id: 126,
      name: 'Freshëns',
      description: 'Fresh, healthy food options with smoothies and wraps',
      rating: 4.0,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Healthy',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse E',
      phone: '+1 (404) 555-0248',
      website: 'www.freshens.com',
      active: true,
    },
    {
      id: 127,
      name: 'Piano Bar',
      description: 'Upscale bar with live piano music and light fare',
      rating: 4.2,
      distance: '4 min walk',
      price: '$$$',
      cuisine: 'Bar',
      image: null,
      recommended: true,
      hours: '5:00 PM - 11:00 PM',
      location: 'Concourse E',
      phone: '+1 (404) 555-0249',
      website: 'www.pianobar.com',
      active: true,
    },
    {
      id: 128,
      name: 'Nature\'s Table',
      description: 'Healthy food options with fresh ingredients and smoothies',
      rating: 4.1,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Healthy',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse E',
      phone: '+1 (404) 555-0250',
      website: 'www.naturestable.com',
      active: true,
    },
    {
      id: 129,
      name: 'Subway',
      description: 'Fresh submarine sandwiches with customizable ingredients',
      rating: 3.9,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Sandwiches',
      image: null,
      recommended: false,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse E',
      phone: '+1 (404) 555-0251',
      website: 'www.subway.com',
      active: true,
    },
    {
      id: 130,
      name: 'CNBC Smart Shop',
      description: 'Smart convenience store with snacks and light fare',
      rating: 4.0,
      distance: '1 min walk',
      price: '$',
      cuisine: 'Convenience',
      image: null,
      recommended: false,
      hours: '24/7',
      location: 'Concourse E',
      phone: '+1 (404) 555-0252',
      website: 'www.cnbcsmartshop.com',
      active: true,
    },
  ];
  
  // Filter to only show active restaurants, use fallback if context is empty
  const activeRestaurants = restaurants.length > 0 
    ? restaurants.filter(restaurant => restaurant.active)
    : fallbackRestaurants.filter(restaurant => restaurant.active);

  const [filteredRestaurants, setFilteredRestaurants] = useState<LocalRestaurant[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    concourse: '',
    cuisine: '',
    price: '',
    rating: 0,
  });


  useEffect(() => {
    filterRestaurants();
  }, [activeRestaurants, searchQuery, activeFilters]);

  const filterRestaurants = () => {
    let filtered = activeRestaurants;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Concourse filter
    if (activeFilters.concourse) {
      filtered = filtered.filter(restaurant => restaurant.location === activeFilters.concourse);
    }

    // Cuisine filter
    if (activeFilters.cuisine) {
      filtered = filtered.filter(restaurant => restaurant.cuisine === activeFilters.cuisine);
    }

    // Price filter
    if (activeFilters.price) {
      filtered = filtered.filter(restaurant => restaurant.price === activeFilters.price);
    }

    // Rating filter
    if (activeFilters.rating > 0) {
      filtered = filtered.filter(restaurant => restaurant.rating >= activeFilters.rating);
    }

    setFilteredRestaurants(filtered);
  };

  const clearFilters = () => {
    setActiveFilters({
      concourse: '',
      cuisine: '',
      price: '',
      rating: 0,
    });
  };

  // Filter options
  const concourses = ['Concourse A', 'Concourse B', 'Concourse C', 'Concourse D', 'Concourse E', 'Concourse F', 'Concourse T', 'Multiple Locations'];
  const cuisines = ['Southern', 'Seafood', 'American', 'BBQ', 'Fast Food', 'Asian', 'Café', 'Coffee', 'Mexican', 'Steakhouse', 'Mediterranean'];
  const prices = ['$', '$$', '$$$', '$$$$'];

  const hasActiveFilters = activeFilters.concourse !== '' || 
    activeFilters.cuisine !== '' || 
    activeFilters.price !== '' || 
    activeFilters.rating > 0;

  const handleRestaurantPress = (restaurant: LocalRestaurant) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    router.push({
      pathname: '/restaurant-detail',
      params: { id: restaurant.id.toString() }
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
          placeholder="Search restaurants..."
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
            {activeFilters.cuisine && (
              <View style={[styles.filterChip, { backgroundColor: Colors[colorScheme ?? 'light'].accent }]}>
                <Text style={[styles.filterChipText, { color: Colors[colorScheme ?? 'light'].primary }]}>
                  {activeFilters.cuisine}
                </Text>
                <TouchableOpacity 
                  onPress={() => setActiveFilters(prev => ({ ...prev, cuisine: '' }))}
                  style={styles.filterChipClose}
                >
                  <Ionicons name="close" size={14} color={Colors[colorScheme ?? 'light'].primary} />
                </TouchableOpacity>
              </View>
            )}
            {activeFilters.price && (
              <View style={[styles.filterChip, { backgroundColor: Colors[colorScheme ?? 'light'].accent }]}>
                <Text style={[styles.filterChipText, { color: Colors[colorScheme ?? 'light'].primary }]}>
                  {activeFilters.price}
                </Text>
                <TouchableOpacity 
                  onPress={() => setActiveFilters(prev => ({ ...prev, price: '' }))}
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

      {/* Restaurant List */}
      <ScrollView style={styles.restaurantList} showsVerticalScrollIndicator={false}>
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
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
        ))
        ) : (
          <View style={styles.noResultsContainer}>
            <Ionicons 
              name="search-outline" 
              size={48} 
              color={Colors[colorScheme ?? 'light'].icon} 
            />
            <Text style={[styles.noResultsTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
              No restaurants found
            </Text>
            <Text style={[styles.noResultsSubtitle, { color: Colors[colorScheme ?? 'light'].icon }]}>
              {searchQuery ? `No restaurants match "${searchQuery}"` : 'Try adjusting your filters'}
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
      
      <AuthModal 
        visible={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />

      {/* Filter Modal */}
      {showFilterModal && (
        <View style={styles.modalOverlay}>
          <View style={[styles.filterModal, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
            <View style={styles.filterModalHeader}>
              <Text style={[styles.filterModalTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                Filter Restaurants
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

              {/* Cuisine Filter */}
              <View style={styles.filterSection}>
                <Text style={[styles.filterSectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Cuisine
                </Text>
                <View style={styles.filterOptions}>
                  <TouchableOpacity
                    style={[
                      styles.filterOption,
                      activeFilters.cuisine === '' && { backgroundColor: Colors[colorScheme ?? 'light'].primary }
                    ]}
                    onPress={() => setActiveFilters(prev => ({ ...prev, cuisine: '' }))}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      { color: activeFilters.cuisine === '' ? Colors[colorScheme ?? 'light'].background : Colors[colorScheme ?? 'light'].text }
                    ]}>
                      All Cuisines
                    </Text>
                  </TouchableOpacity>
                  {cuisines.map((cuisine) => (
                    <TouchableOpacity
                      key={cuisine}
                      style={[
                        styles.filterOption,
                        activeFilters.cuisine === cuisine && { backgroundColor: Colors[colorScheme ?? 'light'].primary }
                      ]}
                      onPress={() => setActiveFilters(prev => ({ ...prev, cuisine }))}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        { color: activeFilters.cuisine === cuisine ? Colors[colorScheme ?? 'light'].background : Colors[colorScheme ?? 'light'].text }
                      ]}>
                        {cuisine}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Price Filter */}
              <View style={styles.filterSection}>
                <Text style={[styles.filterSectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Price Range
                </Text>
                <View style={styles.filterOptions}>
                  <TouchableOpacity
                    style={[
                      styles.filterOption,
                      activeFilters.price === '' && { backgroundColor: Colors[colorScheme ?? 'light'].primary }
                    ]}
                    onPress={() => setActiveFilters(prev => ({ ...prev, price: '' }))}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      { color: activeFilters.price === '' ? Colors[colorScheme ?? 'light'].background : Colors[colorScheme ?? 'light'].text }
                    ]}>
                      All Prices
                    </Text>
                  </TouchableOpacity>
                  {prices.map((price) => (
                    <TouchableOpacity
                      key={price}
                      style={[
                        styles.filterOption,
                        activeFilters.price === price && { backgroundColor: Colors[colorScheme ?? 'light'].primary }
                      ]}
                      onPress={() => setActiveFilters(prev => ({ ...prev, price }))}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        { color: activeFilters.price === price ? Colors[colorScheme ?? 'light'].background : Colors[colorScheme ?? 'light'].text }
                      ]}>
                        {price}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 
