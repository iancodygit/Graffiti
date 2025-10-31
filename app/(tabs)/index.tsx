import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, ActivityIndicator, Alert, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { useGraffitiData } from '@/lib/hooks/useGraffitiData';
import { useAuth } from '@/lib/hooks/useAuth';

export default function MapScreen() {
  const { pins, toggleLike, likedPins, loading: dataLoading, getArtistById } = useGraffitiData();
  const { loading: authLoading } = useAuth();
  const colorScheme = useColorScheme();
  const mapRef = useRef<MapView>(null);
  const [userLocation, setUserLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [selectedPin, setSelectedPin] = useState<any>(null);

  const loading = dataLoading || authLoading;

  const activePins = pins.filter(p => p.status === 'active');

  // Request location permissions and get user location
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          setUserLocation(location.coords);
        }
      } catch (error) {
        console.log('Error getting location:', error);
      }
    })();
  }, []);

  const handleMarkerPress = (pin: any) => {
    setSelectedPin(pin);
    const artist = pin.artistId ? getArtistById(pin.artistId) : null;

    Alert.alert(
      pin.name,
      `${pin.description || 'No description'}\n\n📍 ${pin.city}\n🎨 ${pin.styleTags?.join(', ') || 'No tags'}\n${artist ? `👤 ${artist.handle}` : ''}`,
      [
        {
          text: likedPins.includes(pin.id) ? '💔 Unlike' : '❤️ Like',
          onPress: () => toggleLike(pin.id)
        },
        { text: 'Close', style: 'cancel', onPress: () => setSelectedPin(null) }
      ],
      { onDismiss: () => setSelectedPin(null) }
    );
  };

  const handleAddPin = () => {
    Alert.alert(
      'Add Graffiti Pin',
      'This feature will let you add new street art!\n\n📸 Camera integration\n📍 Location tagging\n🎨 Style categorization',
      [{ text: 'Coming Soon!' }]
    );
  };

  const handleMyLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);

      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }, 1000);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not get your location');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
        <ThemedText style={styles.loadingText}>Loading street art...</ThemedText>
      </View>
    );
  }

  // Default to NYC area
  const initialRegion = {
    latitude: activePins.length > 0 ? activePins[0].latitude : 40.7589,
    longitude: activePins.length > 0 ? activePins[0].longitude : -73.9851,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_DEFAULT} // Use default provider (Apple Maps on iOS)
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={true}
      >
        {activePins.map((pin) => (
          <Marker
            key={pin.id}
            coordinate={{
              latitude: pin.latitude,
              longitude: pin.longitude,
            }}
            onPress={() => handleMarkerPress(pin)}
            pinColor={likedPins.includes(pin.id) ? '#ff6b6b' : Colors[colorScheme ?? 'light'].tint}
          />
        ))}
      </MapView>

      {/* Info banner */}
      <View style={styles.infoBanner}>
        <IconSymbol name="location" size={24} color={Colors[colorScheme ?? 'light'].tint} />
        <View style={styles.infoText}>
          <ThemedText style={styles.infoTitle}>Street Art Map</ThemedText>
          <ThemedText style={styles.infoSubtitle}>{activePins.length} pieces nearby</ThemedText>
        </View>
      </View>

      {/* My location button */}
      <TouchableOpacity
        style={[styles.locationButton, { backgroundColor: 'white' }]}
        onPress={handleMyLocation}
      >
        <IconSymbol name="location.fill" size={24} color={Colors[colorScheme ?? 'light'].tint} />
      </TouchableOpacity>

      {/* Add pin FAB */}
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
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
  infoBanner: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  infoText: {
    marginLeft: 12,
    flex: 1,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoSubtitle: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 2,
  },
  locationButton: {
    position: 'absolute',
    right: 20,
    bottom: 160,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 90,
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
