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

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require("../assets/5686541.png")}
              style={styles.logo}
            />
            <Text style={styles.logoText}>Hope Connect</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
          >
            <Ionicons name="notifications-outline" size={22} />
          </TouchableOpacity>
        </View>

        {/* Hero Card */}
        <View style={styles.heroCard}>
          <Image
            source={require("../assets/childrens.jpg")}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTag}>COMMUNITY FIRST</Text>
            <Text style={styles.heroTitle}>
              Connecting hearts,{`\n`}changing lives
            </Text>
            <Text style={styles.heroDesc}>
              Join our community to bridge the gap between resources and those in
              need.
            </Text>

            <View style={styles.stats}>
              <View>
                <Text style={styles.statNumber}>500+</Text>
                <Text style={styles.statLabel}>Lives impacted</Text>
              </View>
              <View>
                <Text style={styles.statNumber}>120</Text>
                <Text style={styles.statLabel}>Active Homes</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Choose Path */}
        <Text style={styles.sectionTitle}>Choose your path</Text>
        <Text style={styles.sectionSub}>
          Select how you would like to contribute today.
        </Text>

        {/* Volunteer Card */}
        <View style={styles.roleCard}>
          <Image
            source={require("../assets/download.jpg")}
            style={styles.roleImage}
          />
          <Text style={styles.roleTag}>VOLUNTEER</Text>
          <Text style={styles.roleTitle}>I want to Volunteer</Text>
          <Text style={styles.roleDesc}>
            Offer your time and skills to mentor children and support local
            communities.
          </Text>

          <TouchableOpacity
            style={styles.roleButton}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.roleButtonText}>Join as Volunteer</Text>
          </TouchableOpacity>
        </View>

        {/* Partner Card */}
        <View style={styles.roleCard}>
          <Image
            source={require("../assets/images.jpg")}
            style={styles.roleImage}
          />
          <Text style={styles.roleTag}>PARTNER</Text>
          <Text style={styles.roleTitle}>I represent a Home</Text>
          <Text style={styles.roleDesc}>
            Register your children's home to receive support, resources, and
            volunteer aid.
          </Text>

          <TouchableOpacity
            style={styles.roleButton}
            onPress={() => navigation.navigate("RegisterHome")}
          >
            <Text style={styles.roleButtonText}>Register Home</Text>
          </TouchableOpacity>
        </View>

        {/* Select Role */}
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => navigation.navigate("RoleSelect")}
        >
          <Text style={styles.selectButtonText}>Select Role </Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
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
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 28,
    height: 28,
    marginRight: 6,
  },

  logoText: {
    fontWeight: "700",
    fontSize: 16,
    color: PURPLE,
  },

  heroCard: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
  },

  heroImage: {
    width: "100%",
    height: 220,
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
    marginVertical: 6,
  },

  stats: {
    flexDirection: "row",
    marginTop: 10,
    gap: 20,
  },

  statNumber: {
    color: "#fff",
    fontWeight: "800",
  },

  statLabel: {
    color: "#E5E7EB",
    fontSize: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 6,
  },

  sectionSub: {
    color: "#6B7280",
    marginBottom: 16,
  },

  roleCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },

  roleImage: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    marginBottom: 12,
  },

  roleTag: {
    color: PURPLE,
    fontSize: 12,
    fontWeight: "700",
  },

  roleTitle: {
    fontSize: 18,
    fontWeight: "800",
  },

  roleDesc: {
    color: "#6B7280",
    marginBottom: 12,
  },

  roleButton: {
  backgroundColor: PURPLE,
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 16,
  alignSelf: "flex-end",   // 🔥 moves button to right
},

  roleButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  selectButton: {
    backgroundColor: PURPLE,
    padding: 16,
    borderRadius: 28,
    alignItems: "center",
    marginVertical: 10,
  },

  selectButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
