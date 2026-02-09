import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BASE_URL = "http://172.18.41.124:5000";


export default function DonationHistoryScreen({ navigation, route }) {
  const donorId = route?.params?.donorId;

  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!donorId) return;

    fetch(`${BASE_URL}/api/donations/history/${donorId}`)
      .then((res) => res.json())
      .then((data) => {
        setDonations(data.donations || []);
        setTotalAmount(data.totalAmount || 0);
        setCount(data.count || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [donorId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );
  }

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

      {/* Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Total Donated</Text>
        <Text style={styles.summaryAmount}>₹{totalAmount}</Text>
        <Text style={styles.summarySub}>
          Across {count} donations
        </Text>
      </View>

      {/* History */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {donations.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="heart-outline" size={40} color="#D1D5DB" />
            <Text style={styles.emptyText}>
              No donations yet
            </Text>
          </View>
        ) : (
          donations.map((donation) => (
            <View key={donation._id} style={styles.historyCard}>
              <View style={styles.row}>
                <View style={styles.iconCircle}>
                  <Ionicons name="heart" size={18} color="#7C3AED" />
                </View>

                <View style={styles.flex}>
                  <Text style={styles.donationTitle}>
                    Hope Connect Donation
                  </Text>
                  <Text style={styles.donationDate}>
                    {new Date(donation.createdAt).toDateString()}
                  </Text>
                </View>

                <Text style={styles.amount}>
                  ₹{donation.amount}
                </Text>
              </View>

              <View style={styles.statusRow}>
                <Text style={styles.status}>
                  {donation.status || "Completed"}
                </Text>
                <Text style={styles.receipt}>
                  TXN{donation._id.slice(-6).toUpperCase()}
                </Text>
              </View>
            </View>
          ))
        )}

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
