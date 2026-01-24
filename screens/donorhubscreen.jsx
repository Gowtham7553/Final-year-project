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

export default function DonorHubScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Donor Hub</Text>

          <Ionicons name="notifications-outline" size={22} />
        </View>

        {/* Hero */}
        <View style={styles.heroCard}>
          <Image
            source={require("../assets/donorhero.jpg")}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTag}>HOPE CONNECT</Text>
            <Text style={styles.heroTitle}>Welcome, Changemaker</Text>
            <Text style={styles.heroDesc}>
              Your journey to making a difference starts here.
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        {/* Main Donation Card */}
        <View style={styles.donateCard}>
          <View style={styles.donateLeft}>
            <View style={styles.iconCircle}>
              <Ionicons name="hand-left" size={20} color="#7C3AED" />
            </View>
            <View>
              <Text style={styles.donateTitle}>Make a Donation</Text>
              <Text style={styles.donateDesc}>
                Securely support a child in need today.
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.donateBtn}
          onPress={() => navigation.navigate("Donate")}>
            <Text style={styles.donateBtnText}>Donate</Text>
          </TouchableOpacity>
        </View>

        {/* Action Grid */}
        <View style={styles.grid}>
          {/* Donations */}
          <TouchableOpacity style={styles.gridCard}>
            <View style={[styles.gridIcon, { backgroundColor: "#EDE9FE" }]}>
              <Ionicons name="cash-outline" size={22} color="#7C3AED" />
            </View>
            <Text style={styles.gridTitle}>Donations</Text>
            <Text style={styles.gridDesc}>Make a new donation</Text>
          </TouchableOpacity>

          

          {/* Profile */}
          <TouchableOpacity style={styles.gridCard}>
            <View style={[styles.gridIcon, { backgroundColor: "#DCFCE7" }]}>
              <Ionicons name="person-outline" size={22} color="#16A34A" />
            </View>
            <Text style={styles.gridTitle}>Profile</Text>
            <Text style={styles.gridDesc}>Manage your account</Text>
          </TouchableOpacity>

          {/* Donation History (REPLACEMENT) */}
          <TouchableOpacity style={styles.gridCard}
          onPress={() => navigation.navigate("DonationHistory")}>
            <View style={[styles.gridIcon, { backgroundColor: "#FEF3C7" }]}>
              <Ionicons name="time-outline" size={22} color="#D97706" />
            </View>
            <Text style={styles.gridTitle}>Donation History</Text>
            <Text style={styles.gridDesc}>View past donations</Text>
          </TouchableOpacity>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Ionicons name="bulb-outline" size={20} color="#7C3AED" />
          <Text style={styles.infoText}>
            Did you know? Just <Text style={styles.bold}>$10</Text> provides a
            week of nutritious meals for a child in our partner homes.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>🔒 Secure SSL</Text>
          <Text style={styles.footerText}>✔ Verified NGO</Text>
        </View>

        <Text style={styles.copy}>
          © 2024 Hope Connect. Making impact visible.
        </Text>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Ionicons name="home" size={22} color="#7C3AED" />
        <Ionicons name="search-outline" size={22} color="#9CA3AF" />
        <View style={styles.centerBtn}>
          <Ionicons name="hand-left" size={22} color="#fff" />
        </View>
        <Ionicons name="chatbubble-outline" size={22} color="#9CA3AF" />
        <Ionicons name="person-outline" size={22} color="#9CA3AF" />
      </View>
    </View>
  );
}

const PURPLE = "#7C3AED";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
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

  heroCard: {
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 20,
  },

  heroImage: {
    width: "100%",
    height: 180,
  },

  heroOverlay: {
    position: "absolute",
    bottom: 0,
    padding: 16,
  },

  heroTag: {
    color: "#E9D5FF",
    fontSize: 12,
  },

  heroTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },

  heroDesc: {
    color: "#E5E7EB",
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
  },

  donateCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  donateLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EDE9FE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  donateTitle: {
    fontWeight: "700",
  },

  donateDesc: {
    fontSize: 12,
    color: "#6B7280",
  },

  donateBtn: {
    backgroundColor: PURPLE,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  donateBtnText: {
    color: "#fff",
    fontWeight: "700",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  gridCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },

  gridIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  gridTitle: {
    fontWeight: "700",
  },

  gridDesc: {
    fontSize: 12,
    color: "#6B7280",
  },

  infoBox: {
    backgroundColor: "#F3E8FF",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  infoText: {
    marginLeft: 10,
    color: "#4C1D95",
    flex: 1,
  },

  bold: {
    fontWeight: "800",
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

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  centerBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: PURPLE,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
