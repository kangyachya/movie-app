import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tabs, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, Modal, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const [searchVisible, setSearchVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const [searchText, setSearchText] = useState('');

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    router.replace('/login');
  };

  const handleMenu = () => {
    setMenuVisible(true);
  };

  const goToSearch = () => {
    setSearchVisible(true);
  };

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          title: 'MovieApp',
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: { position: 'absolute' },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="paperplane.fill" color={color} />
            ),
          }}
        />
      </Tabs>

      {/* Modal Pencarian */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={searchVisible}
        onRequestClose={() => setSearchVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: '80%',
              backgroundColor: '#fff',
              borderRadius: 10,
              padding: 20,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              Cari Sesuatu
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 8,
                paddingHorizontal: 10,
                marginBottom: 15,
                height: 40,
              }}
              placeholder="Ketik kata kunci..."
              value={searchText}
              onChangeText={setSearchText}
              autoFocus
            />
            <Button
              title="Tutup"
              onPress={() => {
                setSearchVisible(false);
                setSearchText('');
              }}
            />
          </View>
        </View>
      </Modal>

      {/* Modal Menu Burger */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
          activeOpacity={1}
          onPressOut={() => setMenuVisible(false)}
        >
          <View
            style={{
              marginTop: 50,
              marginLeft: 20,
              backgroundColor: '#fff',
              borderRadius: 10,
              padding: 15,
              elevation: 5,
              width: 200,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                handleLogout();
              }}
              style={{ padding: 10 }}
            >
              <Text style={{ color: 'red' }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
