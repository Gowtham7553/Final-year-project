import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MyProfileScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Avatar */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={48} color="#fff" />
          <View style={styles.editIcon}>
            <Ionicons name="pencil" size={14} color="#fff" />
          </View>
        </View>

        <Text style={styles.name}>Alex Johnson</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>GOLD MEMBER · EST. 2022</Text>
        </View>
      </View>

      {/* Personal Details */}
      <Text style={styles.sectionLabel}>PERSONAL DETAILS</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="mail-outline" size={18} color="#7C3AED" />
          <Text style={styles.rowText}>alex.johnson@example.com</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Ionicons name="call-outline" size={18} color="#7C3AED" />
          <Text style={styles.rowText}>+1 (555) 000-1234</Text>
        </View>
      </View>

      {/* Documents & Settings */}
      <Text style={styles.sectionLabel}>DOCUMENTS & SETTINGS</Text>

      <View style={styles.card}>
        <TouchableOpacity
          style={styles.rowBetween}
          onPress={() => navigation.navigate("DonationHistory")}
        >
          <View style={styles.row}>
            <Ionicons name="time-outline" size={18} color="#7C3AED" />
            <Text style={styles.rowText}>Donation History</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.logoutRow}>
          <Ionicons name="log-out-outline" size={18} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

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

  avatarSection: {
    alignItems: "center",
    marginBottom: 30,
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#FBBF24",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  editIcon: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: PURPLE,
    borderRadius: 12,
    padding: 4,
  },

  name: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 10,
  },

  badge: {
    backgroundColor: "#EDE9FE",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 6,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: PURPLE,
  },

  sectionLabel: {
    fontSize: 11,
    letterSpacing: 1,
    color: "#9CA3AF",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 24,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  rowText: {
    fontSize: 14,
    fontWeight: "500",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },

  logoutRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  logoutText: {
    color: "#EF4444",
    fontWeight: "600",
  },
});
