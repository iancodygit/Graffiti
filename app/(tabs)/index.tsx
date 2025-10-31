import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { Image } from 'expo-image';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { useGraffitiData } from '@/lib/hooks/useGraffitiData';
import { useAuth } from '@/lib/hooks/useAuth';

export default function MapScreen() {
  const { pins, loading: dataLoading } = useGraffitiData();
  const { loading: authLoading } = useAuth();
  const colorScheme = useColorScheme();

  const loading = dataLoading || authLoading;

  const activePins = pins.filter(p => p.status === 'active');

  const handleMarkerPress = (pinId: number) => {
    const pin = pins.find(p => p.id === pinId);
    if (pin) {
      Alert.alert(
        pin.name,
        `${pin.description}\n\nCity: ${pin.city}\nStyles: ${pin.styleTags?.join(', ') || 'None'}`,
        [
          { text: 'Close', style: 'cancel' },
          { text: 'View Details', onPress: () => console.log('Navigate to pin details') }
        ]
      );
    }
  };

  const handleAddPin = () => {
    Alert.alert(
      'Add Graffiti Pin',
      'This feature will let you add new street art to the map!',
      [{ text: 'Coming Soon!' }]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
        <ThemedText style={styles.loadingText}>Loading street art...</ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={{
          latitude: 40.7589,
          longitude: -73.9851,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {activePins.map((pin) => (
          <Marker
            key={pin.id}
            coordinate={{
              latitude: pin.latitude,
              longitude: pin.longitude,
            }}
            onPress={() => handleMarkerPress(pin.id)}
          >
            <View style={styles.markerContainer}>
              <Image
                source={{ uri: pin.images[0] }}
                style={styles.markerImage}
                contentFit="cover"
              />
            </View>
          </Marker>
        ))}
      </MapView>

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
        onPress={handleAddPin}
      >
        <IconSymbol name="plus" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  placeholderText: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subText: {
    marginTop: 8,
    fontSize: 14,
    opacity: 0.6,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});
