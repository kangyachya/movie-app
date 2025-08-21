import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsLoggedIn(!!token);
      setIsLoading(false);
    };

    checkLogin();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        // Kalau sudah login, masuk ke Tab Layout
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
      ) : (
        // Kalau belum login, masuk ke halaman Login
        <Stack.Screen name="login"  options={{ headerShown: false }}/>
      )}
      <Stack.Screen name="register" options={{ headerShown: true, title: 'Daftar Akun' }}/>
    </Stack>
  );
}
