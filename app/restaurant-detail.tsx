import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { router, useLocalSearchParams } from 'expo-router';
import RestaurantLogo from '../components/RestaurantLogo';

const { width } = Dimensions.get('window');

export default function RestaurantDetailScreen() {
  const colorScheme = useColorScheme();
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Comprehensive restaurant data that matches the food screen
  const restaurants = [
    {
      id: 1,
      name: 'One Flew South',
      description: 'Upscale Southern cuisine with creative twists. Experience the finest Southern flavors with a modern twist, featuring locally sourced ingredients and innovative culinary techniques.',
      rating: 4.6,
      distance: '3 min walk',
      price: '$$$',
      cuisine: 'Southern',
      image: require('../assets/images/restaurant-logos/one-flew-south-logo-HORZ.png'),
      recommended: true,
      hours: '11:00 AM - 9:00 PM',
      location: 'Concourse E',
      phone: '+1 (404) 555-0123',
      website: 'www.oneflewsouth.com',
      featuredItems: [
        { 
          id: 'f1', 
          name: 'Southern Fried Chicken', 
          price: '$24.50', 
          description: 'Crispy buttermilk fried chicken with collard greens', 
          image: '🍗',
          rating: '98% (156)',
          tag: 'Chef\'s Special'
        },
        { 
          id: 'f2', 
          name: 'Shrimp & Grits', 
          price: '$28.00', 
          description: 'Fresh Georgia shrimp over stone-ground grits', 
          image: '🦐',
          rating: '95% (89)',
          tag: 'Most Popular'
        },
        { 
          id: 'f3', 
          name: 'Bourbon Pecan Pie', 
          price: '$12.00', 
          description: 'House-made with Georgia pecans and bourbon', 
          image: '🥧',
          rating: '97% (134)',
          tag: 'Dessert'
        },
        { 
          id: 'f4', 
          name: 'Pimento Cheese Dip', 
          price: '$14.00', 
          description: 'Southern pimento cheese with house-made crackers', 
          image: '🧀',
          rating: '94% (78)',
          tag: 'Appetizer'
        },
        { 
          id: 'f5', 
          name: 'Buttermilk Biscuits', 
          price: '$8.50', 
          description: 'Flaky buttermilk biscuits with honey butter', 
          image: '🥖',
          rating: '96% (92)',
          tag: 'Southern'
        },
        { 
          id: 'f6', 
          name: 'Braised Short Ribs', 
          price: '$32.00', 
          description: 'Slow-braised beef short ribs with mashed potatoes', 
          image: '🥩',
          rating: '99% (67)',
          tag: 'Chef\'s Special'
        },
        { 
          id: 'f7', 
          name: 'Fried Green Tomatoes', 
          price: '$11.00', 
          description: 'Crispy fried green tomatoes with remoulade', 
          image: '🍅',
          rating: '93% (89)',
          tag: 'Southern'
        },
        { 
          id: 'f8', 
          name: 'Sweet Tea', 
          price: '$4.50', 
          description: 'Traditional Southern sweet tea', 
          image: '🥤',
          rating: '95% (156)',
          tag: 'Beverage'
        },
        { 
          id: 'f9', 
          name: 'Peach Cobbler', 
          price: '$10.00', 
          description: 'Georgia peach cobbler with vanilla ice cream', 
          image: '🍑',
          rating: '96% (78)',
          tag: 'Dessert'
        },
        { 
          id: 'f10', 
          name: 'Catfish Po\' Boy', 
          price: '$18.50', 
          description: 'Crispy catfish sandwich with slaw', 
          image: '🥪',
          rating: '92% (67)',
          tag: 'Sandwich'
        },
        { 
          id: 'f11', 
          name: 'Collard Greens', 
          price: '$9.00', 
          description: 'Slow-cooked collard greens with ham hock', 
          image: '🥬',
          rating: '94% (89)',
          tag: 'Side'
        },
        { 
          id: 'f12', 
          name: 'Bourbon Old Fashioned', 
          price: '$16.00', 
          description: 'Classic bourbon cocktail with bitters', 
          image: '🥃',
          rating: '97% (45)',
          tag: 'Cocktail'
        },
      ],
      allDayMenu: [
        { id: 1, name: 'Southern Fried Chicken', price: '$24.50', description: 'Crispy buttermilk fried chicken with collard greens', image: '🍗' },
        { id: 2, name: 'Shrimp & Grits', price: '$28.00', description: 'Fresh Georgia shrimp over stone-ground grits', image: '🦐' },
        { id: 3, name: 'Bourbon Pecan Pie', price: '$12.00', description: 'House-made with Georgia pecans', image: '🥧' },
        { id: 4, name: 'Sweet Tea', price: '$4.50', description: 'Traditional Southern sweet tea', image: '🥤' },
        { id: 5, name: 'Pimento Cheese Dip', price: '$14.00', description: 'Southern pimento cheese with house-made crackers', image: '🧀' },
        { id: 6, name: 'Buttermilk Biscuits', price: '$8.50', description: 'Flaky buttermilk biscuits with honey butter', image: '🥖' },
        { id: 7, name: 'Braised Short Ribs', price: '$32.00', description: 'Slow-braised beef short ribs with mashed potatoes', image: '🥩' },
        { id: 8, name: 'Fried Green Tomatoes', price: '$11.00', description: 'Crispy fried green tomatoes with remoulade', image: '🍅' },
        { id: 9, name: 'Peach Cobbler', price: '$10.00', description: 'Georgia peach cobbler with vanilla ice cream', image: '🍑' },
        { id: 10, name: 'Catfish Po\' Boy', price: '$18.50', description: 'Crispy catfish sandwich with slaw', image: '🥪' },
        { id: 11, name: 'Collard Greens', price: '$9.00', description: 'Slow-cooked collard greens with ham hock', image: '🥬' },
        { id: 12, name: 'Bourbon Old Fashioned', price: '$16.00', description: 'Classic bourbon cocktail with bitters', image: '🥃' },
        { id: 13, name: 'Blackened Catfish', price: '$26.00', description: 'Blackened catfish with dirty rice', image: '🐟' },
        { id: 14, name: 'Chicken & Dumplings', price: '$22.00', description: 'Homestyle chicken and dumplings', image: '🍲' },
        { id: 15, name: 'Cornbread', price: '$6.00', description: 'Southern cornbread with honey butter', image: '🌽' },
        { id: 16, name: 'Okra & Tomatoes', price: '$8.00', description: 'Stewed okra with fresh tomatoes', image: '🥬' },
        { id: 17, name: 'Pecan-Crusted Trout', price: '$30.00', description: 'Pecan-crusted trout with lemon butter', image: '🐟' },
        { id: 18, name: 'Sweet Potato Fries', price: '$7.00', description: 'Crispy sweet potato fries', image: '🍟' },
        { id: 19, name: 'Mint Julep', price: '$14.00', description: 'Classic Kentucky mint julep', image: '🥃' },
        { id: 20, name: 'Chocolate Chess Pie', price: '$11.00', description: 'Rich chocolate chess pie', image: '🍰' },
        { id: 21, name: 'Gumbo', price: '$18.00', description: 'Louisiana-style gumbo with rice', image: '🍲' },
        { id: 22, name: 'Hush Puppies', price: '$6.50', description: 'Crispy cornmeal hush puppies', image: '🥖' },
        { id: 23, name: 'Pulled Pork Sandwich', price: '$16.00', description: 'Slow-cooked pulled pork with slaw', image: '🥪' },
        { id: 24, name: 'Mac & Cheese', price: '$9.00', description: 'Creamy macaroni and cheese', image: '🧀' },
        { id: 25, name: 'Sweet Potato Casserole', price: '$10.00', description: 'Sweet potato casserole with pecans', image: '🍠' },
        { id: 26, name: 'Bourbon Bread Pudding', price: '$12.00', description: 'Bourbon-soaked bread pudding', image: '🍮' },
        { id: 27, name: 'Fried Pickles', price: '$8.00', description: 'Crispy fried dill pickles', image: '🥒' },
        { id: 28, name: 'Chicken Fried Steak', price: '$25.00', description: 'Chicken fried steak with gravy', image: '🥩' },
        { id: 29, name: 'Red Beans & Rice', price: '$14.00', description: 'Louisiana red beans and rice', image: '🍚' },
      ],
      reviews: [
        { id: 1, user: 'Sarah M.', rating: 5, comment: 'Amazing Southern cuisine! The fried chicken is perfection.', date: '2 days ago' },
        { id: 2, user: 'John D.', rating: 4, comment: 'Great atmosphere and authentic Southern flavors.', date: '1 week ago' },
        { id: 3, user: 'Emma L.', rating: 5, comment: 'Best restaurant in the airport! Highly recommend the shrimp & grits.', date: '2 weeks ago' },
      ],
    },
    {
      id: 2,
      name: 'Paschal\'s Restaurant',
      description: 'Atlanta institution serving soul food since 1947. Authentic Southern comfort food with a rich history and tradition.',
      rating: 4.4,
      distance: '4 min walk',
      price: '$$',
      cuisine: 'Southern',
      image: require('../assets/images/restaurant-logos/paschals.png'),
      recommended: true,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse A',
      phone: '+1 (404) 555-0124',
      website: 'www.paschals.com',
      featuredItems: [
        { 
          id: 'f1', 
          name: 'Fried Chicken & Waffles', 
          price: '$18.50', 
          description: 'Crispy fried chicken served with fluffy waffles', 
          image: '🍗',
          rating: '96% (203)',
          tag: 'Signature Dish'
        },
        { 
          id: 'f2', 
          name: 'Collard Greens', 
          price: '$8.00', 
          description: 'Slow-cooked collard greens with ham hock', 
          image: '🥬',
          rating: '92% (78)',
          tag: 'Traditional'
        },
        { 
          id: 'f3', 
          name: 'Sweet Potato Pie', 
          price: '$6.00', 
          description: 'Traditional sweet potato pie', 
          image: '🥧',
          rating: '95% (156)',
          tag: 'Dessert'
        },
        { 
          id: 'f4', 
          name: 'Mac & Cheese', 
          price: '$7.50', 
          description: 'Creamy macaroni and cheese', 
          image: '🧀',
          rating: '94% (134)',
          tag: 'Side'
        },
        { 
          id: 'f5', 
          name: 'Fried Catfish', 
          price: '$16.50', 
          description: 'Crispy fried catfish with hush puppies', 
          image: '🐟',
          rating: '93% (89)',
          tag: 'Seafood'
        },
        { 
          id: 'f6', 
          name: 'Black-Eyed Peas', 
          price: '$6.50', 
          description: 'Slow-cooked black-eyed peas with ham', 
          image: '🫘',
          rating: '91% (67)',
          tag: 'Traditional'
        },
        { 
          id: 'f7', 
          name: 'Cornbread', 
          price: '$4.00', 
          description: 'Southern cornbread with butter', 
          image: '🌽',
          rating: '96% (112)',
          tag: 'Side'
        },
        { 
          id: 'f8', 
          name: 'Pulled Pork Sandwich', 
          price: '$14.50', 
          description: 'Slow-cooked pulled pork with BBQ sauce', 
          image: '🥪',
          rating: '94% (78)',
          tag: 'Sandwich'
        },
        { 
          id: 'f9', 
          name: 'Peach Cobbler', 
          price: '$7.00', 
          description: 'Warm peach cobbler with vanilla ice cream', 
          image: '🍑',
          rating: '97% (89)',
          tag: 'Dessert'
        },
        { 
          id: 'f10', 
          name: 'Fried Okra', 
          price: '$5.50', 
          description: 'Crispy fried okra with ranch dipping sauce', 
          image: '🥬',
          rating: '92% (67)',
          tag: 'Appetizer'
        },
        { 
          id: 'f11', 
          name: 'Chicken & Dumplings', 
          price: '$15.00', 
          description: 'Homestyle chicken and dumplings', 
          image: '🍲',
          rating: '95% (78)',
          tag: 'Comfort'
        },
        { 
          id: 'f12', 
          name: 'Sweet Tea', 
          price: '$3.50', 
          description: 'Traditional Southern sweet tea', 
          image: '🥤',
          rating: '98% (234)',
          tag: 'Beverage'
        },
      ],
      breakfastMenu: [
        { id: 'b1', name: 'Southern Breakfast Plate', price: '$12.50', description: 'Eggs, bacon, grits, and biscuits', image: '🍳' },
        { id: 'b2', name: 'Chicken & Waffles', price: '$16.50', description: 'Fried chicken with fluffy waffles', image: '🍗' },
        { id: 'b3', name: 'Biscuits & Gravy', price: '$8.50', description: 'Flaky biscuits with sausage gravy', image: '🥖' },
      ],
      allDayMenu: [
        { id: 1, name: 'Fried Chicken & Waffles', price: '$18.50', description: 'Crispy fried chicken served with fluffy waffles', image: '🍗' },
        { id: 2, name: 'Collard Greens', price: '$8.00', description: 'Slow-cooked collard greens with ham hock', image: '🥬' },
        { id: 3, name: 'Mac & Cheese', price: '$7.50', description: 'Creamy macaroni and cheese', image: '🧀' },
        { id: 4, name: 'Sweet Potato Pie', price: '$6.00', description: 'Traditional sweet potato pie', image: '🥧' },
        { id: 5, name: 'Fried Catfish', price: '$16.50', description: 'Crispy fried catfish with hush puppies', image: '🐟' },
        { id: 6, name: 'Black-Eyed Peas', price: '$6.50', description: 'Slow-cooked black-eyed peas with ham', image: '🫘' },
        { id: 7, name: 'Cornbread', price: '$4.00', description: 'Southern cornbread with butter', image: '🌽' },
        { id: 8, name: 'Pulled Pork Sandwich', price: '$14.50', description: 'Slow-cooked pulled pork with BBQ sauce', image: '🥪' },
        { id: 9, name: 'Peach Cobbler', price: '$7.00', description: 'Warm peach cobbler with vanilla ice cream', image: '🍑' },
        { id: 10, name: 'Fried Okra', price: '$5.50', description: 'Crispy fried okra with ranch dipping sauce', image: '🥬' },
        { id: 11, name: 'Chicken & Dumplings', price: '$15.00', description: 'Homestyle chicken and dumplings', image: '🍲' },
        { id: 12, name: 'Sweet Tea', price: '$3.50', description: 'Traditional Southern sweet tea', image: '🥤' },
        { id: 13, name: 'BBQ Ribs', price: '$22.00', description: 'Slow-cooked BBQ ribs with sauce', image: '🍖' },
        { id: 14, name: 'Hush Puppies', price: '$4.50', description: 'Crispy cornmeal hush puppies', image: '🥖' },
        { id: 15, name: 'Fried Green Tomatoes', price: '$8.00', description: 'Crispy fried green tomatoes', image: '🍅' },
        { id: 16, name: 'Red Beans & Rice', price: '$9.00', description: 'Louisiana red beans and rice', image: '🍚' },
        { id: 17, name: 'Chicken Fried Steak', price: '$18.00', description: 'Chicken fried steak with gravy', image: '🥩' },
        { id: 18, name: 'Biscuits & Gravy', price: '$8.50', description: 'Flaky biscuits with sausage gravy', image: '🥖' },
        { id: 19, name: 'Fried Chicken Wings', price: '$12.00', description: 'Crispy fried chicken wings', image: '🍗' },
        { id: 20, name: 'Gumbo', price: '$14.00', description: 'Louisiana-style gumbo with rice', image: '🍲' },
        { id: 21, name: 'Jambalaya', price: '$16.00', description: 'Spicy jambalaya with rice', image: '🍚' },
        { id: 22, name: 'Fried Pickles', price: '$6.00', description: 'Crispy fried dill pickles', image: '🥒' },
        { id: 23, name: 'Chocolate Cake', price: '$7.50', description: 'Rich chocolate layer cake', image: '🍰' },
        { id: 24, name: 'Lemonade', price: '$3.50', description: 'Fresh-squeezed lemonade', image: '🍋' },
        { id: 25, name: 'Fried Shrimp', price: '$17.00', description: 'Crispy fried shrimp with cocktail sauce', image: '🦐' },
        { id: 26, name: 'Baked Beans', price: '$5.50', description: 'Slow-cooked baked beans with bacon', image: '🫘' },
        { id: 27, name: 'Potato Salad', price: '$5.00', description: 'Creamy potato salad', image: '🥔' },
        { id: 28, name: 'Coleslaw', price: '$4.00', description: 'Fresh coleslaw with dressing', image: '🥬' },
        { id: 29, name: 'Apple Pie', price: '$6.50', description: 'Warm apple pie with ice cream', image: '🍎' },
      ],
      reviews: [
        { id: 1, user: 'Michael R.', rating: 5, comment: 'Best soul food in Atlanta! The fried chicken is incredible.', date: '1 day ago' },
        { id: 2, user: 'Lisa T.', rating: 4, comment: 'Authentic Southern cooking. Love the atmosphere.', date: '3 days ago' },
        { id: 3, user: 'David K.', rating: 4, comment: 'Great comfort food. Perfect for airport dining.', date: '1 week ago' },
      ],
    },
    {
      id: 3,
      name: 'Phillips Seafood',
      description: 'Fresh seafood specializing in Maryland crab cakes. Premium seafood dining with the freshest catches.',
      rating: 4.3,
      distance: '5 min walk',
      price: '$$$',
      cuisine: 'Seafood',
      image: require('../assets/images/restaurant-logos/phillips-seafood-logo.jpg'),
      recommended: true,
      hours: '11:00 AM - 9:30 PM',
      location: 'Concourse C',
      phone: '+1 (404) 555-0125',
      website: 'www.phillipsseafood.com',
      featuredItems: [
        { 
          id: 'f1', 
          name: 'Maryland Crab Cakes', 
          price: '$32.00', 
          description: 'Fresh lump crab meat with Old Bay seasoning', 
          image: '🦀',
          rating: '97% (124)',
          tag: 'Chef\'s Special'
        },
        { 
          id: 'f2', 
          name: 'Lobster Roll', 
          price: '$28.50', 
          description: 'Maine lobster with butter and herbs', 
          image: '🦞',
          rating: '94% (89)',
          tag: 'Fresh Catch'
        },
        { 
          id: 'f3', 
          name: 'Grilled Salmon', 
          price: '$34.00', 
          description: 'Atlantic salmon with seasonal vegetables', 
          image: '🐟',
          rating: '96% (156)',
          tag: 'Healthy'
        },
        { 
          id: 'f4', 
          name: 'Clam Chowder', 
          price: '$12.00', 
          description: 'New England style clam chowder', 
          image: '🥣',
          rating: '95% (134)',
          tag: 'Soup'
        },
        { 
          id: 'f5', 
          name: 'Steamed Blue Crabs', 
          price: '$45.00', 
          description: 'Fresh steamed blue crabs with Old Bay', 
          image: '🦀',
          rating: '98% (78)',
          tag: 'Maryland'
        },
        { 
          id: 'f6', 
          name: 'Shrimp Scampi', 
          price: '$26.00', 
          description: 'Garlic butter shrimp with linguine', 
          image: '🦐',
          rating: '94% (89)',
          tag: 'Pasta'
        },
        { 
          id: 'f7', 
          name: 'Oysters Rockefeller', 
          price: '$18.00', 
          description: 'Baked oysters with spinach and cheese', 
          image: '🦪',
          rating: '93% (67)',
          tag: 'Appetizer'
        },
        { 
          id: 'f8', 
          name: 'Fish & Chips', 
          price: '$22.00', 
          description: 'Beer-battered cod with fries', 
          image: '🐟',
          rating: '92% (112)',
          tag: 'Classic'
        },
        { 
          id: 'f9', 
          name: 'Crab Bisque', 
          price: '$14.00', 
          description: 'Creamy crab bisque soup', 
          image: '🥣',
          rating: '96% (78)',
          tag: 'Soup'
        },
        { 
          id: 'f10', 
          name: 'Seafood Paella', 
          price: '$38.00', 
          description: 'Spanish paella with mixed seafood', 
          image: '🍚',
          rating: '95% (56)',
          tag: 'Chef\'s Special'
        },
        { 
          id: 'f11', 
          name: 'Lobster Mac & Cheese', 
          price: '$24.00', 
          description: 'Creamy mac & cheese with lobster', 
          image: '🧀',
          rating: '97% (89)',
          tag: 'Comfort'
        },
        { 
          id: 'f12', 
          name: 'Key Lime Pie', 
          price: '$10.00', 
          description: 'Florida key lime pie', 
          image: '🥧',
          rating: '94% (67)',
          tag: 'Dessert'
        },
      ],
      allDayMenu: [
        { id: 1, name: 'Maryland Crab Cakes', price: '$32.00', description: 'Fresh lump crab meat with Old Bay seasoning', image: '🦀' },
        { id: 2, name: 'Lobster Roll', price: '$28.50', description: 'Maine lobster with butter and herbs', image: '🦞' },
        { id: 3, name: 'Grilled Salmon', price: '$34.00', description: 'Atlantic salmon with seasonal vegetables', image: '🐟' },
        { id: 4, name: 'Clam Chowder', price: '$12.00', description: 'New England style clam chowder', image: '🥣' },
        { id: 5, name: 'Steamed Blue Crabs', price: '$45.00', description: 'Fresh steamed blue crabs with Old Bay', image: '🦀' },
        { id: 6, name: 'Shrimp Scampi', price: '$26.00', description: 'Garlic butter shrimp with linguine', image: '🦐' },
        { id: 7, name: 'Oysters Rockefeller', price: '$18.00', description: 'Baked oysters with spinach and cheese', image: '🦪' },
        { id: 8, name: 'Fish & Chips', price: '$22.00', description: 'Beer-battered cod with fries', image: '🐟' },
        { id: 9, name: 'Crab Bisque', price: '$14.00', description: 'Creamy crab bisque soup', image: '🥣' },
        { id: 10, name: 'Seafood Paella', price: '$38.00', description: 'Spanish paella with mixed seafood', image: '🍚' },
        { id: 11, name: 'Lobster Mac & Cheese', price: '$24.00', description: 'Creamy mac & cheese with lobster', image: '🧀' },
        { id: 12, name: 'Key Lime Pie', price: '$10.00', description: 'Florida key lime pie', image: '🥧' },
        { id: 13, name: 'Crab Legs', price: '$42.00', description: 'Steamed snow crab legs with butter', image: '🦀' },
        { id: 14, name: 'Shrimp Cocktail', price: '$16.00', description: 'Chilled shrimp with cocktail sauce', image: '🦐' },
        { id: 15, name: 'Mussels Marinara', price: '$20.00', description: 'Steamed mussels in marinara sauce', image: '🦪' },
        { id: 16, name: 'Tuna Steak', price: '$36.00', description: 'Grilled tuna steak with wasabi', image: '🐟' },
        { id: 17, name: 'Crab Dip', price: '$15.00', description: 'Creamy crab dip with crackers', image: '🧀' },
        { id: 18, name: 'Lobster Bisque', price: '$16.00', description: 'Creamy lobster bisque soup', image: '🥣' },
        { id: 19, name: 'Fried Calamari', price: '$14.00', description: 'Crispy fried calamari with marinara', image: '🦑' },
        { id: 20, name: 'Seafood Gumbo', price: '$18.00', description: 'Louisiana seafood gumbo', image: '🍲' },
        { id: 21, name: 'Grilled Mahi Mahi', price: '$32.00', description: 'Grilled mahi mahi with tropical salsa', image: '🐟' },
        { id: 22, name: 'Crab Rangoon', price: '$12.00', description: 'Crispy crab rangoon appetizer', image: '🥟' },
        { id: 23, name: 'Shrimp & Grits', price: '$24.00', description: 'Shrimp and grits with cheese', image: '🍚' },
        { id: 24, name: 'Oyster Po\' Boy', price: '$18.00', description: 'Fried oyster sandwich with slaw', image: '🥪' },
        { id: 25, name: 'Seafood Alfredo', price: '$26.00', description: 'Fettuccine alfredo with mixed seafood', image: '🍝' },
        { id: 26, name: 'Crab Cake Sandwich', price: '$22.00', description: 'Crab cake on brioche bun', image: '🥪' },
        { id: 27, name: 'Lobster Tail', price: '$48.00', description: 'Broiled lobster tail with butter', image: '🦞' },
        { id: 28, name: 'Seafood Chowder', price: '$13.00', description: 'Mixed seafood chowder', image: '🥣' },
        { id: 29, name: 'Chocolate Lava Cake', price: '$12.00', description: 'Warm chocolate lava cake', image: '🍰' },
      ],
      reviews: [
        { id: 1, user: 'Jennifer L.', rating: 4, comment: 'Excellent seafood! The crab cakes are amazing.', date: '2 days ago' },
        { id: 2, user: 'Robert M.', rating: 4, comment: 'Fresh and delicious. Great seafood options.', date: '4 days ago' },
        { id: 3, user: 'Amanda S.', rating: 5, comment: 'Best seafood restaurant in the airport!', date: '1 week ago' },
      ],
    },
    {
      id: 4,
      name: 'The Varsity',
      description: 'Atlanta\'s famous drive-in with chili dogs and burgers. A local institution since 1928.',
      rating: 4.2,
      distance: '2 min walk',
      price: '$',
      cuisine: 'American',
      image: require('../assets/images/restaurant-logos/varsity.webp'),
      recommended: true,
      hours: '6:00 AM - 10:00 PM',
      location: 'Concourse F',
      phone: '+1 (404) 555-0126',
      website: 'www.thevarsity.com',
      featuredItems: [
        { 
          id: 'f1', 
          name: 'Chili Dog', 
          price: '$4.50', 
          description: 'Famous chili dog with onions and mustard', 
          image: '🌭',
          rating: '98% (342)',
          tag: 'Iconic'
        },
        { 
          id: 'f2', 
          name: 'Frosted Orange', 
          price: '$3.00', 
          description: 'Signature orange milkshake', 
          image: '🥤',
          rating: '95% (156)',
          tag: 'Must Try'
        },
        { 
          id: 'f3', 
          name: 'Varsity Burger', 
          price: '$6.00', 
          description: 'Classic burger with fries', 
          image: '🍔',
          rating: '96% (234)',
          tag: 'Classic'
        },
        { 
          id: 'f4', 
          name: 'Onion Rings', 
          price: '$3.50', 
          description: 'Crispy onion rings', 
          image: '🧅',
          rating: '94% (189)',
          tag: 'Side'
        },
        { 
          id: 'f5', 
          name: 'Chili Cheese Fries', 
          price: '$5.50', 
          description: 'Fries topped with chili and cheese', 
          image: '🍟',
          rating: '95% (167)',
          tag: 'Popular'
        },
        { 
          id: 'f6', 
          name: 'Chocolate Milkshake', 
          price: '$4.00', 
          description: 'Creamy chocolate milkshake', 
          image: '🥤',
          rating: '93% (134)',
          tag: 'Dessert'
        },
        { 
          id: 'f7', 
          name: 'Hot Dog Combo', 
          price: '$7.50', 
          description: 'Hot dog with fries and drink', 
          image: '🌭',
          rating: '97% (198)',
          tag: 'Combo'
        },
        { 
          id: 'f8', 
          name: 'Cheeseburger', 
          price: '$5.50', 
          description: 'Classic cheeseburger with lettuce and tomato', 
          image: '🍔',
          rating: '94% (156)',
          tag: 'Burger'
        },
        { 
          id: 'f9', 
          name: 'French Fries', 
          price: '$2.50', 
          description: 'Crispy golden french fries', 
          image: '🍟',
          rating: '96% (245)',
          tag: 'Side'
        },
        { 
          id: 'f10', 
          name: 'Vanilla Milkshake', 
          price: '$3.50', 
          description: 'Creamy vanilla milkshake', 
          image: '🥤',
          rating: '92% (123)',
          tag: 'Dessert'
        },
        { 
          id: 'f11', 
          name: 'Chili Slaw Dog', 
          price: '$4.75', 
          description: 'Chili dog topped with coleslaw', 
          image: '🌭',
          rating: '95% (89)',
          tag: 'Specialty'
        },
        { 
          id: 'f12', 
          name: 'Strawberry Milkshake', 
          price: '$3.75', 
          description: 'Fresh strawberry milkshake', 
          image: '🥤',
          rating: '91% (78)',
          tag: 'Dessert'
        },
      ],
      allDayMenu: [
        { id: 1, name: 'Chili Dog', price: '$4.50', description: 'Famous chili dog with onions and mustard', image: '🌭' },
        { id: 2, name: 'Varsity Burger', price: '$6.00', description: 'Classic burger with fries', image: '🍔' },
        { id: 3, name: 'Onion Rings', price: '$3.50', description: 'Crispy onion rings', image: '🧅' },
        { id: 4, name: 'Frosted Orange', price: '$3.00', description: 'Signature orange milkshake', image: '🥤' },
        { id: 5, name: 'Chili Cheese Fries', price: '$5.50', description: 'Fries topped with chili and cheese', image: '🍟' },
        { id: 6, name: 'Chocolate Milkshake', price: '$4.00', description: 'Creamy chocolate milkshake', image: '🥤' },
        { id: 7, name: 'Hot Dog Combo', price: '$7.50', description: 'Hot dog with fries and drink', image: '🌭' },
        { id: 8, name: 'Cheeseburger', price: '$5.50', description: 'Classic cheeseburger with lettuce and tomato', image: '🍔' },
        { id: 9, name: 'French Fries', price: '$2.50', description: 'Crispy golden french fries', image: '🍟' },
        { id: 10, name: 'Vanilla Milkshake', price: '$3.50', description: 'Creamy vanilla milkshake', image: '🥤' },
        { id: 11, name: 'Chili Slaw Dog', price: '$4.75', description: 'Chili dog topped with coleslaw', image: '🌭' },
        { id: 12, name: 'Strawberry Milkshake', price: '$3.75', description: 'Fresh strawberry milkshake', image: '🥤' },
        { id: 13, name: 'Bacon Cheeseburger', price: '$6.50', description: 'Cheeseburger with crispy bacon', image: '🍔' },
        { id: 14, name: 'Chili Burger', price: '$6.25', description: 'Burger topped with chili and onions', image: '🍔' },
        { id: 15, name: 'Double Cheeseburger', price: '$7.50', description: 'Double patty cheeseburger', image: '🍔' },
        { id: 16, name: 'Chili Cheese Dog', price: '$5.00', description: 'Hot dog with chili and cheese', image: '🌭' },
        { id: 17, name: 'Bacon Dog', price: '$5.25', description: 'Hot dog with crispy bacon', image: '🌭' },
        { id: 18, name: 'Chili Slaw Burger', price: '$6.75', description: 'Burger topped with chili and slaw', image: '🍔' },
        { id: 19, name: 'Onion Rings Combo', price: '$6.00', description: 'Onion rings with drink', image: '🧅' },
        { id: 20, name: 'French Fries Combo', price: '$5.00', description: 'French fries with drink', image: '🍟' },
        { id: 21, name: 'Chocolate Sundae', price: '$4.50', description: 'Chocolate sundae with whipped cream', image: '🍦' },
        { id: 22, name: 'Vanilla Sundae', price: '$4.00', description: 'Vanilla sundae with toppings', image: '🍦' },
        { id: 23, name: 'Strawberry Sundae', price: '$4.25', description: 'Strawberry sundae with fresh berries', image: '🍦' },
        { id: 24, name: 'Root Beer Float', price: '$4.00', description: 'Root beer float with vanilla ice cream', image: '🥤' },
        { id: 25, name: 'Coca-Cola', price: '$2.50', description: 'Classic Coca-Cola', image: '🥤' },
        { id: 26, name: 'Diet Coke', price: '$2.50', description: 'Diet Coca-Cola', image: '🥤' },
        { id: 27, name: 'Sprite', price: '$2.50', description: 'Refreshing Sprite', image: '🥤' },
        { id: 28, name: 'Lemonade', price: '$3.00', description: 'Fresh-squeezed lemonade', image: '🍋' },
        { id: 29, name: 'Iced Tea', price: '$2.50', description: 'Sweet iced tea', image: '🥤' },
      ],
      reviews: [
        { id: 1, user: 'Tom W.', rating: 4, comment: 'Classic Atlanta institution! Love the chili dogs.', date: '1 day ago' },
        { id: 2, user: 'Rachel B.', rating: 4, comment: 'Great fast food. Perfect for a quick meal.', date: '2 days ago' },
        { id: 3, user: 'Chris L.', rating: 5, comment: 'Best chili dogs ever! Must try the Frosted Orange.', date: '3 days ago' },
      ],
    },
    {
      id: 5,
      name: 'Sweet Auburn BBQ',
      description: 'Authentic Georgia barbecue with local flavors. Traditional BBQ with a modern twist.',
      rating: 4.5,
      distance: '6 min walk',
      price: '$$',
      cuisine: 'BBQ',
      image: require('../assets/images/restaurant-logos/Sweet Auburn BBQ.png'),
      recommended: true,
      hours: '10:00 AM - 9:00 PM',
      location: 'Concourse D',
      phone: '+1 (404) 555-0127',
      website: 'www.sweetauburnbbq.com',
      featuredItems: [
        { 
          id: 'f1', 
          name: 'BBQ Ribs', 
          price: '$22.00', 
          description: 'Slow-smoked pork ribs with BBQ sauce', 
          image: '🍖',
          rating: '99% (187)',
          tag: 'Best Seller'
        },
        { 
          id: 'f2', 
          name: 'Pulled Pork Sandwich', 
          price: '$14.50', 
          description: 'Tender pulled pork with coleslaw', 
          image: '🥪',
          rating: '96% (134)',
          tag: 'Local Favorite'
        },
        { 
          id: 'f3', 
          name: 'Brisket Plate', 
          price: '$24.00', 
          description: 'Smoked brisket with sides', 
          image: '🥩',
          rating: '98% (156)',
          tag: 'Chef\'s Special'
        },
        { 
          id: 'f4', 
          name: 'BBQ Beans', 
          price: '$6.00', 
          description: 'Slow-cooked BBQ baked beans', 
          image: '🫘',
          rating: '95% (89)',
          tag: 'Side'
        },
        { 
          id: 'f5', 
          name: 'BBQ Chicken', 
          price: '$18.00', 
          description: 'Smoked BBQ chicken with sauce', 
          image: '🍗',
          rating: '94% (112)',
          tag: 'Popular'
        },
        { 
          id: 'f6', 
          name: 'Mac & Cheese', 
          price: '$7.00', 
          description: 'Creamy macaroni and cheese', 
          image: '🧀',
          rating: '96% (134)',
          tag: 'Side'
        },
        { 
          id: 'f7', 
          name: 'BBQ Sandwich Combo', 
          price: '$16.50', 
          description: 'BBQ sandwich with fries and drink', 
          image: '🥪',
          rating: '97% (167)',
          tag: 'Combo'
        },
        { 
          id: 'f8', 
          name: 'Cornbread', 
          price: '$4.00', 
          description: 'Southern cornbread with honey butter', 
          image: '🌽',
          rating: '95% (78)',
          tag: 'Side'
        },
        { 
          id: 'f9', 
          name: 'BBQ Sliders', 
          price: '$12.00', 
          description: 'Three BBQ sliders with sauce', 
          image: '🥪',
          rating: '93% (89)',
          tag: 'Appetizer'
        },
        { 
          id: 'f10', 
          name: 'Sweet Tea', 
          price: '$3.50', 
          description: 'Traditional Southern sweet tea', 
          image: '🥤',
          rating: '98% (234)',
          tag: 'Beverage'
        },
        { 
          id: 'f11', 
          name: 'BBQ Nachos', 
          price: '$13.00', 
          description: 'Nachos topped with BBQ meat and cheese', 
          image: '🧀',
          rating: '94% (67)',
          tag: 'Appetizer'
        },
        { 
          id: 'f12', 
          name: 'Peach Cobbler', 
          price: '$8.00', 
          description: 'Warm peach cobbler with ice cream', 
          image: '🍑',
          rating: '96% (78)',
          tag: 'Dessert'
        },
      ],
      allDayMenu: [
        { id: 1, name: 'BBQ Ribs', price: '$22.00', description: 'Slow-smoked pork ribs with BBQ sauce', image: '🍖' },
        { id: 2, name: 'Pulled Pork Sandwich', price: '$14.50', description: 'Tender pulled pork with coleslaw', image: '🥪' },
        { id: 3, name: 'Brisket Plate', price: '$24.00', description: 'Smoked brisket with sides', image: '🥩' },
        { id: 4, name: 'BBQ Beans', price: '$6.00', description: 'Slow-cooked BBQ baked beans', image: '🫘' },
        { id: 5, name: 'BBQ Chicken', price: '$18.00', description: 'Smoked BBQ chicken with sauce', image: '🍗' },
        { id: 6, name: 'Mac & Cheese', price: '$7.00', description: 'Creamy macaroni and cheese', image: '🧀' },
        { id: 7, name: 'BBQ Sandwich Combo', price: '$16.50', description: 'BBQ sandwich with fries and drink', image: '🥪' },
        { id: 8, name: 'Cornbread', price: '$4.00', description: 'Southern cornbread with honey butter', image: '🌽' },
        { id: 9, name: 'BBQ Sliders', price: '$12.00', description: 'Three BBQ sliders with sauce', image: '🥪' },
        { id: 10, name: 'Sweet Tea', price: '$3.50', description: 'Traditional Southern sweet tea', image: '🥤' },
        { id: 11, name: 'BBQ Nachos', price: '$13.00', description: 'Nachos topped with BBQ meat and cheese', image: '🧀' },
        { id: 12, name: 'Peach Cobbler', price: '$8.00', description: 'Warm peach cobbler with ice cream', image: '🍑' },
        { id: 13, name: 'BBQ Turkey', price: '$20.00', description: 'Smoked turkey with BBQ sauce', image: '🦃' },
        { id: 14, name: 'BBQ Sausage', price: '$16.00', description: 'Smoked BBQ sausage links', image: '🌭' },
        { id: 15, name: 'BBQ Wings', price: '$14.00', description: 'BBQ chicken wings', image: '🍗' },
        { id: 16, name: 'Coleslaw', price: '$4.00', description: 'Fresh coleslaw with dressing', image: '🥬' },
        { id: 17, name: 'Potato Salad', price: '$5.00', description: 'Creamy potato salad', image: '🥔' },
        { id: 18, name: 'BBQ Fries', price: '$8.00', description: 'Fries topped with BBQ meat and cheese', image: '🍟' },
        { id: 19, name: 'BBQ Baked Potato', price: '$10.00', description: 'Baked potato with BBQ meat and toppings', image: '🥔' },
        { id: 20, name: 'BBQ Salad', price: '$12.00', description: 'Fresh salad with BBQ meat', image: '🥗' },
        { id: 21, name: 'BBQ Burrito', price: '$15.00', description: 'BBQ meat wrapped in tortilla', image: '🌯' },
        { id: 22, name: 'BBQ Tacos', price: '$13.00', description: 'Three BBQ tacos with toppings', image: '🌮' },
        { id: 23, name: 'BBQ Loaded Fries', price: '$11.00', description: 'Fries with BBQ meat, cheese, and jalapeños', image: '🍟' },
        { id: 24, name: 'BBQ Stuffed Potato', price: '$12.00', description: 'Stuffed potato with BBQ meat and cheese', image: '🥔' },
        { id: 25, name: 'BBQ Quesadilla', price: '$14.00', description: 'BBQ meat and cheese quesadilla', image: '🧀' },
        { id: 26, name: 'BBQ Loaded Nachos', price: '$16.00', description: 'Nachos with BBQ meat, beans, and toppings', image: '🧀' },
        { id: 27, name: 'BBQ Loaded Tots', price: '$10.00', description: 'Tater tots with BBQ meat and cheese', image: '🥔' },
        { id: 28, name: 'BBQ Loaded Mac', price: '$13.00', description: 'Mac & cheese with BBQ meat', image: '🧀' },
        { id: 29, name: 'Chocolate Cake', price: '$7.00', description: 'Rich chocolate layer cake', image: '🍰' },
      ],
      reviews: [
        { id: 1, user: 'Kevin J.', rating: 5, comment: 'Amazing BBQ! The ribs are fall-off-the-bone tender.', date: '1 day ago' },
        { id: 2, user: 'Maria G.', rating: 4, comment: 'Great barbecue flavors. Love the pulled pork.', date: '2 days ago' },
        { id: 3, user: 'James H.', rating: 5, comment: 'Best BBQ in the airport! Authentic Georgia style.', date: '4 days ago' },
      ],
    },
    {
      id: 6,
      name: 'Chick-fil-A',
      description: 'Original Atlanta-born chicken sandwich chain. Famous for their chicken sandwiches and waffle fries.',
      rating: 4.4,
      distance: '2 min walk',
      price: '$',
      cuisine: 'Fast Food',
      image: require('../assets/images/restaurant-logos/chick-fil-a-logo-red-1280x720_1400x400.webp'),
      recommended: false,
      hours: '5:00 AM - 11:00 PM',
      location: 'Multiple Locations',
      phone: '+1 (404) 555-0128',
      website: 'www.chick-fil-a.com',
      featuredItems: [
        { 
          id: 'f1', 
          name: 'Chick-fil-A® Sandwich Meal', 
          price: '$11.25', 
          description: 'Original chicken sandwich with waffle fries and drink', 
          image: '🥪',
          rating: '95% (357)',
          tag: '#1 Most liked'
        },
        { 
          id: 'f2', 
          name: 'Chick-fil-A® Nuggets Meal', 
          price: '$11.29', 
          description: '12-count nuggets with waffle fries and drink', 
          image: '🍗',
          rating: '89% (261)',
          tag: 'Great price'
        },
        { 
          id: 'f3', 
          name: 'Spicy Chicken Sandwich', 
          price: '$12.59', 
          description: 'Spicy chicken sandwich with lettuce and tomato', 
          image: '🌶️',
          rating: '86% (137)',
          tag: 'Spicy'
        },
        { 
          id: 'f4', 
          name: 'Chick-n-Strips® Meal', 
          price: '$11.79', 
          description: '3 crispy chicken strips with waffle fries and drink', 
          image: '🍗',
          rating: '87% (101)',
          tag: 'Popular'
        },
        { 
          id: 'f5', 
          name: 'Grilled Chicken Sandwich', 
          price: '$9.25', 
          description: 'Grilled chicken breast with lettuce and tomato', 
          image: '🥪',
          rating: '92% (189)',
          tag: 'Healthy'
        },
        { 
          id: 'f6', 
          name: 'Cobb Salad', 
          price: '$12.35', 
          description: 'Mixed greens with grilled chicken, bacon, and eggs', 
          image: '🥗',
          rating: '94% (134)',
          tag: 'Salad'
        },
        { 
          id: 'f7', 
          name: 'Chocolate Milkshake', 
          price: '$4.50', 
          description: 'Creamy chocolate milkshake', 
          image: '🥤',
          rating: '96% (234)',
          tag: 'Dessert'
        },
        { 
          id: 'f8', 
          name: 'Chicken Noodle Soup', 
          price: '$4.99', 
          description: 'Homestyle chicken noodle soup', 
          image: '🥣',
          rating: '91% (89)',
          tag: 'Soup'
        },
        { 
          id: 'f9', 
          name: 'Waffle Fries', 
          price: '$3.50', 
          description: 'Crispy waffle-cut fries', 
          image: '🍟',
          rating: '98% (456)',
          tag: 'Side'
        },
        { 
          id: 'f10', 
          name: 'Lemonade', 
          price: '$2.50', 
          description: 'Fresh-squeezed lemonade', 
          image: '🍋',
          rating: '95% (234)',
          tag: 'Beverage'
        },
        { 
          id: 'f11', 
          name: 'Chicken Biscuit', 
          price: '$4.50', 
          description: 'Chicken breast on a buttermilk biscuit', 
          image: '🥪',
          rating: '93% (167)',
          tag: 'Breakfast'
        },
        { 
          id: 'f12', 
          name: 'Vanilla Milkshake', 
          price: '$4.25', 
          description: 'Creamy vanilla milkshake', 
          image: '🥤',
          rating: '94% (189)',
          tag: 'Dessert'
        },
      ],
      breakfastMenu: [
        { id: 'b1', name: 'Chicken Biscuit', price: '$4.50', description: 'Chicken breast on a buttermilk biscuit', image: '🥪' },
        { id: 'b2', name: 'Egg White Grill', price: '$5.25', description: 'Egg whites, grilled chicken, and cheese on English muffin', image: '🥚' },
        { id: 'b3', name: 'Hash Brown Scramble Bowl', price: '$6.50', description: 'Scrambled eggs with hash browns and chicken', image: '🍳' },
        { id: 'b4', name: 'Greek Yogurt Parfait', price: '$4.00', description: 'Greek yogurt with granola and berries', image: '🥣' },
      ],
      allDayMenu: [
        { id: 'a1', name: 'Chicken Sandwich', price: '$8.50', description: 'Original chicken sandwich with pickles', image: '🥪' },
        { id: 'a2', name: 'Waffle Fries', price: '$3.50', description: 'Crispy waffle-cut fries', image: '🍟' },
        { id: 'a3', name: 'Nuggets (12 count)', price: '$7.00', description: 'Breaded chicken nuggets', image: '🍗' },
        { id: 'a4', name: 'Lemonade', price: '$2.50', description: 'Fresh-squeezed lemonade', image: '🍋' },
        { id: 'a5', name: 'Grilled Chicken Sandwich', price: '$9.25', description: 'Grilled chicken breast with lettuce and tomato', image: '🥪' },
        { id: 'a6', name: 'Cobb Salad', price: '$12.35', description: 'Mixed greens with grilled chicken, bacon, and eggs', image: '🥗' },
        { id: 'a7', name: 'Chocolate Milkshake', price: '$4.50', description: 'Creamy chocolate milkshake', image: '🥤' },
        { id: 'a8', name: 'Chicken Noodle Soup', price: '$4.99', description: 'Homestyle chicken noodle soup', image: '🥣' },
        { id: 'a9', name: 'Spicy Chicken Sandwich', price: '$9.50', description: 'Spicy chicken sandwich with lettuce and tomato', image: '🌶️' },
        { id: 'a10', name: 'Chick-n-Strips (3 count)', price: '$8.00', description: 'Three crispy chicken strips', image: '🍗' },
        { id: 'a11', name: 'Vanilla Milkshake', price: '$4.25', description: 'Creamy vanilla milkshake', image: '🥤' },
        { id: 'a12', name: 'Strawberry Milkshake', price: '$4.25', description: 'Fresh strawberry milkshake', image: '🥤' },
        { id: 'a13', name: 'Chicken Biscuit', price: '$4.50', description: 'Chicken breast on a buttermilk biscuit', image: '🥪' },
        { id: 'a14', name: 'Egg White Grill', price: '$5.25', description: 'Egg whites, grilled chicken, and cheese on English muffin', image: '🥚' },
        { id: 'a15', name: 'Hash Brown Scramble Bowl', price: '$6.50', description: 'Scrambled eggs with hash browns and chicken', image: '🍳' },
        { id: 'a16', name: 'Greek Yogurt Parfait', price: '$4.00', description: 'Greek yogurt with granola and berries', image: '🥣' },
        { id: 'a17', name: 'Pumpkin Bread', price: '$3.50', description: 'Seasonal pumpkin spice bread', image: '🍞' },
        { id: 'a18', name: 'Iced Latte', price: '$4.50', description: 'Cold espresso with milk', image: '🧊' },
        { id: 'a19', name: 'Chicken Deluxe Sandwich', price: '$9.75', description: 'Chicken sandwich with cheese, lettuce, and tomato', image: '🥪' },
        { id: 'a20', name: 'Grilled Chicken Club', price: '$10.25', description: 'Grilled chicken with bacon, cheese, and lettuce', image: '🥪' },
        { id: 'a21', name: 'Market Salad', price: '$11.95', description: 'Mixed greens with grilled chicken and fruit', image: '🥗' },
        { id: 'a22', name: 'Southwest Salad', price: '$12.35', description: 'Mixed greens with grilled chicken and corn', image: '🥗' },
        { id: 'a23', name: 'Chicken Tortilla Soup', price: '$5.49', description: 'Spicy chicken tortilla soup', image: '🥣' },
        { id: 'a24', name: 'Fruit Cup', price: '$3.50', description: 'Fresh seasonal fruit cup', image: '🍎' },
        { id: 'a25', name: 'Side Salad', price: '$4.50', description: 'Mixed greens with choice of dressing', image: '🥗' },
        { id: 'a26', name: 'Chocolate Chunk Cookie', price: '$2.50', description: 'Warm chocolate chunk cookie', image: '🍪' },
        { id: 'a27', name: 'Brownie', price: '$2.75', description: 'Rich chocolate brownie', image: '🍫' },
        { id: 'a28', name: 'Iced Coffee', price: '$3.50', description: 'Cold coffee with cream and sugar', image: '🧊' },
        { id: 'a29', name: 'Sweet Tea', price: '$2.50', description: 'Traditional Southern sweet tea', image: '🥤' },
      ],
      reviews: [
        { id: 1, user: 'Alex P.', rating: 4, comment: 'Great chicken sandwich! Always consistent.', date: '1 day ago' },
        { id: 2, user: 'Sarah K.', rating: 4, comment: 'Love the waffle fries. Quick service.', date: '2 days ago' },
        { id: 3, user: 'Mike R.', rating: 5, comment: 'Best fast food chicken! Fresh and delicious.', date: '3 days ago' },
      ],
    },
    {
      id: 7,
      name: 'PF Chang\'s',
      description: 'Asian fusion cuisine and hand-rolled sushi. Modern Asian dining with fresh ingredients.',
      rating: 4.1,
      distance: '8 min walk',
      price: '$$',
      cuisine: 'Asian',
      image: require('../assets/images/restaurant-logos/pf-changs-logo-logo-png-transparent.png'),
      recommended: false,
      hours: '11:00 AM - 10:00 PM',
      location: 'Concourse B',
      phone: '+1 (404) 555-0129',
      website: 'www.pfchangs.com',
      featuredItems: [
        { 
          id: 'f1', 
          name: 'Dynamite Shrimp', 
          price: '$16.00', 
          description: 'Crispy shrimp with spicy sauce', 
          image: '🦐',
          rating: '94% (89)',
          tag: 'Popular'
        },
        { 
          id: 'f2', 
          name: 'Kung Pao Chicken', 
          price: '$18.50', 
          description: 'Spicy chicken with peanuts and vegetables', 
          image: '🍗',
          rating: '91% (67)',
          tag: 'Spicy'
        },
        { 
          id: 'f3', 
          name: 'California Roll', 
          price: '$14.00', 
          description: 'Fresh sushi roll with avocado', 
          image: '🍣',
          rating: '93% (78)',
          tag: 'Sushi'
        },
        { 
          id: 'f4', 
          name: 'Fried Rice', 
          price: '$12.00', 
          description: 'Wok-fried rice with vegetables', 
          image: '🍚',
          rating: '95% (134)',
          tag: 'Side'
        },
        { 
          id: 'f5', 
          name: 'Mongolian Beef', 
          price: '$22.00', 
          description: 'Sliced beef with green onions', 
          image: '🥩',
          rating: '96% (156)',
          tag: 'Chef\'s Special'
        },
        { 
          id: 'f6', 
          name: 'Orange Chicken', 
          price: '$17.50', 
          description: 'Crispy chicken with orange sauce', 
          image: '🍊',
          rating: '94% (189)',
          tag: 'Popular'
        },
        { 
          id: 'f7', 
          name: 'Spicy Tuna Roll', 
          price: '$16.00', 
          description: 'Spicy tuna sushi roll', 
          image: '🍣',
          rating: '92% (67)',
          tag: 'Sushi'
        },
        { 
          id: 'f8', 
          name: 'Chicken Lo Mein', 
          price: '$15.00', 
          description: 'Stir-fried noodles with chicken', 
          image: '🍜',
          rating: '93% (112)',
          tag: 'Noodles'
        },
        { 
          id: 'f9', 
          name: 'Beef & Broccoli', 
          price: '$19.00', 
          description: 'Sliced beef with broccoli', 
          image: '🥩',
          rating: '91% (89)',
          tag: 'Healthy'
        },
        { 
          id: 'f10', 
          name: 'Spring Rolls', 
          price: '$8.00', 
          description: 'Crispy vegetable spring rolls', 
          image: '🥟',
          rating: '95% (134)',
          tag: 'Appetizer'
        },
        { 
          id: 'f11', 
          name: 'Sweet & Sour Chicken', 
          price: '$16.50', 
          description: 'Crispy chicken with sweet and sour sauce', 
          image: '🍗',
          rating: '90% (78)',
          tag: 'Classic'
        },
        { 
          id: 'f12', 
          name: 'Fortune Cookie', 
          price: '$1.00', 
          description: 'Traditional fortune cookie', 
          image: '🥠',
          rating: '98% (234)',
          tag: 'Dessert'
        },
      ],
      allDayMenu: [
        { id: 1, name: 'Kung Pao Chicken', price: '$18.50', description: 'Spicy chicken with peanuts and vegetables', image: '🍗' },
        { id: 2, name: 'Dynamite Shrimp', price: '$16.00', description: 'Crispy shrimp with spicy sauce', image: '🦐' },
        { id: 3, name: 'California Roll', price: '$14.00', description: 'Fresh sushi roll with avocado', image: '🍣' },
        { id: 4, name: 'Fried Rice', price: '$12.00', description: 'Wok-fried rice with vegetables', image: '🍚' },
        { id: 5, name: 'Mongolian Beef', price: '$22.00', description: 'Sliced beef with green onions', image: '🥩' },
        { id: 6, name: 'Orange Chicken', price: '$17.50', description: 'Crispy chicken with orange sauce', image: '🍊' },
        { id: 7, name: 'Spicy Tuna Roll', price: '$16.00', description: 'Spicy tuna sushi roll', image: '🍣' },
        { id: 8, name: 'Chicken Lo Mein', price: '$15.00', description: 'Stir-fried noodles with chicken', image: '🍜' },
        { id: 9, name: 'Beef & Broccoli', price: '$19.00', description: 'Sliced beef with broccoli', image: '🥩' },
        { id: 10, name: 'Spring Rolls', price: '$8.00', description: 'Crispy vegetable spring rolls', image: '🥟' },
        { id: 11, name: 'Sweet & Sour Chicken', price: '$16.50', description: 'Crispy chicken with sweet and sour sauce', image: '🍗' },
        { id: 12, name: 'Fortune Cookie', price: '$1.00', description: 'Traditional fortune cookie', image: '🥠' },
        { id: 13, name: 'General Tso\'s Chicken', price: '$18.00', description: 'Crispy chicken with sweet and spicy sauce', image: '🍗' },
        { id: 14, name: 'Beef Lo Mein', price: '$16.00', description: 'Stir-fried noodles with beef', image: '🍜' },
        { id: 15, name: 'Shrimp Lo Mein', price: '$17.00', description: 'Stir-fried noodles with shrimp', image: '🍜' },
        { id: 16, name: 'Chicken Fried Rice', price: '$13.00', description: 'Wok-fried rice with chicken', image: '🍚' },
        { id: 17, name: 'Beef Fried Rice', price: '$14.00', description: 'Wok-fried rice with beef', image: '🍚' },
        { id: 18, name: 'Shrimp Fried Rice', price: '$15.00', description: 'Wok-fried rice with shrimp', image: '🍚' },
        { id: 19, name: 'Vegetable Lo Mein', price: '$13.00', description: 'Stir-fried noodles with vegetables', image: '🍜' },
        { id: 20, name: 'Vegetable Fried Rice', price: '$11.00', description: 'Wok-fried rice with vegetables', image: '🍚' },
        { id: 21, name: 'Chicken Chow Mein', price: '$14.00', description: 'Stir-fried noodles with chicken and vegetables', image: '🍜' },
        { id: 22, name: 'Beef Chow Mein', price: '$15.00', description: 'Stir-fried noodles with beef and vegetables', image: '🍜' },
        { id: 23, name: 'Shrimp Chow Mein', price: '$16.00', description: 'Stir-fried noodles with shrimp and vegetables', image: '🍜' },
        { id: 24, name: 'Chicken Egg Foo Young', price: '$14.00', description: 'Chinese omelette with chicken', image: '🍳' },
        { id: 25, name: 'Beef Egg Foo Young', price: '$15.00', description: 'Chinese omelette with beef', image: '🍳' },
        { id: 26, name: 'Shrimp Egg Foo Young', price: '$16.00', description: 'Chinese omelette with shrimp', image: '🍳' },
        { id: 27, name: 'Wonton Soup', price: '$8.00', description: 'Clear soup with wontons', image: '🥣' },
        { id: 28, name: 'Hot & Sour Soup', price: '$8.00', description: 'Spicy and sour soup', image: '🥣' },
        { id: 29, name: 'Green Tea', price: '$3.00', description: 'Traditional green tea', image: '🍵' },
      ],
      reviews: [
        { id: 1, user: 'Lisa M.', rating: 4, comment: 'Good Asian fusion. Love the Dynamite Shrimp.', date: '1 day ago' },
        { id: 2, user: 'David C.', rating: 4, comment: 'Fresh sushi and good service.', date: '2 days ago' },
        { id: 3, user: 'Anna L.', rating: 3, comment: 'Decent food but a bit pricey for airport dining.', date: '4 days ago' },
             ],
     },
     {
       id: 8,
       name: 'TGI Friday\'s',
       description: 'Casual American dining with signature cocktails. Classic American favorites in a relaxed atmosphere.',
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
       featuredItems: [
         { 
           id: 'f1', 
           name: 'Jack Daniel\'s Burger', 
           price: '$16.50', 
           description: 'Burger with Jack Daniel\'s glaze', 
           image: '🍔',
           rating: '92% (78)',
           tag: 'Signature'
         },
         { 
           id: 'f2', 
           name: 'Loaded Potato Skins', 
           price: '$12.00', 
           description: 'Crispy potato skins with toppings', 
           image: '🥔',
           rating: '89% (56)',
           tag: 'Popular'
         },
       ],
       allDayMenu: [
         { id: 1, name: 'Jack Daniel\'s Burger', price: '$16.50', description: 'Burger with Jack Daniel\'s glaze', image: '🍔' },
         { id: 2, name: 'Loaded Potato Skins', price: '$12.00', description: 'Crispy potato skins with toppings', image: '🥔' },
         { id: 3, name: 'Mozzarella Sticks', price: '$10.00', description: 'Breaded mozzarella with marinara', image: '🧀' },
         { id: 4, name: 'Strawberry Daiquiri', price: '$9.00', description: 'Frozen strawberry cocktail', image: '🍹' },
       ],
       reviews: [
         { id: 1, user: 'Jessica M.', rating: 4, comment: 'Good American food. Love the loaded potato skins.', date: '1 day ago' },
         { id: 2, user: 'Brian K.', rating: 3, comment: 'Decent food but service was slow.', date: '2 days ago' },
         { id: 3, user: 'Nicole R.', rating: 4, comment: 'Classic Friday\'s experience. Good cocktails.', date: '3 days ago' },
       ],
     },
     {
       id: 9,
       name: 'Café Intermezzo',
       description: 'European-style café with desserts and coffee. Elegant café atmosphere with pastries and specialty drinks.',
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
       featuredItems: [
         { 
           id: 'f1', 
           name: 'Tiramisu', 
           price: '$8.50', 
           description: 'Classic Italian coffee-flavored dessert', 
           image: '🍰',
           rating: '98% (134)',
           tag: 'Best Seller'
         },
         { 
           id: 'f2', 
           name: 'Cappuccino', 
           price: '$4.50', 
           description: 'Italian coffee with steamed milk', 
           image: '☕',
           rating: '95% (89)',
           tag: 'Authentic'
         },
       ],
       allDayMenu: [
         { id: 1, name: 'Tiramisu', price: '$8.50', description: 'Classic Italian coffee-flavored dessert', image: '🍰' },
         { id: 2, name: 'Cappuccino', price: '$4.50', description: 'Italian coffee with steamed milk', image: '☕' },
         { id: 3, name: 'Croissant', price: '$3.50', description: 'Buttery French pastry', image: '🥐' },
         { id: 4, name: 'Hot Chocolate', price: '$5.00', description: 'Rich European hot chocolate', image: '🍫' },
       ],
       reviews: [
         { id: 1, user: 'Sophie L.', rating: 5, comment: 'Amazing desserts! The tiramisu is perfection.', date: '1 day ago' },
         { id: 2, user: 'Marcus T.', rating: 4, comment: 'Great coffee and pastries. Elegant atmosphere.', date: '2 days ago' },
         { id: 3, user: 'Elena K.', rating: 5, comment: 'Best café in the airport! Love the European vibe.', date: '4 days ago' },
       ],
     },
            {
         id: 10,
         name: 'Starbucks',
         description: 'Premium coffee, teas, and light breakfast options. Global coffee chain with consistent quality.',
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
         featuredItems: [
           { 
             id: 'f1', 
             name: 'Caramel Macchiato', 
             price: '$5.50', 
             description: 'Espresso with caramel and steamed milk', 
             image: '☕',
             rating: '94% (234)',
             tag: 'Popular'
           },
           { 
             id: 'f2', 
             name: 'Bacon Gouda Sandwich', 
             price: '$6.50', 
             description: 'Breakfast sandwich with bacon and cheese', 
             image: '🥪',
             rating: '91% (156)',
             tag: 'Breakfast'
           },
         ],
         breakfastMenu: [
           { id: 'b1', name: 'Bacon Gouda Sandwich', price: '$6.50', description: 'Breakfast sandwich with bacon and cheese', image: '🥪' },
           { id: 'b2', name: 'Pumpkin Bread', price: '$3.50', description: 'Seasonal pumpkin spice bread', image: '🍞' },
           { id: 'b3', name: 'Egg White Bites', price: '$4.95', description: 'Cage-free egg whites with spinach and feta', image: '🥚' },
         ],
         allDayMenu: [
           { id: 1, name: 'Caramel Macchiato', price: '$5.50', description: 'Espresso with caramel and steamed milk', image: '☕' },
           { id: 2, name: 'Pumpkin Bread', price: '$3.50', description: 'Seasonal pumpkin spice bread', image: '🍞' },
           { id: 3, name: 'Bacon Gouda Sandwich', price: '$6.50', description: 'Breakfast sandwich with bacon and cheese', image: '🥪' },
           { id: 4, name: 'Iced Latte', price: '$4.50', description: 'Cold espresso with milk', image: '🧊' },
         ],
         reviews: [
           { id: 1, user: 'Amanda P.', rating: 4, comment: 'Consistent Starbucks quality. Quick service.', date: '1 day ago' },
           { id: 2, user: 'Ryan S.', rating: 4, comment: 'Good coffee and breakfast options.', date: '2 days ago' },
           { id: 3, user: 'Katie M.', rating: 3, comment: 'Standard Starbucks experience. Busy location.', date: '3 days ago' },
                ],
         },
       {
         id: 11,
         name: 'Qdoba Mexican Eats',
         description: 'Fresh Mexican food with customizable bowls and burritos. Build your own Mexican meal with fresh ingredients.',
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
         featuredItems: [
           { 
             id: 'f1', 
             name: 'Burrito Bowl', 
             price: '$11.50', 
             description: 'Customizable bowl with rice, beans, and protein', 
             image: '🥗',
             rating: '93% (89)',
             tag: 'Fresh'
           },
           { 
             id: 'f2', 
             name: 'Queso Burrito', 
             price: '$10.50', 
             description: 'Burrito with queso and choice of protein', 
             image: '🌯',
             rating: '90% (67)',
             tag: 'Popular'
           },
         ],
         allDayMenu: [
           { id: 1, name: 'Burrito Bowl', price: '$11.50', description: 'Customizable bowl with rice, beans, and protein', image: '🥗' },
           { id: 2, name: 'Queso Burrito', price: '$10.50', description: 'Burrito with queso and choice of protein', image: '🌯' },
           { id: 3, name: 'Naked Taco Salad', price: '$12.00', description: 'Fresh salad with Mexican toppings', image: '🥬' },
           { id: 4, name: 'Chips & Queso', price: '$4.50', description: 'Tortilla chips with melted cheese', image: '🧀' },
         ],
         reviews: [
           { id: 1, user: 'Carlos M.', rating: 4, comment: 'Good Mexican food. Love the customizable options.', date: '1 day ago' },
           { id: 2, user: 'Maria S.', rating: 3, comment: 'Decent fast Mexican. Quick service.', date: '2 days ago' },
           { id: 3, user: 'Jose L.', rating: 4, comment: 'Fresh ingredients and good portions.', date: '3 days ago' },
         ],
       },
       {
         id: 12,
         name: 'Burger King',
         description: 'Flame-grilled burgers and fast food favorites. Classic American fast food with flame-grilled taste.',
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
         featuredItems: [
           { 
             id: 'f1', 
             name: 'Whopper', 
             price: '$8.50', 
             description: 'Flame-grilled beef burger with toppings', 
             image: '🍔',
             rating: '89% (234)',
             tag: 'Classic'
           },
           { 
             id: 'f2', 
             name: 'Chicken Fries', 
             price: '$6.00', 
             description: 'Breaded chicken strips', 
             image: '🍗',
             rating: '87% (156)',
             tag: 'Popular'
           },
         ],
         allDayMenu: [
           { id: 1, name: 'Whopper', price: '$8.50', description: 'Flame-grilled beef burger with toppings', image: '🍔' },
           { id: 2, name: 'Chicken Fries', price: '$6.00', description: 'Breaded chicken strips', image: '🍗' },
           { id: 3, name: 'Onion Rings', price: '$4.50', description: 'Crispy onion rings', image: '🧅' },
           { id: 4, name: 'Oreo Shake', price: '$5.00', description: 'Creamy Oreo milkshake', image: '🥤' },
         ],
         reviews: [
           { id: 1, user: 'Mike T.', rating: 3, comment: 'Standard Burger King. Quick and convenient.', date: '1 day ago' },
           { id: 2, user: 'Lisa R.', rating: 4, comment: 'Good flame-grilled burgers. Fast service.', date: '2 days ago' },
           { id: 3, user: 'Tom K.', rating: 3, comment: 'Typical fast food experience.', date: '3 days ago' },
         ],
       },
       {
         id: 13,
         name: 'Popeyes Louisiana Kitchen',
         description: 'Spicy Louisiana-style fried chicken and seafood. Authentic Cajun flavors and crispy fried chicken.',
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
         featuredItems: [
           { 
             id: 'f1', 
             name: 'Spicy Chicken Sandwich', 
             price: '$9.50', 
             description: 'Spicy fried chicken sandwich', 
             image: '🥪',
             rating: '95% (189)',
             tag: 'Spicy'
           },
           { 
             id: 'f2', 
             name: 'Red Beans & Rice', 
             price: '$4.50', 
             description: 'Traditional Louisiana side dish', 
             image: '🍚',
             rating: '92% (78)',
             tag: 'Authentic'
           },
         ],
         allDayMenu: [
           { id: 1, name: 'Spicy Chicken Sandwich', price: '$9.50', description: 'Spicy fried chicken sandwich', image: '🥪' },
           { id: 2, name: 'Red Beans & Rice', price: '$4.50', description: 'Traditional Louisiana side dish', image: '🍚' },
           { id: 3, name: 'Biscuits', price: '$2.50', description: 'Flaky buttermilk biscuits', image: '🍞' },
           { id: 4, name: 'Mardi Gras Mustard', price: '$0.50', description: 'Spicy mustard sauce', image: '🌶️' },
         ],
         reviews: [
           { id: 1, user: 'Derek L.', rating: 4, comment: 'Great spicy chicken! Love the Cajun flavors.', date: '1 day ago' },
           { id: 2, user: 'Ashley M.', rating: 4, comment: 'Best fried chicken sandwich. Spicy and crispy.', date: '2 days ago' },
           { id: 3, user: 'Brandon K.', rating: 5, comment: 'Amazing Louisiana-style food!', date: '3 days ago' },
         ],
       },
       {
         id: 14,
         name: 'Atlanta ChopHouse',
         description: 'Premium steakhouse with fine wines and cocktails. Upscale dining with prime cuts and elegant atmosphere.',
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
         featuredItems: [
           { 
             id: 'f1', 
             name: 'Prime Ribeye', 
             price: '$65.00', 
             description: 'Aged prime ribeye with garlic butter', 
             image: '🥩',
             rating: '99% (89)',
             tag: 'Chef\'s Special'
           },
           { 
             id: 'f2', 
             name: 'Lobster Tail', 
             price: '$45.00', 
             description: 'Fresh Maine lobster tail', 
             image: '🦞',
             rating: '97% (67)',
             tag: 'Premium'
           },
         ],
         allDayMenu: [
           { id: 1, name: 'Prime Ribeye', price: '$65.00', description: 'Aged prime ribeye with garlic butter', image: '🥩' },
           { id: 2, name: 'Lobster Tail', price: '$45.00', description: 'Fresh Maine lobster tail', image: '🦞' },
           { id: 3, name: 'Truffle Fries', price: '$12.00', description: 'Crispy fries with truffle oil', image: '🍟' },
           { id: 4, name: 'Chocolate Lava Cake', price: '$16.00', description: 'Warm chocolate cake with vanilla ice cream', image: '🍰' },
         ],
         reviews: [
           { id: 1, user: 'Robert W.', rating: 5, comment: 'Exceptional steakhouse! The ribeye is perfection.', date: '1 day ago' },
           { id: 2, user: 'Jennifer H.', rating: 5, comment: 'Best fine dining in the airport. Excellent service.', date: '2 days ago' },
           { id: 3, user: 'Michael S.', rating: 4, comment: 'Great steaks and wine selection. Pricey but worth it.', date: '3 days ago' },
         ],
       },
       {
         id: 15,
         name: 'Panda Express',
         description: 'American Chinese fast food with fresh wok cooking. Quick Chinese favorites with fresh ingredients.',
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
         featuredItems: [
           { 
             id: 'f1', 
             name: 'Orange Chicken', 
             price: '$9.50', 
             description: 'Crispy chicken with orange sauce', 
             image: '🍊',
             rating: '94% (234)',
             tag: 'Popular'
           },
           { 
             id: 'f2', 
             name: 'Beijing Beef', 
             price: '$10.00', 
             description: 'Crispy beef with sweet and sour sauce', 
             image: '🥩',
             rating: '91% (156)',
             tag: 'Spicy'
           },
         ],
         allDayMenu: [
           { id: 1, name: 'Orange Chicken', price: '$9.50', description: 'Crispy chicken with orange sauce', image: '🍊' },
           { id: 2, name: 'Beijing Beef', price: '$10.00', description: 'Crispy beef with sweet and sour sauce', image: '🥩' },
           { id: 3, name: 'Fried Rice', price: '$4.50', description: 'Wok-fried rice with vegetables', image: '🍚' },
           { id: 4, name: 'Fortune Cookie', price: '$0.50', description: 'Traditional fortune cookie', image: '🥠' },
         ],
         reviews: [
           { id: 1, user: 'Amy L.', rating: 4, comment: 'Good Chinese fast food. Love the orange chicken.', date: '1 day ago' },
           { id: 2, user: 'David C.', rating: 3, comment: 'Decent food but can be greasy.', date: '2 days ago' },
           { id: 3, user: 'Sarah K.', rating: 4, comment: 'Quick and tasty Chinese food.', date: '3 days ago' },
         ],
       },
       {
         id: 16,
         name: 'Arby\'s',
         description: 'Roast beef sandwiches and curly fries. Famous for roast beef and unique sandwich combinations.',
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
         featuredItems: [
           { 
             id: 'f1', 
             name: 'Classic Roast Beef', 
             price: '$7.50', 
             description: 'Thin-sliced roast beef sandwich', 
             image: '🥪',
             rating: '92% (189)',
             tag: 'Signature'
           },
           { 
             id: 'f2', 
             name: 'Curly Fries', 
             price: '$4.00', 
             description: 'Seasoned curly potato fries', 
             image: '🍟',
             rating: '89% (156)',
             tag: 'Must Try'
           },
         ],
         allDayMenu: [
           { id: 1, name: 'Classic Roast Beef', price: '$7.50', description: 'Thin-sliced roast beef sandwich', image: '🥪' },
           { id: 2, name: 'Curly Fries', price: '$4.00', description: 'Seasoned curly potato fries', image: '🍟' },
           { id: 3, name: 'Beef \'n Cheddar', price: '$8.50', description: 'Roast beef with cheddar sauce', image: '🧀' },
           { id: 4, name: 'Jamocha Shake', price: '$4.50', description: 'Coffee-flavored milkshake', image: '🥤' },
         ],
         reviews: [
           { id: 1, user: 'Chris M.', rating: 4, comment: 'Great roast beef sandwiches! Love the curly fries.', date: '1 day ago' },
           { id: 2, user: 'Jessica R.', rating: 3, comment: 'Good fast food option. Quick service.', date: '2 days ago' },
           { id: 3, user: 'Mark L.', rating: 4, comment: 'Best roast beef in fast food.', date: '3 days ago' },
         ],
       },
       {
         id: 17,
         name: 'Dunkin\'',
         description: 'Coffee, donuts, and breakfast sandwiches. America\'s favorite coffee and donut chain.',
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
         featuredItems: [
           { 
             id: 'f1', 
             name: 'Boston Kreme Donut', 
             price: '$1.50', 
             description: 'Chocolate-frosted donut with cream filling', 
             image: '🍩',
             rating: '96% (234)',
             tag: 'Iconic'
           },
           { 
             id: 'f2', 
             name: 'Original Blend Coffee', 
             price: '$2.50', 
             description: 'Signature Dunkin\' coffee blend', 
             image: '☕',
             rating: '93% (189)',
             tag: 'Classic'
           },
         ],
         breakfastMenu: [
           { id: 'b1', name: 'Bacon, Egg & Cheese', price: '$4.50', description: 'Breakfast sandwich with bacon', image: '🥪' },
           { id: 'b2', name: 'Boston Kreme Donut', price: '$1.50', description: 'Chocolate-frosted donut with cream filling', image: '🍩' },
           { id: 'b3', name: 'Original Blend Coffee', price: '$2.50', description: 'Signature Dunkin\' coffee blend', image: '☕' },
         ],
         allDayMenu: [
           { id: 1, name: 'Original Blend Coffee', price: '$2.50', description: 'Signature Dunkin\' coffee blend', image: '☕' },
           { id: 2, name: 'Boston Kreme Donut', price: '$1.50', description: 'Chocolate-frosted donut with cream filling', image: '🍩' },
           { id: 3, name: 'Bacon, Egg & Cheese', price: '$4.50', description: 'Breakfast sandwich with bacon', image: '🥪' },
           { id: 4, name: 'Iced Coffee', price: '$3.00', description: 'Cold coffee with cream and sugar', image: '🧊' },
         ],
         reviews: [
           { id: 1, user: 'Rachel S.', rating: 4, comment: 'Great coffee and donuts! Quick breakfast option.', date: '1 day ago' },
           { id: 2, user: 'Kevin M.', rating: 4, comment: 'Consistent quality. Love the Boston Kreme donuts.', date: '2 days ago' },
           { id: 3, user: 'Lisa T.', rating: 3, comment: 'Good coffee but can be busy in the morning.', date: '3 days ago' },
         ],
       },
       {
         id: 18,
         name: 'Ecco',
         description: 'Mediterranean cuisine with fresh ingredients and wine. Upscale Mediterranean dining with authentic flavors.',
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
         featuredItems: [
           { 
             id: 'f1', 
             name: 'Lamb Chops', 
             price: '$38.00', 
             description: 'Grilled lamb chops with herbs', 
             image: '🍖',
             rating: '98% (67)',
             tag: 'Chef\'s Special'
           },
           { 
             id: 'f2', 
             name: 'Mediterranean Salad', 
             price: '$16.00', 
             description: 'Fresh salad with olives and feta', 
             image: '🥗',
             rating: '95% (89)',
             tag: 'Fresh'
           },
         ],
         allDayMenu: [
           { id: 1, name: 'Lamb Chops', price: '$38.00', description: 'Grilled lamb chops with herbs', image: '🍖' },
           { id: 2, name: 'Mediterranean Salad', price: '$16.00', description: 'Fresh salad with olives and feta', image: '🥗' },
           { id: 3, name: 'Hummus & Pita', price: '$8.00', description: 'Traditional hummus with warm pita', image: '🫓' },
           { id: 4, name: 'Baklava', price: '$9.00', description: 'Sweet pastry with honey and nuts', image: '🍯' },
         ],
         reviews: [
           { id: 1, user: 'Sophia K.', rating: 5, comment: 'Amazing Mediterranean food! The lamb chops are incredible.', date: '1 day ago' },
           { id: 2, user: 'Alex M.', rating: 4, comment: 'Great Mediterranean flavors. Excellent wine selection.', date: '2 days ago' },
           { id: 3, user: 'Nina R.', rating: 5, comment: 'Best Mediterranean restaurant in the airport!', date: '3 days ago' },
         ],
       },
     ];

  // Get restaurant ID from params and find the restaurant
  const restaurantId = params.id ? parseInt(params.id as string) : 1;
  const restaurant = restaurants.find(r => r.id === restaurantId) || restaurants[0];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'information-circle' },
    { id: 'menu', label: 'Menu', icon: 'restaurant' },
    { id: 'reviews', label: 'Reviews', icon: 'star' },
  ];

  const renderOverview = () => (
    <View style={styles.tabContent}>
      <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
        About
      </Text>
      <Text style={[styles.description, { color: Colors[colorScheme ?? 'light'].text }]}>
        {restaurant.description}
      </Text>

      <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
        Details
      </Text>
      <View style={styles.detailsList}>
        <View style={styles.detailItem}>
          <Ionicons name="time" size={20} color={Colors[colorScheme ?? 'light'].icon} />
          <Text style={[styles.detailText, { color: Colors[colorScheme ?? 'light'].text }]}>
            {restaurant.hours}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="location" size={20} color={Colors[colorScheme ?? 'light'].icon} />
          <Text style={[styles.detailText, { color: Colors[colorScheme ?? 'light'].text }]}>
            {restaurant.location}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="call" size={20} color={Colors[colorScheme ?? 'light'].icon} />
          <Text style={[styles.detailText, { color: Colors[colorScheme ?? 'light'].text }]}>
            {restaurant.phone}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="globe" size={20} color={Colors[colorScheme ?? 'light'].icon} />
          <Text style={[styles.detailText, { color: Colors[colorScheme ?? 'light'].text }]}>
            {restaurant.website}
          </Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
        Location on Map
      </Text>
      <View style={[styles.mapPlaceholder, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
        <Ionicons name="map" size={48} color={Colors[colorScheme ?? 'light'].icon} />
        <Text style={[styles.mapText, { color: Colors[colorScheme ?? 'light'].icon }]}>
          Interactive Airport Map
        </Text>
      </View>
    </View>
  );

  const renderMenu = () => (
    <View style={styles.tabContent}>
      {/* Featured Items Section */}
      {restaurant.featuredItems && (
        <>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Featured Items
          </Text>
          <View style={styles.featuredGrid}>
            {restaurant.featuredItems.map((item) => (
              <View key={item.id} style={[styles.featuredItem, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
                <View style={styles.featuredImageContainer}>
                  <Text style={styles.featuredItemImage}>{item.image}</Text>
                  <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="add" size={20} color="#000" />
                  </TouchableOpacity>
                </View>
                <View style={styles.featuredItemInfo}>
                  <Text style={[styles.featuredItemName, { color: Colors[colorScheme ?? 'light'].text }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.featuredItemPrice, { color: Colors[colorScheme ?? 'light'].accentSecondary }]}>
                    {item.price}
                  </Text>
                  {item.rating && (
                    <View style={styles.ratingContainer}>
                      <Ionicons name="thumbs-up" size={14} color={Colors[colorScheme ?? 'light'].accent} />
                      <Text style={[styles.ratingText, { color: Colors[colorScheme ?? 'light'].icon }]}>
                        {item.rating}
                      </Text>
                    </View>
                  )}
                  {item.tag && (
                    <View style={[styles.tagContainer, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}>
                      <Text style={[styles.tagText, { color: Colors[colorScheme ?? 'light'].background }]}>
                        {item.tag}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </>
      )}

      {/* Breakfast Menu Section */}
      {restaurant.breakfastMenu && (
        <>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Breakfast
          </Text>
          {restaurant.breakfastMenu.map((item) => (
            <View key={item.id} style={[styles.menuItem, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
              <Text style={styles.menuItemImage}>{item.image}</Text>
              <View style={styles.menuItemInfo}>
                <Text style={[styles.menuItemName, { color: Colors[colorScheme ?? 'light'].text }]}>
                  {item.name}
                </Text>
                <Text style={[styles.menuItemDescription, { color: Colors[colorScheme ?? 'light'].icon }]}>
                  {item.description}
                </Text>
              </View>
              <Text style={[styles.menuItemPrice, { color: Colors[colorScheme ?? 'light'].accentSecondary }]}>
                {item.price}
              </Text>
            </View>
          ))}
        </>
      )}

      {/* All Day Menu Section */}
      <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
        All Day Menu
      </Text>
      {(restaurant.allDayMenu || []).map((item) => (
        <View key={item.id} style={[styles.menuItem, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
          <Text style={styles.menuItemImage}>{item.image}</Text>
          <View style={styles.menuItemInfo}>
            <Text style={[styles.menuItemName, { color: Colors[colorScheme ?? 'light'].text }]}>
              {item.name}
            </Text>
            <Text style={[styles.menuItemDescription, { color: Colors[colorScheme ?? 'light'].icon }]}>
              {item.description}
            </Text>
          </View>
          <Text style={[styles.menuItemPrice, { color: Colors[colorScheme ?? 'light'].accentSecondary }]}>
            {item.price}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderReviews = () => (
    <View style={styles.tabContent}>
      <View style={styles.reviewsHeader}>
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Reviews
        </Text>
        <View style={styles.ratingSummary}>
          <Ionicons name="star" size={20} color={Colors[colorScheme ?? 'light'].accent} />
          <Text style={[styles.ratingText, { color: Colors[colorScheme ?? 'light'].text }]}>
            {restaurant.rating} ({restaurant.reviews.length} reviews)
          </Text>
        </View>
      </View>
      {restaurant.reviews.map((review) => (
        <View key={review.id} style={[styles.reviewItem, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
          <View style={styles.reviewHeader}>
            <Text style={[styles.reviewUser, { color: Colors[colorScheme ?? 'light'].text }]}>
              {review.user}
            </Text>
            <View style={styles.reviewRating}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= review.rating ? 'star' : 'star-outline'}
                  size={16}
                  color={Colors[colorScheme ?? 'light'].accent}
                />
              ))}
            </View>
          </View>
          <Text style={[styles.reviewComment, { color: Colors[colorScheme ?? 'light'].text }]}>
            {review.comment}
          </Text>
          <Text style={[styles.reviewDate, { color: Colors[colorScheme ?? 'light'].icon }]}>
            {review.date}
          </Text>
        </View>
      ))}
    </View>
  );

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
        <TouchableOpacity>
          <Ionicons 
            name="heart-outline" 
            size={24} 
            color={Colors[colorScheme ?? 'light'].text} 
          />
        </TouchableOpacity>
      </View>

      {/* Image Banner */}
      <View style={[styles.imageBanner, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}>
        {restaurant.image ? (
          <Image 
            source={restaurant.image} 
            style={styles.bannerImage}
            resizeMode="contain"
          />
        ) : (
          <RestaurantLogo 
            name={restaurant.name}
            cuisine={restaurant.cuisine}
            size={120}
          />
        )}
        <View style={styles.bannerOverlay}>
          <Text style={[styles.restaurantName, { color: Colors[colorScheme ?? 'light'].background }]}>
            {restaurant.name}
          </Text>
          <View style={styles.bannerDetails}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color={Colors[colorScheme ?? 'light'].accent} />
              <Text style={[styles.rating, { color: Colors[colorScheme ?? 'light'].background }]}>
                {restaurant.rating}
              </Text>
            </View>
            <Text style={[styles.cuisine, { color: Colors[colorScheme ?? 'light'].background }]}>
              {restaurant.cuisine} • {restaurant.price}
            </Text>
            <Text style={[styles.distance, { color: Colors[colorScheme ?? 'light'].background }]}>
              {restaurant.distance}
            </Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              {
                borderBottomColor: activeTab === tab.id 
                  ? Colors[colorScheme ?? 'light'].primary 
                  : Colors[colorScheme ?? 'light'].border,
              }
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Ionicons 
              name={tab.icon as any} 
              size={20} 
              color={activeTab === tab.id ? Colors[colorScheme ?? 'light'].primary : Colors[colorScheme ?? 'light'].icon} 
            />
            <Text
              style={[
                styles.tabText,
                {
                  color: activeTab === tab.id 
                    ? Colors[colorScheme ?? 'light'].primary 
                    : Colors[colorScheme ?? 'light'].icon,
                }
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'menu' && renderMenu()}
        {activeTab === 'reviews' && renderReviews()}
      </ScrollView>

      {/* Navigate Button */}
      <View style={styles.bottomButton}>
        <TouchableOpacity 
          style={[styles.navigateButton, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
          onPress={() => router.push('/(tabs)/map' as any)}
        >
          <Ionicons name="navigate" size={20} color={Colors[colorScheme ?? 'light'].background} />
          <Text style={[styles.navigateButtonText, { color: Colors[colorScheme ?? 'light'].background }]}>
            Navigate There
          </Text>
        </TouchableOpacity>
      </View>
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
  imageBanner: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bannerImage: {
    width: 120,
    height: 120,
    opacity: 0.3,
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  restaurantName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bannerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  cuisine: {
    fontSize: 14,
  },
  distance: {
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  detailsList: {
    gap: 16,
    marginBottom: 24,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 16,
    marginLeft: 12,
  },
  mapPlaceholder: {
    height: 150,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 16,
    marginTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  menuItemImage: {
    fontSize: 32,
    marginRight: 16,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewsHeader: {
    marginBottom: 16,
  },
  ratingSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    fontSize: 16,
    marginLeft: 8,
  },
  reviewItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: '600',
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewComment: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
  },
  bottomButton: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  navigateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  navigateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  // Featured Items Styles
  featuredGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  featuredItem: {
    width: (width - 60) / 2,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  featuredImageContainer: {
    position: 'relative',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  featuredItemImage: {
    fontSize: 48,
  },
  addButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredItemInfo: {
    padding: 12,
  },
  featuredItemName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  featuredItemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tagContainer: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '600',
  },
}); 