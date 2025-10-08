import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useAuth } from '../../contexts/AuthContext';
import { router } from 'expo-router';

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalErrors: number;
  criticalErrors: number;
  totalContent: number;
  pendingContent: number;
}

export default function AdminDashboard() {
  const colorScheme = useColorScheme();
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalErrors: 0,
    criticalErrors: 0,
    totalContent: 0,
    pendingContent: 0,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [recentErrors, setRecentErrors] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // In a real app, these would be API calls to your backend
      // For now, we'll simulate the data
      setStats({
        totalUsers: 34653,
        activeUsers: 14321,
        totalErrors: 45,
        criticalErrors: 3,
        totalContent: 156,
        pendingContent: 8,
      });

      setRecentErrors([
        {
          id: '1',
          type: 'API_ERROR',
          severity: 'HIGH',
          message: 'Failed to fetch flight data',
          timestamp: new Date().toISOString(),
          user: 'user@example.com',
        },
        {
          id: '2',
          type: 'AUTH_ERROR',
          severity: 'MEDIUM',
          message: 'Invalid token refresh',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          user: 'admin@example.com',
        },
      ]);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const StatCard = ({ title, value, icon, color, onPress }: {
    title: string;
    value: number;
    icon: string;
    color: string;
    onPress?: () => void;
  }) => (
    <TouchableOpacity
      style={[styles.statCard, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.statHeader}>
        <Ionicons name={icon as any} size={24} color={color} />
        <Text style={[styles.statValue, { color: Colors[colorScheme ?? 'light'].text }]}>
          {value.toLocaleString()}
        </Text>
      </View>
      <Text style={[styles.statTitle, { color: Colors[colorScheme ?? 'light'].icon }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const QuickAction = ({ title, icon, onPress, color }: {
    title: string;
    icon: string;
    onPress: () => void;
    color: string;
  }) => (
    <TouchableOpacity
      style={[styles.quickAction, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name={icon as any} size={32} color={color} />
      <Text style={[styles.quickActionText, { color: Colors[colorScheme ?? 'light'].text }]}>
        {title}
      </Text>
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
          <View>
            <Text style={[styles.headerTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
              Admin Dashboard
            </Text>
            <Text style={[styles.headerSubtitle, { color: Colors[colorScheme ?? 'light'].icon }]}>
              Welcome back, {user?.displayName || user?.email}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.settingsButton, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}
            onPress={() => Alert.alert('Settings', 'Settings functionality coming soon')}
          >
            <Ionicons name="settings" size={24} color={Colors[colorScheme ?? 'light'].text} />
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon="people"
            color={Colors[colorScheme ?? 'light'].primary}
            onPress={() => router.push('/admin/users' as any)}
          />
          <StatCard
            title="Active Users"
            value={stats.activeUsers}
            icon="person-circle"
            color="#4CAF50"
            onPress={() => router.push('/admin/users' as any)}
          />
          <StatCard
            title="Total Errors"
            value={stats.totalErrors}
            icon="bug"
            color="#FF9800"
            onPress={() => router.push('/admin/logs' as any)}
          />
          <StatCard
            title="Critical Errors"
            value={stats.criticalErrors}
            icon="warning"
            color="#F44336"
            onPress={() => router.push('/admin/logs' as any)}
          />
          <StatCard
            title="Total Content"
            value={stats.totalContent}
            icon="document-text"
            color="#2196F3"
            onPress={() => router.push('/admin/content' as any)}
          />
          <StatCard
            title="Pending Content"
            value={stats.pendingContent}
            icon="time"
            color="#9C27B0"
            onPress={() => router.push('/admin/content' as any)}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Quick Actions
          </Text>
          <View style={styles.quickActionsGrid}>
            <QuickAction
              title="Manage Users"
              icon="people"
              color={Colors[colorScheme ?? 'light'].primary}
              onPress={() => router.push('/admin/users' as any)}
            />
            <QuickAction
              title="Add Content"
              icon="add-circle"
              color="#4CAF50"
              onPress={() => router.push('/admin/content' as any)}
            />
            <QuickAction
              title="View Logs"
              icon="bug"
              color="#FF9800"
              onPress={() => router.push('/admin/logs' as any)}
            />
            <QuickAction
              title="Analytics"
              icon="analytics"
              color="#2196F3"
              onPress={() => router.push('/admin/analytics' as any)}
            />
          </View>
        </View>

        {/* Recent Errors */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
              Recent Errors
            </Text>
            <TouchableOpacity onPress={() => router.push('/admin/logs' as any)}>
              <Text style={[styles.viewAllText, { color: Colors[colorScheme ?? 'light'].primary }]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          
          {recentErrors.map((error) => (
            <View
              key={error.id}
              style={[styles.errorItem, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}
            >
              <View style={styles.errorHeader}>
                <View style={[
                  styles.severityBadge,
                  { backgroundColor: error.severity === 'HIGH' ? '#F44336' : '#FF9800' }
                ]}>
                  <Text style={styles.severityText}>{error.severity}</Text>
                </View>
                <Text style={[styles.errorTime, { color: Colors[colorScheme ?? 'light'].icon }]}>
                  {new Date(error.timestamp).toLocaleTimeString()}
                </Text>
              </View>
              <Text style={[styles.errorMessage, { color: Colors[colorScheme ?? 'light'].text }]}>
                {error.message}
              </Text>
              <Text style={[styles.errorUser, { color: Colors[colorScheme ?? 'light'].icon }]}>
                User: {error.user}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  settingsButton: {
    padding: 8,
    borderRadius: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickAction: {
    flex: 1,
    minWidth: '45%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  errorItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  errorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  severityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  errorTime: {
    fontSize: 12,
  },
  errorMessage: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  errorUser: {
    fontSize: 12,
  },
});
