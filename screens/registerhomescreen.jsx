import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RegisterHomeScreen({ navigation }) {
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

      {/* Intro */}
      <Text style={styles.title}>Join our network</Text>
      <Text style={styles.subtitle}>
        Register your children's home to receive support, supplies, and connect
        with verified volunteers.
      </Text>

      {/* Organization Details */}
      <Text style={styles.section}>Organization Details</Text>

      <Text style={styles.label}>Home Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Sunshine Orphanage"
      />

      <Text style={styles.label}>Registration Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Govt. Issued ID"
      />

      {/* Contact Information */}
      <Text style={styles.section}>Contact Information</Text>

      <Text style={styles.label}>Representative Name</Text>
      <TextInput style={styles.input} placeholder="Full Name" />

      <Text style={styles.label}>Phone Number</Text>
      <View style={styles.inputWithIcon}>
        <Ionicons name="call-outline" size={18} color="#9CA3AF" />
        <TextInput
          style={styles.flex}
          placeholder="(555) 000-0000"
          keyboardType="phone-pad"
        />
      </View>

      <Text style={styles.label}>Email Address</Text>
      <View style={styles.inputWithIcon}>
        <Ionicons name="mail-outline" size={18} color="#9CA3AF" />
        <TextInput
          style={styles.flex}
          placeholder="contact@example.com"
          keyboardType="email-address"
        />
      </View>

      {/* Location */}
      <Text style={styles.section}>Location & Capacity</Text>

      <View style={styles.mapBox}>
        <TouchableOpacity style={styles.locationButton}>
          <Ionicons name="location-outline" size={16} color="#7C3AED" />
          <Text style={styles.locationText}>Use Current Location</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Street Address</Text>
      <TextInput
        style={styles.input}
        placeholder="123 Hope Street"
      />

      <View style={styles.row}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Text style={styles.label}>City</Text>
          <TextInput style={styles.input} placeholder="City" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Zip Code</Text>
          <TextInput style={styles.input} placeholder="00000" />
        </View>
      </View>

      <Text style={styles.label}>Current Capacity (Children)</Text>
      <TextInput
        style={styles.input}
        placeholder="0"
        keyboardType="numeric"
      />

      {/* Needs */}
      <Text style={styles.section}>Needs Assessment</Text>

      <Text style={styles.label}>What are your top needs?</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="E.g. Educational materials for ages 5–10, winter clothing, non-perishable food..."
        multiline
      />

      <View style={styles.chips}>
        {["Food", "Medical", "Education", "Clothing"].map((item) => (
          <View key={item} style={styles.chip}>
            <Text style={styles.chipText}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Document */}
      <Text style={styles.section}>Verification Document</Text>

      <TouchableOpacity style={styles.uploadBox}>
        <Ionicons name="document-text-outline" size={28} color="#7C3AED" />
        <Text style={styles.uploadTitle}>
          Upload License or Registration
        </Text>
        <Text style={styles.uploadSub}>
          PDF, JPG or PNG up to 5MB
        </Text>
      </TouchableOpacity>

      {/* Submit */}
      <TouchableOpacity style={styles.submitButton}>
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

  mapBox: {
    height: 110,
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  locationButton: {
    backgroundColor: "#F3E8FF",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  locationText: {
    color: PURPLE,
    fontWeight: "600",
    marginLeft: 6,
  },

  textArea: {
    height: 90,
    textAlignVertical: "top",
  },

  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },

  chip: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },

  chipText: {
    fontSize: 12,
    fontWeight: "600",
  },

  uploadBox: {
    borderWidth: 1,
    borderColor: "#C4B5FD",
    borderStyle: "dashed",
    borderRadius: 14,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#F5F3FF",
    marginBottom: 20,
  },

  uploadTitle: {
    fontWeight: "700",
    marginTop: 8,
  },

  uploadSub: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },

  submitButton: {
    flexDirection: "row",
    backgroundColor: PURPLE,
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  submitText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
