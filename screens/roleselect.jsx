import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RoleSelectScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hope Connect</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Title */}
      <Text style={styles.title}>Welcome to Hope Connect</Text>
      <Text style={styles.subtitle}>
        To get started, please select your role to help us customize your
        experience.
      </Text>

      {/* Volunteer */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("SignUp")}
      >
        <View>
          <Text style={styles.cardTitle}>Volunteer</Text>
          <Text style={styles.cardDesc}>
            Mentor, donate, or offer your professional skills.
          </Text>
        </View>
        <View style={[styles.iconBox, styles.volunteerBg]}>
          <Ionicons name="hand-left" size={22} color="#2563EB" />
        </View>
      </TouchableOpacity>

      {/* Donor */}
      <TouchableOpacity style={styles.card}
        onPress={() => navigation.navigate("DonationRegistration")}>
        <View>
          <Text style={styles.cardTitle}>Donor</Text>
          <Text style={styles.cardDesc}>
            Make a financial contribution to fund critical needs.
          </Text>
        </View>
        <View style={[styles.iconBox, styles.donorBg]}>
          <Ionicons name="logo-usd" size={22} color="#16A34A" />
        </View>
      </TouchableOpacity>

      {/* Children's Home */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("RegisterHome")}
      >
        <View>
          <Text style={styles.cardTitle}>Children’s Home</Text>
          <Text style={styles.cardDesc}>
            Register your organization to receive support.
          </Text>
        </View>
        <View style={[styles.iconBox, styles.homeBg]}>
          <Ionicons name="home" size={22} color="#EA580C" />
        </View>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text
            style={styles.login}
            onPress={() => navigation.navigate("Login")}
          >
            Log in
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F5FF", // 🔥 light purple tint
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  headerTitle: {
    fontWeight: "700",
    fontSize: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 10,
    color: "#111827",
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 28,
    lineHeight: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,

    // 🔥 soft shadow (matches image)
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },

  cardDesc: {
    fontSize: 13,
    color: "#6B7280",
    maxWidth: 220,
    lineHeight: 18,
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  volunteerBg: {
    backgroundColor: "#E0E7FF",
  },

  donorBg: {
    backgroundColor: "#DCFCE7",
  },

  homeBg: {
    backgroundColor: "#FFEDD5",
  },

  footer: {
    marginTop: "24",
    paddingVertical: 20,
    alignItems: "center",
  },

  footerText: {
    fontSize: 13,
    color: "#6B7280",
  },

  login: {
    color: "#7C3AED",
    fontWeight: "700",
    marginTop:10,
    marginBottom: 20,
    elevation: 6,
  },
});
