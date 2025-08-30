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

export default function LoyaltyProgramsScreen() {
  const colorScheme = useColorScheme();
  const [activeTab, setActiveTab] = useState('airlines');

  const loyaltyPrograms = {
    airlines: [
      {
        id: 1,
        name: 'Delta SkyMiles',
        logo: '✈️',
        points: 156000,
        tier: 'Diamond',
        tierColor: '#FFD700',
        status: 'Active',
        nextTier: 'Platinum',
        pointsToNext: 44000,
      },
      {
        id: 2,
        name: 'American Airlines AAdvantage',
        logo: '🛩️',
        points: 89000,
        tier: 'Gold',
        tierColor: '#C0C0C0',
        status: 'Active',
        nextTier: 'Platinum',
        pointsToNext: 11000,
      },
      {
        id: 3,
        name: 'United MileagePlus',
        logo: '✈️',
        points: 45000,
        tier: 'Silver',
        tierColor: '#CD7F32',
        status: 'Active',
        nextTier: 'Gold',
        pointsToNext: 55000,
      },
    ],
    hotels: [
      {
        id: 4,
        name: 'Marriott Bonvoy',
        logo: '🏨',
        points: 125000,
        tier: 'Platinum Elite',
        tierColor: '#E5E4E2',
        status: 'Active',
        nextTier: 'Titanium Elite',
        pointsToNext: 25000,
      },
      {
        id: 5,
        name: 'Hilton Honors',
        logo: '🏨',
        points: 89000,
        tier: 'Gold',
        tierColor: '#FFD700',
        status: 'Active',
        nextTier: 'Diamond',
        pointsToNext: 11000,
      },
    ],
    creditCards: [
      {
        id: 6,
        name: 'Chase Sapphire Reserve',
        logo: '💳',
        points: 234000,
        tier: 'Premium',
        tierColor: '#FFD700',
        status: 'Active',
        nextTier: 'None',
        pointsToNext: 0,
      },
      {
        id: 7,
        name: 'Amex Platinum',
        logo: '💳',
        points: 189000,
        tier: 'Premium',
        tierColor: '#FFD700',
        status: 'Active',
        nextTier: 'None',
        pointsToNext: 0,
      },
    ],
  };

  const tabs = [
    { id: 'airlines', label: 'Airlines', count: loyaltyPrograms.airlines.length },
    { id: 'hotels', label: 'Hotels', count: loyaltyPrograms.hotels.length },
    { id: 'creditCards', label: 'Credit Cards', count: loyaltyPrograms.creditCards.length },
  ];

  const currentPrograms = loyaltyPrograms[activeTab as keyof typeof loyaltyPrograms] || [];

  const renderLoyaltyItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={[styles.loyaltyItem, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}
      onPress={() => Alert.alert('Program Details', `Viewing details for ${item.name}`)}
    >
      <View style={styles.itemHeader}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>{item.logo}</Text>
        </View>
        <View style={styles.programInfo}>
          <Text style={[styles.programName, { color: Colors[colorScheme ?? 'light'].text }]}>
            {item.name}
          </Text>
          <View style={styles.tierContainer}>
            <View style={[styles.tierBadge, { backgroundColor: item.tierColor }]}>
              <Text style={styles.tierText}>{item.tier}</Text>
            </View>
            <Text style={[styles.statusText, { color: Colors[colorScheme ?? 'light'].icon }]}>
              {item.status}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={20} color={Colors[colorScheme ?? 'light'].icon} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.pointsSection}>
        <View style={styles.pointsInfo}>
          <Text style={[styles.pointsLabel, { color: Colors[colorScheme ?? 'light'].icon }]}>
            Points Balance
          </Text>
          <Text style={[styles.pointsValue, { color: Colors[colorScheme ?? 'light'].text }]}>
            {item.points.toLocaleString()}
          </Text>
        </View>
        
        {item.pointsToNext > 0 && (
          <View style={styles.nextTierInfo}>
            <Text style={[styles.nextTierLabel, { color: Colors[colorScheme ?? 'light'].icon }]}>
              {item.pointsToNext.toLocaleString()} points to {item.nextTier}
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${Math.min(100, ((item.points - (item.points - item.pointsToNext)) / (item.points + item.pointsToNext)) * 100)}%`,
                    backgroundColor: Colors[colorScheme ?? 'light'].primary 
                  }
                ]} 
              />
            </View>
          </View>
        )}
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
          Loyalty Programs
        </Text>
        <TouchableOpacity>
          <Ionicons 
            name="add" 
            size={24} 
            color={Colors[colorScheme ?? 'light'].text} 
          />
        </TouchableOpacity>
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

      {/* Loyalty Programs List */}
      <FlatList
        data={currentPrograms}
        renderItem={renderLoyaltyItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons 
              name="star-outline" 
              size={64} 
              color={Colors[colorScheme ?? 'light'].icon} 
            />
            <Text style={[styles.emptyTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
              No loyalty programs
            </Text>
            <Text style={[styles.emptySubtitle, { color: Colors[colorScheme ?? 'light'].icon }]}>
              Add your loyalty programs to track points and status
            </Text>
            <TouchableOpacity 
              style={[styles.addButton, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
              onPress={() => Alert.alert('Add Program', 'Add loyalty program feature coming soon')}
            >
              <Text style={[styles.addButtonText, { color: Colors[colorScheme ?? 'light'].background }]}>
                Add Program
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
  loyaltyItem: {
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
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logo: {
    fontSize: 24,
  },
  programInfo: {
    flex: 1,
  },
  programName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tierContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tierBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 8,
  },
  tierText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  statusText: {
    fontSize: 12,
  },
  moreButton: {
    padding: 8,
  },
  pointsSection: {
    gap: 12,
  },
  pointsInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsLabel: {
    fontSize: 14,
  },
  pointsValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextTierInfo: {
    gap: 8,
  },
  nextTierLabel: {
    fontSize: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
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
  addButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

