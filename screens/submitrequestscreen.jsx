import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// responsive scaling
const scale = width / 375;
const normalize = (size) => Math.round(scale * size);

export default function SubmitHelpRequestScreen({ navigation }) {
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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: normalize(40) }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={normalize(22)} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Submit Help Request</Text>
        <View style={{ width: normalize(22) }} />
      </View>

      {/* Title */}
      <Text style={styles.title}>How can we help?</Text>
      <Text style={styles.subtitle}>
        Please fill out the details below so we can connect you with the right
        support.
      </Text>

      {/* Needs */}
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
              <Text
                style={[styles.chipText, active && styles.chipTextActive]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Urgency */}
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
              <Text
                style={[
                  styles.urgencyText,
                  active && styles.urgencyTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Description */}
      <Text style={styles.label}>Tell us more about the situation</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Please describe the needs clearly..."
        multiline
        value={description}
        onChangeText={setDescription}
      />

      {/* Submit */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Submit Request</Text>
      </TouchableOpacity>

      <View style={{ height: normalize(40) }} />
    </ScrollView>
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

headerTitle:{
  fontSize: normalize(16),
  fontWeight:"700"
},

title:{
  fontSize: normalize(24),
  fontWeight:"800",
  marginBottom: normalize(6)
},

subtitle:{
  color:"#6B7280",
  marginBottom: normalize(20),
  fontSize: normalize(13)
},

label:{
  fontWeight:"600",
  marginBottom: normalize(8),
  marginTop: normalize(16),
  fontSize: normalize(14)
},

chipRow:{
  flexDirection:"row",
  flexWrap:"wrap",
  gap: normalize(10)
},

chip:{
  flexDirection:"row",
  alignItems:"center",
  gap:6,
  paddingHorizontal: normalize(14),
  paddingVertical: normalize(10),
  borderRadius: normalize(20),
  borderWidth:1,
  borderColor:"#E5E7EB",
  backgroundColor:"#fff"
},

chipActive:{
  backgroundColor:PURPLE,
  borderColor:PURPLE
},

chipText:{
  fontWeight:"600",
  fontSize: normalize(13),
  color:"#374151"
},

chipTextActive:{
  color:"#fff"
},

urgencyRow:{
  flexDirection:"row",
  justifyContent:"space-between"
},

urgencyBox:{
  width:"30%",
  backgroundColor:"#fff",
  borderRadius: normalize(14),
  paddingVertical: normalize(14),
  alignItems:"center",
  borderWidth:1,
  borderColor:"#E5E7EB"
},

urgencyActive:{
  borderColor:PURPLE,
  backgroundColor:"#F3E8FF"
},

urgencyText:{
  fontSize: normalize(12),
  marginTop:6,
  color:"#6B7280",
  fontWeight:"600"
},

urgencyTextActive:{
  color:PURPLE
},

textArea:{
  backgroundColor:"#fff",
  borderRadius: normalize(12),
  padding: normalize(14),
  borderWidth:1,
  borderColor:"#E5E7EB",
  minHeight: normalize(100),
  textAlignVertical:"top",
  fontSize: normalize(14)
},

button:{
  backgroundColor:PURPLE,
  padding: normalize(18),
  borderRadius: normalize(30),
  alignItems:"center",
  marginTop: normalize(20)
},

buttonText:{
  color:"#fff",
  fontWeight:"700",
  fontSize: normalize(16)
}
});