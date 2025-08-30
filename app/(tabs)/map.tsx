import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

const { width, height } = Dimensions.get('window');

export default function MapScreen() {
  const colorScheme = useColorScheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerminal, setSelectedTerminal] = useState('T1');



  const terminals = [
    { id: 'T1', name: 'Terminal 1', color: '#4299e1', lat: 33.6407, lng: -84.4277 },
    { id: 'T2', name: 'Terminal 2', color: '#48bb78', lat: 33.6397, lng: -84.4267 },
    { id: 'T3', name: 'Terminal 3', color: '#ed8936', lat: 33.6417, lng: -84.4287 },
    { id: 'T4', name: 'Terminal 4', color: '#9f7aea', lat: 33.6427, lng: -84.4297 },
  ];

  const quickActions = [
    { id: 'food', icon: '🍽️', label: 'Order Food', color: '#48bb78' },
    { id: 'coffee', icon: '☕', label: 'Coffee', color: '#ed8936' },
    { id: 'bars', icon: '🍷', label: 'Bars', color: '#9f7aea' },
    { id: 'atms', icon: '💰', label: 'ATMs', color: '#4299e1' },
    { id: 'lounges', icon: '🛋️', label: 'Lounges', color: '#f56565' },
    { id: 'charging', icon: '🔌', label: 'Charging', color: '#38b2ac' },
    { id: 'headphones', icon: '🎧', label: 'Headphones', color: '#ed64a6' },
    { id: 'restrooms', icon: '🚻', label: 'Restrooms', color: '#667eea' },
    { id: 'baggage', icon: '🧳', label: 'Baggage', color: '#f09383' },
    { id: 'shuttles', icon: '🚌', label: 'Shuttles', color: '#4fd1c7' },
  ];

  const nearbyPlaces = [
    { id: 1, name: 'One Flew South', type: 'Restaurant', distance: '3 min', terminal: 'T1' },
    { id: 2, name: 'Atlanta News & Gifts', type: 'Shopping', distance: '2 min', terminal: 'T1' },
    { id: 3, name: 'Delta Sky Club', type: 'Lounge', distance: '5 min', terminal: 'T1' },
    { id: 4, name: 'SunTrust ATM', type: 'Service', distance: '1 min', terminal: 'T1' },
    { id: 5, name: 'Paschal\'s Restaurant', type: 'Restaurant', distance: '4 min', terminal: 'T2' },
    { id: 6, name: 'CNN News Store', type: 'Shopping', distance: '6 min', terminal: 'T3' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Airport Map
        </Text>
        <TouchableOpacity>
          <Ionicons 
            name="layers" 
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
          placeholder="Search ATL Airport"
          placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons 
            name="navigate" 
            size={20} 
            color={Colors[colorScheme ?? 'light'].primary} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons 
            name="filter" 
            size={20} 
            color={Colors[colorScheme ?? 'light'].primary} 
          />
        </TouchableOpacity>
      </View>

      {/* Google Maps via WebView */}
      <View style={styles.mapContainer}>
        <WebView
          style={styles.map}
          source={{
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                  body { margin: 0; padding: 0; }
                  #map { height: 100vh; width: 100vw; }
                </style>
              </head>
              <body>
                <div id="map"></div>
                <script async defer
                  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGp2MbUqx59pFaM_sShg13PMUlUpS98OQ&callback=initMap">
                </script>
                <script>
                  function initMap() {
                    const atlanta = { lat: 33.6407, lng: -84.4277 };
                    const map = new google.maps.Map(document.getElementById("map"), {
                      zoom: 15,
                      center: atlanta,
                      mapTypeId: 'satellite'
                    });
                    
                    // Main airport marker
                    new google.maps.Marker({
                      position: atlanta,
                      map: map,
                      title: "Hartsfield-Jackson Atlanta International Airport",
                      icon: {
                        url: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="red"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>'),
                        scaledSize: new google.maps.Size(30, 30)
                      }
                    });
                    
                    // Terminal markers
                    const terminals = [
                      { lat: 33.6407, lng: -84.4277, title: 'Terminal 1', color: 'blue' },
                      { lat: 33.6397, lng: -84.4267, title: 'Terminal 2', color: 'green' },
                      { lat: 33.6417, lng: -84.4287, title: 'Terminal 3', color: 'orange' },
                      { lat: 33.6427, lng: -84.4297, title: 'Terminal 4', color: 'purple' }
                    ];
                    
                    terminals.forEach(terminal => {
                      new google.maps.Marker({
                        position: { lat: terminal.lat, lng: terminal.lng },
                        map: map,
                        title: terminal.title,
                        icon: {
                          url: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="' + terminal.color + '"><circle cx="12" cy="12" r="8"/></svg>'),
                          scaledSize: new google.maps.Size(20, 20)
                        }
                      });
                    });
                  }
                </script>
              </body>
              </html>
            `
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
        />

        {/* Map Controls Overlay */}
        <View style={styles.mapControls}>
          <TouchableOpacity 
            style={[styles.mapButton, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}
            onPress={() => {/* Add locate functionality */}}
          >
            <Ionicons name="locate" size={20} color={Colors[colorScheme ?? 'light'].primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Quick Actions
        </Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickActionsContent}
        >
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.quickAction, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}
            >
              <Text style={styles.quickActionIcon}>{action.icon}</Text>
              <Text style={[styles.quickActionLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Nearby Places */}
      <View style={styles.nearbyContainer}>
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Nearby Places
        </Text>
        <ScrollView style={styles.nearbyList} showsVerticalScrollIndicator={false}>
          {nearbyPlaces.map((place) => (
            <TouchableOpacity
              key={place.id}
              style={[styles.nearbyItem, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}
            >
              <View style={styles.nearbyInfo}>
                <Text style={[styles.nearbyName, { color: Colors[colorScheme ?? 'light'].text }]}>
                  {place.name}
                </Text>
                <Text style={[styles.nearbyType, { color: Colors[colorScheme ?? 'light'].icon }]}>
                  {place.type} • {place.terminal}
                </Text>
              </View>
              <View style={styles.nearbyDistance}>
                <Text style={[styles.distanceText, { color: Colors[colorScheme ?? 'light'].accentSecondary }]}>
                  {place.distance}
                </Text>
                <Ionicons 
                  name="chevron-forward" 
                  size={16} 
                  color={Colors[colorScheme ?? 'light'].icon} 
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
  headerTitle: {
    fontSize: 24,
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
  searchButton: {
    marginLeft: 12,
    padding: 4,
  },
  mapContainer: {
    height: height * 0.4,
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  mapControls: {
    position: 'absolute',
    right: 16,
    top: 80,
    gap: 8,
  },
  mapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  quickActionsContainer: {
    marginTop: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  quickActionsContent: {
    paddingHorizontal: 20,
  },
  quickAction: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  nearbyContainer: {
    flex: 1,
  },
  nearbyList: {
    paddingHorizontal: 20,
  },
  nearbyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nearbyInfo: {
    flex: 1,
  },
  nearbyName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  nearbyType: {
    fontSize: 14,
  },
  nearbyDistance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
}); 
