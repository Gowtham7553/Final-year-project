import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  const skills = [
    "Art Therapy",
    "English Teaching",
    "First Aid",
    "Storytelling",
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require("../assets/profile.jpeg")} // replace if needed
              style={styles.avatar}
            />
            <View style={styles.editIcon}>
              <Ionicons name="pencil" size={14} color="#fff" />
            </View>
          </View>

          <Text style={styles.name}>Sarah Jenkins</Text>

          <View style={styles.verified}>
            <Ionicons
              name="checkmark-circle"
              size={14}
              color="#7C3AED"
            />
            <Text style={styles.verifiedText}>Verified Volunteer</Text>
          </View>

          <Text style={styles.bio}>
            Passionate about art therapy and early childhood education.
            Helping kids find their voice.
          </Text>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.primaryBtn}>
              <Ionicons name="calendar-outline" size={16} color="#fff" />
              <Text style={styles.primaryBtnText}>Availability</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryBtn}>
              <Ionicons name="create-outline" size={16} color="#7C3AED" />
              <Text style={styles.secondaryBtnText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Impact */}
        <Text style={styles.sectionTitle}>Your Impact</Text>

        <View style={styles.impactRow}>
          <View style={styles.impactCard}>
            <Ionicons name="time-outline" size={22} color="#7C3AED" />
            <Text style={styles.impactValue}>120</Text>
            <Text style={styles.impactLabel}>HOURS</Text>
          </View>

          <View style={styles.impactCard}>
            <Ionicons
              name="checkmark-done-outline"
              size={22}
              color="#7C3AED"
            />
            <Text style={styles.impactValue}>15</Text>
            <Text style={styles.impactLabel}>TASKS COMPLETED</Text>
          </View>
        </View>

        {/* Skills */}
        <View style={styles.skillsHeader}>
          <Text style={styles.sectionTitle}>Skills & Expertise</Text>
          <TouchableOpacity style={styles.addBtn}>
            <Ionicons name="add" size={18} color="#7C3AED" />
          </TouchableOpacity>
        </View>

        <View style={styles.skillsWrap}>
          {skills.map((skill) => (
            <View key={skill} style={styles.skillChip}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn}
          onPress={() => navigation.navigate("Login")}>
          <Ionicons name="log-out-outline" size={18} color="#DC2626" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const PURPLE = "#7C3AED";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F3FF",
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 14,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  profileCard: {
    backgroundColor: "#F3E8FF",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 24,
  },

  avatarWrapper: {
    position: "relative",
    marginBottom: 12,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  editIcon: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: PURPLE,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  name: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 4,
  },

  verified: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  verifiedText: {
    marginLeft: 6,
    color: PURPLE,
    fontWeight: "600",
    fontSize: 12,
  },

  bio: {
    textAlign: "center",
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 16,
  },

  actions: {
    flexDirection: "row",
    gap: 10,
  },

  primaryBtn: {
    backgroundColor: PURPLE,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  primaryBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },

  secondaryBtn: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  secondaryBtnText: {
    color: PURPLE,
    fontWeight: "700",
    fontSize: 13,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 12,
  },

  impactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  impactCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },

  impactValue: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 6,
  },

  impactLabel: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 2,
  },

  skillsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#EDE9FE",
    alignItems: "center",
    justifyContent: "center",
  },

  skillsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 30,
  },

  skillChip: {
    backgroundColor: "#EDE9FE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },

  skillText: {
    color: PURPLE,
    fontSize: 12,
    fontWeight: "600",
  },

  logoutBtn: {
    backgroundColor: "#FEE2E2",
    borderRadius: 20,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  logoutText: {
    color: "#DC2626",
    fontWeight: "700",
  },
});
