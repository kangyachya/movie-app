import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { auth } from '../config/firebaseConfig'; // Pastikan path ini sesuai dengan lokasi firebaseConfig.ts

export default function login({ navigation }: any) {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Login Berhasil", `Selamat datang ${userCredential.user.displayName}`);
      router.replace("(tabs)"); // pindah ke halaman Home
    } catch (error: any) {
      Alert.alert("Login Gagal", error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      {/* Logo */}
      <Image
        source={require('../assets/images/logostreaming.png')} // Pastikan logo.png ada di folder assets
        style={{
          width: 120,
          height: 120,
          marginBottom: 20,
          resizeMode: 'contain',
          alignSelf: 'center',
        }}
      />
      <Text style={{ fontSize: 20, marginBottom: 20, alignSelf: 'center' }}>Login</Text>
      <TextInput
        placeholder="Enter Your Email"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"/>
      <TextInput
        placeholder="Enter Your Password"
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 20, padding: 8 }}
        value={password}
        onChangeText={setPassword}
        />
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: '#4CAF50', // hijau
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 8,
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
          Masuk
        </Text>
      </TouchableOpacity>
      {/* Tombol Register */}
      <Text style={{ marginTop: 20, textAlign: 'center' }}>
        Belum Punya Akun?{' '}
        <Text
          style={{ color: 'green', fontWeight: 'bold' }}
          onPress={() => router.push('/register')}
        >
          Daftar Sekarang
        </Text>
      </Text>
    </View>
  );
}
