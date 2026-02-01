import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SubmitHelpRequestScreen({ navigation }) {
  const [need, setNeed] = useState("Education");
  const [urgency, setUrgency] = useState("Standard");
  const [description, setDescription] = useState("");

  const needs = [
    { label: "Education", icon: "school-outline" },
    { label: "Food", icon: "restaurant-outline" },
    { label: "Clothing", icon: "shirt-outline" },
    { label: "Medical", icon: "medkit-outline" },
    { label: "Mentorship", icon: "people-outline" },
  ];

  const urgencies = ["Standard", "Urgent", "Critical"];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Submit Help Request</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Title */}
      <Text style={styles.title}>How can we help?</Text>
      <Text style={styles.subtitle}>
        Please fill out the details below so we can connect you with the right
        support.
      </Text>

      {/* Who is this for */}
      <Text style={styles.label}>Who is this for?</Text>
      <TouchableOpacity style={styles.dropdown}>
        <Text style={styles.dropdownText}>Select a child profile</Text>
        <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
      </TouchableOpacity>

      {/* Needs */}
      <Text style={styles.label}>What do they need?</Text>
      <View style={styles.chipRow}>
        {needs.map((item) => {
          const active = need === item.label;
          return (
            <TouchableOpacity
              key={item.label}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => setNeed(item.label)}
            >
              <Ionicons
                name={item.icon}
                size={16}
                color={active ? "#fff" : "#6B7280"}
              />
              <Text
                style={[styles.chipText, active && styles.chipTextActive]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Urgency */}
      <Text style={styles.label}>Urgency Level</Text>
      <View style={styles.urgencyRow}>
        {urgencies.map((item) => {
          const active = urgency === item;
          return (
            <TouchableOpacity
              key={item}
              style={[styles.urgencyBox, active && styles.urgencyActive]}
              onPress={() => setUrgency(item)}
            >
              <Ionicons
                name={
                  item === "Standard"
                    ? "time-outline"
                    : item === "Urgent"
                    ? "alert-circle-outline"
                    : "warning-outline"
                }
                size={18}
                color={active ? "#7C3AED" : "#6B7280"}
              />
              <Text
                style={[
                  styles.urgencyText,
                  active && styles.urgencyTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Description */}
      <Text style={styles.label}>Tell us more about the situation</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Please describe the specific needs, sizing, or any medical conditions we should be aware of..."
        multiline
        value={description}
        onChangeText={setDescription}
      />

      {/* Attachments */}
      <Text style={styles.label}>Attachments (Optional)</Text>
      <View style={styles.attachRow}>
        <TouchableOpacity style={styles.attachBox}>
          <Ionicons name="camera-outline" size={20} color="#7C3AED" />
          <Text style={styles.attachText}>Add Photo</Text>
        </TouchableOpacity>

        <View style={styles.previewBox}>
          <Ionicons name="close-circle" size={18} color="#9CA3AF" />
        </View>
      </View>

      <Text style={styles.attachHint}>
        Upload medical bills, report cards, or photos.
      </Text>

      {/* Submit */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Submit →</Text>
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
    marginBottom: 8,
    marginTop: 16,
  },

  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dropdownText: {
    color: "#9CA3AF",
  },

  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
  },

  chipActive: {
    backgroundColor: PURPLE,
    borderColor: PURPLE,
  },

  chipText: {
    fontWeight: "600",
    fontSize: 13,
    color: "#374151",
  },

  chipTextActive: {
    color: "#fff",
  },

  urgencyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  urgencyBox: {
    width: "30%",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  urgencyActive: {
    borderColor: PURPLE,
    backgroundColor: "#F3E8FF",
  },

  urgencyText: {
    fontSize: 12,
    marginTop: 6,
    color: "#6B7280",
    fontWeight: "600",
  },

  urgencyTextActive: {
    color: PURPLE,
  },

  textArea: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    minHeight: 100,
    textAlignVertical: "top",
  },

  attachRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },

  attachBox: {
    width: 90,
    height: 90,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#C4B5FD",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },

  attachText: {
    fontSize: 12,
    color: PURPLE,
    marginTop: 4,
    fontWeight: "600",
  },

  previewBox: {
    width: 90,
    height: 90,
    borderRadius: 14,
    backgroundColor: "#E5E7EB",
    alignItems: "flex-end",
    padding: 6,
  },

  attachHint: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 24,
  },

  button: {
    backgroundColor: PURPLE,
    padding: 18,
    borderRadius: 30,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
