import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const [role, setRole] = useState("Volunteer");

  // 🔹 ROLE-BASED LOGIN HANDLER (FINAL)
  const handleLogin = () => {
    if (role === "Home") {
      navigation.navigate("HomeProfile");
    } else if (role === "Donor") {
      navigation.navigate("DonorHub");
    } else {
      navigation.navigate("Home"); // Volunteer
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
      <Text style={styles.label}>Email or Username</Text>
      <View style={styles.inputBox}>
        <Ionicons name="mail-outline" size={18} color="#9CA3AF" />
        <TextInput
          style={styles.input}
          placeholder="hello@hopeconnect.org"
          keyboardType="email-address"
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
        />
        <Ionicons name="eye-outline" size={18} color="#9CA3AF" />
      </View>

      {/* Forgot */}
      <TouchableOpacity style={styles.forgot}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login */}
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
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
