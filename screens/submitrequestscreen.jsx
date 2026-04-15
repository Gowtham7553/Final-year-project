import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context"; // ✅ added

const { width, height } = Dimensions.get("window");
const scale = width / 375;
const normalize = (size) => Math.round(scale * size);

export default function SubmitHelpRequestScreen({ navigation, route }) {

  const homeId = route?.params?.homeId;

  const [need, setNeed] = useState("Education");
  const [urgency, setUrgency] = useState("Standard");
  const [description, setDescription] = useState("");

  const needs = [
    { label: "Education", icon: "school-outline" },
    { label: "Food", icon: "restaurant-outline" },
    { label: "Clothing", icon: "shirt-outline" },
    { label: "Medical", icon: "medkit-outline" }
  ];

  const urgencies = ["Standard", "Urgent", "Critical"];

  const getPriority = (needType) => {
    if (needType === "Medical") return 10;
    if (needType === "Food") return 9;
    if (needType === "Education") return 8;
    return 5;
  };
const submitRequest = async () => {

  console.log("🟡 Submit button clicked");

  if (!description) {
    console.log("⚠️ Description is empty");
    Alert.alert("Please enter description");
    return;
  }

  try {
    const priority = getPriority(need);

    console.log("📤 Sending Request Data:");
    console.log({
      homeId,
      needType: need,
      urgency,
      description,
      priority
    });

    const res = await fetch("http://10.90.184.124:5000/api/helprequests/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        homeId,
        needType: need,
        urgency,
        description,
        priority
      })
    });

    console.log("📡 Response Status:", res.status);

    const data = await res.json();

    console.log("✅ Response Data:", data);

    Alert.alert("Success", "Request submitted successfully ✅");

    console.log("🔙 Navigating back after success");

    navigation.goBack();

  } catch (error) {

    console.log("❌ Submit Error:", error);

    Alert.alert("Error", "Failed to submit request ❌");
  }
};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: normalize(40),
          paddingTop: height * 0.01 // ✅ small safe spacing
        }}
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={normalize(22)} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Submit Help Request</Text>
          <View style={{ width: normalize(22) }} />
        </View>

        <Text style={styles.title}>How can we help?</Text>
        <Text style={styles.subtitle}>
          Please fill out the details below so we can connect you with the right support.
        </Text>

        {/* NEEDS */}
        <Text style={styles.label}>What do they need?</Text>
        <View style={styles.chipRow}>
          {needs.map((item) => {
            const active = need === item.label;
            return (
              <TouchableOpacity
                key={item.label}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setNeed(item.label)}
              >
                <Ionicons
                  name={item.icon}
                  size={normalize(16)}
                  color={active ? "#fff" : "#6B7280"}
                />
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* URGENCY */}
        <Text style={styles.label}>Urgency Level</Text>
        <View style={styles.urgencyRow}>
          {urgencies.map((item) => {
            const active = urgency === item;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.urgencyBox, active && styles.urgencyActive]}
                onPress={() => setUrgency(item)}
              >
                <Ionicons
                  name={
                    item === "Standard"
                      ? "time-outline"
                      : item === "Urgent"
                      ? "alert-circle-outline"
                      : "warning-outline"
                  }
                  size={normalize(18)}
                  color={active ? "#7C3AED" : "#6B7280"}
                />
                <Text style={[styles.urgencyText, active && styles.urgencyTextActive]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* DESCRIPTION */}
        <Text style={styles.label}>Tell us more</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Describe the needs..."
          multiline
          value={description}
          onChangeText={setDescription}
        />

        {/* SUBMIT */}
        <TouchableOpacity style={styles.button} onPress={submitRequest}>
          <Text style={styles.buttonText}>Submit Request</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const PURPLE = "#7C3AED";

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#F9FAFB",
    paddingHorizontal: normalize(20)
  },

  header:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginVertical: normalize(14)
  },

  headerTitle:{ fontSize: normalize(16), fontWeight:"700" },

  title:{ fontSize: normalize(24), fontWeight:"800", marginBottom: 6 },

  subtitle:{ color:"#6B7280", marginBottom: normalize(20) },

  label:{ fontWeight:"600", marginTop: normalize(16), marginBottom: normalize(8) },

  chipRow:{ flexDirection:"row", flexWrap:"wrap", gap:10 },

  chip:{ flexDirection:"row", padding: normalize(10), borderRadius:20, borderWidth:1 },

  chipActive:{ backgroundColor:PURPLE },

  chipText:{ marginLeft:5 },

  chipTextActive:{ color:"#fff" },

  urgencyRow:{ flexDirection:"row", justifyContent:"space-between" },

  urgencyBox:{ width:"30%", padding: normalize(14), borderRadius:14 },

  urgencyActive:{ backgroundColor:"#F3E8FF" },

  urgencyText:{ marginTop:6 },

  urgencyTextActive:{ color:PURPLE },

  textArea:{
    backgroundColor:"#fff",
    padding: normalize(14),
    borderRadius:12,
    minHeight: normalize(100)
  },

  button:{
    backgroundColor:PURPLE,
    padding: normalize(18),
    borderRadius:30,
    alignItems:"center",
    marginTop: normalize(20)
  },

  buttonText:{ color:"#fff", fontWeight:"700" }
});