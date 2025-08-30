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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function FlightsScreen() {
  const colorScheme = useColorScheme();
  const [searchQuery, setSearchQuery] = useState('');




  const flights = [
    {
      id: 1,
      flightNumber: 'BA123',
      airline: 'British Airways',
      airlineCode: 'BA',
      destination: 'New York (JFK)',
      departureTime: '14:30',
      arrivalTime: '17:45',
      terminal: 'T5',
      gate: 'A12',
      status: 'boarding',
      statusText: 'BOARDING',
      statusColor: Colors[colorScheme ?? 'light'].success,
      delay: null,
    },
    {
      id: 2,
      flightNumber: 'AA456',
      airline: 'American Airlines',
      airlineCode: 'AA',
      destination: 'Los Angeles (LAX)',
      departureTime: '16:15',
      arrivalTime: '19:30',
      terminal: 'T3',
      gate: 'B8',
      status: 'delayed',
      statusText: 'DELAYED',
      statusColor: Colors[colorScheme ?? 'light'].warning,
      delay: '45 min',
    },
    {
      id: 3,
      flightNumber: 'LH789',
      airline: 'Lufthansa',
      airlineCode: 'LH',
      destination: 'Frankfurt (FRA)',
      departureTime: '18:00',
      arrivalTime: '21:15',
      terminal: 'T2',
      gate: 'C15',
      status: 'scheduled',
      statusText: 'ON TIME',
      statusColor: Colors[colorScheme ?? 'light'].success,
      delay: null,
    },
    {
      id: 4,
      flightNumber: 'AF234',
      airline: 'Air France',
      airlineCode: 'AF',
      destination: 'Paris (CDG)',
      departureTime: '20:30',
      arrivalTime: '23:45',
      terminal: 'T4',
      gate: 'D3',
      status: 'cancelled',
      statusText: 'CANCELLED',
      statusColor: Colors[colorScheme ?? 'light'].error,
      delay: null,
    },
    {
      id: 5,
      flightNumber: 'EK567',
      airline: 'Emirates',
      airlineCode: 'EK',
      destination: 'Dubai (DXB)',
      departureTime: '22:00',
      arrivalTime: '07:30',
      terminal: 'T3',
      gate: 'A20',
      status: 'scheduled',
      statusText: 'ON TIME',
      statusColor: Colors[colorScheme ?? 'light'].success,
      delay: null,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'boarding':
        return 'airplane';
      case 'delayed':
        return 'time';
      case 'cancelled':
        return 'close-circle';
      default:
        return 'checkmark-circle';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          My Flights
        </Text>
        <TouchableOpacity>
          <Ionicons 
            name="notifications-outline" 
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
          placeholder="Search flights..."
          placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>



      {/* Flight List */}
      <ScrollView style={styles.flightList} showsVerticalScrollIndicator={false}>
        {flights.map((flight) => (
          <View
            key={flight.id}
            style={[styles.flightCard, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}
          >
            {/* Flight Header */}
            <View style={styles.flightHeader}>
              <View style={styles.airlineInfo}>
                <View style={[styles.airlineLogo, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}>
                  <Text style={[styles.airlineCode, { color: Colors[colorScheme ?? 'light'].background }]}>
                    {flight.airlineCode}
                  </Text>
                </View>
                <View style={styles.airlineDetails}>
                  <Text style={[styles.airlineName, { color: Colors[colorScheme ?? 'light'].text }]}>
                    {flight.airline}
                  </Text>
                  <Text style={[styles.flightNumber, { color: Colors[colorScheme ?? 'light'].icon }]}>
                    {flight.flightNumber}
                  </Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: flight.statusColor }]}>
                <Ionicons 
                  name={getStatusIcon(flight.status) as any} 
                  size={12} 
                  color={Colors[colorScheme ?? 'light'].background} 
                />
                <Text style={[styles.statusText, { color: Colors[colorScheme ?? 'light'].background }]}>
                  {flight.statusText}
                </Text>
              </View>
            </View>

            {/* Flight Details */}
            <View style={styles.flightDetails}>
              <View style={styles.routeInfo}>
                <View style={styles.timeInfo}>
                  <Text style={[styles.time, { color: Colors[colorScheme ?? 'light'].text }]}>
                    {flight.departureTime}
                  </Text>
                  <Text style={[styles.timeLabel, { color: Colors[colorScheme ?? 'light'].icon }]}>
                    Departure
                  </Text>
                </View>
                
                <View style={styles.routeLine}>
                  <View style={[styles.routeDot, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]} />
                  <View style={[styles.routePath, { backgroundColor: Colors[colorScheme ?? 'light'].border }]} />
                  <Ionicons 
                    name="airplane" 
                    size={16} 
                    color={Colors[colorScheme ?? 'light'].primary} 
                    style={styles.planeIcon}
                  />
                  <View style={[styles.routeDot, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]} />
                </View>

                <View style={styles.timeInfo}>
                  <Text style={[styles.time, { color: Colors[colorScheme ?? 'light'].text }]}>
                    {flight.arrivalTime}
                  </Text>
                  <Text style={[styles.timeLabel, { color: Colors[colorScheme ?? 'light'].icon }]}>
                    Arrival
                  </Text>
                </View>
              </View>

              <Text style={[styles.destination, { color: Colors[colorScheme ?? 'light'].text }]}>
                {flight.destination}
              </Text>
            </View>

            {/* Flight Info */}
            <View style={styles.flightInfo}>
              <View style={styles.infoItem}>
                <Ionicons name="location" size={16} color={Colors[colorScheme ?? 'light'].icon} />
                <Text style={[styles.infoText, { color: Colors[colorScheme ?? 'light'].text }]}>
                  {flight.terminal} • Gate {flight.gate}
                </Text>
              </View>
              
              {flight.delay && (
                <View style={styles.infoItem}>
                  <Ionicons name="warning" size={16} color={Colors[colorScheme ?? 'light'].warning} />
                  <Text style={[styles.delayText, { color: Colors[colorScheme ?? 'light'].warning }]}>
                    Delayed by {flight.delay}
                  </Text>
                </View>
              )}
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={[styles.actionButton, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
              >
                <Ionicons name="map" size={16} color={Colors[colorScheme ?? 'light'].background} />
                <Text style={[styles.actionButtonText, { color: Colors[colorScheme ?? 'light'].background }]}>
                  View Gate
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, { backgroundColor: Colors[colorScheme ?? 'light'].surface, borderWidth: 1, borderColor: Colors[colorScheme ?? 'light'].border }]}
              >
                <Ionicons name="notifications" size={16} color={Colors[colorScheme ?? 'light'].primary} />
                <Text style={[styles.actionButtonText, { color: Colors[colorScheme ?? 'light'].primary }]}>
                  Track Flight
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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

  flightList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  flightCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  airlineInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  airlineLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  airlineCode: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  airlineDetails: {
    flex: 1,
  },
  airlineName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  flightNumber: {
    fontSize: 14,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  flightDetails: {
    marginBottom: 16,
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeInfo: {
    alignItems: 'center',
    flex: 1,
  },
  time: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  timeLabel: {
    fontSize: 12,
  },
  routeLine: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  routePath: {
    flex: 1,
    height: 2,
    marginHorizontal: 8,
  },
  planeIcon: {
    position: 'absolute',
    transform: [{ rotate: '45deg' }],
  },
  destination: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  flightInfo: {
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 8,
  },
  delayText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
}); 