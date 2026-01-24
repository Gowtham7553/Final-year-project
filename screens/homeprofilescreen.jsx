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
        <Ionicons name="share-outline" size={22} />
      </View>

      {/* Cover Image */}
      <Image
        source={require("../assets/home.jpg")}
        style={styles.cover}
      />

      {/* Title */}
      <Text style={styles.title}>Sunshine Children’s Home</Text>

      {/* Badges */}
      <View style={styles.badges}>
        <View style={styles.badge}>
          <Ionicons name="checkmark-circle" size={14} color="#7C3AED" />
          <Text style={styles.badgeText}>Verified NGO</Text>
        </View>

        <View style={styles.badge}>
          <Ionicons name="location-outline" size={14} color="#7C3AED" />
          <Text style={styles.badgeText}>Seattle, WA</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.primaryText}>Donate Resources</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn}>
          <Text style={styles.secondaryText}>Volunteer</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>52</Text>
          <Text style={styles.statLabel}>Children</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Years</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>140+</Text>
          <Text style={styles.statLabel}>Volunteers</Text>
        </View>
      </View>

      {/* About */}
      <Text style={styles.section}>About Us</Text>
      <Text style={styles.about}>
        Founded in 2012, Sunshine Home provides shelter, education, and emotional
        support to over 50 orphans in the greater Seattle area. Our mission is
        to ensure every child feels safe, loved, and empowered to build a bright
        future.
      </Text>
      <Text style={styles.readMore}>Read more</Text>

      {/* Current Needs */}
      <View style={styles.sectionRow}>
        <Text style={styles.section}>Current Needs</Text>
        <Text style={styles.link}>See all</Text>
      </View>

      <View style={styles.needCard}>
        <Ionicons name="book-outline" size={20} color="#2563EB" />
        <View style={styles.needContent}>
          <Text style={styles.needTitle}>Notebooks & Pens</Text>
          <Text style={styles.needMeta}>20/50</Text>
        </View>
      </View>

      <View style={styles.needCardUrgent}>
        <Ionicons name="leaf-outline" size={20} color="#DC2626" />
        <View style={styles.needContent}>
          <View style={styles.row}>
            <Text style={styles.needTitle}>Fresh Vegetables</Text>
            <Text style={styles.urgent}>URGENT</Text>
          </View>
          <Text style={styles.needMeta}>Needed Today</Text>
        </View>
        <TouchableOpacity style={styles.donateMini}>
          <Text style={styles.donateMiniText}>Donate</Text>
        </TouchableOpacity>
      </View>

      {/* Residents */}
      <Text style={styles.section}>Meet our Residents</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[
          { name: "Maya", age: 8 },
          { name: "Leo", age: 12 },
          { name: "Zara", age: 10 },
        ].map((child) => (
          <View key={child.name} style={styles.childCard}>
            <Image
              source={require("../assets/child1.jpg")}
              style={styles.childImage}
            />
            <Text style={styles.childName}>{child.name}</Text>
            <Text style={styles.childAge}>Age {child.age}</Text>
            <Text style={styles.like}>💜 Likes drawing</Text>
          </View>
        ))}
      </ScrollView>

      {/* Location */}
      <Text style={styles.section}>Location</Text>
      <View style={styles.mapBox}>
        <Ionicons name="location" size={28} color="#7C3AED" />
      </View>

      <View style={styles.address}>
        <Ionicons name="navigate-outline" size={16} color="#7C3AED" />
        <Text style={styles.addressText}>
          123 Hope Street, Seattle, WA 98101
        </Text>
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
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 14,
  },

  headerTitle: {
    fontWeight: "700",
    fontSize: 16,
  },

  cover: {
    width: "100%",
    height: 180,
    borderRadius: 16,
    marginBottom: 14,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 6,
  },

  badges: {
    flexDirection: "row",
    marginBottom: 16,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3E8FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    marginRight: 8,
  },

  badgeText: {
    marginLeft: 4,
    fontSize: 12,
    color: PURPLE,
    fontWeight: "600",
  },

  actions: {
    flexDirection: "row",
    marginBottom: 20,
  },

  primaryBtn: {
    flex: 1,
    backgroundColor: PURPLE,
    padding: 12,
    borderRadius: 24,
    alignItems: "center",
    marginRight: 8,
  },

  primaryText: {
    color: "#fff",
    fontWeight: "700",
  },

  secondaryBtn: {
    flex: 1,
    backgroundColor: "#EDE9FE",
    padding: 12,
    borderRadius: 24,
    alignItems: "center",
  },

  secondaryText: {
    color: PURPLE,
    fontWeight: "700",
  },

  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    marginHorizontal: 4,
  },

  statNumber: {
    fontSize: 18,
    fontWeight: "800",
  },

  statLabel: {
    color: "#6B7280",
    fontSize: 12,
  },

  section: {
    fontWeight: "800",
    marginBottom: 6,
    marginTop: 10,
  },

  about: {
    color: "#6B7280",
    lineHeight: 20,
  },

  readMore: {
    color: PURPLE,
    fontWeight: "600",
    marginTop: 6,
  },

  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },

  link: {
    color: PURPLE,
    fontWeight: "600",
  },

  needCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 10,
  },

  needCardUrgent: {
    flexDirection: "row",
    backgroundColor: "#FEF2F2",
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 14,
  },

  needContent: {
    flex: 1,
    marginLeft: 10,
  },

  needTitle: {
    fontWeight: "700",
  },

  needMeta: {
    fontSize: 12,
    color: "#6B7280",
  },

  urgent: {
    color: "#DC2626",
    fontSize: 10,
    fontWeight: "700",
    marginLeft: 6,
  },

  donateMini: {
    backgroundColor: PURPLE,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },

  donateMiniText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  childCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 10,
    marginRight: 12,
    width: 120,
    alignItems: "center",
  },

  childImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 6,
  },

  childName: {
    fontWeight: "700",
  },

  childAge: {
    fontSize: 12,
    color: "#6B7280",
  },

  like: {
    fontSize: 11,
    color: PURPLE,
    marginTop: 4,
  },

  mapBox: {
    height: 140,
    backgroundColor: "#E5E7EB",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  address: {
    flexDirection: "row",
    alignItems: "center",
  },

  addressText: {
    marginLeft: 6,
    color: "#6B7280",
  },
});
