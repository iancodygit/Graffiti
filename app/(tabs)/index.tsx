import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ActivityIndicator, Alert, ScrollView, FlatList } from 'react-native';
import { Image } from 'expo-image';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGraffitiData } from '@/lib/hooks/useGraffitiData';
import { useAuth } from '@/lib/hooks/useAuth';

export default function MapScreen() {
  const { pins, toggleLike, likedPins, loading: dataLoading, getArtistById } = useGraffitiData();
  const { loading: authLoading } = useAuth();
  const colorScheme = useColorScheme();

  const loading = dataLoading || authLoading;

  const activePins = pins.filter(p => p.status === 'active');

  const handlePinPress = (pinId: number) => {
    const pin = pins.find(p => p.id === pinId);
    const artist = pin?.artistId ? getArtistById(pin.artistId) : null;
    
    if (pin) {
      Alert.alert(
        pin.name,
        `${pin.description || 'No description'}\n\n📍 ${pin.city}\n🎨 ${pin.styleTags?.join(', ') || 'No tags'}\n${artist ? `👤 ${artist.handle}` : ''}`,
        [
          { 
            text: likedPins.includes(pinId) ? '💔 Unlike' : '❤️ Like',
            onPress: () => toggleLike(pinId)
          },
          { text: 'Close', style: 'cancel' }
        ]
      );
    }
  };

  const handleAddPin = () => {
    Alert.alert(
      'Add Graffiti Pin',
      'This feature will let you add new street art!\n\n📸 Camera integration\n📍 Location tagging\n🎨 Style categorization',
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
      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.header}>
          <IconSymbol name="location" size={32} color={Colors[colorScheme ?? 'light'].tint} />
          <ThemedText style={styles.headerText}>Discover Street Art</ThemedText>
          <ThemedText style={styles.subHeader}>NYC • {activePins.length} pieces</ThemedText>
        </ThemedView>

        <FlatList
          data={activePins}
          scrollEnabled={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const artist = item.artistId ? getArtistById(item.artistId) : null;
            const isLiked = likedPins.includes(item.id);
            
            return (
              <TouchableOpacity 
                style={styles.pinCard}
                onPress={() => handlePinPress(item.id)}
                activeOpacity={0.7}
              >
                <Image
                  source={{ uri: item.images[0] }}
                  style={styles.pinImage}
                  contentFit="cover"
                />
                <View style={styles.pinInfo}>
                  <View style={styles.pinHeader}>
                    <ThemedText style={styles.pinName}>{item.name}</ThemedText>
                    <TouchableOpacity onPress={() => toggleLike(item.id)}>
                      <IconSymbol 
                        name={isLiked ? 'heart.fill' : 'heart'} 
                        size={24} 
                        color={isLiked ? '#ff6b6b' : '#999'} 
                      />
                    </TouchableOpacity>
                  </View>
                  <ThemedText style={styles.pinLocation}>📍 {item.city}</ThemedText>
                  {artist && (
                    <ThemedText style={styles.pinArtist}>by {artist.handle}</ThemedText>
                  )}
                  {item.styleTags && item.styleTags.length > 0 && (
                    <View style={styles.tagsContainer}>
                      {item.styleTags.map((tag, index) => (
                        <View key={index} style={styles.tag}>
                          <ThemedText style={styles.tagText}>{tag}</ThemedText>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>

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
  scrollView: {
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
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  subHeader: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 4,
  },
  pinCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pinImage: {
    width: '100%',
    height: 200,
  },
  pinInfo: {
    padding: 16,
  },
  pinHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  pinName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  pinLocation: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  pinArtist: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
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
