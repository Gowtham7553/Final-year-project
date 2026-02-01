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

export default function RegisterHomeScreen({ navigation }) {
  // 🔹 STATES
  const [homeName, setHomeName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [repName, setRepName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [capacity, setCapacity] = useState("");
  const [needsDesc, setNeedsDesc] = useState("");

  const needsTags = ["Food", "Medical", "Education", "Clothing"];

  // 🔹 SUBMIT HANDLER
  const handleSubmit = async () => {
    if (!homeName || !registrationNumber || !repName || !phone || !email) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    try {
      const response = await fetch(
        "http://10.79.215.124:5000/api/homes/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            homeName,
            registrationNumber,
            representativeName: repName,
            phone,
            email,
            address: {
              street,
              city,
              zipCode: zip,
            },
            capacity: Number(capacity),
            needsDescription: needsDesc,
            needsTags,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message || "Registration failed");
        return;
      }

      Alert.alert("Success", "Home registered successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Server not reachable");
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Register Home</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.title}>Join our network</Text>
      <Text style={styles.subtitle}>
        Register your children's home to receive support and volunteers.
      </Text>

      {/* Organization */}
      <Text style={styles.section}>Organization Details</Text>

      <Text style={styles.label}>Home Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Sunshine Orphanage"
        value={homeName}
        onChangeText={setHomeName}
      />

      <Text style={styles.label}>Registration Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Govt ID"
        value={registrationNumber}
        onChangeText={setRegistrationNumber}
      />

      {/* Contact */}
      <Text style={styles.section}>Contact Information</Text>

      <Text style={styles.label}>Representative Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={repName}
        onChangeText={setRepName}
      />

      <Text style={styles.label}>Phone Number</Text>
      <View style={styles.inputWithIcon}>
        <Ionicons name="call-outline" size={18} color="#9CA3AF" />
        <TextInput
          style={styles.flex}
          placeholder="9876543210"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <Text style={styles.label}>Email Address</Text>
      <View style={styles.inputWithIcon}>
        <Ionicons name="mail-outline" size={18} color="#9CA3AF" />
        <TextInput
          style={styles.flex}
          placeholder="contact@example.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Address */}
      <Text style={styles.section}>Location & Capacity</Text>

      <Text style={styles.label}>Street Address</Text>
      <TextInput
        style={styles.input}
        placeholder="123 Hope Street"
        value={street}
        onChangeText={setStreet}
      />

      <View style={styles.row}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Zip Code</Text>
          <TextInput
            style={styles.input}
            placeholder="600001"
            value={zip}
            onChangeText={setZip}
          />
        </View>
      </View>

      <Text style={styles.label}>Current Capacity</Text>
      <TextInput
        style={styles.input}
        placeholder="0"
        keyboardType="numeric"
        value={capacity}
        onChangeText={setCapacity}
      />

      {/* Needs */}
      <Text style={styles.section}>Needs Assessment</Text>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe your needs"
        multiline
        value={needsDesc}
        onChangeText={setNeedsDesc}
      />

      {/* Submit */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Registration</Text>
        <Ionicons name="checkmark-circle" size={18} color="#fff" />
      </TouchableOpacity>

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
    fontSize: 16,
    fontWeight: "700",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 6,
  },
  subtitle: {
    color: "#6B7280",
    marginBottom: 20,
  },
  section: {
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 14,
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 14,
  },
  flex: {
    flex: 1,
    marginLeft: 8,
  },
  row: {
    flexDirection: "row",
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
  },
  submitButton: {
    flexDirection: "row",
    backgroundColor: PURPLE,
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 20,
  },
  submitText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
