import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CreateAccountScreen({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    country: "",
    password: "",
  });

  const update = (key, value) =>
    setForm({ ...form, [key]: value });

  // 🔹 REGISTER HANDLER
  const handleRegister = async () => {
    if (!form.name || !form.email || !form.phone || !form.password) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    try {
      const response = await fetch(
        "http://10.172.162.124:5000/api/donors/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message || "Registration failed");
        return;
      }

      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("DonorHub");
    } catch (error) {
      Alert.alert("Error", "Server not reachable");
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Account</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Title */}
      <Text style={styles.title}>
        Register to start{`\n`}changing lives today.
      </Text>

      {/* Full Name */}
      <Text style={styles.label}>Full Name</Text>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Jane Doe"
          value={form.name}
          onChangeText={(v) => update("name", v)}
        />
        <Ionicons name="person-outline" size={18} color="#9CA3AF" />
      </View>

      {/* Email */}
      <Text style={styles.label}>Email Address</Text>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="jane@example.com"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(v) => update("email", v)}
        />
        <Ionicons name="mail-outline" size={18} color="#9CA3AF" />
      </View>

      {/* Phone */}
      <Text style={styles.label}>Phone Number</Text>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="9876543210"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(v) => update("phone", v)}
        />
        <Ionicons name="call-outline" size={18} color="#9CA3AF" />
      </View>

      {/* Address */}
      <Text style={styles.label}>Street Address</Text>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="123 Hope Lane"
          value={form.address}
          onChangeText={(v) => update("address", v)}
        />
        <Ionicons name="location-outline" size={18} color="#9CA3AF" />
      </View>

      {/* State */}
      <Text style={styles.label}>State / Province</Text>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Tamil Nadu"
          value={form.state}
          onChangeText={(v) => update("state", v)}
        />
        <Ionicons name="map-outline" size={18} color="#9CA3AF" />
      </View>

      {/* City + Country */}
      <View style={styles.row}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.inputSingle}
            placeholder="Chennai"
            value={form.city}
            onChangeText={(v) => update("city", v)}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Country</Text>
          <TextInput
            style={styles.inputSingle}
            placeholder="India"
            value={form.country}
            onChangeText={(v) => update("country", v)}
          />
        </View>
      </View>

      {/* Password */}
      <Text style={styles.label}>Create Password</Text>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Min. 8 characters"
          secureTextEntry
          value={form.password}
          onChangeText={(v) => update("password", v)}
        />
        <Ionicons name="eye-off-outline" size={18} color="#9CA3AF" />
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register & Continue</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.secure}>🔒 Bank-grade SSL Security</Text>

      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          Log in
        </Text>
      </Text>

      <Text style={styles.terms}>
        By registering, you agree to Hope Connect’s{" "}
        <Text style={styles.link}>Terms of Service</Text> and{" "}
        <Text style={styles.link}>Privacy Policy</Text>.
      </Text>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const PURPLE = "#7C3AED";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 14,
  },
  headerTitle: {
    fontWeight: "700",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 20,
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  input: {
    flex: 1,
  },
  inputSingle: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  row: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: PURPLE,
    padding: 18,
    borderRadius: 30,
    alignItems: "center",
    marginVertical: 24,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  secure: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 14,
  },
  loginText: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 10,
  },
  loginLink: {
    color: PURPLE,
    fontWeight: "700",
  },
  terms: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
  },
  link: {
    color: PURPLE,
    fontWeight: "600",
  },
});
