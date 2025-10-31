import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import { User } from '../types';

const USER_STORAGE_KEY = '@graffiti_maps_user';

async function getDeviceId(): Promise<string> {
  let deviceId = await AsyncStorage.getItem('DEVICE_ID');
  
  if (!deviceId) {
    deviceId = Device.modelId || `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await AsyncStorage.setItem('DEVICE_ID', deviceId);
  }
  
  return deviceId;
}

async function initializeUser(): Promise<User> {
  const deviceId = await getDeviceId();
  const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
  
  if (storedUser) {
    return JSON.parse(storedUser);
  }
  
  const newUser: User = {
    id: Math.floor(Math.random() * 10000),
    deviceId,
    username: 'Guest User',
    createdAt: new Date(),
  };
  
  await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
  return newUser;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initAuth();
  }, []);

  const initAuth = async () => {
    try {
      const currentUser = await initializeUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const changeUsername = async (newUsername: string) => {
    if (!user) return;
    try {
      const updatedUser = { ...user, username: newUsername };
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Update username error:', error);
    }
  };

  return { user, loading, changeUsername };
}
