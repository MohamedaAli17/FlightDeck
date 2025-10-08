import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { useAuth } from '../contexts/AuthContext';
import { router } from 'expo-router';

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AuthModal({ visible, onClose }: AuthModalProps) {
  const colorScheme = useColorScheme();
  const { signInWithGoogle } = useAuth();
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSignUp = () => {
    onClose();
    router.push('/auth/signup' as any);
  };

  const handleSignIn = () => {
    onClose();
    router.push('/auth/signin' as any);
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      onClose();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
          <SafeAreaView style={styles.content}>
            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons 
                name="close" 
                size={24} 
                color={Colors[colorScheme ?? 'light'].text} 
              />
            </TouchableOpacity>

            {/* Icon */}
            <View style={[styles.iconContainer, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
              <Ionicons 
                name="lock-closed" 
                size={48} 
                color={Colors[colorScheme ?? 'light'].primary} 
              />
            </View>

            {/* Title */}
            <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
              Authentication Required
            </Text>

            {/* Message */}
            <Text style={[styles.message, { color: Colors[colorScheme ?? 'light'].icon }]}>
              Please create an account or sign in to continue.
            </Text>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.signUpButton, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
                onPress={handleSignUp}
              >
                <Text style={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].background }]}>
                  Sign Up
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.button, styles.signInButton, { backgroundColor: Colors[colorScheme ?? 'light'].surface, borderColor: Colors[colorScheme ?? 'light'].primary }]}
                onPress={handleSignIn}
              >
                <Text style={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].primary }]}>
                  Sign In
                </Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={[styles.dividerLine, { backgroundColor: Colors[colorScheme ?? 'light'].border }]} />
                <Text style={[styles.dividerText, { color: Colors[colorScheme ?? 'light'].icon }]}>OR</Text>
                <View style={[styles.dividerLine, { backgroundColor: Colors[colorScheme ?? 'light'].border }]} />
              </View>

              {/* Google Sign-In Button */}
              <TouchableOpacity 
                style={[
                  styles.googleButton, 
                  { 
                    backgroundColor: Colors[colorScheme ?? 'light'].surface,
                    borderColor: Colors[colorScheme ?? 'light'].border
                  }
                ]}
                onPress={handleGoogleSignIn}
                disabled={googleLoading}
              >
                <Ionicons 
                  name="logo-google" 
                  size={20} 
                  color="#DB4437" 
                  style={styles.googleIcon}
                />
                <Text style={[styles.googleButtonText, { color: Colors[colorScheme ?? 'light'].text }]}>
                  {googleLoading ? 'Signing In...' : 'Continue with Google'}
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    maxWidth: 400,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    padding: 4,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
  },
  signUpButton: {
    borderColor: 'transparent',
  },
  signInButton: {
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontWeight: '500',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  googleIcon: {
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

