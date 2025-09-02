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
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useAuth } from '../../contexts/AuthContext';
import { useFlights } from '../../contexts/FlightsContext';
import { router } from 'expo-router';
import AuthModal from '../../components/AuthModal';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const { user } = useAuth();
  const { flights, addFlight, removeFlight } = useFlights();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showFlightModal, setShowFlightModal] = useState(false);
  const [airline, setAirline] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [showAirlineDropdown, setShowAirlineDropdown] = useState(false);

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
      route: '/restaurant-detail',
      routeParams: { id: '6' },
    },
    {
      id: 2,
      name: 'Brookstone',
      type: 'Shopping',
      rating: 4.2,
      distance: '5 min walk',
      image: '🛒',
      route: '/shopping',
      routeParams: {id: 5},
    },
    {
      id: 3,
      name: 'Airport Lounge',
      type: 'Relaxation',
      rating: 4.8,
      distance: '8 min walk',
      image: '🛋️',
      route: '/activities',
      routeParams: null,
    },
  ];

  const deals = [
    { id: 1, title: '20% off at Starbucks', timeLeft: '2h 15m' },
    { id: 2, title: 'Free WiFi upgrade', timeLeft: '1h 30m' },
    { id: 3, title: 'Priority boarding', timeLeft: '45m' },
  ];

  const airlines = [
    'Delta Air Lines',
    'United Airlines',
    'American Airlines',
    'Southwest Airlines',
    'JetBlue Airways',
    'Alaska Airlines',
    'Spirit Airlines',
    'Frontier Airlines',
    'Hawaiian Airlines',
    'Allegiant Air'
  ];

  const handleQuickNavPress = (route: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    router.push(route as any);
  };

  const handleAddFlight = async () => {
    if (!airline || !flightNumber || !travelDate) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      return;
    }

    // Create flight data
    const flightData = {
      airline,
      flightNumber,
      travelDate,
      departureTime: '10:30 AM',
      gate: 'A12',
      status: 'On-Time',
      destination: 'New York (JFK)',
      aircraft: 'Boeing 737-800'
    };

    try {
      await addFlight(flightData);
      setShowFlightModal(false);
      setAirline('');
      setFlightNumber('');
      setTravelDate('');
      setShowAirlineDropdown(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to add flight. Please try again.');
    }
  };

  const handleAirlineChange = (text: string) => {
    setAirline(text);
    setShowAirlineDropdown(text.length > 0);
  };

  const handleAirlineSelect = (selectedAirline: string) => {
    setAirline(selectedAirline);
    setShowAirlineDropdown(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On-Time':
        return '#4CAF50';
      case 'Delayed':
        return '#FF9800';
      case 'Boarding':
        return '#2196F3';
      case 'Cancelled':
        return '#F44336';
      default:
        return Colors[colorScheme ?? 'light'].text;
    }
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

        {/* Add Your Flight Section */}
        <View style={styles.flightSection}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Flight Tracking
          </Text>
          
          {flights.length === 0 ? (
            <TouchableOpacity
              style={[styles.addFlightCard, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
              onPress={() => {
                if (!user) {
                  setShowAuthModal(true);
                } else {
                  setShowFlightModal(true);
                }
              }}
            >
              <Text style={styles.addFlightIcon}>✈️</Text>
              <Text style={[styles.addFlightTitle, { color: Colors[colorScheme ?? 'light'].background }]}>
                Add Your Flight
              </Text>
              <Text style={[styles.addFlightSubtitle, { color: Colors[colorScheme ?? 'light'].background }]}>
                Track departure time, gate & status
              </Text>
            </TouchableOpacity>
          ) : (
            flights.map((flight) => (
              <View key={flight.id} style={[styles.flightInfoCard, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
                <View style={styles.flightHeader}>
                  <Text style={[styles.flightNumber, { color: Colors[colorScheme ?? 'light'].text }]}>
                    {flight.airline} {flight.flightNumber}
                  </Text>
                  <TouchableOpacity
                    onPress={() => removeFlight(flight.id)}
                    style={styles.removeFlightButton}
                  >
                    <Ionicons name="close-circle" size={24} color={Colors[colorScheme ?? 'light'].icon} />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.flightDetails}>
                  <View style={styles.flightDetailRow}>
                    <Ionicons name="time-outline" size={16} color={Colors[colorScheme ?? 'light'].icon} />
                    <Text style={[styles.flightDetailText, { color: Colors[colorScheme ?? 'light'].text }]}>
                      Departure: {flight.departureTime}
                    </Text>
                  </View>
                  
                  <View style={styles.flightDetailRow}>
                    <Ionicons name="location-outline" size={16} color={Colors[colorScheme ?? 'light'].icon} />
                    <Text style={[styles.flightDetailText, { color: Colors[colorScheme ?? 'light'].text }]}>
                      Gate: {flight.gate}
                    </Text>
                  </View>
                  
                  <View style={styles.flightDetailRow}>
                    <Ionicons name="airplane-outline" size={16} color={Colors[colorScheme ?? 'light'].icon} />
                    <Text style={[styles.flightDetailText, { color: Colors[colorScheme ?? 'light'].text }]}>
                      To: {flight.destination}
                    </Text>
                  </View>
                  
                  <View style={styles.flightDetailRow}>
                    <Ionicons name="information-circle-outline" size={16} color={Colors[colorScheme ?? 'light'].icon} />
                    <Text style={[styles.flightDetailText, { color: getStatusColor(flight.status) }]}>
                      Status: {flight.status}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          )}
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
                  } else {
                    if (item.routeParams) {
                      router.push({
                        pathname: item.route,
                        params: item.routeParams
                      } as any);
                    } else {
                      router.push(item.route as any);
                    }
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

      {/* Flight Modal */}
      <Modal
        visible={showFlightModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFlightModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                Add Your Flight
              </Text>
              <TouchableOpacity
                onPress={() => setShowFlightModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={Colors[colorScheme ?? 'light'].text} />
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              {/* Airline Selection */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Airline
                </Text>
                <View style={[styles.dropdownContainer, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
                  <TextInput
                    style={[styles.dropdownInput, { color: Colors[colorScheme ?? 'light'].text }]}
                    placeholder="Select airline..."
                    placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
                    value={airline}
                    onChangeText={handleAirlineChange}
                  />
                  <TouchableOpacity 
                    style={styles.dropdownButton}
                    onPress={() => setShowAirlineDropdown(!showAirlineDropdown)}
                  >
                    <Ionicons 
                      name={showAirlineDropdown ? "chevron-up" : "chevron-down"} 
                      size={20} 
                      color={Colors[colorScheme ?? 'light'].icon} 
                    />
                  </TouchableOpacity>
                </View>
                {showAirlineDropdown && (
                  <ScrollView style={styles.dropdownList} nestedScrollEnabled>
                    {airlines
                      .filter(a => a.toLowerCase().includes(airline.toLowerCase()))
                      .map((airlineOption, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[styles.dropdownItem, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}
                          onPress={() => handleAirlineSelect(airlineOption)}
                        >
                          <Text style={[styles.dropdownItemText, { color: Colors[colorScheme ?? 'light'].text }]}>
                            {airlineOption}
                          </Text>
                        </TouchableOpacity>
                      ))}
                  </ScrollView>
                )}
              </View>

              {/* Flight Number */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Flight Number
                </Text>
                <TextInput
                  style={[styles.textInput, { backgroundColor: Colors[colorScheme ?? 'light'].surface, color: Colors[colorScheme ?? 'light'].text }]}
                  placeholder="e.g., DL105"
                  placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
                  value={flightNumber}
                  onChangeText={setFlightNumber}
                  autoCapitalize="characters"
                />
              </View>

              {/* Date of Travel */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Date of Travel
                </Text>
                <TextInput
                  style={[styles.textInput, { backgroundColor: Colors[colorScheme ?? 'light'].surface, color: Colors[colorScheme ?? 'light'].text }]}
                  placeholder="MM/DD/YYYY"
                  placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
                  value={travelDate}
                  onChangeText={setTravelDate}
                />
              </View>

              <TouchableOpacity
                style={[styles.submitButton, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
                onPress={handleAddFlight}
              >
                <Text style={[styles.submitButtonText, { color: Colors[colorScheme ?? 'light'].background }]}>
                  Track Flight
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  // Flight Section Styles
  flightSection: {
    marginBottom: 32,
  },
  addFlightCard: {
    padding: 20,
    borderRadius: 16,
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
  addFlightIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  addFlightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  addFlightSubtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  flightInfoCard: {
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
  flightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  flightNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  removeFlightButton: {
    padding: 4,
  },
  flightDetails: {
    gap: 8,
  },
  flightDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flightDetailText: {
    fontSize: 14,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  formContainer: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dropdownInput: {
    flex: 1,
    fontSize: 16,
  },
  dropdownButton: {
    padding: 4,
  },
  dropdownList: {
    maxHeight: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  textInput: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
