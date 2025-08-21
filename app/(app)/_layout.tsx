import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { View } from 'react-native';

export default function AppLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  // Custom drawer dengan tombol logout
  function CustomDrawerContent(props: any) {
    const handleLogout = async () => {
      await AsyncStorage.removeItem('userToken');
      router.replace('/login');
    };

    return (
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
        {/* Menu default */}
        <DrawerItemList {...props} />

        {/* Spacer agar Logout ada di bawah */}
        <View style={{ flex: 1 }} />

        {/* Tombol Logout */}
        <DrawerItem
          label="Logout"
          icon={({ color, size }) => <Ionicons name="log-out" size={size} color={color} />}
          labelStyle={{ color: 'red' }}
          onPress={handleLogout}
        />
      </DrawerContentScrollView>
    );
  }

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Home',
          title: 'MovieApp',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: 'Profile',
          title: 'Profile',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: 'Settings',
          title: 'Settings',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
