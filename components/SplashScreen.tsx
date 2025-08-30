import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const colorScheme = useColorScheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Purple gradient background with geometric patterns */}
      <View style={styles.backgroundGradient}>
        {/* Geometric shapes for depth */}
        <View style={[styles.geometricShape, styles.shape1]} />
        <View style={[styles.geometricShape, styles.shape2]} />
        <View style={[styles.geometricShape, styles.shape3]} />
        <View style={[styles.geometricShape, styles.shape4]} />
        <View style={[styles.geometricShape, styles.shape5]} />
      </View>

      {/* Centered content */}
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }
        ]}
      >
        {/* App name with stencil effect */}
        <Text style={styles.appName}>
          Fly ATL
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6b46c1', // Primary purple
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#6b46c1',
  },
  geometricShape: {
    position: 'absolute',
    opacity: 0.3,
  },
  shape1: {
    top: height * 0.1,
    right: width * 0.1,
    width: 120,
    height: 80,
    backgroundColor: '#9f7aea',
    borderRadius: 20,
    transform: [{ rotate: '15deg' }],
  },
  shape2: {
    bottom: height * 0.2,
    left: width * 0.05,
    width: 100,
    height: 60,
    backgroundColor: '#d53f8c',
    borderRadius: 15,
    transform: [{ rotate: '-25deg' }],
  },
  shape3: {
    top: height * 0.4,
    left: width * 0.2,
    width: 80,
    height: 80,
    backgroundColor: '#553c9a',
    borderRadius: 40,
    transform: [{ rotate: '45deg' }],
  },
  shape4: {
    bottom: height * 0.4,
    right: width * 0.15,
    width: 90,
    height: 50,
    backgroundColor: '#e9d8fd',
    borderRadius: 25,
    transform: [{ rotate: '10deg' }],
  },
  shape5: {
    top: height * 0.6,
    right: width * 0.3,
    width: 70,
    height: 70,
    backgroundColor: '#9f7aea',
    borderRadius: 35,
    transform: [{ rotate: '-30deg' }],
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  appName: {
    fontSize: 48,
    fontWeight: '900',
    color: '#ffffff',
    fontFamily: 'System',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 2,
  },
}); 