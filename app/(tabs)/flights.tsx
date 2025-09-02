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
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useFlights } from '../../contexts/FlightsContext';
import amadeusTracker from '../../services/amadeusTracker';
import { FlightTrackingData } from '../../types/FlightTracking';

export default function FlightsScreen() {
  const colorScheme = useColorScheme();
  const { flights: userFlights } = useFlights();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Flight tracking state
  const [trackingFlight, setTrackingFlight] = useState<FlightTrackingData | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [trackingError, setTrackingError] = useState<string | null>(null);
  const [airlineCode, setAirlineCode] = useState('');
  const [flightNumber, setFlightNumber] = useState('');

  // Flight tracking functions
  const handleTrackFlight = async () => {
    if (!airlineCode.trim() || !flightNumber.trim()) {
      Alert.alert('Error', 'Please enter both airline code and flight number');
      return;
    }

    setIsTracking(true);
    setTrackingError(null);
    setTrackingFlight(null);

    try {
      console.log('Attempting to track flight:', airlineCode.trim().toUpperCase(), flightNumber.trim());
      
      const flightData = await amadeusTracker.trackFlightWithAirports(
        airlineCode.trim().toUpperCase(),
        flightNumber.trim()
      );
      
      console.log('Flight tracking response:', flightData);
      
      if (flightData) {
        setTrackingFlight(flightData);
        Alert.alert('Success', 'Flight tracked successfully!');
      } else {
        setTrackingError('Flight not found. Please check the airline code and flight number.');
      }
    } catch (error) {
      console.error('Flight tracking error details:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setTrackingError(`Failed to track flight: ${errorMessage}`);
      Alert.alert('Error', `Failed to track flight: ${errorMessage}`);
    } finally {
      setIsTracking(false);
    }
  };

  const clearTracking = () => {
    setTrackingFlight(null);
    setTrackingError(null);
    setAirlineCode('');
    setFlightNumber('');
  };

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'on-time':
        return Colors[colorScheme ?? 'light'].success;
      case 'delayed':
        return Colors[colorScheme ?? 'light'].warning;
      case 'boarding':
        return Colors[colorScheme ?? 'light'].primary;
      case 'cancelled':
        return Colors[colorScheme ?? 'light'].error;
      default:
        return Colors[colorScheme ?? 'light'].success;
    }
  };

  // Helper function to calculate arrival time
  const calculateArrivalTime = (departureTime: string) => {
    // Simple calculation: add 2 hours to departure time
    const [hours, minutes] = departureTime.split(':');
    const departureDate = new Date();
    departureDate.setHours(parseInt(hours), parseInt(minutes));
    departureDate.setHours(departureDate.getHours() + 2);
    return departureDate.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Sample flights for demonstration (these would typically come from an API)
  const sampleFlights = [
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

      {/* Flight Tracking Section */}
      <View style={[styles.trackingSection, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
        <Text style={[styles.trackingTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Track Your Flight
        </Text>
        <View style={styles.trackingInputContainer}>
          <TextInput
            style={[styles.trackingInput, { color: Colors[colorScheme ?? 'light'].text }]}
            placeholder="Airline Code (e.g., BA, AA)"
            placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
            value={airlineCode}
            onChangeText={setAirlineCode}
          />
          <TextInput
            style={[styles.trackingInput, { color: Colors[colorScheme ?? 'light'].text }]}
            placeholder="Flight Number (e.g., 123, 456)"
            placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
            value={flightNumber}
            onChangeText={setFlightNumber}
          />
        </View>
        {trackingError && (
          <Text style={[styles.trackingError, { color: Colors[colorScheme ?? 'light'].error }]}>
            {trackingError}
          </Text>
        )}
        <TouchableOpacity 
          style={[styles.trackButton, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
          onPress={handleTrackFlight}
          disabled={isTracking}
        >
          <Text style={[styles.trackButtonText, { color: Colors[colorScheme ?? 'light'].background }]}>
            {isTracking ? 'Tracking...' : 'Track Flight'}
          </Text>
        </TouchableOpacity>
        {trackingFlight && (
          <View style={styles.trackingResult}>
            <Text style={[styles.trackingResultTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
              Tracking Result:
            </Text>
            <Text style={[styles.trackingResultText, { color: Colors[colorScheme ?? 'light'].text }]}>
              Flight: {trackingFlight.flightNumber}
            </Text>
            <Text style={[styles.trackingResultText, { color: Colors[colorScheme ?? 'light'].text }]}>
              Status: {trackingFlight.status}
            </Text>
            <Text style={[styles.trackingResultText, { color: Colors[colorScheme ?? 'light'].text }]}>
              Departure: {trackingFlight.departure.airport}
            </Text>
            <Text style={[styles.trackingResultText, { color: Colors[colorScheme ?? 'light'].text }]}>
              Arrival: {trackingFlight.arrival.airport}
            </Text>
            <TouchableOpacity 
              style={[styles.clearTrackingButton, { backgroundColor: Colors[colorScheme ?? 'light'].surface, borderWidth: 1, borderColor: Colors[colorScheme ?? 'light'].border }]}
              onPress={clearTracking}
            >
              <Text style={[styles.clearTrackingButtonText, { color: Colors[colorScheme ?? 'light'].primary }]}>
                Clear Tracking
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* User Flights Section */}
      {userFlights.length > 0 && (
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Your Flights
          </Text>
        </View>
      )}
      
      {userFlights.map((flight) => (
        <View
          key={flight.id}
          style={[styles.flightCard, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}
        >
          {/* Flight Header */}
          <View style={styles.flightHeader}>
            <View style={styles.airlineInfo}>
              <View style={[styles.airlineLogo, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}>
                <Text style={[styles.airlineCode, { color: Colors[colorScheme ?? 'light'].background }]}>
                  {flight.airline.substring(0, 2).toUpperCase()}
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
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(flight.status) }]}>
              <Ionicons 
                name="airplane" 
                size={12} 
                color={Colors[colorScheme ?? 'light'].background} 
              />
              <Text style={[styles.statusText, { color: Colors[colorScheme ?? 'light'].background }]}>
                {flight.status.toUpperCase()}
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
                  {/* Calculate arrival time based on departure + estimated duration */}
                  {calculateArrivalTime(flight.departureTime)}
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
                Gate {flight.gate}
              </Text>
            </View>
            
            <View style={styles.infoItem}>
              <Ionicons name="calendar" size={16} color={Colors[colorScheme ?? 'light'].icon} />
              <Text style={[styles.infoText, { color: Colors[colorScheme ?? 'light'].text }]}>
                {flight.travelDate}
              </Text>
            </View>
          </View>
        </View>
      ))}

      {/* Sample Flights Section */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          All Flights
        </Text>
      </View>

      {/* Flight List */}
      <ScrollView style={styles.flightList} showsVerticalScrollIndicator={false}>
        {sampleFlights.map((flight) => (
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
  sectionHeader: {
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  trackingSection: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
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
  trackingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  trackingInputContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  trackingInput: {
    flex: 1,
    fontSize: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  trackingError: {
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  trackButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  trackingResult: {
    marginTop: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  trackingResultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  trackingResultText: {
    fontSize: 14,
    marginBottom: 4,
  },
  clearTrackingButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearTrackingButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
}); 