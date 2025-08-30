import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { router } from 'expo-router';

export default function FavoritesScreen() {
  const colorScheme = useColorScheme();
  const [activeTab, setActiveTab] = useState('all');

  const favorites = [
    {
      id: 1,
      name: 'Chick-fil-A',
      type: 'Restaurant',
      category: 'food',
      rating: 4.5,
      distance: '2 min walk',
      image: '🍔',
      location: 'Concourse A',
    },
    {
      id: 2,
      name: 'Brookstone',
      type: 'Shopping',
      category: 'shopping',
      rating: 4.2,
      distance: '5 min walk',
      image: '🛒',
      location: 'Concourse B',
    },
    {
      id: 3,
      name: 'Airport Lounge',
      type: 'Relaxation',
      category: 'activities',
      rating: 4.8,
      distance: '8 min walk',
      image: '🛋️',
      location: 'Concourse C',
    },
    {
      id: 4,
      name: 'Starbucks',
      type: 'Coffee',
      category: 'food',
      rating: 4.3,
      distance: '3 min walk',
      image: '☕',
      location: 'Concourse A',
    },
    {
      id: 5,
      name: 'Duty Free Shop',
      type: 'Shopping',
      category: 'shopping',
      rating: 4.1,
      distance: '10 min walk',
      image: '🛍️',
      location: 'Concourse D',
    },
  ];

  const tabs = [
    { id: 'all', label: 'All', count: favorites.length },
    { id: 'food', label: 'Food', count: favorites.filter(f => f.category === 'food').length },
    { id: 'shopping', label: 'Shopping', count: favorites.filter(f => f.category === 'shopping').length },
    { id: 'activities', label: 'Activities', count: favorites.filter(f => f.category === 'activities').length },
  ];

  const filteredFavorites = activeTab === 'all' 
    ? favorites 
    : favorites.filter(f => f.category === activeTab);

  const handleRemoveFavorite = (id: number) => {
    Alert.alert(
      'Remove Favorite',
      'Are you sure you want to remove this item from your favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'Item removed from favorites');
          }
        },
      ]
    );
  };

  const renderFavoriteItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={[styles.favoriteItem, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}
      onPress={() => router.push('/restaurant-detail' as any)}
    >
      <View style={styles.itemLeft}>
        <Text style={styles.itemImage}>{item.image}</Text>
        <View style={styles.itemInfo}>
          <Text style={[styles.itemName, { color: Colors[colorScheme ?? 'light'].text }]}>
            {item.name}
          </Text>
          <Text style={[styles.itemType, { color: Colors[colorScheme ?? 'light'].icon }]}>
            {item.type} • {item.location}
          </Text>
          <View style={styles.itemRating}>
            <Ionicons name="star" size={14} color={Colors[colorScheme ?? 'light'].accent} />
            <Text style={[styles.ratingText, { color: Colors[colorScheme ?? 'light'].text }]}>
              {item.rating} • {item.distance}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.itemRight}>
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={() => handleRemoveFavorite(item.id)}
        >
          <Ionicons 
            name="heart" 
            size={20} 
            color={Colors[colorScheme ?? 'light'].accent} 
          />
        </TouchableOpacity>
        <Ionicons 
          name="chevron-forward" 
          size={20} 
          color={Colors[colorScheme ?? 'light'].icon} 
        />
      </View>
    </TouchableOpacity>
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
        <Text style={[styles.headerTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Saved Favorites
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContent}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && { backgroundColor: Colors[colorScheme ?? 'light'].primary }
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[
              styles.tabLabel,
              { color: activeTab === tab.id ? Colors[colorScheme ?? 'light'].background : Colors[colorScheme ?? 'light'].text }
            ]}>
              {tab.label} ({tab.count})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Favorites List */}
      <FlatList
        data={filteredFavorites}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons 
              name="heart-outline" 
              size={64} 
              color={Colors[colorScheme ?? 'light'].icon} 
            />
            <Text style={[styles.emptyTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
              No favorites yet
            </Text>
            <Text style={[styles.emptySubtitle, { color: Colors[colorScheme ?? 'light'].icon }]}>
              Start exploring and save your favorite places
            </Text>
            <TouchableOpacity 
              style={[styles.exploreButton, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
              onPress={() => router.push('/(tabs)/food' as any)}
            >
              <Text style={[styles.exploreButtonText, { color: Colors[colorScheme ?? 'light'].background }]}>
                Explore Now
              </Text>
            </TouchableOpacity>
          </View>
        }
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
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabsContent: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  favoriteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
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
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemImage: {
    fontSize: 32,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemType: {
    fontSize: 14,
    marginBottom: 4,
  },
  itemRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 4,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButton: {
    padding: 8,
    marginRight: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 40,
  },
  exploreButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  exploreButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

