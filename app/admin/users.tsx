import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
  RefreshControl,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useAuth } from '../../contexts/AuthContext';

interface User {
  id: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin';
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
  profilePicture?: string;
}

export default function UserManagement() {
  const colorScheme = useColorScheme();
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<'all' | 'user' | 'admin'>('all');
  const [refreshing, setRefreshing] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchQuery, selectedRole]);

  const loadUsers = async () => {
    try {
      // Simulate API call - in real app, fetch from Firebase
      const mockUsers: User[] = [
        {
          id: '1',
          email: 'admin@flightdeck.com',
          displayName: 'Admin User',
          role: 'admin',
          isActive: true,
          lastLogin: new Date().toISOString(),
          createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
        },
        {
          id: '2',
          email: 'john.doe@example.com',
          displayName: 'John Doe',
          role: 'user',
          isActive: true,
          lastLogin: new Date(Date.now() - 3600000).toISOString(),
          createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
        },
        {
          id: '3',
          email: 'jane.smith@example.com',
          displayName: 'Jane Smith',
          role: 'user',
          isActive: false,
          lastLogin: new Date(Date.now() - 86400000 * 7).toISOString(),
          createdAt: new Date(Date.now() - 86400000 * 45).toISOString(),
        },
      ];
      setUsers(mockUsers);
    } catch (error) {
      console.error('Failed to load users:', error);
      Alert.alert('Error', 'Failed to load users');
    }
  };

  const filterUsers = () => {
    let filtered = users;

    // Filter by role
    if (selectedRole !== 'all') {
      filtered = filtered.filter(user => user.role === selectedRole);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUsers();
    setRefreshing(false);
  };

  const handleUserAction = (user: User, action: 'suspend' | 'activate' | 'promote' | 'demote') => {
    Alert.alert(
      'Confirm Action',
      `Are you sure you want to ${action} ${user.displayName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          style: action === 'suspend' ? 'destructive' : 'default',
          onPress: () => executeUserAction(user, action),
        },
      ]
    );
  };

  const executeUserAction = async (user: User, action: string) => {
    try {
      // In a real app, this would make API calls to update user status
      const updatedUsers = users.map(u => {
        if (u.id === user.id) {
          switch (action) {
            case 'suspend':
              return { ...u, isActive: false };
            case 'activate':
              return { ...u, isActive: true };
            case 'promote':
              return { ...u, role: 'admin' as const };
            case 'demote':
              return { ...u, role: 'user' as const };
            default:
              return u;
          }
        }
        return u;
      });
      setUsers(updatedUsers);
      Alert.alert('Success', `User ${action}d successfully`);
    } catch (error) {
      Alert.alert('Error', `Failed to ${action} user`);
    }
  };

  const openUserModal = (user: User) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const UserCard = ({ user }: { user: User }) => (
    <TouchableOpacity
      style={[styles.userCard, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}
      onPress={() => openUserModal(user)}
      activeOpacity={0.7}
    >
      <View style={styles.userHeader}>
        <View style={styles.userInfo}>
          <View style={[styles.avatar, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}>
            <Text style={styles.avatarText}>
              {user.displayName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={[styles.userName, { color: Colors[colorScheme ?? 'light'].text }]}>
              {user.displayName}
            </Text>
            <Text style={[styles.userEmail, { color: Colors[colorScheme ?? 'light'].icon }]}>
              {user.email}
            </Text>
          </View>
        </View>
        <View style={styles.userStatus}>
          <View style={[
            styles.statusBadge,
            { backgroundColor: user.isActive ? '#4CAF50' : '#F44336' }
          ]}>
            <Text style={styles.statusText}>
              {user.isActive ? 'Active' : 'Suspended'}
            </Text>
          </View>
          <View style={[
            styles.roleBadge,
            { backgroundColor: user.role === 'admin' ? '#FF9800' : '#2196F3' }
          ]}>
            <Text style={styles.roleText}>
              {user.role.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.userActions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}
          onPress={() => handleUserAction(user, user.isActive ? 'suspend' : 'activate')}
        >
          <Ionicons
            name={user.isActive ? 'pause' : 'play'}
            size={16}
            color={user.isActive ? '#F44336' : '#4CAF50'}
          />
          <Text style={[
            styles.actionButtonText,
            { color: user.isActive ? '#F44336' : '#4CAF50' }
          ]}>
            {user.isActive ? 'Suspend' : 'Activate'}
          </Text>
        </TouchableOpacity>
        
        {user.role === 'user' ? (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}
            onPress={() => handleUserAction(user, 'promote')}
          >
            <Ionicons name="arrow-up" size={16} color="#FF9800" />
            <Text style={[styles.actionButtonText, { color: '#FF9800' }]}>
              Promote
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}
            onPress={() => handleUserAction(user, 'demote')}
          >
            <Ionicons name="arrow-down" size={16} color="#2196F3" />
            <Text style={[styles.actionButtonText, { color: '#2196F3' }]}>
              Demote
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            User Management
          </Text>
          <Text style={[styles.headerSubtitle, { color: Colors[colorScheme ?? 'light'].icon }]}>
            {filteredUsers.length} users found
          </Text>
        </View>

        {/* Search and Filters */}
        <View style={styles.filtersContainer}>
          <View style={[styles.searchContainer, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
            <Ionicons name="search" size={20} color={Colors[colorScheme ?? 'light'].icon} />
            <TextInput
              style={[styles.searchInput, { color: Colors[colorScheme ?? 'light'].text }]}
              placeholder="Search users..."
              placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          
          <View style={styles.roleFilters}>
            {(['all', 'user', 'admin'] as const).map((role) => (
              <TouchableOpacity
                key={role}
                style={[
                  styles.roleFilter,
                  {
                    backgroundColor: selectedRole === role
                      ? Colors[colorScheme ?? 'light'].primary
                      : Colors[colorScheme ?? 'light'].surface
                  }
                ]}
                onPress={() => setSelectedRole(role)}
              >
                <Text
                  style={[
                    styles.roleFilterText,
                    {
                      color: selectedRole === role
                        ? Colors[colorScheme ?? 'light'].background
                        : Colors[colorScheme ?? 'light'].text
                    }
                  ]}
                >
                  {role === 'all' ? 'All' : role.charAt(0).toUpperCase() + role.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Users List */}
        <View style={styles.usersList}>
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </View>
      </ScrollView>

      {/* User Detail Modal */}
      <Modal
        visible={showUserModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowUserModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
            {selectedUser && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={[styles.modalTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                    User Details
                  </Text>
                  <TouchableOpacity onPress={() => setShowUserModal(false)}>
                    <Ionicons name="close" size={24} color={Colors[colorScheme ?? 'light'].text} />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.userDetailContent}>
                  <View style={[styles.detailAvatar, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}>
                    <Text style={styles.detailAvatarText}>
                      {selectedUser.displayName.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  
                  <View style={styles.detailInfo}>
                    <Text style={[styles.detailName, { color: Colors[colorScheme ?? 'light'].text }]}>
                      {selectedUser.displayName}
                    </Text>
                    <Text style={[styles.detailEmail, { color: Colors[colorScheme ?? 'light'].icon }]}>
                      {selectedUser.email}
                    </Text>
                    
                    <View style={styles.detailRow}>
                      <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                        Role:
                      </Text>
                      <Text style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].icon }]}>
                        {selectedUser.role}
                      </Text>
                    </View>
                    
                    <View style={styles.detailRow}>
                      <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                        Status:
                      </Text>
                      <Text style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].icon }]}>
                        {selectedUser.isActive ? 'Active' : 'Suspended'}
                      </Text>
                    </View>
                    
                    <View style={styles.detailRow}>
                      <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                        Last Login:
                      </Text>
                      <Text style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].icon }]}>
                        {new Date(selectedUser.lastLogin).toLocaleDateString()}
                      </Text>
                    </View>
                    
                    <View style={styles.detailRow}>
                      <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                        Member Since:
                      </Text>
                      <Text style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].icon }]}>
                        {new Date(selectedUser.createdAt).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  roleFilters: {
    flexDirection: 'row',
    gap: 8,
  },
  roleFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  roleFilterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  usersList: {
    paddingHorizontal: 20,
  },
  userCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userEmail: {
    fontSize: 14,
    marginTop: 2,
  },
  userStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 4,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  roleText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  userActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 4,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    borderRadius: 16,
    padding: 20,
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userDetailContent: {
    alignItems: 'center',
  },
  detailAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailAvatarText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  detailInfo: {
    width: '100%',
  },
  detailName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  detailEmail: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 14,
  },
});
