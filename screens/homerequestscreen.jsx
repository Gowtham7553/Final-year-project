import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");
const scale = width / 375;
const normalize = (size) => Math.round(scale * size);

const BASE_URL = "http://10.90.184.124:5000";

export default function HomeRequestsScreen({ navigation, route }) {

 const donorId = route?.params?.donorId || null;

console.log("👤 Donor ID in HomeRequests:", donorId);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    console.log("📡 Fetching help requests...");
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/helprequests`);
      const data = await res.json();

      console.log("✅ Requests fetched:", data);

      setRequests(data);
    } catch (err) {
      console.log("❌ Error fetching requests:", err);
    }
  };

  /* 🔥 SET PICKUP LOCATION */
  const setPickup = async (requestId, homeLocation) => {

    console.log("🚚 Set Pickup Clicked");
    console.log("Request ID:", requestId);
    console.log("Home Location:", homeLocation);

    if (!homeLocation) {
      console.log("⚠️ No home location found");
      return;
    }

    navigation.navigate("PickupMap", {
      requestId,
      homeLocation
    });

    console.log("➡️ Navigated to PickupMap");
  };

  /* 🧾 CARD */
  const renderItem = ({ item }) => {

    const home = item.homeId;

    console.log("📦 Rendering Request:", item);

    return (
      <View style={styles.card}>

        {/* URGENCY */}
        <Text style={styles.urgency}>
          🚨 {item.urgency}
        </Text>

        {/* NEED */}
        <Text style={styles.need}>
          📦 {item.needType}
        </Text>

        {/* DESCRIPTION */}
        <Text style={styles.desc}>
          {item.description}
        </Text>

        {/* STATUS */}
        <Text style={styles.extra}>
          📌 Status: {item.status}
        </Text>

        {/* PRIORITY */}
        <Text style={styles.extra}>
          ⭐ Priority: {item.aiPriorityScore}
        </Text>

        {/* HOME NAME */}
        <Text style={styles.drop}>
          📍 Drop: {home?.homeName || "Unknown Home"}
        </Text>

        {/* CREATED TIME */}
        <Text style={styles.extra}>
          🕒 {new Date(item.createdAt).toLocaleString()}
        </Text>

        {/* BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setPickup(item._id, home?.location)}
        >
          <Text style={styles.buttonText}>
            Set Pickup Location
          </Text>
        </TouchableOpacity>

      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <FlatList
        data={requests}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{
          padding: normalize(16),
          paddingBottom: height * 0.05
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const PURPLE = "#7C3AED";

const styles = StyleSheet.create({

  card:{
    backgroundColor:"#fff",
    borderRadius: normalize(16),
    padding: normalize(16),
    marginBottom: normalize(14),
    elevation:2
  },

  urgency:{
    fontWeight:"800",
    fontSize: normalize(14),
    color:"#DC2626",
    marginBottom: normalize(6)
  },

  need:{
    fontWeight:"700",
    fontSize: normalize(14),
    marginBottom: normalize(6)
  },

  desc:{
    color:"#6B7280",
    marginBottom: normalize(10)
  },

  drop:{
    fontSize: normalize(12),
    color:"#374151",
    marginBottom: normalize(6)
  },

  extra:{
    fontSize: normalize(12),
    color:"#6B7280",
    marginBottom: normalize(4)
  },

  button:{
    backgroundColor:PURPLE,
    padding: normalize(12),
    borderRadius: normalize(12),
    alignItems:"center",
    marginTop: normalize(10)
  },

  buttonText:{
    color:"#fff",
    fontWeight:"700"
  }

});