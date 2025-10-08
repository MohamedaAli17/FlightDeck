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

interface ErrorLog {
  id: string;
  type: 'API_ERROR' | 'AUTH_ERROR' | 'VALIDATION_ERROR' | 'SYSTEM_ERROR' | 'USER_ERROR';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  stackTrace?: string;
  user?: string;
  endpoint?: string;
  timestamp: string;
  resolved: boolean;
  metadata?: Record<string, any>;
}

export default function ErrorLogs() {
  const colorScheme = useColorScheme();
  const [logs, setLogs] = useState<ErrorLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<ErrorLog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<'all' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'API_ERROR' | 'AUTH_ERROR' | 'VALIDATION_ERROR' | 'SYSTEM_ERROR' | 'USER_ERROR'>('all');
  const [refreshing, setRefreshing] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState<ErrorLog | null>(null);

  useEffect(() => {
    loadLogs();
  }, []);

  useEffect(() => {
    filterLogs();
  }, [logs, searchQuery, selectedSeverity, selectedType]);

  const loadLogs = async () => {
    try {
      // Simulate API call - in real app, fetch from Firebase
      const mockLogs: ErrorLog[] = [
        {
          id: '1',
          type: 'API_ERROR',
          severity: 'HIGH',
          message: 'Failed to fetch flight data from Amadeus API',
          stackTrace: 'Error: Request timeout\n    at fetchFlights (api.js:45)\n    at async loadFlights (flights.js:23)',
          user: 'user@example.com',
          endpoint: '/api/flights',
          timestamp: new Date().toISOString(),
          resolved: false,
          metadata: { apiKey: '***', requestId: 'req_123' },
        },
        {
          id: '2',
          type: 'AUTH_ERROR',
          severity: 'MEDIUM',
          message: 'Invalid token refresh attempt',
          user: 'admin@example.com',
          endpoint: '/api/auth/refresh',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          resolved: true,
        },
        {
          id: '3',
          type: 'VALIDATION_ERROR',
          severity: 'LOW',
          message: 'Invalid email format in signup form',
          user: 'newuser@example.com',
          endpoint: '/api/auth/signup',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          resolved: true,
        },
        {
          id: '4',
          type: 'SYSTEM_ERROR',
          severity: 'CRITICAL',
          message: 'Database connection lost',
          stackTrace: 'Error: Connection timeout\n    at connect (db.js:12)\n    at async initDB (database.js:8)',
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          resolved: false,
        },
      ];
      setLogs(mockLogs);
    } catch (error) {
      console.error('Failed to load logs:', error);
      Alert.alert('Error', 'Failed to load error logs');
    }
  };

  const filterLogs = () => {
    let filtered = logs;

    // Filter by severity
    if (selectedSeverity !== 'all') {
      filtered = filtered.filter(log => log.severity === selectedSeverity);
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(log => log.type === selectedType);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(log =>
        log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.user?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.endpoint?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredLogs(filtered);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadLogs();
    setRefreshing(false);
  };

  const markAsResolved = async (logId: string) => {
    try {
      const updatedLogs = logs.map(log =>
        log.id === logId ? { ...log, resolved: true } : log
      );
      setLogs(updatedLogs);
      Alert.alert('Success', 'Error marked as resolved');
    } catch (error) {
      Alert.alert('Error', 'Failed to mark error as resolved');
    }
  };

  const openLogModal = (log: ErrorLog) => {
    setSelectedLog(log);
    setShowLogModal(true);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return '#F44336';
      case 'HIGH': return '#FF9800';
      case 'MEDIUM': return '#FFC107';
      case 'LOW': return '#4CAF50';
      default: return '#9E9E9E';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'API_ERROR': return 'cloud-offline';
      case 'AUTH_ERROR': return 'lock-closed';
      case 'VALIDATION_ERROR': return 'warning';
      case 'SYSTEM_ERROR': return 'server';
      case 'USER_ERROR': return 'person';
      default: return 'bug';
    }
  };

  const LogCard = ({ log }: { log: ErrorLog }) => (
    <TouchableOpacity
      style={[styles.logCard, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}
      onPress={() => openLogModal(log)}
      activeOpacity={0.7}
    >
      <View style={styles.logHeader}>
        <View style={styles.logInfo}>
          <Ionicons
            name={getTypeIcon(log.type) as any}
            size={20}
            color={Colors[colorScheme ?? 'light'].icon}
          />
          <View style={styles.logDetails}>
            <Text style={[styles.logMessage, { color: Colors[colorScheme ?? 'light'].text }]}>
              {log.message}
            </Text>
            <Text style={[styles.logMeta, { color: Colors[colorScheme ?? 'light'].icon }]}>
              {log.user && `${log.user} • `}
              {log.endpoint && `${log.endpoint} • `}
              {new Date(log.timestamp).toLocaleString()}
            </Text>
          </View>
        </View>
        <View style={styles.logStatus}>
          <View style={[
            styles.severityBadge,
            { backgroundColor: getSeverityColor(log.severity) }
          ]}>
            <Text style={styles.severityText}>{log.severity}</Text>
          </View>
          {log.resolved && (
            <View style={[styles.resolvedBadge, { backgroundColor: '#4CAF50' }]}>
              <Text style={styles.resolvedText}>RESOLVED</Text>
            </View>
          )}
        </View>
      </View>
      
      {!log.resolved && (
        <TouchableOpacity
          style={[styles.resolveButton, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
          onPress={() => markAsResolved(log.id)}
        >
          <Ionicons name="checkmark" size={16} color="white" />
          <Text style={styles.resolveButtonText}>Mark as Resolved</Text>
        </TouchableOpacity>
      )}
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
            Error Logs
          </Text>
          <Text style={[styles.headerSubtitle, { color: Colors[colorScheme ?? 'light'].icon }]}>
            {filteredLogs.length} errors found
          </Text>
        </View>

        {/* Search and Filters */}
        <View style={styles.filtersContainer}>
          <View style={[styles.searchContainer, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
            <Ionicons name="search" size={20} color={Colors[colorScheme ?? 'light'].icon} />
            <TextInput
              style={[styles.searchInput, { color: Colors[colorScheme ?? 'light'].text }]}
              placeholder="Search logs..."
              placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
            <View style={styles.filtersRow}>
              <Text style={[styles.filterLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                Severity:
              </Text>
              {(['all', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const).map((severity) => (
                <TouchableOpacity
                  key={severity}
                  style={[
                    styles.filterButton,
                    {
                      backgroundColor: selectedSeverity === severity
                        ? getSeverityColor(severity)
                        : Colors[colorScheme ?? 'light'].surface
                    }
                  ]}
                  onPress={() => setSelectedSeverity(severity)}
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      {
                        color: selectedSeverity === severity
                          ? 'white'
                          : Colors[colorScheme ?? 'light'].text
                      }
                    ]}
                  >
                    {severity}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
            <View style={styles.filtersRow}>
              <Text style={[styles.filterLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                Type:
              </Text>
              {(['all', 'API_ERROR', 'AUTH_ERROR', 'VALIDATION_ERROR', 'SYSTEM_ERROR', 'USER_ERROR'] as const).map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.filterButton,
                    {
                      backgroundColor: selectedType === type
                        ? Colors[colorScheme ?? 'light'].primary
                        : Colors[colorScheme ?? 'light'].surface
                    }
                  ]}
                  onPress={() => setSelectedType(type)}
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      {
                        color: selectedType === type
                          ? Colors[colorScheme ?? 'light'].background
                          : Colors[colorScheme ?? 'light'].text
                      }
                    ]}
                  >
                    {type.replace('_', ' ')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Logs List */}
        <View style={styles.logsList}>
          {filteredLogs.map((log) => (
            <LogCard key={log.id} log={log} />
          ))}
        </View>
      </ScrollView>

      {/* Log Detail Modal */}
      <Modal
        visible={showLogModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLogModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
            {selectedLog && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={[styles.modalTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                    Error Details
                  </Text>
                  <TouchableOpacity onPress={() => setShowLogModal(false)}>
                    <Ionicons name="close" size={24} color={Colors[colorScheme ?? 'light'].text} />
                  </TouchableOpacity>
                </View>
                
                <ScrollView style={styles.modalScrollView}>
                  <View style={styles.detailSection}>
                    <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                      Message
                    </Text>
                    <Text style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].icon }]}>
                      {selectedLog.message}
                    </Text>
                  </View>

                  <View style={styles.detailSection}>
                    <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                      Severity
                    </Text>
                    <View style={[
                      styles.severityBadge,
                      { backgroundColor: getSeverityColor(selectedLog.severity) }
                    ]}>
                      <Text style={styles.severityText}>{selectedLog.severity}</Text>
                    </View>
                  </View>

                  <View style={styles.detailSection}>
                    <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                      Type
                    </Text>
                    <Text style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].icon }]}>
                      {selectedLog.type.replace('_', ' ')}
                    </Text>
                  </View>

                  {selectedLog.user && (
                    <View style={styles.detailSection}>
                      <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                        User
                      </Text>
                      <Text style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].icon }]}>
                        {selectedLog.user}
                      </Text>
                    </View>
                  )}

                  {selectedLog.endpoint && (
                    <View style={styles.detailSection}>
                      <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                        Endpoint
                      </Text>
                      <Text style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].icon }]}>
                        {selectedLog.endpoint}
                      </Text>
                    </View>
                  )}

                  <View style={styles.detailSection}>
                    <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                      Timestamp
                    </Text>
                    <Text style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].icon }]}>
                      {new Date(selectedLog.timestamp).toLocaleString()}
                    </Text>
                  </View>

                  {selectedLog.stackTrace && (
                    <View style={styles.detailSection}>
                      <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                        Stack Trace
                      </Text>
                      <Text style={[styles.stackTrace, { color: Colors[colorScheme ?? 'light'].icon }]}>
                        {selectedLog.stackTrace}
                      </Text>
                    </View>
                  )}

                  {selectedLog.metadata && (
                    <View style={styles.detailSection}>
                      <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                        Metadata
                      </Text>
                      <Text style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].icon }]}>
                        {JSON.stringify(selectedLog.metadata, null, 2)}
                      </Text>
                    </View>
                  )}
                </ScrollView>

                {!selectedLog.resolved && (
                  <TouchableOpacity
                    style={[styles.resolveButton, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
                    onPress={() => {
                      markAsResolved(selectedLog.id);
                      setShowLogModal(false);
                    }}
                  >
                    <Ionicons name="checkmark" size={16} color="white" />
                    <Text style={styles.resolveButtonText}>Mark as Resolved</Text>
                  </TouchableOpacity>
                )}
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
  filtersScroll: {
    marginBottom: 8,
  },
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  logsList: {
    paddingHorizontal: 20,
  },
  logCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  logInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  logDetails: {
    flex: 1,
    marginLeft: 12,
  },
  logMessage: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  logMeta: {
    fontSize: 12,
  },
  logStatus: {
    alignItems: 'flex-end',
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 4,
  },
  severityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  resolvedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  resolvedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  resolveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 4,
  },
  resolveButtonText: {
    color: 'white',
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
    maxHeight: '80%',
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
  modalScrollView: {
    maxHeight: 400,
  },
  detailSection: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
  },
  stackTrace: {
    fontSize: 12,
    fontFamily: 'monospace',
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 4,
  },
});
