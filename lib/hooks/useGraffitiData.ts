import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockPins, mockArtists } from '../mock-data';

const LIKES_KEY = '@graffiti_likes';
const SAVED_KEY = '@graffiti_saved';

export function useGraffitiData() {
  const [pins, setPins] = useState(mockPins);
  const [likedPins, setLikedPins] = useState<number[]>([]);
  const [savedPins, setSavedPins] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const liked = await AsyncStorage.getItem(LIKES_KEY);
      const saved = await AsyncStorage.getItem(SAVED_KEY);
      
      if (liked) setLikedPins(JSON.parse(liked));
      if (saved) setSavedPins(JSON.parse(saved));
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (pinId: number) => {
    const newLikes = likedPins.includes(pinId)
      ? likedPins.filter(id => id !== pinId)
      : [...likedPins, pinId];
    
    setLikedPins(newLikes);
    await AsyncStorage.setItem(LIKES_KEY, JSON.stringify(newLikes));
  };

  const toggleSave = async (pinId: number) => {
    const newSaved = savedPins.includes(pinId)
      ? savedPins.filter(id => id !== pinId)
      : [...savedPins, pinId];
    
    setSavedPins(newSaved);
    await AsyncStorage.setItem(SAVED_KEY, JSON.stringify(newSaved));
  };

  const getPinsByIds = (ids: number[]) => {
    return pins.filter(pin => ids.includes(pin.id));
  };

  const getArtistById = (artistId: number | null) => {
    return mockArtists.find(a => a.id === artistId) || null;
  };

  return {
    pins,
    artists: mockArtists,
    likedPins,
    savedPins,
    loading,
    toggleLike,
    toggleSave,
    getPinsByIds,
    getArtistById,
  };
}
