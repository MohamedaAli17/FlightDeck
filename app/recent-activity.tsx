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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { router } from 'expo-router';

export default function RecentActivityScreen() {
  const colorScheme = useColorScheme();
  const [activeFilter, setActiveFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'favorite',
      title: 'Added Chick-fil-A to favorites',
      description: 'You saved this restaurant to your favorites',
      time: '2 hours ago',
      icon: 'heart',
      color: '#ff6b6b',
    },
    {
      id: 2,
      type: 'search',
      title: 'Searched for coffee shops',
      description: 'You searched for coffee shops in Concourse A',
      time: '3 hours ago',
      icon: 'search',
      color: '#4ecdc4',
    },
    {
      id: 3,
      type: 'flight',
      title: 'Checked flight status',
      description: 'You checked the status of flight DL1234',
      time: '5 hours ago',
      icon: 'airplane',
      color: '#45b7d1',
    },
    {
      id: 4,
      type: 'booking',
      title: 'Booked airport lounge',
      description: 'You booked a spot at the Delta Sky Club',
      time: '1 day ago',
      icon: 'calendar',
      color: '#96ceb4',
    },
    {
      id: 5,
      type: 'review',
      title: 'Left a review',
      description: 'You reviewed Starbucks with 4 stars',
      time: '1 day ago',
      icon: 'star',
      color: '#feca57',
    },
    {
      id: 6,
      type: 'navigation',
      title: 'Used navigation',
      description: 'You navigated to Gate A12',
      time: '2 days ago',
      icon: 'navigate',
      color: '#ff9ff3',
    },
    {
      id: 7,
      type: 'purchase',
      title: 'Made a purchase',
      description: 'You purchased a meal at Panda Express',
      time: '2 days ago',
      icon: 'card',
      color: '#54a0ff',
    },
    {
      id: 8,
      type: 'alert',
      title: 'Set flight alert',
      description: 'You set an alert for flight DL5678',
      time: '3 days ago',
      icon: 'notifications',
      color: '#5f27cd',
    },
  ];

  const filters = [
    { id: 'all', label: 'All Activities', count: activities.length },
    { id: 'favorite', label: 'Favorites', count: activities.filter(a => a.type === 'favorite').length },
    { id: 'flight', label: 'Flights', count: activities.filter(a => a.type === 'flight').length },
    { id: 'booking', label: 'Bookings', count: activities.filter(a => a.type === 'booking').length },
    { id: 'purchase', label: 'Purchases', count: activities.filter(a => a.type === 'purchase').length },
  ];

  const filteredActivities = activeFilter === 'all' 
    ? activities 
    : activities.filter(a => a.type === activeFilter);

  const renderActivityItem = ({ item }: { item: any }) => (
    <View style={[styles.activityItem, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
      <View style={styles.activityLeft}>
        <View style={[styles.activityIcon, { backgroundColor: item.color }]}>
          <Ionicons name={item.icon as any} size={20} color="white" />
        </View>
        <View style={styles.activityInfo}>
          <Text style={[styles.activityTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            {item.title}
          </Text>
          <Text style={[styles.activityDescription, { color: Colors[colorScheme ?? 'light'].icon }]}>
            {item.description}
          </Text>
          <Text style={[styles.activityTime, { color: Colors[colorScheme ?? 'light'].icon }]}>
            {item.time}
          </Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.activityAction}>
        <Ionicons 
          name="chevron-forward" 
          size={20} 
          color={Colors[colorScheme ?? 'light'].icon} 
        />
      </TouchableOpacity>
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
        <Text style={[styles.headerTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Recent Activity
        </Text>
        <TouchableOpacity>
          <Ionicons 
            name="filter" 
            size={24} 
            color={Colors[colorScheme ?? 'light'].text} 
          />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filter,
              activeFilter === filter.id && { backgroundColor: Colors[colorScheme ?? 'light'].primary }
            ]}
            onPress={() => setActiveFilter(filter.id)}
          >
            <Text style={[
              styles.filterLabel,
              { color: activeFilter === filter.id ? Colors[colorScheme ?? 'light'].background : Colors[colorScheme ?? 'light'].text }
            ]}>
              {filter.label} ({filter.count})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Activity List */}
      <FlatList
        data={filteredActivities}
        renderItem={renderActivityItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons 
              name="time-outline" 
              size={64} 
              color={Colors[colorScheme ?? 'light'].icon} 
            />
            <Text style={[styles.emptyTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
              No activity yet
            </Text>
            <Text style={[styles.emptySubtitle, { color: Colors[colorScheme ?? 'light'].icon }]}>
              Your recent activities will appear here
            </Text>
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
  filtersContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filtersContent: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  filter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  filterLabel: {
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
  activityItem: {
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
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
  },
  activityAction: {
    padding: 8,
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
    paddingHorizontal: 40,
  },
});

