import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NotificationsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Notifications</Text>

        <TouchableOpacity>
          <Text style={styles.markRead}>✓ Mark all read</Text>
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        <View style={[styles.filterChip, styles.activeChip]}>
          <Text style={styles.activeChipText}>All</Text>
        </View>

        <View style={styles.filterChip}>
          <Text style={styles.chipText}>Unread</Text>
          <View style={styles.unreadBadge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </View>

        <View style={styles.filterChip}>
          <Text style={styles.chipText}>Urgent</Text>
        </View>
      </View>

      {/* Category Tabs */}
      <View style={styles.categoryRow}>
        {[
          { icon: "people", label: "Volunteer" },
          { icon: "cash", label: "Donations" },
          { icon: "clipboard", label: "Requests" },
        ].map((item) => (
          <View key={item.label} style={styles.categoryChip}>
            <Ionicons name={item.icon} size={14} color="#7C3AED" />
            <Text style={styles.categoryText}>{item.label}</Text>
          </View>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* TODAY */}
        <Text style={styles.section}>TODAY</Text>
        <Text style={styles.newCount}>2 New</Text>

        {/* Donation Successful */}
        <View style={[styles.card, styles.greenBorder]}>
          <Ionicons name="cash" size={22} color="#16A34A" />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Donation Successful</Text>
            <Text style={styles.cardDesc}>
              Your $50.00 contribution has been processed.
            </Text>
            <Text style={styles.cardTag}>FINANCE</Text>
          </View>
          <Text style={styles.time}>2h ago</Text>
        </View>

        {/* Volunteers Needed */}
        <View style={[styles.card, styles.purpleBorder]}>
          <Ionicons name="people" size={22} color="#7C3AED" />
          <View style={styles.cardContent}>
            <View style={styles.row}>
              <Text style={styles.cardTitle}>Volunteers Needed</Text>
              <Text style={styles.urgent}>URGENT</Text>
            </View>
            <Text style={styles.cardDesc}>
              St. Jude's Home needs mentors immediately for the weekend program.
            </Text>

            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.actionText}>View Details</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dot} />
        </View>

        {/* YESTERDAY */}
        <Text style={styles.section}>YESTERDAY</Text>

        <View style={styles.card}>
          <Ionicons name="clipboard" size={22} color="#2563EB" />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Request Approved</Text>
            <Text style={styles.cardDesc}>
              Your request for "School Supplies" has been approved.
            </Text>
            <Text style={styles.cardTag}>STATUS</Text>
          </View>
          <Text style={styles.time}>4:30 PM</Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="person-circle" size={28} color="#6B7280" />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Sarah (Hope Team)</Text>
            <Text style={styles.cardDesc}>
              "Hi! Are you available this weekend for the..."
            </Text>
            <Text style={styles.cardTag}>DIRECT MESSAGE</Text>
          </View>
          <Text style={styles.time}>10:15 AM</Text>
        </View>

        {/* LAST WEEK */}
        <Text style={styles.section}>LAST WEEK</Text>

        <View style={styles.card}>
          <Ionicons name="settings" size={22} color="#6B7280" />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>System Update</Text>
            <Text style={styles.cardDesc}>
              App maintenance is complete. Everything is running smoothly.
            </Text>
          </View>
          <Text style={styles.time}>Oct 24</Text>
        </View>

        <View style={styles.empty}>
          <Ionicons name="checkmark-circle" size={32} color="#D1D5DB" />
          <Text style={styles.emptyText}>You're all caught up!</Text>
        </View>

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

  markRead: {
    color: PURPLE,
    fontWeight: "600",
    fontSize: 12,
  },

  filters: {
    flexDirection: "row",
    marginBottom: 12,
  },

  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },

  activeChip: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },

  activeChipText: {
    color: "#fff",
    fontWeight: "600",
  },

  chipText: {
    fontWeight: "600",
  },

  unreadBadge: {
    backgroundColor: PURPLE,
    borderRadius: 8,
    paddingHorizontal: 6,
    marginLeft: 6,
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },

  categoryRow: {
    flexDirection: "row",
    marginBottom: 10,
  },

  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3E8FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    marginRight: 8,
  },

  categoryText: {
    marginLeft: 4,
    color: PURPLE,
    fontWeight: "600",
    fontSize: 12,
  },

  section: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6B7280",
    marginTop: 16,
    marginBottom: 6,
  },

  newCount: {
    position: "absolute",
    right: 16,
    top: 160,
    color: PURPLE,
    fontSize: 12,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start",
  },

  greenBorder: {
    borderLeftWidth: 4,
    borderLeftColor: "#16A34A",
  },

  purpleBorder: {
    borderLeftWidth: 4,
    borderLeftColor: PURPLE,
  },

  cardContent: {
    flex: 1,
    marginLeft: 10,
  },

  cardTitle: {
    fontWeight: "700",
    marginBottom: 2,
  },

  cardDesc: {
    color: "#6B7280",
    fontSize: 13,
    marginBottom: 6,
  },

  cardTag: {
    fontSize: 10,
    fontWeight: "700",
    color: PURPLE,
  },

  time: {
    fontSize: 11,
    color: "#9CA3AF",
  },

  urgent: {
    color: "#DC2626",
    fontSize: 10,
    fontWeight: "700",
    marginLeft: 6,
  },

  actionBtn: {
    backgroundColor: PURPLE,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    alignSelf: "flex-start",
  },

  actionText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  dot: {
    width: 8,
    height: 8,
    backgroundColor: "#F97316",
    borderRadius: 4,
    marginTop: 6,
  },

  empty: {
    alignItems: "center",
    marginTop: 20,
  },

  emptyText: {
    color: "#9CA3AF",
    marginTop: 6,
  },
});
