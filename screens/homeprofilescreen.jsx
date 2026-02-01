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

export default function HomeProfileScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
<View style={styles.header}>
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <Ionicons name="arrow-back" size={22} />
  </TouchableOpacity>

  <Text style={styles.headerTitle}>Home Profile</Text>

  <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
    <Ionicons name="notifications-outline" size={22} />
  </TouchableOpacity>
</View>


      {/* Cover Image */}
      <Image
        source={require("../assets/childrens.jpg")}
        style={styles.cover}
      />

      {/* Title */}
      <Text style={styles.name}>Sunshine Children’s Home</Text>

      {/* Badges */}
      <View style={styles.badges}>
        <View style={styles.badge}>
          <Ionicons name="shield-checkmark" size={14} color="#7C3AED" />
          <Text style={styles.badgeText}>Verified NGO</Text>
        </View>

        <View style={styles.badge}>
          <Ionicons name="location-outline" size={14} color="#7C3AED" />
          <Text style={styles.badgeText}>Seattle, WA</Text>
        </View>
      </View>

      {/* Submit Request */}
      <TouchableOpacity style={styles.primaryBtn}
        onPress={() => navigation.navigate("SubmitRequest")}>
        <Text style={styles.primaryBtnText}>Submit Request</Text>
      </TouchableOpacity>

      {/* Stats */}
      <View style={styles.stats}>
        <View style={styles.statCard}>
          <Ionicons name="happy-outline" size={22} color="#F97316" />
          <Text style={styles.statNumber}>52</Text>
          <Text style={styles.statLabel}>Children</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="home-outline" size={22} color="#22C55E" />
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Years</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="people-outline" size={22} color="#7C3AED" />
          <Text style={styles.statNumber}>140+</Text>
          <Text style={styles.statLabel}>Volunteers</Text>
        </View>
      </View>

      {/* About */}
      <Text style={styles.sectionTitle}>About Us</Text>
      <Text style={styles.aboutText}>
        Founded in 2012, Sunshine Home provides shelter, education, and emotional
        support to over 50 orphans in the greater Seattle area. Our mission is to
        ensure every child feels safe, loved, and empowered to build a bright
        future.
      </Text>
      <Text style={styles.readMore}>Read more</Text>

      {/* Current Needs */}
      <View style={styles.needsHeader}>
        <Text style={styles.sectionTitle}>Current Needs</Text>
        <Text style={styles.seeAll}>See all</Text>
      </View>

      {/* Need Item 1 */}
      <View style={styles.needCard}>
        <View style={styles.needLeft}>
          <Ionicons name="book-outline" size={22} color="#7C3AED" />
          <View>
            <Text style={styles.needTitle}>Notebooks & Pens</Text>
            <Text style={styles.needSub}>20/50</Text>
          </View>
        </View>
      </View>

      {/* Need Item 2 */}
      <View style={styles.needCard}>
        <View style={styles.needLeft}>
          <Ionicons name="nutrition-outline" size={22} color="#EF4444" />
          <View>
            <Text style={styles.needTitle}>Fresh Vegetables</Text>
            <Text style={styles.urgent}>Urgent Requirement</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.donateBtn}>
          <Text style={styles.donateText}>Donate</Text>
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

  cover: {
    width: "100%",
    height: 180,
    borderRadius: 18,
    marginBottom: 14,
  },

  name: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 8,
  },

  badges: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#EDE9FE",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  badgeText: {
    fontSize: 12,
    color: PURPLE,
    fontWeight: "600",
  },

  primaryBtn: {
    backgroundColor: PURPLE,
    padding: 14,
    borderRadius: 24,
    alignItems: "center",
    marginBottom: 20,
  },

  primaryBtnText: {
    color: "#fff",
    fontWeight: "700",
  },

  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  statCard: {
    width: "30%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
  },

  statNumber: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 6,
  },

  statLabel: {
    fontSize: 12,
    color: "#6B7280",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },

  aboutText: {
    color: "#6B7280",
    lineHeight: 20,
  },

  readMore: {
    color: PURPLE,
    fontWeight: "600",
    marginTop: 6,
    marginBottom: 20,
  },

  needsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  seeAll: {
    color: PURPLE,
    fontWeight: "600",
  },

  needCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  needLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  needTitle: {
    fontWeight: "700",
  },

  needSub: {
    fontSize: 12,
    color: "#7C3AED",
  },

  urgent: {
    fontSize: 12,
    color: "#EF4444",
    fontWeight: "600",
  },

  donateBtn: {
    backgroundColor: "#F3E8FF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },

  donateText: {
    color: PURPLE,
    fontWeight: "700",
  },
});
