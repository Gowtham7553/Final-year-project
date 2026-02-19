import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://10.160.239.124:5000";

export default function LoginScreen({ navigation }) {
  const [role, setRole] = useState("Volunteer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔐 AUTH + AUTHORIZATION LOGIN
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          role, // ⭐ VERY IMPORTANT
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      // 🔐 CLEAR OLD SESSION
      await AsyncStorage.clear();

      // ✅ ROLE BASED NAVIGATION (STRICT)
      if (role === "Volunteer") {
        await AsyncStorage.setItem(
          "volunteer",
          JSON.stringify({ volunteerId: data.userId })
        );

        navigation.reset({
          index: 0,
          routes: [{ name: "VolunteerHub" }],
        });

      } else if (role === "Donor") {
        await AsyncStorage.setItem(
          "donor",
          JSON.stringify({ donorId: data.userId })
        );

        navigation.reset({
          index: 0,
          routes: [{ name: "DonorHub" }],
        });

      } else if (role === "Home") {

  // save in storage
  await AsyncStorage.setItem(
    "home",
    JSON.stringify({ homeId: data.userId })
  );

  // ⭐ PASS homeId to profile screen
  navigation.reset({
    index: 0,
    routes: [
      {
        name: "HomeProfile",
        params: { homeId: data.userId }, // ⭐ IMPORTANT
      },
    ],
  });
}

    } catch (error) {
      Alert.alert("Error", "Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
       <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
  <Ionicons name="arrow-back" size={22} />
</TouchableOpacity>


        <View style={styles.headerCenter}>
          <Ionicons name="hand-left" size={20} color="#8B5CF6" />
          <Text style={styles.logoText}>Hope Connect</Text>
        </View>

        <View style={{ width: 22 }} />
      </View>

      {/* Title */}
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>
        Enter your details to continue your impact.
      </Text>

      {/* Role Selector */}
      <View style={styles.roleSwitch}>
        {["Volunteer", "Donor", "Home"].map((item) => {
          const active = role === item;
          return (
            <TouchableOpacity
              key={item}
              style={[styles.roleBtn, active && styles.roleActive]}
              onPress={() => setRole(item)}
            >
              <Text
                style={[styles.roleText, active && styles.roleTextActive]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.roleLabel}>SELECT ACCOUNT TYPE</Text>

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <View style={styles.inputBox}>
        <Ionicons name="mail-outline" size={18} color="#9CA3AF" />
        <TextInput
          style={styles.input}
          placeholder="hello@hopeconnect.org"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.inputBox}>
        <Ionicons name="lock-closed-outline" size={18} color="#9CA3AF" />
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Ionicons name="eye-outline" size={18} color="#9CA3AF" />
      </View>

      {/* Forgot */}
      <TouchableOpacity style={styles.forgot}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login */}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.loginText}>
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const PURPLE = "#8B5CF6";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F5FF",
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    marginLeft: 6,
    fontWeight: "700",
    color: PURPLE,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#3B1D6A",
    marginBottom: 8,
  },
  subtitle: {
    color: "#6B7280",
    marginBottom: 24,
  },
  roleSwitch: {
    flexDirection: "row",
    backgroundColor: "#EFEAFE",
    borderRadius: 24,
    padding: 4,
    marginBottom: 8,
  },
  roleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  roleActive: {
    backgroundColor: "#fff",
  },
  roleText: {
    fontWeight: "600",
    color: "#6B7280",
  },
  roleTextActive: {
    color: PURPLE,
  },
  roleLabel: {
    fontSize: 11,
    letterSpacing: 1,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 6,
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 14,
  },
  input: {
    flex: 1,
    marginLeft: 8,
  },
  forgot: {
    alignSelf: "flex-end",
    marginBottom: 30,
  },
  forgotText: {
    color: PURPLE,
    fontWeight: "600",
  },
  loginBtn: {
    backgroundColor: PURPLE,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
