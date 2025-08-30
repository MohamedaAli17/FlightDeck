import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';

interface RestaurantLogoProps {
  name: string;
  cuisine: string;
  size?: number;
}

export default function RestaurantLogo({ name, cuisine, size = 80 }: RestaurantLogoProps) {
  const colorScheme = useColorScheme();
  
  // Get initials from restaurant name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 3);
  };

  // Get appropriate icon based on cuisine
  const getCuisineIcon = (cuisine: string) => {
    const cuisineLower = cuisine.toLowerCase();
    if (cuisineLower.includes('coffee') || cuisineLower.includes('café')) return 'cafe';
    if (cuisineLower.includes('fast food')) return 'fast-food';
    if (cuisineLower.includes('asian')) return 'restaurant';
    if (cuisineLower.includes('mexican')) return 'restaurant';
    if (cuisineLower.includes('american')) return 'restaurant';
    if (cuisineLower.includes('southern')) return 'restaurant';
    if (cuisineLower.includes('seafood')) return 'fish';
    if (cuisineLower.includes('bbq')) return 'flame';
    if (cuisineLower.includes('steakhouse')) return 'restaurant';
    if (cuisineLower.includes('mediterranean')) return 'restaurant';
    return 'restaurant';
  };

  const initials = getInitials(name);
  const iconName = getCuisineIcon(cuisine);
  const iconSize = size * 0.4;

  return (
    <View style={[
      styles.container, 
      { 
        width: size, 
        height: size,
        backgroundColor: 'transparent',
      }
    ]}>
      <Ionicons 
        name={iconName as any} 
        size={iconSize} 
        color={Colors[colorScheme ?? 'light'].icon} 
        style={styles.icon}
      />
      <Text style={[
        styles.initials, 
        { 
          color: Colors[colorScheme ?? 'light'].text,
          fontSize: size * 0.2,
        }
      ]}>
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 4,
  },
  initials: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
