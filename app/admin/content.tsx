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
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useContent } from '../../contexts/ContentContext';
import { LocalRestaurant } from '../../services/localRestaurantService';
import { LocalShop } from '../../services/localShopService';

interface ContentItem {
  id: string;
  type: 'restaurant' | 'shop' | 'activity' | 'service';
  name: string;
  description: string;
  location: string;
  hours: string;
  rating: number;
  imageUrl?: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  updatedAt: string;
  tags: string[];
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
}

export default function ContentManagement() {
  const colorScheme = useColorScheme();
  const { restaurants, shops, addRestaurant, addShop, deleteRestaurant, deleteShop, activateRestaurant, activateShop, refreshContent } = useContent();
  const [filteredContent, setFilteredContent] = useState<(LocalRestaurant | LocalShop)[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'restaurants' | 'shops'>('all');
  const [refreshing, setRefreshing] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState<LocalRestaurant | LocalShop | null>(null);
  const [editingRestaurant, setEditingRestaurant] = useState<Omit<LocalRestaurant, 'id'>>({
    name: '',
    description: '',
    rating: 0,
    distance: '',
    price: '',
    cuisine: '',
    image: null,
    recommended: false,
    hours: '',
    location: '',
    phone: '',
    website: '',
    active: true
  });
  const [editingShop, setEditingShop] = useState<Omit<LocalShop, 'id'>>({
    name: '',
    description: '',
    rating: 0,
    distance: '',
    category: '',
    image: '',
    recommended: false,
    hours: '',
    location: '',
    offers: [],
    active: true
  });
  const [addType, setAddType] = useState<'restaurant' | 'shop'>('restaurant');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    filterContent();
  }, [restaurants, shops, searchQuery, selectedType]);

  const filterContent = () => {
    let allContent: (LocalRestaurant | LocalShop)[] = [];

    // Combine restaurants and shops based on selected type
    if (selectedType === 'all' || selectedType === 'restaurants') {
      allContent = [...allContent, ...restaurants];
    }
    if (selectedType === 'all' || selectedType === 'shops') {
      allContent = [...allContent, ...shops];
    }

    // Filter by search query
    if (searchQuery) {
      allContent = allContent.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ('cuisine' in item ? item.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
        ('category' in item ? item.category.toLowerCase().includes(searchQuery.toLowerCase()) : false)
      );
    }

    setFilteredContent(allContent);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    refreshContent();
    setRefreshing(false);
  };

  const handleContentAction = (contentId: number, contentType: 'restaurant' | 'shop', action: 'delete' | 'activate') => {
    const content = contentType === 'restaurant' 
      ? restaurants.find(r => r.id === contentId)
      : shops.find(s => s.id === contentId);
    
    if (!content) return;

    Alert.alert(
      'Confirm Action',
      `Are you sure you want to ${action} "${content.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: () => executeContentAction(contentId, contentType, action),
        },
      ]
    );
  };

  const executeContentAction = async (contentId: number, contentType: 'restaurant' | 'shop', action: string) => {
    try {
      switch (action) {
        case 'delete':
          if (contentType === 'restaurant') {
            deleteRestaurant(contentId);
          } else {
            deleteShop(contentId);
          }
          break;
        case 'activate':
          if (contentType === 'restaurant') {
            activateRestaurant(contentId);
          } else {
            activateShop(contentId);
          }
          break;
      }
      
      Alert.alert('Success', `${contentType} ${action}d successfully`);
    } catch (error) {
      Alert.alert('Error', `Failed to ${action} ${contentType}`);
    }
  };

  const openContentModal = (content: LocalRestaurant | LocalShop) => {
    setSelectedContent(content);
    setShowContentModal(true);
  };

  const openAddModal = (type: 'restaurant' | 'shop') => {
    setAddType(type);
    if (type === 'restaurant') {
      setEditingRestaurant({
        name: '',
        description: '',
        rating: 0,
        distance: '',
        price: '',
        cuisine: '',
        image: null,
        recommended: false,
        hours: '',
        location: '',
        phone: '',
        website: '',
        active: true
      });
    } else {
      setEditingShop({
        name: '',
        description: '',
        rating: 0,
        distance: '',
        category: '',
        image: '',
        recommended: false,
        hours: '',
        location: '',
        offers: [],
        active: true
      });
    }
    setShowAddModal(true);
  };

  const saveContent = async () => {
    try {
      if (addType === 'restaurant') {
        console.log('Save restaurant called with:', editingRestaurant);
        
        if (!editingRestaurant.name || !editingRestaurant.description) {
          Alert.alert('Error', 'Please fill in required fields (Name and Description)');
          return;
        }

        console.log('Adding restaurant to context...');
        addRestaurant(editingRestaurant);
        
        setEditingRestaurant({
          name: '',
          description: '',
          rating: 0,
          distance: '',
          price: '',
          cuisine: '',
          image: null,
          recommended: false,
          hours: '',
          location: '',
          phone: '',
          website: '',
          active: true
        });
        Alert.alert('Success', 'Restaurant added successfully');
      } else {
        console.log('Save shop called with:', editingShop);
        
        if (!editingShop.name || !editingShop.description) {
          Alert.alert('Error', 'Please fill in required fields (Name and Description)');
          return;
        }

        console.log('Adding shop to context...');
        addShop(editingShop);
        
        setEditingShop({
          name: '',
          description: '',
          rating: 0,
          distance: '',
          category: '',
          image: '',
          recommended: false,
          hours: '',
          location: '',
          offers: [],
          active: true
        });
        Alert.alert('Success', 'Shop added successfully');
      }
      
      setShowAddModal(false);
    } catch (error) {
      console.error('Error saving content:', error);
      Alert.alert('Error', `Failed to save ${addType}`);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'restaurant': return 'restaurant';
      case 'shop': return 'bag';
      case 'activity': return 'game-controller';
      case 'service': return 'construct';
      default: return 'location';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#4CAF50';
      case 'inactive': return '#F44336';
      case 'pending': return '#FF9800';
      default: return '#9E9E9E';
    }
  };

  const ContentCard = ({ content }: { content: LocalRestaurant | LocalShop }) => {
    const isRestaurant = 'cuisine' in content;
    const contentType = isRestaurant ? 'restaurant' : 'shop';
    
    return (
      <TouchableOpacity
        style={[styles.contentCard, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}
        onPress={() => openContentModal(content)}
        activeOpacity={0.7}
      >
        <View style={styles.contentHeader}>
          <View style={styles.contentInfo}>
            <Ionicons
              name={isRestaurant ? "restaurant" : "bag"}
              size={24}
              color={Colors[colorScheme ?? 'light'].primary}
            />
            <View style={styles.contentDetails}>
              <Text style={[styles.contentName, { color: Colors[colorScheme ?? 'light'].text }]}>
                {content.name}
              </Text>
              <Text style={[styles.contentDescription, { color: Colors[colorScheme ?? 'light'].icon }]}>
                {content.description}
              </Text>
              <Text style={[styles.contentLocation, { color: Colors[colorScheme ?? 'light'].icon }]}>
                📍 {content.location} • {isRestaurant ? content.cuisine : content.category} • {isRestaurant ? content.price : 'Shop'}
              </Text>
            </View>
          </View>
                <View style={styles.contentStatus}>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: content.active ? (isRestaurant ? '#4CAF50' : '#2196F3') : '#9E9E9E' }
                  ]}>
                    <Text style={styles.statusText}>
                      {content.active ? contentType.toUpperCase() : 'INACTIVE'}
                    </Text>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={[styles.ratingText, { color: Colors[colorScheme ?? 'light'].text }]}>
                      {content.rating}
                    </Text>
                  </View>
                </View>
        </View>
        
              <View style={styles.contentActions}>
                {!content.active ? (
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
                    onPress={() => handleContentAction(content.id, contentType, 'activate')}
                  >
                    <Ionicons name="checkmark" size={16} color="white" />
                    <Text style={styles.actionButtonText}>Activate</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: '#F44336' }]}
                    onPress={() => handleContentAction(content.id, contentType, 'delete')}
                  >
                    <Ionicons name="trash" size={16} color="white" />
                    <Text style={styles.actionButtonText}>Deactivate</Text>
                  </TouchableOpacity>
                )}
              </View>
      </TouchableOpacity>
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
          <View style={styles.headerTop}>
            <View>
              <Text style={[styles.headerTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                Content Management
              </Text>
              <Text style={[styles.headerSubtitle, { color: Colors[colorScheme ?? 'light'].icon }]}>
                {filteredContent.length} items ({restaurants.length} restaurants, {shops.length} shops)
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.exitButton, { backgroundColor: Colors[colorScheme ?? 'light'].error }]}
              onPress={() => router.push('/(tabs)')}
            >
              <Ionicons name="home" size={20} color="white" />
            </TouchableOpacity>
          </View>
          
          {/* Add Buttons - Moved to better location */}
          <View style={styles.addButtonsContainer}>
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
              onPress={() => openAddModal('restaurant')}
            >
              <Ionicons name="restaurant" size={16} color="white" />
              <Text style={styles.addButtonText}>Add Restaurant</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: Colors[colorScheme ?? 'light'].accent }]}
              onPress={() => openAddModal('shop')}
            >
              <Ionicons name="bag" size={16} color="white" />
              <Text style={styles.addButtonText}>Add Shop</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search and Filters */}
        <View style={styles.filtersContainer}>
          <View style={[styles.searchContainer, { backgroundColor: Colors[colorScheme ?? 'light'].surface }]}>
            <Ionicons name="search" size={20} color={Colors[colorScheme ?? 'light'].icon} />
            <TextInput
              style={[styles.searchInput, { color: Colors[colorScheme ?? 'light'].text }]}
              placeholder="Search restaurants..."
              placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          
          {/* Type Filter */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
            <View style={styles.filtersRow}>
              <Text style={[styles.filterLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                Type:
              </Text>
              {(['all', 'restaurants', 'shops'] as const).map((type) => (
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
                          ? 'white'
                          : Colors[colorScheme ?? 'light'].text
                      }
                    ]}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Content List */}
        <View style={styles.contentList}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={[styles.loadingText, { color: Colors[colorScheme ?? 'light'].text }]}>
                Loading content...
              </Text>
            </View>
          ) : filteredContent.length > 0 ? (
            filteredContent.map((item) => (
              <ContentCard key={item.id} content={item} />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons 
                name="storefront-outline" 
                size={48} 
                color={Colors[colorScheme ?? 'light'].icon} 
              />
              <Text style={[styles.emptyText, { color: Colors[colorScheme ?? 'light'].text }]}>
                No content found
              </Text>
              <Text style={[styles.emptySubtext, { color: Colors[colorScheme ?? 'light'].icon }]}>
                {searchQuery ? `No content matches "${searchQuery}"` : 'Add your first restaurant or shop to get started'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Content Detail Modal */}
      <Modal
        visible={showContentModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowContentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
            {selectedContent && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={[styles.modalTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                    {('cuisine' in selectedContent ? 'Restaurant' : 'Shop')} Details
                  </Text>
                  <TouchableOpacity onPress={() => setShowContentModal(false)}>
                    <Ionicons name="close" size={24} color={Colors[colorScheme ?? 'light'].text} />
                  </TouchableOpacity>
                </View>
                
                <ScrollView style={styles.modalScrollView}>
                  <View style={styles.detailSection}>
                    <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                      Name
                    </Text>
                    <Text style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].icon }]}>
                      {selectedContent.name}
                    </Text>
                  </View>

                  <View style={styles.detailSection}>
                    <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                      Description
                    </Text>
                    <Text style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].icon }]}>
                      {selectedContent.description}
                    </Text>
                  </View>

                  <View style={styles.detailSection}>
                    <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                      Location
                    </Text>
                    <Text style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].icon }]}>
                      {selectedContent.location}
                    </Text>
                  </View>

                  <View style={styles.detailSection}>
                    <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                      Hours
                    </Text>
                    <Text style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].icon }]}>
                      {selectedContent.hours}
                    </Text>
                  </View>

                  <View style={styles.detailSection}>
                    <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                      Rating
                    </Text>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={20} color="#FFD700" />
                      <Text style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].icon }]}>
                        {selectedContent.rating}/5
                      </Text>
                    </View>
                  </View>

                  {('cuisine' in selectedContent) ? (
                    <>
                      <View style={styles.detailSection}>
                        <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                          Cuisine & Price
                        </Text>
                        <Text style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].icon }]}>
                          {selectedContent.cuisine} • {selectedContent.price}
                        </Text>
                      </View>

                      <View style={styles.detailSection}>
                        <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                          Contact
                        </Text>
                        <Text style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].icon }]}>
                          📞 {selectedContent.phone}
                        </Text>
                        <Text style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].icon }]}>
                          🌐 {selectedContent.website}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <View style={styles.detailSection}>
                      <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                        Category
                      </Text>
                      <Text style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].icon }]}>
                        {selectedContent.category}
                      </Text>
                    </View>
                  )}

                  <View style={styles.detailSection}>
                    <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                      Distance
                    </Text>
                    <Text style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].icon }]}>
                      {selectedContent.distance}
                    </Text>
                  </View>

                  {('offers' in selectedContent && selectedContent.offers.length > 0) && (
                    <View style={styles.detailSection}>
                      <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                        Special Offers
                      </Text>
                      {selectedContent.offers.map((offer, index) => (
                        <Text key={index} style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].icon }]}>
                          • {offer}
                        </Text>
                      ))}
                    </View>
                  )}
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Add Content Modal */}
      <Modal
        visible={showAddModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                Add New {addType === 'restaurant' ? 'Restaurant' : 'Shop'}
              </Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Ionicons name="close" size={24} color={Colors[colorScheme ?? 'light'].text} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalScrollView}>
              <View style={styles.inputSection}>
                <Text style={[styles.inputLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                  {addType === 'restaurant' ? 'Restaurant' : 'Shop'} Name *
                </Text>
                <TextInput
                  style={[styles.textInput, { 
                    backgroundColor: Colors[colorScheme ?? 'light'].surface,
                    color: Colors[colorScheme ?? 'light'].text 
                  }]}
                  value={addType === 'restaurant' ? editingRestaurant.name : editingShop.name}
                  onChangeText={(text) => {
                    if (addType === 'restaurant') {
                      setEditingRestaurant({ ...editingRestaurant, name: text });
                    } else {
                      setEditingShop({ ...editingShop, name: text });
                    }
                  }}
                  placeholder={`Enter ${addType} name`}
                  placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
                />
              </View>

              <View style={styles.inputSection}>
                <Text style={[styles.inputLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Description *
                </Text>
                <TextInput
                  style={[styles.textInput, styles.textArea, { 
                    backgroundColor: Colors[colorScheme ?? 'light'].surface,
                    color: Colors[colorScheme ?? 'light'].text 
                  }]}
                  value={addType === 'restaurant' ? editingRestaurant.description : editingShop.description}
                  onChangeText={(text) => {
                    if (addType === 'restaurant') {
                      setEditingRestaurant({ ...editingRestaurant, description: text });
                    } else {
                      setEditingShop({ ...editingShop, description: text });
                    }
                  }}
                  placeholder={`Enter ${addType} description`}
                  placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={styles.inputSection}>
                <Text style={[styles.inputLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Location
                </Text>
                <TextInput
                  style={[styles.textInput, { 
                    backgroundColor: Colors[colorScheme ?? 'light'].surface,
                    color: Colors[colorScheme ?? 'light'].text 
                  }]}
                  value={editingRestaurant.location}
                  onChangeText={(text) => setEditingRestaurant({ ...editingRestaurant, location: text })}
                  placeholder="e.g., Concourse A, Gate 12"
                  placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
                />
              </View>

              <View style={styles.inputSection}>
                <Text style={[styles.inputLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Cuisine Type
                </Text>
                <TextInput
                  style={[styles.textInput, { 
                    backgroundColor: Colors[colorScheme ?? 'light'].surface,
                    color: Colors[colorScheme ?? 'light'].text 
                  }]}
                  value={editingRestaurant.cuisine}
                  onChangeText={(text) => setEditingRestaurant({ ...editingRestaurant, cuisine: text })}
                  placeholder="e.g., American, Italian, Asian"
                  placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
                />
              </View>

              <View style={styles.inputSection}>
                <Text style={[styles.inputLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Price Range
                </Text>
                <TextInput
                  style={[styles.textInput, { 
                    backgroundColor: Colors[colorScheme ?? 'light'].surface,
                    color: Colors[colorScheme ?? 'light'].text 
                  }]}
                  value={editingRestaurant.price}
                  onChangeText={(text) => setEditingRestaurant({ ...editingRestaurant, price: text })}
                  placeholder="e.g., $, $$, $$$"
                  placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
                />
              </View>

              <View style={styles.inputSection}>
                <Text style={[styles.inputLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Rating (0-5)
                </Text>
                <TextInput
                  style={[styles.textInput, { 
                    backgroundColor: Colors[colorScheme ?? 'light'].surface,
                    color: Colors[colorScheme ?? 'light'].text 
                  }]}
                  value={editingRestaurant.rating.toString()}
                  onChangeText={(text) => setEditingRestaurant({ ...editingRestaurant, rating: parseFloat(text) || 0 })}
                  placeholder="4.5"
                  placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputSection}>
                <Text style={[styles.inputLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Distance
                </Text>
                <TextInput
                  style={[styles.textInput, { 
                    backgroundColor: Colors[colorScheme ?? 'light'].surface,
                    color: Colors[colorScheme ?? 'light'].text 
                  }]}
                  value={editingRestaurant.distance}
                  onChangeText={(text) => setEditingRestaurant({ ...editingRestaurant, distance: text })}
                  placeholder="e.g., 2 min walk"
                  placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
                />
              </View>

              <View style={styles.inputSection}>
                <Text style={[styles.inputLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Hours
                </Text>
                <TextInput
                  style={[styles.textInput, { 
                    backgroundColor: Colors[colorScheme ?? 'light'].surface,
                    color: Colors[colorScheme ?? 'light'].text 
                  }]}
                  value={editingRestaurant.hours}
                  onChangeText={(text) => setEditingRestaurant({ ...editingRestaurant, hours: text })}
                  placeholder="e.g., 6:00 AM - 10:00 PM"
                  placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
                />
              </View>

              <View style={styles.inputSection}>
                <Text style={[styles.inputLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Phone
                </Text>
                <TextInput
                  style={[styles.textInput, { 
                    backgroundColor: Colors[colorScheme ?? 'light'].surface,
                    color: Colors[colorScheme ?? 'light'].text 
                  }]}
                  value={editingRestaurant.phone}
                  onChangeText={(text) => setEditingRestaurant({ ...editingRestaurant, phone: text })}
                  placeholder="e.g., +1 (404) 555-0123"
                  placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
                />
              </View>

              <View style={styles.inputSection}>
                <Text style={[styles.inputLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Website
                </Text>
                <TextInput
                  style={[styles.textInput, { 
                    backgroundColor: Colors[colorScheme ?? 'light'].surface,
                    color: Colors[colorScheme ?? 'light'].text 
                  }]}
                  value={editingRestaurant.website}
                  onChangeText={(text) => setEditingRestaurant({ ...editingRestaurant, website: text })}
                  placeholder="e.g., www.restaurant.com"
                  placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
                />
              </View>
            </ScrollView>

            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
              onPress={() => {
                console.log('Save button pressed!');
                Alert.alert('Debug', 'Save button was pressed!');
                saveContent();
              }}
            >
              <Text style={styles.saveButtonText}>Add {addType === 'restaurant' ? 'Restaurant' : 'Shop'}</Text>
            </TouchableOpacity>
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  addButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  exitButton: {
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
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
  contentList: {
    paddingHorizontal: 20,
  },
  contentCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  contentInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  contentDetails: {
    flex: 1,
    marginLeft: 12,
  },
  contentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  contentDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  contentLocation: {
    fontSize: 12,
  },
  contentStatus: {
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
  },
  contentActions: {
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
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  inputSection: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

