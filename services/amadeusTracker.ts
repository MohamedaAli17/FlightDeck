import { FlightTrackingData, AmadeusTokenResponse, AmadeusFlightStatusResponse } from '../types/FlightTracking';

// Amadeus API Configuration
const AMADEUS_API_KEY = 'OGi2uqOcywkPAGTwpFIrufvUr55bTcAC';
const AMADEUS_API_SECRET = 'ncbu1E4APZDABN8G';
const AMADEUS_BASE_URL = 'https://test.api.amadeus.com/v1';

/**
 * Amadeus Flight Tracker Class
 * Handles authentication and flight tracking operations
 */
class AmadeusFlightTracker {
  private accessToken: string | null = null;
  private tokenExpiry: number | null = null;

  /**
   * Authenticates with Amadeus API and retrieves bearer token
   */
  async authenticate(): Promise<string> {
    try {
      // Check if we have a valid token
      if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
        return this.accessToken;
      }

      const response = await fetch(`${AMADEUS_BASE_URL}/security/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: AMADEUS_API_KEY,
          client_secret: AMADEUS_API_SECRET,
        }),
      });

      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.status} ${response.statusText}`);
      }

      const data: AmadeusTokenResponse = await response.json();
      
      this.accessToken = data.access_token;
      // Set token expiry (subtract 5 minutes for safety)
      this.tokenExpiry = Date.now() + (data.expires_in - 300) * 1000;
      
      return this.accessToken;
    } catch (error) {
      console.error('Amadeus authentication error:', error);
      throw new Error('Failed to authenticate with Amadeus API');
    }
  }

  /**
   * Fetches flight status/tracking info given an airline code and flight number
   */
  async trackFlight(airlineCode: string, flightNumber: string): Promise<FlightTrackingData | null> {
    try {
      const token = await this.authenticate();
      
      const response = await fetch(
        `${AMADEUS_BASE_URL}/travel/flights?airlineCode=${airlineCode}&flightNumber=${flightNumber}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          return null; // Flight not found
        }
        throw new Error(`Flight tracking failed: ${response.status} ${response.statusText}`);
      }

      const data: AmadeusFlightStatusResponse = await response.json();
      
      if (data.data.length === 0) {
        return null;
      }

      const flight = data.data[0];
      const attributes = flight.attributes;

      // Parse the flight data into our clean format
      const trackingData: FlightTrackingData = {
        flightNumber: `${airlineCode}${flightNumber}`,
        airlineCode: airlineCode,
        airlineName: attributes.operating_carrier?.name || attributes.marketing_carrier?.name || 'Unknown',
        departure: {
          airport: 'Unknown', // Would need additional API call to get airport details
          terminal: attributes.terminal_departure,
          gate: attributes.gate_departure,
          scheduledTime: attributes.scheduled_departure,
          actualTime: attributes.actual_departure,
          delay: attributes.departure_delay,
        },
        arrival: {
          airport: 'Unknown', // Would need additional API call to get airport details
          terminal: attributes.terminal_arrival,
          gate: attributes.gate_arrival,
          scheduledTime: attributes.scheduled_arrival,
          actualTime: attributes.actual_arrival,
          delay: attributes.arrival_delay,
        },
        status: attributes.status,
        aircraft: attributes.aircraft ? {
          registration: attributes.aircraft.registration,
          type: attributes.aircraft.type,
        } : undefined,
        lastUpdated: new Date().toISOString(),
      };

      return trackingData;
    } catch (error) {
      console.error('Flight tracking error:', error);
      throw new Error('Failed to track flight');
    }
  }

  /**
   * Enhanced flight tracking with airport information
   */
  async trackFlightWithAirports(airlineCode: string, flightNumber: string): Promise<FlightTrackingData | null> {
    try {
      const token = await this.authenticate();
      
      // First, get flight status
      const flightResponse = await fetch(
        `${AMADEUS_BASE_URL}/travel/flights?airlineCode=${airlineCode}&flightNumber=${flightNumber}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!flightResponse.ok) {
        if (flightResponse.status === 404) {
          return null;
        }
        throw new Error(`Flight tracking failed: ${flightResponse.status} ${flightResponse.statusText}`);
      }

      const flightData: AmadeusFlightStatusResponse = await flightResponse.json();
      
      if (flightData.data.length === 0) {
        return null;
      }

      const flight = flightData.data[0];
      const attributes = flight.attributes;

      // Get route information to extract airports
      const routeId = flight.relationships.route.data.id;
      const routeResponse = await fetch(
        `${AMADEUS_BASE_URL}/travel/routes/${routeId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      let departureAirport = 'Unknown';
      let arrivalAirport = 'Unknown';

      if (routeResponse.ok) {
        try {
          const routeData = await routeResponse.json();
          if (routeData.data?.attributes) {
            departureAirport = routeData.data.attributes.origin?.name || 'Unknown';
            arrivalAirport = routeData.data.attributes.destination?.name || 'Unknown';
          }
        } catch (routeError) {
          console.warn('Could not parse route data:', routeError);
        }
      }

      const trackingData: FlightTrackingData = {
        flightNumber: `${airlineCode}${flightNumber}`,
        airlineCode: airlineCode,
        airlineName: attributes.operating_carrier?.name || attributes.marketing_carrier?.name || 'Unknown',
        departure: {
          airport: departureAirport,
          terminal: attributes.terminal_departure,
          gate: attributes.gate_departure,
          scheduledTime: attributes.scheduled_departure,
          actualTime: attributes.actual_departure,
          delay: attributes.departure_delay,
        },
        arrival: {
          airport: arrivalAirport,
          terminal: attributes.terminal_arrival,
          gate: attributes.gate_arrival,
          scheduledTime: attributes.scheduled_arrival,
          actualTime: attributes.actual_arrival,
          delay: attributes.arrival_delay,
        },
        status: attributes.status,
        aircraft: attributes.aircraft ? {
          registration: attributes.aircraft.registration,
          type: attributes.aircraft.type,
        } : undefined,
        lastUpdated: new Date().toISOString(),
      };

      return trackingData;
    } catch (error) {
      console.error('Enhanced flight tracking error:', error);
      throw new Error('Failed to track flight with airport information');
    }
  }
}

// Create and export a singleton instance
const amadeusTracker = new AmadeusFlightTracker();

export default amadeusTracker;
export { AmadeusFlightTracker };

// Export convenience functions
export const authenticate = () => amadeusTracker.authenticate();
export const trackFlight = (airlineCode: string, flightNumber: string) => 
  amadeusTracker.trackFlight(airlineCode, flightNumber);
export const trackFlightWithAirports = (airlineCode: string, flightNumber: string) => 
  amadeusTracker.trackFlightWithAirports(airlineCode, flightNumber);
