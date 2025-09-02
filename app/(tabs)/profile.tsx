import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useAuth } from '../../contexts/AuthContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { router, useFocusEffect } from 'expo-router';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);


  const [showUpdateMessage, setShowUpdateMessage] = useState(false);

  // Force re-render when screen comes into focus to show updated user data
  useFocusEffect(
    React.useCallback(() => {
      // Show a brief success message when returning from edit profile
      if (user?.displayName) {
        setShowUpdateMessage(true);
        setTimeout(() => setShowUpdateMessage(false), 3000);
      }
    }, [user])
  );

  const profileSections = [
    {
      title: 'Account',
      items: [
        { id: 'profile', label: 'Edit Profile', icon: 'person', action: 'navigate' },
        { id: 'preferences', label: 'Preferences', icon: 'settings', action: 'navigate' },
        { id: 'favorites', label: 'Saved Favorites', icon: 'heart', action: 'navigate', badge: favorites.length.toString() },
        { id: 'history', label: 'Recent Activity', icon: 'time', action: 'navigate' },
      ],
    },
    {
      title: 'Flight Settings',
      items: [
        { id: 'alerts', label: 'Flight Alerts', icon: 'notifications', action: 'toggle', value: notificationsEnabled, onToggle: setNotificationsEnabled },
        { id: 'location', label: 'Location Services', icon: 'location', action: 'toggle', value: locationEnabled, onToggle: setLocationEnabled },
        { id: 'boarding', label: 'Boarding Pass', icon: 'card', action: 'navigate' },
        { id: 'loyalty', label: 'Loyalty Programs', icon: 'star', action: 'navigate' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { id: 'cuisine', label: 'Food Preferences', icon: 'restaurant', action: 'navigate' },
        { id: 'budget', label: 'Budget Range', icon: 'wallet', action: 'navigate' },
        { id: 'accessibility', label: 'Accessibility', icon: 'accessibility', action: 'navigate' },
        { id: 'language', label: 'Language', icon: 'language', action: 'navigate', value: 'English' },
      ],
    },
    {
      title: 'App Settings',
      items: [
        { id: 'theme', label: 'Dark Mode', icon: 'moon', action: 'navigate' },
        { id: 'privacy', label: 'Privacy Policy', icon: 'shield', action: 'navigate' },
        { id: 'terms', label: 'Terms of Service', icon: 'document-text', action: 'navigate' },
        { id: 'about', label: 'About App', icon: 'information-circle', action: 'navigate' },
      ],
    },
  ];

  const handleItemPress = (item: any) => {
    if (item.action === 'navigate') {
      // Handle navigation to different screens
      switch (item.id) {
        case 'profile':
          router.push('/edit-profile' as any);
          break;
        case 'preferences':
          router.push('/preferences' as any);
          break;
        case 'favorites':
          router.push('/favorites' as any);
          break;
        case 'history':
          router.push('/recent-activity' as any);
          break;
        case 'boarding':
          router.push('/boarding-pass' as any);
          break;
        case 'loyalty':
          router.push('/loyalty-programs' as any);
          break;
        case 'cuisine':
          Alert.alert('Coming Soon', 'Food Preferences feature will be available in the next update.');
          break;
        case 'budget':
          Alert.alert('Coming Soon', 'Budget Range feature will be available in the next update.');
          break;
        case 'accessibility':
          Alert.alert('Coming Soon', 'Accessibility settings will be available in the next update.');
          break;
        case 'language':
          Alert.alert('Coming Soon', 'Language settings will be available in the next update.');
          break;
        case 'privacy':
          Alert.alert('Coming Soon', 'Privacy Policy will be available in the next update.');
          break;
        case 'terms':
          Alert.alert('Coming Soon', 'Terms of Service will be available in the next update.');
          break;
        case 'theme':
          Alert.alert('Coming Soon', 'Dark mode toggle will be available in the next update.');
          break;
        case 'about':
          Alert.alert('About FlightDeck', 'FlightDeck v1.0.0\n\nYour ultimate airport companion app.\n\nFeatures:\n• Flight tracking\n• Restaurant discovery\n• Shopping guides\n• Interactive maps\n• Real-time updates');
          break;
        default:
          console.log(`Navigate to ${item.id}`);
      }
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              router.replace('/(tabs)' as any);
            } catch (error: any) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Profile & Settings
        </Text>
        <TouchableOpacity>
          <Ionicons 
            name="notifications-outline" 
            size={24} 
            color={Colors[colorScheme ?? 'light'].text} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Success Message */}
        {showUpdateMessage && (
          <View style={[styles.successMessage, { backgroundColor: '#4CAF50' }]}>
            <Ionicons name="checkmark-circle" size={20} color="white" />
            <Text style={styles.successText}>Profile updated successfully!</Text>
          </View>
        )}
        
        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
          <View style={[styles.avatar, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}>
            <Ionicons name="person" size={32} color={Colors[colorScheme ?? 'light'].background} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.userName, { color: Colors[colorScheme ?? 'light'].text }]}>
              {user?.displayName || user?.email?.split('@')[0] || 'User'}
            </Text>
            <Text style={[styles.userEmail, { color: Colors[colorScheme ?? 'light'].icon }]}>
              {user?.email || 'No email'}
            </Text>
            <View style={styles.membershipBadge}>
              <Ionicons name="star" size={16} color={Colors[colorScheme ?? 'light'].accent} />
              <Text style={[styles.membershipText, { color: Colors[colorScheme ?? 'light'].accent }]}>
                Premium Member
              </Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => router.push('/edit-profile' as any)}
          >
            <Ionicons name="pencil" size={20} color={Colors[colorScheme ?? 'light'].primary} />
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
            <Ionicons name="airplane" size={24} color={Colors[colorScheme ?? 'light'].primary} />
            <Text style={[styles.statNumber, { color: Colors[colorScheme ?? 'light'].text }]}>24</Text>
            <Text style={[styles.statLabel, { color: Colors[colorScheme ?? 'light'].icon }]}>Flights</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
            <Ionicons name="heart" size={24} color={Colors[colorScheme ?? 'light'].primary} />
            <Text style={[styles.statNumber, { color: Colors[colorScheme ?? 'light'].text }]}>{favorites.length}</Text>
            <Text style={[styles.statLabel, { color: Colors[colorScheme ?? 'light'].icon }]}>Favorites</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
            <Ionicons name="star" size={24} color={Colors[colorScheme ?? 'light'].primary} />
            <Text style={[styles.statNumber, { color: Colors[colorScheme ?? 'light'].text }]}>15600000</Text>
            <Text style={[styles.statLabel, { color: Colors[colorScheme ?? 'light'].icon }]}>Points</Text>
          </View>
        </View>

        {/* Settings Sections */}
        {profileSections.map((section, sectionIndex) => (
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
                    {'badge' in item && item.badge && (
                      <View style={[styles.badge, { backgroundColor: Colors[colorScheme ?? 'light'].accent }]}>
                        <Text style={[styles.badgeText, { color: Colors[colorScheme ?? 'light'].primary }]}>
                          {item.badge}
                        </Text>
                      </View>
                    )}
                    
                    {item.action === 'toggle' ? (
                      <Switch
                        value={'value' in item && typeof item.value === 'boolean' ? item.value : false}
                        onValueChange={'onToggle' in item ? item.onToggle : () => {}}
                        trackColor={{ false: Colors[colorScheme ?? 'light'].border, true: Colors[colorScheme ?? 'light'].primary }}
                        thumbColor={Colors[colorScheme ?? 'light'].background}
                      />
                    ) : item.action === 'navigate' ? (
                      <Ionicons 
                        name="chevron-forward" 
                        size={20} 
                        color={Colors[colorScheme ?? 'light'].icon} 
                      />
                    ) : (
                      <Text style={[styles.settingValue, { color: Colors[colorScheme ?? 'light'].icon }]}>
                        {'value' in item && typeof item.value === 'string' ? item.value : ''}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: Colors[colorScheme ?? 'light'].error }]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out" size={20} color={Colors[colorScheme ?? 'light'].background} />
          <Text style={[styles.logoutText, { color: Colors[colorScheme ?? 'light'].background }]}>
            Sign Out
          </Text>
        </TouchableOpacity>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: Colors[colorScheme ?? 'light'].icon }]}>
            FlightDeck v1.0.0
          </Text>
        </View>
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 8,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  membershipText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  editButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
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
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  settingValue: {
    fontSize: 14,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  versionText: {
    fontSize: 12,
  },
  successMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  successText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 