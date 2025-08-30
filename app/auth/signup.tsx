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

export default function SignUpScreen() {
  const colorScheme = useColorScheme();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password);
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
              Create Account
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
              Join us for seamless travel experiences
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

            <View style={[styles.inputContainer, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
              <Ionicons 
                name="lock-closed" 
                size={20} 
                color={Colors[colorScheme ?? 'light'].icon} 
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
                placeholder="Confirm Password"
                placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons 
                  name={showConfirmPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color={Colors[colorScheme ?? 'light'].icon} 
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={[
                styles.signUpButton, 
                { 
                  backgroundColor: loading ? Colors[colorScheme ?? 'light'].icon : Colors[colorScheme ?? 'light'].primary 
                }
              ]}
              onPress={handleSignUp}
              disabled={loading}
            >
              <Text style={[styles.signUpButtonText, { color: Colors[colorScheme ?? 'light'].background }]}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Link */}
          <View style={styles.signInContainer}>
            <Text style={[styles.signInText, { color: Colors[colorScheme ?? 'light'].icon }]}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.push('/auth/signin' as any)}>
              <Text style={[styles.signInLink, { color: Colors[colorScheme ?? 'light'].primary }]}>
                Sign In
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
  signUpButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontSize: 16,
  },
  signInLink: {
    fontSize: 16,
    fontWeight: '600',
  },
});
