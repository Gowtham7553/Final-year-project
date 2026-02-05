import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BASE_URL = "http://10.172.162.124:5000";
 // SERVER IP

export default function DonateScreen({ navigation, route }) {
  // ✅ donorId received from DonorHub
  const donorId = route?.params?.donorId;

  const [amount, setAmount] = useState(500);
  const [method, setMethod] = useState("GPay");
  const [customAmount, setCustomAmount] = useState("");

  const amounts = [100, 250, 500, 1000];

  const handleDonate = async () => {
    if (!donorId) {
      Alert.alert("Error", "Donor not identified. Please login again.");
      return;
    }

    const finalAmount = customAmount
      ? Number(customAmount)
      : amount;

    if (!finalAmount || finalAmount <= 0) {
      Alert.alert("Error", "Enter a valid amount");
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/api/donations/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            donorId: donorId,
            amount: finalAmount,
            paymentMethod: method,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.donation) {
        Alert.alert("Error", data.message || "Donation failed");
        return;
      }

      // ✅ PASS DONATION DATA TO SUCCESS SCREEN
      navigation.navigate("DonationSuccess", {
        donation: data.donation,
      });
    } catch (error) {
      Alert.alert("Error", "Server not reachable");
    }
  };

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
          <Text style={styles.verified}>✔ Verified Non-Profit</Text>
          <Text style={styles.title}>Make a Difference</Text>
          <Text style={styles.subtitle}>
            100% of your donation supports children.
          </Text>
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
              onPress={() => {
                setAmount(amt);
                setCustomAmount("");
              }}
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
            value={customAmount}
            onChangeText={setCustomAmount}
            style={{ marginLeft: 8, flex: 1 }}
          />
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

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Donate Button */}
      <TouchableOpacity
        style={styles.donateBtn}
        onPress={handleDonate}
      >
        <Text style={styles.donateText}>
          Donate ₹{customAmount || amount} 💜
        </Text>
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
