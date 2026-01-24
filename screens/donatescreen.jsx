import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DonateScreen({ navigation }) {
  const [amount, setAmount] = useState(500);
  const [method, setMethod] = useState("GPay");

  const amounts = [100, 250, 500, 1000];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Donate</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.verified}>
            ✔ Verified Non-Profit Organization
          </Text>
          <Text style={styles.title}>Make a Difference</Text>
          <Text style={styles.subtitle}>
            100% of your donation goes directly to the children’s needs.
          </Text>
        </View>

        {/* Donation Type */}
        <View style={styles.switch}>
          <View style={[styles.switchBtn, styles.switchActive]}>
            <Text style={styles.switchTextActive}>Monetary</Text>
          </View>
          <View style={styles.switchBtn}>
            <Text style={styles.switchText}>Daily Needs</Text>
          </View>
        </View>

        {/* Amount */}
        <Text style={styles.section}>Choose Amount</Text>
        <View style={styles.amountGrid}>
          {amounts.map((amt) => (
            <TouchableOpacity
              key={amt}
              style={[
                styles.amountBox,
                amount === amt && styles.amountActive,
              ]}
              onPress={() => setAmount(amt)}
            >
              <Text
                style={[
                  styles.amountText,
                  amount === amt && styles.amountTextActive,
                ]}
              >
                ₹{amt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.customInput}>
          <Ionicons name="cash-outline" size={18} color="#9CA3AF" />
          <TextInput
            placeholder="Enter custom amount"
            keyboardType="numeric"
            style={{ marginLeft: 8, flex: 1 }}
          />
        </View>

        {/* Impact */}
        <View style={styles.impactBox}>
          <Ionicons name="heart" size={18} color="#7C3AED" />
          <Text style={styles.impactText}>
            Your impact: <Text style={styles.bold}>₹500</Text> provides a
            complete school kit and meals for 2 children for a week.
          </Text>
        </View>

        {/* Monthly */}
        <View style={styles.monthly}>
          <Ionicons name="calendar-outline" size={18} color="#7C3AED" />
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={styles.monthlyTitle}>Monthly Donation</Text>
            <Text style={styles.monthlySub}>
              Make a sustained impact
            </Text>
          </View>
          <Ionicons name="toggle-outline" size={36} color="#D1D5DB" />
        </View>

        {/* Payment */}
        <Text style={styles.section}>Payment Method</Text>

        {["GPay", "Paytm", "Apple Pay", "Credit Card"].map((item) => (
          <TouchableOpacity
            key={item}
            style={styles.paymentRow}
            onPress={() => setMethod(item)}
          >
            <Text style={styles.paymentText}>{item}</Text>
            <Ionicons
              name={
                method === item
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={20}
              color="#7C3AED"
            />
          </TouchableOpacity>
        ))}

        {/* Security */}
        <View style={styles.security}>
          <Ionicons name="lock-closed" size={14} color="#16A34A" />
          <Text style={styles.securityText}>
            Secure 256-bit SSL Encryption
          </Text>
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Donate Button */}
      <TouchableOpacity style={styles.donateBtn}
      onPress ={() => navigation.navigate("DonationSuccess")}>
        <Text style={styles.donateText}>Donate ₹{amount} 💜</Text>
      </TouchableOpacity>
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
    marginVertical: 14,
  },

  headerTitle: {
    fontWeight: "700",
  },

  hero: {
    alignItems: "center",
    marginBottom: 20,
  },

  verified: {
    color: "#16A34A",
    fontSize: 12,
    marginBottom: 6,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
  },

  subtitle: {
    color: "#6B7280",
    textAlign: "center",
    marginTop: 6,
  },

  switch: {
    flexDirection: "row",
    backgroundColor: "#EFEAFE",
    borderRadius: 24,
    padding: 4,
    marginBottom: 20,
  },

  switchBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },

  switchActive: {
    backgroundColor: "#fff",
  },

  switchText: {
    color: "#6B7280",
    fontWeight: "600",
  },

  switchTextActive: {
    color: PURPLE,
    fontWeight: "700",
  },

  section: {
    fontWeight: "800",
    marginBottom: 10,
  },

  amountGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  amountBox: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#fff",
  },

  amountActive: {
    backgroundColor: PURPLE,
    borderColor: PURPLE,
  },

  amountText: {
    fontWeight: "700",
  },

  amountTextActive: {
    color: "#fff",
  },

  customInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 14,
  },

  impactBox: {
    flexDirection: "row",
    backgroundColor: "#F3E8FF",
    padding: 14,
    borderRadius: 14,
    marginBottom: 16,
  },

  impactText: {
    marginLeft: 8,
    color: "#4C1D95",
    flex: 1,
  },

  bold: {
    fontWeight: "800",
  },

  monthly: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
  },

  monthlyTitle: {
    fontWeight: "700",
  },

  monthlySub: {
    fontSize: 12,
    color: "#6B7280",
  },

  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },

  paymentText: {
    fontWeight: "600",
  },

  security: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },

  securityText: {
    fontSize: 12,
    color: "#16A34A",
    marginLeft: 6,
  },

  donateBtn: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: PURPLE,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },

  donateText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
});
