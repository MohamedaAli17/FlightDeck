import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { router } from 'expo-router';

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AuthModal({ visible, onClose }: AuthModalProps) {
  const colorScheme = useColorScheme();

  const handleSignUp = () => {
    onClose();
    router.push('/auth/signup' as any);
  };

  const handleSignIn = () => {
    onClose();
    router.push('/auth/signin' as any);
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
});

