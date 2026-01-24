import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DonationSuccessScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Success Icon */}
      <View style={styles.iconWrapper}>
        <Ionicons name="checkmark-circle" size={90} color="#7C3AED" />
      </View>

      {/* Title */}
      <Text style={styles.title}>Thank You! 💜</Text>
      <Text style={styles.subtitle}>
        Your donation was successful and will make a real difference in a
        child’s life.
      </Text>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.row}>
          <Text style={styles.label}>Amount Donated</Text>
          <Text style={styles.value}>₹500</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Payment Method</Text>
          <Text style={styles.value}>GPay</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Transaction ID</Text>
          <Text style={styles.value}>TXN98237461</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Status</Text>
          <Text style={[styles.value, styles.success]}>
            Completed
          </Text>
        </View>
      </View>

      {/* Message */}
      <View style={styles.messageBox}>
        <Ionicons name="heart" size={18} color="#7C3AED" />
        <Text style={styles.messageText}>
          Your contribution helps provide food, education, and care to children
          in need. We truly appreciate your generosity.
        </Text>
      </View>

      {/* Actions */}
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => navigation.navigate("DonationHistory")}
      >
        <Text style={styles.primaryText}>View Donation History</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() => navigation.navigate("DonorHub")}
      >
        <Text style={styles.secondaryText}>Back to Donor Hub</Text>
      </TouchableOpacity>
    </View>
  );
}

const PURPLE = "#7C3AED";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 20,
    paddingTop: 80,
    alignItems: "center",
  },

  iconWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F3E8FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#3B1D6A",
    marginBottom: 10,
  },

  subtitle: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 24,
    lineHeight: 22,
  },

  summaryCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  label: {
    color: "#6B7280",
    fontSize: 13,
  },

  value: {
    fontWeight: "700",
    fontSize: 13,
  },

  success: {
    color: "#16A34A",
  },

  messageBox: {
    flexDirection: "row",
    backgroundColor: "#F3E8FF",
    padding: 14,
    borderRadius: 14,
    marginBottom: 30,
  },

  messageText: {
    marginLeft: 8,
    color: "#4C1D95",
    flex: 1,
    fontSize: 13,
  },

  primaryBtn: {
    width: "100%",
    backgroundColor: PURPLE,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 12,
  },

  primaryText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },

  secondaryBtn: {
    width: "100%",
    backgroundColor: "#EDE9FE",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },

  secondaryText: {
    color: PURPLE,
    fontWeight: "700",
    fontSize: 15,
  },
});
