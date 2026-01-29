import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ItemDonationScreen({ navigation }) {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [donorLocation, setDonorLocation] = useState("");
  const [homeLocation, setHomeLocation] = useState("");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Item Donation</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Title */}
      <Text style={styles.title}>Donate Items</Text>
      <Text style={styles.subtitle}>
        Fill in the details to schedule your donation.
      </Text>

      {/* Category */}
      <Text style={styles.label}>Category</Text>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="e.g. Clothing, Food, Toys..."
          value={category}
          onChangeText={setCategory}
        />
        <Ionicons name="pricetag-outline" size={18} color="#9CA3AF" />
      </View>

      {/* Description */}
      <Text style={styles.label}>Item Description</Text>
      <TextInput
        style={styles.textArea}
        placeholder="e.g. 5 bags of rice, gently used winter coats..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Quantity */}
      <Text style={styles.label}>Quantity</Text>
      <View style={styles.quantityBox}>
        <TextInput
          style={styles.quantityInput}
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
        />
        <Text style={styles.unitText}>units</Text>
      </View>

      {/* Donor Location */}
      <Text style={styles.label}>Donor Location</Text>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Enter your pickup address"
          value={donorLocation}
          onChangeText={setDonorLocation}
        />
        <Ionicons name="location-outline" size={18} color="#9CA3AF" />
      </View>

      {/* Home Location */}
      <Text style={styles.label}>Children's Home Location</Text>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Enter the children's home address"
          value={homeLocation}
          onChangeText={setHomeLocation}
        />
        <Ionicons name="location-outline" size={18} color="#9CA3AF" />
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Complete Donation</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>🚚 Logistics Ready</Text>
        <Text style={styles.footerText}>✔ Verified NGO</Text>
      </View>

      <Text style={styles.copy}>
        © 2024 Hope Connect. Making impact visible.
      </Text>

      <View style={{ height: 30 }} />
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
    marginBottom: 6,
  },

  subtitle: {
    color: "#6B7280",
    marginBottom: 20,
  },

  label: {
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 14,
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

  textArea: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    minHeight: 90,
    textAlignVertical: "top",
  },

  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  quantityInput: {
    flex: 1,
    paddingVertical: 14,
  },

  unitText: {
    color: "#9CA3AF",
    fontWeight: "600",
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

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 6,
  },

  footerText: {
    fontSize: 12,
    color: "#6B7280",
  },

  copy: {
    fontSize: 11,
    color: "#9CA3AF",
    textAlign: "center",
  },
});
