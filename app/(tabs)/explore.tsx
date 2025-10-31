import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/lib/hooks/useAuth';
import { useGraffitiData } from '@/lib/hooks/useGraffitiData';

export default function ProfileScreen() {
  const { user, changeUsername } = useAuth();
  const { likedPins, savedPins, getPinsByIds, getArtistById } = useGraffitiData();
  const [localUsername, setLocalUsername] = useState(user?.username || 'Guest User');
  const [activeTab, setActiveTab] = useState<'liked' | 'saved' | 'submissions'>('liked');
  const colorScheme = useColorScheme();

  const handleUsernameBlur = () => {
    if (localUsername !== user?.username && localUsername.trim()) {
      changeUsername(localUsername);
    }
  };

  const likedPinData = getPinsByIds(likedPins);
  const savedPinData = getPinsByIds(savedPins);
  const submissionData: any[] = [];

  const currentData = activeTab === 'liked' ? likedPinData : activeTab === 'saved' ? savedPinData : submissionData;

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <View style={styles.avatarCircle}>
          <IconSymbol name="paperplane.fill" size={40} color={Colors[colorScheme ?? 'light'].tint} />
        </View>
        <TextInput
          style={[styles.usernameInput, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}
          value={localUsername}
          onChangeText={setLocalUsername}
          onBlur={handleUsernameBlur}
          placeholder="Your username"
          placeholderTextColor="#999"
        />
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <ThemedText style={styles.statNumber}>{submissionData.length}</ThemedText>
            <ThemedText style={styles.statLabel}>Submissions</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statNumber}>{likedPins.length}</ThemedText>
            <ThemedText style={styles.statLabel}>Liked</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statNumber}>{savedPins.length}</ThemedText>
            <ThemedText style={styles.statLabel}>Saved</ThemedText>
          </View>
        </View>
      </ThemedView>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'liked' && styles.activeTab]}
          onPress={() => setActiveTab('liked')}
        >
          <IconSymbol 
            name={activeTab === 'liked' ? 'heart.fill' : 'heart'} 
            size={24} 
            color={activeTab === 'liked' ? Colors[colorScheme ?? 'light'].tint : '#999'} 
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'saved' && styles.activeTab]}
          onPress={() => setActiveTab('saved')}
        >
          <IconSymbol 
            name={activeTab === 'saved' ? 'bookmark.fill' : 'bookmark'} 
            size={24} 
            color={activeTab === 'saved' ? Colors[colorScheme ?? 'light'].tint : '#999'} 
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'submissions' && styles.activeTab]}
          onPress={() => setActiveTab('submissions')}
        >
          <IconSymbol 
            name="camera" 
            size={24} 
            color={activeTab === 'submissions' ? Colors[colorScheme ?? 'light'].tint : '#999'} 
          />
        </TouchableOpacity>
      </View>

      {currentData.length === 0 ? (
        <View style={styles.emptyState}>
          <IconSymbol name={activeTab === 'liked' ? 'heart' : activeTab === 'saved' ? 'bookmark' : 'camera'} size={64} color="#ccc" />
          <ThemedText style={styles.emptyText}>
            {activeTab === 'liked' ? 'No liked pins yet' : activeTab === 'saved' ? 'No saved pins yet' : 'No submissions yet'}
          </ThemedText>
          <ThemedText style={styles.emptySubtext}>
            {activeTab === 'submissions' ? 'Tap the + button on the map to add your first graffiti pin!' : 'Explore the map to discover amazing street art'}
          </ThemedText>
        </View>
      ) : (
        <FlatList
          data={currentData}
          numColumns={3}
          scrollEnabled={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.gridItem}>
              <Image
                source={{ uri: item.images[0] }}
                style={styles.gridImage}
                contentFit="cover"
              />
            </TouchableOpacity>
          )}
          columnWrapperStyle={styles.row}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    alignItems: 'center',
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  usernameInput: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    minWidth: 200,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 4,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0a7ea4',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 8,
    textAlign: 'center',
  },
  row: {
    gap: 2,
  },
  gridItem: {
    flex: 1,
    aspectRatio: 1,
    margin: 1,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
});
