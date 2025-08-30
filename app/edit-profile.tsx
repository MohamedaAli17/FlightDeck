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
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { useAuth } from '../contexts/AuthContext';
import { router } from 'expo-router';

export default function EditProfileScreen() {
  const colorScheme = useColorScheme();
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    passportNumber: '',
  });

  const handleSave = async () => {
    if (!formData.displayName.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    setLoading(true);
    try {
      // Update the user profile in Firebase
      await updateProfile(formData.displayName.trim(), {
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        nationality: formData.nationality,
        passportNumber: formData.passportNumber,
      });
      Alert.alert('Success', 'Profile updated successfully', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
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
          Edit Profile
        </Text>
        <TouchableOpacity onPress={handleSave} disabled={loading}>
          <Text style={[styles.saveButton, { color: Colors[colorScheme ?? 'light'].primary }]}>
            {loading ? 'Saving...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={styles.content} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Profile Picture Section */}
          <View style={styles.profilePictureSection}>
            <View style={[styles.profilePicture, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}>
              <Ionicons name="person" size={40} color={Colors[colorScheme ?? 'light'].background} />
            </View>
            <TouchableOpacity style={styles.changePhotoButton}>
              <Text style={[styles.changePhotoText, { color: Colors[colorScheme ?? 'light'].primary }]}>
                Change Photo
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.formSection}>
            <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
              Personal Information
            </Text>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                Full Name *
              </Text>
              <TextInput
                style={[styles.textInput, { 
                  backgroundColor: Colors[colorScheme ?? 'light'].surface,
                  color: Colors[colorScheme ?? 'light'].text,
                  borderColor: Colors[colorScheme ?? 'light'].border,
                }]}
                value={formData.displayName}
                onChangeText={(text) => setFormData({ ...formData, displayName: text })}
                placeholder="Enter your full name"
                placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                Email Address
              </Text>
              <TextInput
                style={[styles.textInput, { 
                  backgroundColor: Colors[colorScheme ?? 'light'].surface,
                  color: Colors[colorScheme ?? 'light'].text,
                  borderColor: Colors[colorScheme ?? 'light'].border,
                }]}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                placeholder="Enter your email"
                placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                Phone Number
              </Text>
              <TextInput
                style={[styles.textInput, { 
                  backgroundColor: Colors[colorScheme ?? 'light'].surface,
                  color: Colors[colorScheme ?? 'light'].text,
                  borderColor: Colors[colorScheme ?? 'light'].border,
                }]}
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                placeholder="Enter your phone number"
                placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                Date of Birth
              </Text>
              <TextInput
                style={[styles.textInput, { 
                  backgroundColor: Colors[colorScheme ?? 'light'].surface,
                  color: Colors[colorScheme ?? 'light'].text,
                  borderColor: Colors[colorScheme ?? 'light'].border,
                }]}
                value={formData.dateOfBirth}
                onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
                placeholder="MM/DD/YYYY"
                placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                Nationality
              </Text>
              <TextInput
                style={[styles.textInput, { 
                  backgroundColor: Colors[colorScheme ?? 'light'].surface,
                  color: Colors[colorScheme ?? 'light'].text,
                  borderColor: Colors[colorScheme ?? 'light'].border,
                }]}
                value={formData.nationality}
                onChangeText={(text) => setFormData({ ...formData, nationality: text })}
                placeholder="Enter your nationality"
                placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                Passport Number
              </Text>
              <TextInput
                style={[styles.textInput, { 
                  backgroundColor: Colors[colorScheme ?? 'light'].surface,
                  color: Colors[colorScheme ?? 'light'].text,
                  borderColor: Colors[colorScheme ?? 'light'].border,
                }]}
                value={formData.passportNumber}
                onChangeText={(text) => setFormData({ ...formData, passportNumber: text })}
                placeholder="Enter your passport number"
                placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
                autoCapitalize="characters"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  profilePictureSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  changePhotoButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  changePhotoText: {
    fontSize: 16,
    fontWeight: '600',
  },
  formSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
});
