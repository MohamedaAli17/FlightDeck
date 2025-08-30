# FlightDeck - Airport Companion App

A modern, sleek mobile application designed to enhance the airport experience by providing food, shopping, and activity recommendations inside airports.

## Features

### 🏠 Home Screen (Main Dashboard)
- **Search Bar**: Search for food, shops, or activities
- **Airport Info**: Current airport and terminal information
- **Quick Navigation**: Four main tiles for Food, Shopping, Activities, and My Flights
- **Top Picks**: AI-driven recommendations based on user preferences
- **Limited Time Deals**: Time-sensitive offers and promotions

### 🍽️ Food & Restaurant Features
- **Restaurant List**: Browse all dining options with filters
- **Detailed Restaurant Pages**: Menu, reviews, hours, and location
- **Pre-order System**: Order food before arriving at the restaurant
- **Cuisine Filters**: Filter by cuisine type, price, distance, and rating
- **Recommendations**: Personalized suggestions based on preferences

### 🛍️ Shopping Features
- **Shop Directory**: Browse retail stores and duty-free shops
- **Category Filters**: Filter by duty-free, fashion, electronics, gifts
- **Special Offers**: View current promotions and deals
- **Location Information**: Terminal and gate locations for each shop

### 🗺️ Interactive Airport Map
- **Terminal Overview**: Visual representation of all terminals
- **User Location**: Real-time location tracking with blue dot
- **Walking Paths**: Highlighted routes with estimated walk times
- **Quick Actions**: Direct access to food ordering, lounges, ATMs, etc.
- **Nearby Places**: List of closest amenities and services

### ✈️ Flight Management
- **My Flights**: View all upcoming and past flights
- **Flight Status**: Real-time updates on delays, cancellations, and boarding
- **Gate Information**: Terminal and gate details with navigation
- **Flight Tracking**: Track flight progress and receive notifications
- **Boarding Pass**: Digital boarding pass integration

### 👤 Profile & Settings
- **User Profile**: Personal information and preferences
- **Flight Alerts**: Customizable notification settings
- **Food Preferences**: Dietary restrictions and cuisine preferences
- **Budget Settings**: Set spending limits for recommendations
- **Theme Toggle**: Light/dark mode support
- **Language Settings**: Multi-language support

## Design System

### Colors
- **Primary**: Navy Blue (`#1a365d`)
- **Accent**: Yellow (`#f6ad55`) / Orange (`#ed8936`)
- **Background**: White (Light) / Dark Gray (Dark)
- **Surface**: Light Gray (Light) / Medium Gray (Dark)

### Typography
- **Font Family**: System (Rounded, modern sans-serif)
- **Weights**: Regular, Medium, Semi-Bold, Bold
- **Sizes**: 12px to 32px scale

### Icons
- **Icon Library**: Ionicons
- **Style**: Simple, recognizable line icons
- **Consistency**: Uniform stroke width and style

## Technology Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **Icons**: @expo/vector-icons (Ionicons)
- **Styling**: React Native StyleSheet
- **Animations**: React Native Animated API
- **Blur Effects**: expo-blur

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-FlightDeck
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your device

### Project Structure

```
my-FlightDeck/
├── app/                    # Main app screens
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home screen
│   │   ├── food.tsx       # Food & restaurants
│   │   ├── shopping.tsx   # Shopping
│   │   ├── map.tsx        # Airport map
│   │   ├── flights.tsx    # My flights
│   │   └── profile.tsx    # Profile & settings
│   ├── restaurant-detail.tsx  # Restaurant detail page
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
│   └── SplashScreen.tsx   # App splash screen
├── constants/             # App constants
│   └── Colors.ts         # Color scheme
├── hooks/                # Custom hooks
└── assets/               # Images, fonts, etc.
```

## Key Features Implementation

### Responsive Design
- Adaptive layouts for different screen sizes
- Safe area handling for notches and home indicators
- Proper spacing and typography scaling

### Dark Mode Support
- Complete dark/light theme implementation
- Automatic system theme detection
- Manual theme toggle in settings

### Accessibility
- Proper contrast ratios
- Screen reader support
- Touch target sizes (44px minimum)

### Performance
- Optimized image loading
- Efficient list rendering
- Smooth animations and transitions

## Future Enhancements

- **Real-time Data**: Integration with airport APIs for live information
- **Push Notifications**: Flight updates and personalized recommendations
- **Offline Support**: Cached data for offline usage
- **Multi-language**: Internationalization support
- **AR Navigation**: Augmented reality wayfinding
- **Social Features**: Share experiences and recommendations
- **Loyalty Integration**: Airline and airport loyalty programs

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the repository or contact the development team.
