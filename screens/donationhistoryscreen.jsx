import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DonationHistoryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Donation History</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Total Donated</Text>
        <Text style={styles.summaryAmount}>₹12,500</Text>
        <Text style={styles.summarySub}>Across 8 donations</Text>
      </View>

      {/* History */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Donation Item */}
        <View style={styles.historyCard}>
          <View style={styles.row}>
            <View style={styles.iconCircle}>
              <Ionicons name="heart" size={18} color="#7C3AED" />
            </View>
            <View style={styles.flex}>
              <Text style={styles.donationTitle}>
                Sunshine Children’s Home
              </Text>
              <Text style={styles.donationDate}>24 Jan 2026</Text>
            </View>
            <Text style={styles.amount}>₹2,000</Text>
          </View>

          <View style={styles.statusRow}>
            <Text style={styles.status}>Completed</Text>
            <TouchableOpacity>
              <Text style={styles.receipt}>View Receipt</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.historyCard}>
          <View style={styles.row}>
            <View style={styles.iconCircle}>
              <Ionicons name="school-outline" size={18} color="#7C3AED" />
            </View>
            <View style={styles.flex}>
              <Text style={styles.donationTitle}>
                School Supplies Fund
              </Text>
              <Text style={styles.donationDate}>10 Jan 2026</Text>
            </View>
            <Text style={styles.amount}>₹1,500</Text>
          </View>

          <View style={styles.statusRow}>
            <Text style={styles.status}>Completed</Text>
            <TouchableOpacity>
              <Text style={styles.receipt}>View Receipt</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.historyCard}>
          <View style={styles.row}>
            <View style={[styles.iconCircle, styles.pendingBg]}>
              <Ionicons name="time-outline" size={18} color="#D97706" />
            </View>
            <View style={styles.flex}>
              <Text style={styles.donationTitle}>
                Emergency Food Support
              </Text>
              <Text style={styles.donationDate}>02 Jan 2026</Text>
            </View>
            <Text style={styles.amount}>₹3,000</Text>
          </View>

          <View style={styles.statusRow}>
            <Text style={[styles.status, styles.pending]}>
              Processing
            </Text>
            <Text style={styles.receiptDisabled}>Receipt Pending</Text>
          </View>
        </View>

        {/* Empty State Example */}
        {/* 
        <View style={styles.empty}>
          <Ionicons name="heart-outline" size={40} color="#D1D5DB" />
          <Text style={styles.emptyText}>No donations yet</Text>
        </View> 
        */}

        <View style={{ height: 40 }} />
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

  summaryCard: {
    backgroundColor: "#F3E8FF",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },

  summaryTitle: {
    fontSize: 14,
    color: "#4C1D95",
    fontWeight: "600",
  },

  summaryAmount: {
    fontSize: 28,
    fontWeight: "800",
    color: PURPLE,
    marginVertical: 6,
  },

  summarySub: {
    fontSize: 12,
    color: "#6B7280",
  },

  historyCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  flex: {
    flex: 1,
    marginLeft: 10,
  },

  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EDE9FE",
    alignItems: "center",
    justifyContent: "center",
  },

  pendingBg: {
    backgroundColor: "#FEF3C7",
  },

  donationTitle: {
    fontWeight: "700",
  },

  donationDate: {
    fontSize: 12,
    color: "#6B7280",
  },

  amount: {
    fontWeight: "800",
    color: PURPLE,
  },

  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },

  status: {
    fontSize: 12,
    fontWeight: "700",
    color: "#16A34A",
  },

  pending: {
    color: "#D97706",
  },

  receipt: {
    fontSize: 12,
    fontWeight: "700",
    color: PURPLE,
  },

  receiptDisabled: {
    fontSize: 12,
    color: "#9CA3AF",
  },

  empty: {
    alignItems: "center",
    marginTop: 60,
  },

  emptyText: {
    marginTop: 10,
    color: "#9CA3AF",
  },
});
