import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';

import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../../components/AuthModal';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleTabPress = (e: any, route: string) => {
    // Allow access to home tab regardless of auth status
    if (route === 'index') {
      return;
    }
    
    // Check if user is authenticated for other tabs
    if (!user) {
      e.preventDefault();
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].primary,
          tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
          tabBarStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            borderTopColor: Colors[colorScheme ?? 'light'].border,
          },
          headerShown: false,
        }}
        screenListeners={{
          tabPress: (e) => {
            const route = e.target?.split('-')[0] || '';
            handleTabPress(e, route);
          },
        }}
      >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="food"
        options={{
          title: 'Food',
          tabBarIcon: ({ color }) => <TabBarIcon name="restaurant" color={color} />,
        }}
      />
      <Tabs.Screen
        name="shopping"
        options={{
          title: 'Shopping',
          tabBarIcon: ({ color }) => <TabBarIcon name="bag" color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
        }}
      />
      <Tabs.Screen
        name="flights"
        options={{
          title: 'Flights',
          tabBarIcon: ({ color }) => <TabBarIcon name="airplane" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
              />
      </Tabs>
      
      <AuthModal 
        visible={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
}
