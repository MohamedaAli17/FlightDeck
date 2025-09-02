import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { useFavorites } from '../contexts/FavoritesContext';
import { router } from 'expo-router';
import RestaurantLogo from '../components/RestaurantLogo';

export default function FavoritesScreen() {
  const colorScheme = useColorScheme();
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();

  const handleRemoveFavorite = (restaurantId: number, restaurantName: string) => {
    Alert.alert(
      'Remove from Favorites',
      `Are you sure you want to remove "${restaurantName}" from your favorites?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeFromFavorites(restaurantId);
            } catch (error) {
              console.error('Error removing favorite:', error);
            }
          },
        },
      ]
    );
  };

  const handleClearAllFavorites = () => {
    Alert.alert(
      'Clear All Favorites',
      'Are you sure you want to remove all restaurants from your favorites?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearFavorites();
            } catch (error) {
              console.error('Error clearing favorites:', error);
            }
          },
        },
      ]
    );
  };

  const handleRestaurantPress = (restaurantId: number) => {
    router.push({
      pathname: '/restaurant-detail',
      params: { id: restaurantId.toString() }
    } as any);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return 'Added today';
    } else if (diffDays === 2) {
      return 'Added yesterday';
    } else if (diffDays <= 7) {
      return `Added ${diffDays - 1} days ago`;
    } else {
      return date.toLocaleDateString();
    }
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
          Saved Favorites
        </Text>
        {favorites.length > 0 && (
          <TouchableOpacity onPress={handleClearAllFavorites}>
            <Ionicons 
              name="trash-outline" 
              size={24} 
              color={Colors[colorScheme ?? 'light'].error} 
            />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {favorites.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons 
              name="heart-outline" 
              size={64} 
              color={Colors[colorScheme ?? 'light'].icon} 
            />
            <Text style={[styles.emptyTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
              No favorites yet
            </Text>
            <Text style={[styles.emptySubtitle, { color: Colors[colorScheme ?? 'light'].icon }]}>
              Start exploring restaurants and save your favorites by tapping the heart icon
            </Text>
            <TouchableOpacity 
              style={[styles.exploreButton, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
              onPress={() => router.push('/(tabs)/food' as any)}
            >
              <Ionicons name="restaurant" size={20} color={Colors[colorScheme ?? 'light'].background} />
              <Text style={[styles.exploreButtonText, { color: Colors[colorScheme ?? 'light'].background }]}>
                Explore Restaurants
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.statsContainer}>
              <Text style={[styles.statsText, { color: Colors[colorScheme ?? 'light'].text }]}>
                {favorites.length} {favorites.length === 1 ? 'restaurant' : 'restaurants'} saved
              </Text>
            </View>

            {favorites.map((restaurant) => (
              <TouchableOpacity
                key={restaurant.id}
                style={[styles.favoriteCard, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}
                onPress={() => handleRestaurantPress(restaurant.id)}
              >
                <View style={styles.restaurantImage}>
                  <RestaurantLogo 
                    name={restaurant.name}
                    cuisine={restaurant.cuisine}
                    size={60}
                  />
                </View>
                
                <View style={styles.restaurantInfo}>
                  <Text style={[styles.restaurantName, { color: Colors[colorScheme ?? 'light'].text }]}>
                    {restaurant.name}
                  </Text>
                  <Text style={[styles.restaurantCuisine, { color: Colors[colorScheme ?? 'light'].icon }]}>
                    {restaurant.cuisine} • {restaurant.price}
                  </Text>
                  <View style={styles.restaurantDetails}>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={14} color={Colors[colorScheme ?? 'light'].accent} />
                      <Text style={[styles.rating, { color: Colors[colorScheme ?? 'light'].text }]}>
                        {restaurant.rating}
                      </Text>
                    </View>
                    <Text style={[styles.location, { color: Colors[colorScheme ?? 'light'].icon }]}>
                      {restaurant.location}
                    </Text>
                    <Text style={[styles.distance, { color: Colors[colorScheme ?? 'light'].icon }]}>
                      {restaurant.distance}
                    </Text>
                  </View>
                  <Text style={[styles.addedDate, { color: Colors[colorScheme ?? 'light'].icon }]}>
                    {formatDate(restaurant.addedAt)}
                  </Text>
                </View>

                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveFavorite(restaurant.id, restaurant.name)}
                  >
                    <Ionicons 
                      name="heart" 
                      size={20} 
                      color={Colors[colorScheme ?? 'light'].error} 
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.navigateButton}
                    onPress={() => router.push('/(tabs)/map' as any)}
                  >
                    <Ionicons 
                      name="navigate" 
                      size={20} 
                      color={Colors[colorScheme ?? 'light'].primary} 
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 40,
    lineHeight: 24,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  exploreButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  statsContainer: {
    marginBottom: 20,
  },
  statsText: {
    fontSize: 16,
    fontWeight: '600',
  },
  favoriteCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
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
  restaurantImage: {
    marginRight: 16,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  restaurantCuisine: {
    fontSize: 14,
    marginBottom: 8,
  },
  restaurantDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  location: {
    fontSize: 14,
    marginRight: 12,
  },
  distance: {
    fontSize: 14,
  },
  addedDate: {
    fontSize: 12,
  },
  actions: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
  },
  removeButton: {
    padding: 8,
    marginBottom: 8,
  },
  navigateButton: {
    padding: 8,
  },
});


