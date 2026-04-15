import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // ✅ IMPORTANT
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function RoleSelectScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      
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
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("DonationRegistration")}
      >
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

      {/* Home */}
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

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F5FF",
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.015,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: height * 0.03,
  },

  headerTitle: {
    fontWeight: "700",
    fontSize: width * 0.045,
  },

  title: {
    fontSize: width * 0.065,
    fontWeight: "800",
    marginBottom: height * 0.01,
    color: "#111827",
  },

  subtitle: {
    fontSize: width * 0.035,
    color: "#6B7280",
    marginBottom: height * 0.035,
    lineHeight: height * 0.025,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: width * 0.045,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.02,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  cardTitle: {
    fontSize: width * 0.04,
    fontWeight: "700",
    marginBottom: 6,
  },

  cardDesc: {
    fontSize: width * 0.032,
    color: "#6B7280",
    maxWidth: width * 0.6,
    lineHeight: height * 0.022,
  },

  iconBox: {
    width: width * 0.12,
    height: width * 0.12,
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
    marginTop: height * 0.04, // ✅ FIXED (was string)
    paddingVertical: height * 0.02,
    alignItems: "center",
  },

  footerText: {
    fontSize: width * 0.032,
    color: "#6B7280",
  },

  login: {
    color: "#7C3AED",
    fontWeight: "700",
  },
});