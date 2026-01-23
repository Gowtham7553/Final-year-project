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
        <View style={[styles.iconBox, { backgroundColor: "#E0E7FF" }]}>
          <Ionicons name="hand-left" size={22} color="#2563EB" />
        </View>
      </TouchableOpacity>

      {/* Donor */}
      <TouchableOpacity style={styles.card}>
        <View>
          <Text style={styles.cardTitle}>Donor</Text>
          <Text style={styles.cardDesc}>
            Make a financial contribution to fund critical needs.
          </Text>
        </View>
        <View style={[styles.iconBox, { backgroundColor: "#DCFCE7" }]}>
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
        <View style={[styles.iconBox, { backgroundColor: "#FFEDD5" }]}>
          <Ionicons name="home" size={22} color="#EA580C" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  headerTitle: {
    fontWeight: "700",
    fontSize: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 24,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    elevation: 1,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },

  cardDesc: {
    fontSize: 13,
    color: "#6B7280",
    maxWidth: 220,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
