import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { router } from 'expo-router';

export default function PreferencesScreen() {
  const colorScheme = useColorScheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(colorScheme === 'dark');
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [autoLoginEnabled, setAutoLoginEnabled] = useState(true);

  const preferenceSections = [
    {
      title: 'Notifications',
      items: [
        { 
          id: 'push', 
          label: 'Push Notifications', 
          icon: 'notifications', 
          action: 'toggle', 
          value: notificationsEnabled, 
          onToggle: setNotificationsEnabled 
        },
        { 
          id: 'email', 
          label: 'Email Notifications', 
          icon: 'mail', 
          action: 'toggle', 
          value: true, 
          onToggle: () => {} 
        },
        { 
          id: 'sms', 
          label: 'SMS Notifications', 
          icon: 'chatbubble', 
          action: 'toggle', 
          value: false, 
          onToggle: () => {} 
        },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        { 
          id: 'location', 
          label: 'Location Services', 
          icon: 'location', 
          action: 'toggle', 
          value: locationEnabled, 
          onToggle: setLocationEnabled 
        },
        { 
          id: 'biometric', 
          label: 'Biometric Login', 
          icon: 'finger-print', 
          action: 'toggle', 
          value: biometricEnabled, 
          onToggle: setBiometricEnabled 
        },
        { 
          id: 'autoLogin', 
          label: 'Auto Login', 
          icon: 'key', 
          action: 'toggle', 
          value: autoLoginEnabled, 
          onToggle: setAutoLoginEnabled 
        },
      ],
    },
    {
      title: 'Display',
      items: [
        { 
          id: 'theme', 
          label: 'Dark Mode', 
          icon: 'moon', 
          action: 'toggle', 
          value: darkModeEnabled, 
          onToggle: setDarkModeEnabled 
        },
        { 
          id: 'language', 
          label: 'Language', 
          icon: 'language', 
          action: 'navigate', 
          value: 'English' 
        },
        { 
          id: 'fontSize', 
          label: 'Font Size', 
          icon: 'text', 
          action: 'navigate', 
          value: 'Medium' 
        },
      ],
    },
    {
      title: 'Data & Storage',
      items: [
        { 
          id: 'cache', 
          label: 'Clear Cache', 
          icon: 'trash', 
          action: 'action' 
        },
        { 
          id: 'data', 
          label: 'Data Usage', 
          icon: 'cellular', 
          action: 'navigate' 
        },
        { 
          id: 'backup', 
          label: 'Backup Data', 
          icon: 'cloud-upload', 
          action: 'navigate' 
        },
      ],
    },
  ];

  const handleItemPress = (item: any) => {
    if (item.action === 'navigate') {
      // Handle navigation
      console.log(`Navigate to ${item.id}`);
      Alert.alert('Coming Soon', 'This feature will be available in the next update.');
    } else if (item.action === 'action') {
      if (item.id === 'cache') {
        Alert.alert(
          'Clear Cache',
          'Are you sure you want to clear the app cache?',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Clear', 
              style: 'destructive',
              onPress: () => {
                Alert.alert('Success', 'Cache cleared successfully');
              }
            },
          ]
        );
      }
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
          Preferences
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {preferenceSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
              {section.title}
            </Text>
            <View style={[styles.sectionContent, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.settingItem,
                    itemIndex < section.items.length - 1 && {
                      borderBottomWidth: 1,
                      borderBottomColor: Colors[colorScheme ?? 'light'].border,
                    }
                  ]}
                  onPress={() => handleItemPress(item)}
                >
                  <View style={styles.settingLeft}>
                    <Ionicons 
                      name={item.icon as any} 
                      size={20} 
                      color={Colors[colorScheme ?? 'light'].icon} 
                      style={styles.settingIcon}
                    />
                    <Text style={[styles.settingLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                      {item.label}
                    </Text>
                  </View>
                  
                  <View style={styles.settingRight}>
                    {item.action === 'toggle' ? (
                      <Switch
                        value={'value' in item && typeof item.value === 'boolean' ? item.value : false}
                        onValueChange={'onToggle' in item ? item.onToggle : () => {}}
                        trackColor={{ false: Colors[colorScheme ?? 'light'].border, true: Colors[colorScheme ?? 'light'].primary }}
                        thumbColor={Colors[colorScheme ?? 'light'].background}
                      />
                    ) : item.action === 'navigate' ? (
                      <View style={styles.navigateContainer}>
                        <Text style={[styles.settingValue, { color: Colors[colorScheme ?? 'light'].icon }]}>
                          {'value' in item && typeof item.value === 'string' ? item.value : ''}
                        </Text>
                        <Ionicons 
                          name="chevron-forward" 
                          size={20} 
                          color={Colors[colorScheme ?? 'light'].icon} 
                        />
                      </View>
                    ) : (
                      <Ionicons 
                        name="chevron-forward" 
                        size={20} 
                        color={Colors[colorScheme ?? 'light'].icon} 
                      />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionContent: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navigateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    marginRight: 8,
  },
});

