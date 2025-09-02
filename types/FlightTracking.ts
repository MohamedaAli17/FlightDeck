export interface FlightTrackingData {
  flightNumber: string;
  airlineCode: string;
  airlineName: string;
  departure: {
    airport: string;
    terminal?: string;
    gate?: string;
    scheduledTime: string;
    actualTime?: string;
    delay?: string;
  };
  arrival: {
    airport: string;
    terminal?: string;
    gate?: string;
    scheduledTime: string;
    actualTime?: string;
    delay?: string;
  };
  status: string;
  aircraft?: {
    registration: string;
    type: string;
  };
  lastUpdated: string;
}

export interface AmadeusTokenResponse {
  type: string;
  username: string;
  application_name: string;
  client_id: string;
  token_type: string;
  access_token: string;
  expires_in: number;
  state: string;
  scope: string;
}

export interface AmadeusFlightStatusResponse {
  meta: {
    count: number;
    links: {
      self: string;
    };
  };
  data: Array<{
    type: string;
    id: string;
    attributes: {
      scheduled_departure: string;
      scheduled_arrival: string;
      actual_departure?: string;
      actual_arrival?: string;
      departure_delay?: string;
      arrival_delay?: string;
      status: string;
      terminal_departure?: string;
      terminal_arrival?: string;
      gate_departure?: string;
      gate_arrival?: string;
      aircraft?: {
        registration: string;
        type: string;
      };
      operating_carrier?: {
        code: string;
        name: string;
      };
      marketing_carrier?: {
        code: string;
        name: string;
      };
    };
    relationships: {
      route: {
        data: {
          id: string;
          type: string;
        };
      };
      origin: {
        data: {
          id: string;
          type: string;
        };
      };
      destination: {
        data: {
          id: string;
          type: string;
        };
      };
    };
  }>;
}
