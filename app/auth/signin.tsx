import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useAuth } from '../../contexts/AuthContext';
import { router } from 'expo-router';

export default function SignInScreen() {
  const colorScheme = useColorScheme();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
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
              Welcome Back
            </Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Logo/Icon */}
          <View style={styles.logoContainer}>
            <View style={[styles.logo, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}>
              <Ionicons name="airplane" size={48} color={Colors[colorScheme ?? 'light'].background} />
            </View>
            <Text style={[styles.appName, { color: Colors[colorScheme ?? 'light'].text }]}>
              FlightDeck
            </Text>
            <Text style={[styles.subtitle, { color: Colors[colorScheme ?? 'light'].icon }]}>
              Sign in to continue your journey
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={[styles.inputContainer, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
              <Ionicons 
                name="mail" 
                size={20} 
                color={Colors[colorScheme ?? 'light'].icon} 
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
                placeholder="Email"
                placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={[styles.inputContainer, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
              <Ionicons 
                name="lock-closed" 
                size={20} 
                color={Colors[colorScheme ?? 'light'].icon} 
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
                placeholder="Password"
                placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons 
                  name={showPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color={Colors[colorScheme ?? 'light'].icon} 
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={[
                styles.signInButton, 
                { 
                  backgroundColor: loading ? Colors[colorScheme ?? 'light'].icon : Colors[colorScheme ?? 'light'].primary 
                }
              ]}
              onPress={handleSignIn}
              disabled={loading}
            >
              <Text style={[styles.signInButtonText, { color: Colors[colorScheme ?? 'light'].background }]}>
                {loading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={[styles.signUpText, { color: Colors[colorScheme ?? 'light'].icon }]}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.push('/auth/signup' as any)}>
              <Text style={[styles.signUpLink, { color: Colors[colorScheme ?? 'light'].primary }]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  signInButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 16,
  },
  signUpLink: {
    fontSize: 16,
    fontWeight: '600',
  },
});
