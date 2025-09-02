import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  travelDate: string;
  departureTime: string;
  gate: string;
  status: string;
  destination: string;
  aircraft: string;
  createdAt: string;
}

interface FlightsContextType {
  flights: Flight[];
  addFlight: (flight: Omit<Flight, 'id' | 'createdAt'>) => Promise<void>;
  removeFlight: (id: string) => Promise<void>;
  clearFlights: () => Promise<void>;
}

const FlightsContext = createContext<FlightsContextType | undefined>(undefined);

export const useFlights = () => {
  const context = useContext(FlightsContext);
  if (!context) {
    throw new Error('useFlights must be used within a FlightsProvider');
  }
  return context;
};

interface FlightsProviderProps {
  children: React.ReactNode;
}

export const FlightsProvider: React.FC<FlightsProviderProps> = ({ children }) => {
  const [flights, setFlights] = useState<Flight[]>([]);

  // Load flights from AsyncStorage on mount
  useEffect(() => {
    loadFlights();
  }, []);

  const loadFlights = async () => {
    try {
      const storedFlights = await AsyncStorage.getItem('userFlights');
      if (storedFlights) {
        setFlights(JSON.parse(storedFlights));
      }
    } catch (error) {
      console.error('Error loading flights:', error);
    }
  };

  const saveFlights = async (newFlights: Flight[]) => {
    try {
      await AsyncStorage.setItem('userFlights', JSON.stringify(newFlights));
    } catch (error) {
      console.error('Error saving flights:', error);
    }
  };

  const addFlight = async (flightData: Omit<Flight, 'id' | 'createdAt'>) => {
    const newFlight: Flight = {
      ...flightData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    const updatedFlights = [...flights, newFlight];
    setFlights(updatedFlights);
    await saveFlights(updatedFlights);
  };

  const removeFlight = async (id: string) => {
    const updatedFlights = flights.filter(flight => flight.id !== id);
    setFlights(updatedFlights);
    await saveFlights(updatedFlights);
  };

  const clearFlights = async () => {
    setFlights([]);
    await AsyncStorage.removeItem('userFlights');
  };

  const value: FlightsContextType = {
    flights,
    addFlight,
    removeFlight,
    clearFlights,
  };

  return (
    <FlightsContext.Provider value={value}>
      {children}
    </FlightsContext.Provider>
  );
};
