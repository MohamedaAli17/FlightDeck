import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { useFlights } from '../contexts/FlightsContext';
import { router } from 'expo-router';

export default function BoardingPassScreen() {
  const colorScheme = useColorScheme();
  const { flights } = useFlights();

  // Default flight info if no user flights
  const defaultFlightInfo = {
    flightNumber: 'DL1234',
    airline: 'Delta Air Lines',
    date: 'December 15, 2024',
    departure: {
      airport: 'ATL',
      city: 'Atlanta',
      time: '10:30 AM',
      gate: 'A12',
    },
    arrival: {
      airport: 'LAX',
      city: 'Los Angeles',
      time: '12:45 PM',
      gate: 'B8',
    },
    passenger: {
      name: 'Mohamed Ali',
      seat: '12A',
      class: 'First Class',
    },
    boardingTime: '10:00 AM',
    status: 'On Time',
  };

  // Use first user flight if available, otherwise use default
  const flightInfo = flights.length > 0 ? {
    flightNumber: flights[0].flightNumber,
    airline: flights[0].airline,
    date: flights[0].travelDate,
    departure: {
      airport: 'ATL',
      city: 'Atlanta',
      time: flights[0].departureTime,
      gate: flights[0].gate,
    },
    arrival: {
      airport: 'LAX',
      city: 'Los Angeles',
      time: '12:45 PM', // This would need to be calculated based on flight duration
      gate: 'B8',
    },
    passenger: {
      name: 'Mohamed Ali',
      seat: '12A',
      class: 'First Class',
    },
    boardingTime: '10:00 AM',
    status: flights[0].status,
  } : defaultFlightInfo;

  const handleDownload = () => {
    Alert.alert('Download', 'Boarding pass downloaded successfully');
  };

  const handleShare = () => {
    Alert.alert('Share', 'Boarding pass shared successfully');
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
          Boarding Pass
        </Text>
        <TouchableOpacity onPress={handleShare}>
          <Ionicons 
            name="share-outline" 
            size={24} 
            color={Colors[colorScheme ?? 'light'].text} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Flight Status */}
        <View style={[styles.statusCard, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
          <View style={styles.statusHeader}>
            <Text style={[styles.airlineName, { color: Colors[colorScheme ?? 'light'].text }]}>
              {flightInfo.airline}
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: '#4CAF50' }]}>
              <Text style={styles.statusText}>{flightInfo.status}</Text>
            </View>
          </View>
          <Text style={[styles.flightNumber, { color: Colors[colorScheme ?? 'light'].text }]}>
            Flight {flightInfo.flightNumber}
          </Text>
          <Text style={[styles.flightDate, { color: Colors[colorScheme ?? 'light'].icon }]}>
            {flightInfo.date}
          </Text>
        </View>

        {/* Route Information */}
        <View style={[styles.routeCard, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
          <View style={styles.routeRow}>
            <View style={styles.airportInfo}>
              <Text style={[styles.airportCode, { color: Colors[colorScheme ?? 'light'].text }]}>
                {flightInfo.departure.airport}
              </Text>
              <Text style={[styles.airportCity, { color: Colors[colorScheme ?? 'light'].icon }]}>
                {flightInfo.departure.city}
              </Text>
              <Text style={[styles.airportTime, { color: Colors[colorScheme ?? 'light'].text }]}>
                {flightInfo.departure.time}
              </Text>
              <Text style={[styles.airportGate, { color: Colors[colorScheme ?? 'light'].icon }]}>
                Gate {flightInfo.departure.gate}
              </Text>
            </View>
            
            <View style={styles.flightPath}>
              <View style={styles.pathLine} />
              <Ionicons name="airplane" size={24} color={Colors[colorScheme ?? 'light'].primary} />
            </View>
            
            <View style={styles.airportInfo}>
              <Text style={[styles.airportCode, { color: Colors[colorScheme ?? 'light'].text }]}>
                {flightInfo.arrival.airport}
              </Text>
              <Text style={[styles.airportCity, { color: Colors[colorScheme ?? 'light'].icon }]}>
                {flightInfo.arrival.city}
              </Text>
              <Text style={[styles.airportTime, { color: Colors[colorScheme ?? 'light'].text }]}>
                {flightInfo.arrival.time}
              </Text>
              <Text style={[styles.airportGate, { color: Colors[colorScheme ?? 'light'].icon }]}>
                Gate {flightInfo.arrival.gate}
              </Text>
            </View>
          </View>
        </View>

        {/* Passenger Information */}
        <View style={[styles.passengerCard, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
          <Text style={[styles.cardTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Passenger Information
          </Text>
          <View style={styles.passengerInfo}>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: Colors[colorScheme ?? 'light'].icon }]}>
                Name:
              </Text>
              <Text style={[styles.infoValue, { color: Colors[colorScheme ?? 'light'].text }]}>
                {flightInfo.passenger.name}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: Colors[colorScheme ?? 'light'].icon }]}>
                Seat:
              </Text>
              <Text style={[styles.infoValue, { color: Colors[colorScheme ?? 'light'].text }]}>
                {flightInfo.passenger.seat}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: Colors[colorScheme ?? 'light'].icon }]}>
                Class:
              </Text>
              <Text style={[styles.infoValue, { color: Colors[colorScheme ?? 'light'].text }]}>
                {flightInfo.passenger.class}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: Colors[colorScheme ?? 'light'].icon }]}>
                Boarding Time:
              </Text>
              <Text style={[styles.infoValue, { color: Colors[colorScheme ?? 'light'].text }]}>
                {flightInfo.boardingTime}
              </Text>
            </View>
          </View>
        </View>

        {/* QR Code Placeholder */}
        <View style={[styles.qrCard, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
          <Text style={[styles.cardTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Boarding Pass QR Code
          </Text>
          <View style={styles.qrContainer}>
            <View style={styles.qrPlaceholder}>
              <Ionicons name="qr-code" size={80} color={Colors[colorScheme ?? 'light'].icon} />
              <Text style={[styles.qrText, { color: Colors[colorScheme ?? 'light'].icon }]}>
                QR Code
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
            onPress={handleDownload}
          >
            <Ionicons name="download" size={20} color={Colors[colorScheme ?? 'light'].background} />
            <Text style={[styles.actionButtonText, { color: Colors[colorScheme ?? 'light'].background }]}>
              Download
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: Colors[colorScheme ?? 'light'].surface, borderWidth: 1, borderColor: Colors[colorScheme ?? 'light'].border }]}
            onPress={handleShare}
          >
            <Ionicons name="share" size={20} color={Colors[colorScheme ?? 'light'].text} />
            <Text style={[styles.actionButtonText, { color: Colors[colorScheme ?? 'light'].text }]}>
              Share
            </Text>
          </TouchableOpacity>
        </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statusCard: {
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
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
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  airlineName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  flightNumber: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  flightDate: {
    fontSize: 14,
  },
  routeCard: {
    padding: 20,
    borderRadius: 16,
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
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  airportInfo: {
    flex: 1,
    alignItems: 'center',
  },
  airportCode: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  airportCity: {
    fontSize: 14,
    marginBottom: 8,
  },
  airportTime: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  airportGate: {
    fontSize: 12,
  },
  flightPath: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  pathLine: {
    width: 60,
    height: 2,
    backgroundColor: '#e0e0e0',
    marginBottom: 8,
  },
  passengerCard: {
    padding: 20,
    borderRadius: 16,
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
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  passengerInfo: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  qrCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  qrContainer: {
    alignItems: 'center',
  },
  qrPlaceholder: {
    alignItems: 'center',
    padding: 40,
  },
  qrText: {
    marginTop: 8,
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
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
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

