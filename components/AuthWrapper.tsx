import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { router } from 'expo-router';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { user, loading } = useAuth();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // User is not authenticated, redirect to sign in
        router.replace('/auth/signin' as any);
      } else {
        // User is authenticated, redirect to main app
        router.replace('/(tabs)' as any);
      }
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={[
        { 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center',
          backgroundColor: Colors[colorScheme ?? 'light'].background 
        }
      ]}>
        <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].primary} />
      </View>
    );
  }

  return <>{children}</>;
}

