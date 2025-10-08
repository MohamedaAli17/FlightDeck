import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  totalSessions: number;
  averageSessionDuration: number;
  mostViewedContent: Array<{
    name: string;
    views: number;
    type: string;
  }>;
  errorStats: {
    total: number;
    critical: number;
    resolved: number;
  };
  userGrowth: Array<{
    date: string;
    users: number;
  }>;
  popularFeatures: Array<{
    feature: string;
    usage: number;
  }>;
}

const { width } = Dimensions.get('window');

export default function Analytics() {
  const colorScheme = useColorScheme();
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    activeUsers: 0,
    newUsersToday: 0,
    totalSessions: 0,
    averageSessionDuration: 0,
    mostViewedContent: [],
    errorStats: { total: 0, critical: 0, resolved: 0 },
    userGrowth: [],
    popularFeatures: [],
  });
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('7d');

  useEffect(() => {
    loadAnalytics();
  }, [selectedPeriod]);

  const loadAnalytics = async () => {
    try {
      // Simulate API call - in real app, fetch from Firebase
      const mockAnalytics: AnalyticsData = {
        totalUsers: 1250,
        activeUsers: 890,
        newUsersToday: 23,
        totalSessions: 4567,
        averageSessionDuration: 8.5,
        mostViewedContent: [
          { name: 'Chick-fil-A', views: 1234, type: 'restaurant' },
          { name: 'Duty Free Store', views: 987, type: 'shop' },
          { name: 'Airport Museum', views: 654, type: 'activity' },
          { name: 'Starbucks', views: 543, type: 'restaurant' },
        ],
        errorStats: { total: 45, critical: 3, resolved: 42 },
        userGrowth: [
          { date: '2024-01-01', users: 1000 },
          { date: '2024-01-02', users: 1020 },
          { date: '2024-01-03', users: 1050 },
          { date: '2024-01-04', users: 1080 },
          { date: '2024-01-05', users: 1120 },
          { date: '2024-01-06', users: 1180 },
          { date: '2024-01-07', users: 1250 },
        ],
        popularFeatures: [
          { feature: 'Flight Tracking', usage: 89 },
          { feature: 'Restaurant Finder', usage: 76 },
          { feature: 'Shopping Guide', usage: 65 },
          { feature: 'Map Navigation', usage: 58 },
          { feature: 'Food Ordering', usage: 43 },
        ],
      };
      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAnalytics();
    setRefreshing(false);
  };

  const StatCard = ({ title, value, icon, color, subtitle }: {
    title: string;
    value: string | number;
    icon: string;
    color: string;
    subtitle?: string;
  }) => (
    <View style={[styles.statCard, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
      <View style={styles.statHeader}>
        <Ionicons name={icon as any} size={24} color={color} />
        <Text style={[styles.statValue, { color: Colors[colorScheme ?? 'light'].text }]}>
          {value}
        </Text>
      </View>
      <Text style={[styles.statTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
        {title}
      </Text>
      {subtitle && (
        <Text style={[styles.statSubtitle, { color: Colors[colorScheme ?? 'light'].icon }]}>
          {subtitle}
        </Text>
      )}
    </View>
  );

  const ProgressBar = ({ percentage, color }: { percentage: number; color: string }) => (
    <View style={[styles.progressBar, { backgroundColor: Colors[colorScheme ?? 'light'].border }]}>
      <View
        style={[
          styles.progressFill,
          {
            width: `${Math.min(percentage, 100)}%`,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );

  const SimpleChart = ({ data, color }: { data: Array<{ date: string; users: number }>; color: string }) => {
    const maxValue = Math.max(...data.map(d => d.users));
    const chartWidth = width - 80;
    const barWidth = chartWidth / data.length - 4;

    return (
      <View style={styles.chartContainer}>
        <View style={styles.chart}>
          {data.map((item, index) => (
            <View key={index} style={styles.barContainer}>
              <View
                style={[
                  styles.bar,
                  {
                    height: (item.users / maxValue) * 100,
                    width: barWidth,
                    backgroundColor: color,
                  },
                ]}
              />
              <Text style={[styles.barLabel, { color: Colors[colorScheme ?? 'light'].icon }]}>
                {new Date(item.date).getDate()}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

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
            Analytics
          </Text>
          <View style={styles.periodSelector}>
            {(['7d', '30d', '90d'] as const).map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.periodButton,
                  {
                    backgroundColor: selectedPeriod === period
                      ? Colors[colorScheme ?? 'light'].primary
                      : Colors[colorScheme ?? 'light'].surface
                  }
                ]}
                onPress={() => setSelectedPeriod(period)}
              >
                <Text
                  style={[
                    styles.periodButtonText,
                    {
                      color: selectedPeriod === period
                        ? Colors[colorScheme ?? 'light'].background
                        : Colors[colorScheme ?? 'light'].text
                    }
                  ]}
                >
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Key Metrics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Key Metrics
          </Text>
          <View style={styles.statsGrid}>
            <StatCard
              title="Total Users"
              value={analytics.totalUsers.toLocaleString()}
              icon="people"
              color={Colors[colorScheme ?? 'light'].primary}
              subtitle={`+${analytics.newUsersToday} today`}
            />
            <StatCard
              title="Active Users"
              value={analytics.activeUsers.toLocaleString()}
              icon="person-circle"
              color="#4CAF50"
              subtitle={`${Math.round((analytics.activeUsers / analytics.totalUsers) * 100)}% of total`}
            />
            <StatCard
              title="Total Sessions"
              value={analytics.totalSessions.toLocaleString()}
              icon="analytics"
              color="#2196F3"
              subtitle={`${analytics.averageSessionDuration}min avg`}
            />
            <StatCard
              title="Error Rate"
              value={`${analytics.errorStats.total}`}
              icon="bug"
              color="#FF9800"
              subtitle={`${analytics.errorStats.critical} critical`}
            />
          </View>
        </View>

        {/* User Growth Chart */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            User Growth (Last 7 Days)
          </Text>
          <View style={[styles.chartCard, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
            <SimpleChart data={analytics.userGrowth} color={Colors[colorScheme ?? 'light'].primary} />
          </View>
        </View>

        {/* Most Viewed Content */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Most Viewed Content
          </Text>
          <View style={[styles.listCard, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
            {analytics.mostViewedContent.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <View style={styles.listItemInfo}>
                  <View style={[styles.listItemIcon, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}>
                    <Ionicons
                      name={
                        item.type === 'restaurant' ? 'restaurant' :
                        item.type === 'shop' ? 'bag' :
                        item.type === 'activity' ? 'game-controller' : 'location'
                      }
                      size={16}
                      color="white"
                    />
                  </View>
                  <View style={styles.listItemDetails}>
                    <Text style={[styles.listItemTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                      {item.name}
                    </Text>
                    <Text style={[styles.listItemSubtitle, { color: Colors[colorScheme ?? 'light'].icon }]}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </Text>
                  </View>
                </View>
                <View style={styles.listItemStats}>
                  <Text style={[styles.listItemValue, { color: Colors[colorScheme ?? 'light'].text }]}>
                    {item.views.toLocaleString()}
                  </Text>
                  <Text style={[styles.listItemLabel, { color: Colors[colorScheme ?? 'light'].icon }]}>
                    views
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Popular Features */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Popular Features
          </Text>
          <View style={[styles.listCard, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
            {analytics.popularFeatures.map((feature, index) => (
              <View key={index} style={styles.listItem}>
                <View style={styles.listItemInfo}>
                  <Text style={[styles.listItemTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                    {feature.feature}
                  </Text>
                </View>
                <View style={styles.listItemStats}>
                  <Text style={[styles.listItemValue, { color: Colors[colorScheme ?? 'light'].text }]}>
                    {feature.usage}%
                  </Text>
                  <ProgressBar percentage={feature.usage} color={Colors[colorScheme ?? 'light'].primary} />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Error Statistics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Error Statistics
          </Text>
          <View style={styles.statsGrid}>
            <StatCard
              title="Total Errors"
              value={analytics.errorStats.total}
              icon="bug"
              color="#FF9800"
            />
            <StatCard
              title="Critical Errors"
              value={analytics.errorStats.critical}
              icon="warning"
              color="#F44336"
            />
            <StatCard
              title="Resolved"
              value={analytics.errorStats.resolved}
              icon="checkmark-circle"
              color="#4CAF50"
            />
            <StatCard
              title="Resolution Rate"
              value={`${Math.round((analytics.errorStats.resolved / analytics.errorStats.total) * 100)}%`}
              icon="trending-up"
              color="#2196F3"
            />
          </View>
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
  periodSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  periodButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  statSubtitle: {
    fontSize: 12,
  },
  chartCard: {
    padding: 16,
    borderRadius: 12,
  },
  chartContainer: {
    height: 120,
    justifyContent: 'flex-end',
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 100,
    gap: 4,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    borderRadius: 2,
    marginBottom: 4,
  },
  barLabel: {
    fontSize: 10,
  },
  listCard: {
    borderRadius: 12,
    padding: 16,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  listItemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  listItemIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  listItemDetails: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  listItemSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  listItemStats: {
    alignItems: 'flex-end',
  },
  listItemValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  listItemLabel: {
    fontSize: 12,
  },
  progressBar: {
    height: 4,
    width: 60,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
});
