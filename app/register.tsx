import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from "../config/firebaseConfig";
export default function Register() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const handleRegister = async () =>{
    if (!name || !email || !password) {
      Alert.alert("Error", "Semua field wajib diisi");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update nama displayName di Firebase Auth
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      Alert.alert("Berhasil", "Pendaftaran berhasil!");
      router.replace("/login"); // kembali ke login
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20, alignSelf: 'center' }}>Register</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 20, padding: 8 }}
      />

      <TouchableOpacity
        onPress={handleRegister}
        style={{
          backgroundColor: "#4CAF50",
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 8,
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Daftar</Text>
      </TouchableOpacity>
    </View>
  );
}
