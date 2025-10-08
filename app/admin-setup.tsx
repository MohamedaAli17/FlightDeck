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
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { createFirstAdmin, promoteUserToAdmin } from '../utils/adminUtils';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { router } from 'expo-router';

export default function AdminSetup() {
  const colorScheme = useColorScheme() ?? 'light';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [setupMethod, setSetupMethod] = useState<'create' | 'promote'>('create');

  const handleCreateAdmin = async () => {
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
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create admin user document
      await createFirstAdmin(email, password);
      
      Alert.alert(
        'Admin Created Successfully!',
        'The admin user has been created. You can now access the admin dashboard.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(tabs)')
          }
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePromoteUser = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter the user email');
      return;
    }

    setLoading(true);
    try {
      const success = await promoteUserToAdmin(email);
      if (success) {
        Alert.alert(
          'User Promoted Successfully!',
          `${email} has been promoted to admin.`,
          [
            {
              text: 'OK',
              onPress: () => router.replace('/(tabs)')
            }
          ]
        );
      } else {
        Alert.alert('Error', 'Failed to promote user. Make sure the user exists.');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.logo, { backgroundColor: Colors[colorScheme].primary }]}>
              <Ionicons name="shield-checkmark" size={48} color={Colors[colorScheme].background} />
            </View>
            <Text style={[styles.headerTitle, { color: Colors[colorScheme].text }]}>
              Admin Setup
            </Text>
            <Text style={[styles.headerSubtitle, { color: Colors[colorScheme].icon }]}>
              Create your first admin user
            </Text>
          </View>

          {/* Setup Method Toggle */}
          <View style={styles.methodToggle}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                {
                  backgroundColor: setupMethod === 'create'
                    ? Colors[colorScheme].primary
                    : Colors[colorScheme].surface
                }
              ]}
              onPress={() => setSetupMethod('create')}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  {
                    color: setupMethod === 'create'
                      ? Colors[colorScheme].background
                      : Colors[colorScheme].text
                  }
                ]}
              >
                Create New Admin
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                {
                  backgroundColor: setupMethod === 'promote'
                    ? Colors[colorScheme].primary
                    : Colors[colorScheme].surface
                }
              ]}
              onPress={() => setSetupMethod('promote')}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  {
                    color: setupMethod === 'promote'
                      ? Colors[colorScheme].background
                      : Colors[colorScheme].text
                  }
                ]}
              >
                Promote Existing User
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={[styles.inputContainer, { backgroundColor: Colors[colorScheme].surface }]}>
              <Ionicons 
                name="mail" 
                size={20} 
                color={Colors[colorScheme].icon} 
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: Colors[colorScheme].text }]}
                placeholder="Admin Email"
                placeholderTextColor={Colors[colorScheme].icon}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {setupMethod === 'create' && (
              <>
                <View style={[styles.inputContainer, { backgroundColor: Colors[colorScheme].surface }]}>
                  <Ionicons 
                    name="lock-closed" 
                    size={20} 
                    color={Colors[colorScheme].icon} 
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { color: Colors[colorScheme].text }]}
                    placeholder="Password"
                    placeholderTextColor={Colors[colorScheme].icon}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                </View>

                <View style={[styles.inputContainer, { backgroundColor: Colors[colorScheme].surface }]}>
                  <Ionicons 
                    name="lock-closed" 
                    size={20} 
                    color={Colors[colorScheme].icon} 
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { color: Colors[colorScheme].text }]}
                    placeholder="Confirm Password"
                    placeholderTextColor={Colors[colorScheme].icon}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                </View>
              </>
            )}

            <TouchableOpacity 
              style={[
                styles.setupButton, 
                { 
                  backgroundColor: loading ? Colors[colorScheme].icon : Colors[colorScheme].primary 
                }
              ]}
              onPress={setupMethod === 'create' ? handleCreateAdmin : handlePromoteUser}
              disabled={loading}
            >
              <Text style={[styles.setupButtonText, { color: Colors[colorScheme].background }]}>
                {loading 
                  ? (setupMethod === 'create' ? 'Creating Admin...' : 'Promoting User...') 
                  : (setupMethod === 'create' ? 'Create Admin' : 'Promote User')
                }
              </Text>
            </TouchableOpacity>
          </View>

          {/* Instructions */}
          <View style={styles.instructions}>
            <Text style={[styles.instructionsTitle, { color: Colors[colorScheme].text }]}>
              Setup Instructions:
            </Text>
            <Text style={[styles.instructionsText, { color: Colors[colorScheme].icon }]}>
              {setupMethod === 'create' 
                ? '• This will create a new admin user account\n• The user will have full admin privileges\n• Make sure to use a secure email and password'
                : '• Enter the email of an existing user\n• The user will be promoted to admin role\n• Make sure the user has already signed up'
              }
            </Text>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  methodToggle: {
    flexDirection: 'row',
    marginBottom: 30,
    borderRadius: 12,
    overflow: 'hidden',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: '600',
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
  setupButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  setupButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  instructions: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

