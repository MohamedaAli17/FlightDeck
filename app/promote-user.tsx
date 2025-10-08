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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { promoteUserToAdmin } from '../utils/adminUtils';
import { router } from 'expo-router';

export default function PromoteUser() {
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState('mohamedali0209@outlook.com');
  const [loading, setLoading] = useState(false);

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
          `${email} has been promoted to admin. They can now access the admin dashboard.`,
          [
            {
              text: 'OK',
              onPress: () => router.replace('/(tabs)')
            }
          ]
        );
      } else {
        Alert.alert('Error', 'Failed to promote user. Make sure the user exists in the database.');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.logo, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}>
            <Ionicons name="shield-checkmark" size={48} color={Colors[colorScheme ?? 'light'].background} />
          </View>
          <Text style={[styles.headerTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Promote User to Admin
          </Text>
          <Text style={[styles.headerSubtitle, { color: Colors[colorScheme ?? 'light'].icon }]}>
            Grant admin access to a user
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
              placeholder="User Email"
              placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity 
            style={[
              styles.promoteButton, 
              { 
                backgroundColor: loading ? Colors[colorScheme ?? 'light'].icon : Colors[colorScheme ?? 'light'].primary 
              }
            ]}
            onPress={handlePromoteUser}
            disabled={loading}
          >
            <Text style={[styles.promoteButtonText, { color: Colors[colorScheme ?? 'light'].background }]}>
              {loading ? 'Promoting User...' : 'Promote to Admin'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Instructions */}
        <View style={[styles.instructions, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
          <Text style={[styles.instructionsTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Instructions:
          </Text>
          <Text style={[styles.instructionsText, { color: Colors[colorScheme ?? 'light'].icon }]}>
            • The user must have already signed up through the app{'\n'}
            • This will grant them full admin privileges{'\n'}
            • They will see the Admin tab in the bottom navigation{'\n'}
            • They can access all admin features immediately
          </Text>
        </View>

        {/* Quick Action */}
        <TouchableOpacity 
          style={[styles.quickAction, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
          onPress={() => {
            setEmail('mohamedali0209@outlook.com');
            handlePromoteUser();
          }}
          disabled={loading}
        >
          <Ionicons name="flash" size={20} color="white" />
          <Text style={styles.quickActionText}>
            Quick Promote: mohamedali0209@outlook.com
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
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
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  promoteButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  promoteButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  instructions: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
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
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  quickActionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
