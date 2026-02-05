import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function VolunteerHubScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            }
          >
            <Ionicons name="arrow-back" size={22} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Volunteer Hub</Text>

          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={22} />
            {/* Optional notification dot */}
            {/* <View style={styles.dot} /> */}
          </TouchableOpacity>
        </View>

        {/* Hero with Image Background */}
        <ImageBackground
          source={require("../assets/childrens.jpg")}
          style={styles.heroCard}
          imageStyle={{ borderRadius: 18 }}
        >
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTag}>HOPE CONNECT</Text>
            <Text style={styles.heroTitle}>Welcome, Hero</Text>
            <Text style={styles.heroSub}>Ready to change lives?</Text>
          </View>
        </ImageBackground>

        {/* Quick Actions */}
        <Text style={styles.section}>Quick Actions</Text>

        {/* Ongoing Tasks */}
        <View style={styles.actionCard}>
          <View style={styles.actionLeft}>
            <View style={styles.iconCircle}>
              <Ionicons name="clipboard-outline" size={20} color="#7C3AED" />
            </View>
            <View>
              <Text style={styles.actionTitle}>Ongoing Tasks</Text>
              <Text style={styles.actionDesc}>
                You have 3 tasks pending review
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => navigation.navigate("Tasks")}
          >
            <Text style={styles.actionBtnText}>View Tasks</Text>
          </TouchableOpacity>
        </View>

        {/* Grid Actions */}
        <View style={styles.grid}>
          <TouchableOpacity style={styles.gridCard}>
            <Ionicons name="heart" size={22} color="#7C3AED" />
            <Text style={styles.gridTitle}>Donate if you can!</Text>
            <Text style={styles.gridDesc}>
              Support children’s homes directly
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => navigation.navigate("TasksHistory")}
          >
            <Ionicons name="time-outline" size={22} color="#7C3AED" />
            <Text style={styles.gridTitle}>Tasks History</Text>
            <Text style={styles.gridDesc}>
              Review your completed help
            </Text>
          </TouchableOpacity>
        </View>

        {/* Profile */}
        <TouchableOpacity
          style={styles.profileCard}
          onPress={() => navigation.navigate("VolunteerProfile")}
        >
          <View style={styles.profileLeft}>
            <View style={styles.iconCircle}>
              <Ionicons name="person-outline" size={20} color="#7C3AED" />
            </View>
            <Text style={styles.profileText}>My Profile</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Volunteer Tip */}
        <View style={styles.tipBox}>
          <Ionicons name="bulb-outline" size={20} color="#7C3AED" />
          <Text style={styles.tipText}>
            Consistent involvement (even just{" "}
            <Text style={styles.bold}>2 hours</Text> a week) builds stronger bonds
            with the children.
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
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 14,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  dot: {
    position: "absolute",
    right: 2,
    top: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
  },

  heroCard: {
    height: 170,
    borderRadius: 18,
    marginBottom: 20,
    overflow: "hidden",
  },

  heroOverlay: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  heroTag: {
    color: "#E9D5FF",
    fontSize: 12,
  },

  heroTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 6,
  },

  heroSub: {
    color: "#E5E7EB",
    marginTop: 4,
  },

  section: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
  },

  actionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EDE9FE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  actionTitle: {
    fontWeight: "700",
  },

  actionDesc: {
    fontSize: 12,
    color: "#6B7280",
  },

  actionBtn: {
    backgroundColor: PURPLE,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },

  actionBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  gridCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
  },

  gridTitle: {
    fontWeight: "700",
    marginTop: 10,
  },

  gridDesc: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },

  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  profileLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileText: {
    marginLeft: 10,
    fontWeight: "700",
  },

  tipBox: {
    backgroundColor: "#F3E8FF",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  tipText: {
    marginLeft: 10,
    color: "#4C1D95",
    flex: 1,
    fontSize: 13,
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
});
