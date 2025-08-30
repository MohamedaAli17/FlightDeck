import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useAuth } from '../../contexts/AuthContext';
import { router } from 'expo-router';
import AuthModal from '../../components/AuthModal';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);

  const quickNavItems = [
    { id: 'food', icon: '🍔', title: 'Food', route: '/food' },
    { id: 'shopping', icon: '🛍️', title: 'Shopping', route: '/shopping' },
    { id: 'activities', icon: '🎭', title: 'Activities', route: '/activities' },
    { id: 'flights', icon: '✈️', title: 'My Flights', route: '/flights' },
  ];

  const topPicks = [
    {
      id: 1,
      name: 'Chick-fil-A',
      type: 'Restaurant',
      rating: 4.5,
      distance: '2 min walk',
      image: '🍽️',
    },
    {
      id: 2,
      name: 'Brookstone',
      type: 'Shopping',
      rating: 4.2,
      distance: '5 min walk',
      image: '🛒',
    },
    {
      id: 3,
      name: 'Airport Lounge',
      type: 'Relaxation',
      rating: 4.8,
      distance: '8 min walk',
      image: '🛋️',
    },
  ];

  const deals = [
    { id: 1, title: '20% off at Starbucks', timeLeft: '2h 15m' },
    { id: 2, title: 'Free WiFi upgrade', timeLeft: '1h 30m' },
    { id: 3, title: 'Priority boarding', timeLeft: '45m' },
  ];

  const handleQuickNavPress = (route: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    router.push(route as any);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.airportInfo}>
            <Text style={[styles.airportName, { color: Colors[colorScheme ?? 'light'].text }]}>
              Hartsfield–Jackson Atlanta International Airport (ATL)
            </Text>
            <Text style={[styles.terminalInfo, { color: Colors[colorScheme ?? 'light'].icon }]}>
              Concourse • Gate A
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => {
              if (!user) {
                setShowAuthModal(true);
              } else {
                router.push('/profile' as any);
              }
            }}
          >
            <Ionicons 
              name="person-circle-outline" 
              size={32} 
              color={Colors[colorScheme ?? 'light'].primary} 
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
            placeholder="Search for food, shops, or activities..."
            placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Quick Navigation Tiles */}
        <View style={styles.quickNavSection}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Quick Access
          </Text>
          <View style={styles.quickNavGrid}>
            {quickNavItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.quickNavTile, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}
                onPress={() => handleQuickNavPress(item.route)}
              >
                <Text style={styles.quickNavIcon}>{item.icon}</Text>
                <Text style={[styles.quickNavTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Top Picks Carousel */}
        <View style={styles.topPicksSection}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Top Picks for You
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
            {topPicks.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.pickCard, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}
                onPress={() => {
                  if (!user) {
                    setShowAuthModal(true);
                  }
                }}
              >
                <Text style={styles.pickImage}>{item.image}</Text>
                <Text style={[styles.pickName, { color: Colors[colorScheme ?? 'light'].text }]}>
                  {item.name}
                </Text>
                <Text style={[styles.pickType, { color: Colors[colorScheme ?? 'light'].icon }]}>
                  {item.type}
                </Text>
                <View style={styles.pickDetails}>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={12} color={Colors[colorScheme ?? 'light'].accent} />
                    <Text style={[styles.rating, { color: Colors[colorScheme ?? 'light'].text }]}>
                      {item.rating}
                    </Text>
                  </View>
                  <Text style={[styles.distance, { color: Colors[colorScheme ?? 'light'].icon }]}>
                    {item.distance}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Time-limited Deals Banner */}
        <View style={styles.dealsSection}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Limited Time Deals
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dealsCarousel}>
            {deals.map((deal) => (
              <TouchableOpacity
                key={deal.id}
                style={[styles.dealCard, { backgroundColor: Colors[colorScheme ?? 'light'].accent }]}
                onPress={() => {
                  if (!user) {
                    setShowAuthModal(true);
                  }
                }}
              >
                <Text style={[styles.dealTitle, { color: Colors[colorScheme ?? 'light'].primary }]}>
                  {deal.title}
                </Text>
                <Text style={[styles.dealTime, { color: Colors[colorScheme ?? 'light'].primary }]}>
                  {deal.timeLeft} left
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  airportInfo: {
    flex: 1,
  },
  airportName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  terminalInfo: {
    fontSize: 14,
  },
  profileButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  quickNavSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  quickNavGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickNavTile: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickNavIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  quickNavTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  topPicksSection: {
    marginBottom: 32,
  },
  carousel: {
    marginLeft: -8,
  },
  pickCard: {
    width: 160,
    marginHorizontal: 8,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pickImage: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 12,
  },
  pickName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  pickType: {
    fontSize: 12,
    marginBottom: 8,
  },
  pickDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '600',
  },
  distance: {
    fontSize: 12,
  },
  dealsSection: {
    marginBottom: 32,
  },
  dealsCarousel: {
    marginLeft: -8,
  },
  dealCard: {
    marginHorizontal: 8,
    padding: 16,
    borderRadius: 12,
    minWidth: 200,
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  dealTime: {
    fontSize: 14,
  },
});
