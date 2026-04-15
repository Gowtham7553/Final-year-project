import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import * as Location from "expo-location";

const BASE_URL = "http://10.90.184.124:5000";

export default function TasksScreen({ navigation }) {

  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState([]);
  const [volunteerId, setVolunteerId] = useState("");

  const [otpModal, setOtpModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [otp, setOtp] = useState("");

  const trackingRef = useRef(null);

  /* ================= GET VOLUNTEER ================= */
  useEffect(() => {
    const getVolunteer = async () => {
      const stored = await AsyncStorage.getItem("volunteer");
      if (stored) {
        const parsed = JSON.parse(stored);
        setVolunteerId(parsed.volunteerId);
      }
    };
    getVolunteer();
  }, []);

  /* ================= FETCH TASKS ================= */
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      console.log("📦 1. Fetching Donations from:", `${BASE_URL}/api/donations/pending`);
      const resDonations = await fetch(`${BASE_URL}/api/donations/pending`);
      console.log("📡 1. Donations Response Status:", resDonations.status);
      
      const textDonations = await resDonations.text();
      console.log("📜 1. RAW Donations Body:", textDonations.substring(0, 50));
      const donations = JSON.parse(textDonations);
      console.log("✅ 1. Parsed Donations Count:", donations.length);

      console.log("📦 2. Fetching Help Requests from:", `${BASE_URL}/api/helprequests/assigned`);
      const resRequests = await fetch(`${BASE_URL}/api/helprequests/assigned`);
      console.log("📡 2. Help Requests Response Status:", resRequests.status);
      
      const textRequests = await resRequests.text();
      console.log("📜 2. RAW HelpRequests Body:", textRequests.substring(0, 50));
      const requestsData = JSON.parse(textRequests);
      console.log("✅ 2. Parsed HelpRequests Count:", requestsData.length);

      // 3. Normalize Help Requests to match Donation structure
      const normalizedRequests = requestsData.map(req => ({
        ...req,
        isHelpRequest: true, // Marker to use different API endpoints
        items: [{ 
          category: req.needType || "Help Request", 
          description: req.description || "Support needed", 
          quantity: "1" 
        }],
        donorAddress: "Home Pickup",
        homeAddress: req.homeId?.fullAddress || "Home Location",
        donorLocation: { 
          lat: req.pickupLocation?.latitude, 
          lng: req.pickupLocation?.longitude 
        },
        homeLocation: {
          lat: req.homeId?.location?.latitude,
          lng: req.homeId?.location?.longitude
        },
        // Normalize status for UI
        status: req.status === "assigned" ? "Accepted" : req.status
      }));

      const combined = [...donations, ...normalizedRequests];
      
      console.log("📡 Total combined tasks:", combined.length);
      setTasks(combined);

    } catch (err) {
      console.log("❌ Catch Block Triggered in fetchTasks!");
      console.log("❌ Error Name:", err.name);
      console.log("❌ Error Message:", err.message);
      if (err.cause) console.log("❌ Error Cause:", err.cause);
      
      Alert.alert("Server error loading tasks", err.message);
    }
  };

  /* ================= ACCEPT DELIVERY ================= */
  const acceptDelivery = async (donationId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/donations/accept/${donationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ volunteerId }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error", data.message);
        return;
      }

      Alert.alert("Accepted", "Go to donor location to pickup");
      fetchTasks();
    } catch {
      Alert.alert("Server error");
    }
  };

  /* ================= START LIVE TRACKING ================= */
  const startLiveTracking = async (donationId) => {

    if (trackingRef.current) return;

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Allow location permission");
      return;
    }

    trackingRef.current = setInterval(async () => {
      try {
        let loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        await fetch(`${BASE_URL}/api/donations/location/${donationId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          }),
        });

        console.log("📍 Live location sent");
      } catch (err) {
        console.log("Location error");
      }
    }, 5000);
  };

  const stopTracking = () => {
    if (trackingRef.current) {
      clearInterval(trackingRef.current);
      trackingRef.current = null;
    }
  };

  /* ================= MARK PICKED ================= */
  const markPicked = async (task) => {
    try {
      const endpoint = task.isHelpRequest 
        ? `${BASE_URL}/api/helprequests/pickup/${task._id}`
        : `${BASE_URL}/api/donations/pickup/${task._id}`;

      await fetch(endpoint, { method: "PUT" });

      if (!task.isHelpRequest) startLiveTracking(task._id);
      
      Alert.alert("Picked", "Now navigate to home");
      fetchTasks();
    } catch {
      Alert.alert("Error updating");
    }
  };

  /* ================= OTP ================= */
  const openOtpModal = (id) => {
    setSelectedDonation(id);
    setOtp("");
    setOtpModal(true);
  };

  const verifyOtp = async () => {
    try {
      const task = tasks.find(t => t._id === selectedDonation);
      const endpoint = task?.isHelpRequest
        ? `${BASE_URL}/api/helprequests/complete/${selectedDonation}`
        : `${BASE_URL}/api/donations/verify-otp/${selectedDonation}`;

      const res = await fetch(endpoint, {
        method: task?.isHelpRequest ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });

      if (!res.ok) {
        Alert.alert(task?.isHelpRequest ? "Completion failed" : "Wrong OTP");
        return;
      }

      stopTracking();
      Alert.alert("Success", "Delivery Completed 🎉");
      setOtpModal(false);
      fetchTasks();
    } catch {
      Alert.alert("Server error");
    }
  };

  /* ================= GOOGLE MAP LOGIC (FIXED) ================= */
  const openMaps = async (task) => {

    let destination = "";

    // BEFORE PICKUP → GO TO DONOR (use pickup coordinates if available)
    if (task.status === "Pending" || task.status === "Accepted") {
      if (task.pickupLocation?.latitude && task.pickupLocation?.longitude) {
        destination = `${task.pickupLocation.latitude},${task.pickupLocation.longitude}`;
      } else {
        destination = task.donorAddress;
      }
    }

    // AFTER PICKED → GO TO HOME
    if (task.status === "Picked") {
      destination = task.homeAddress;
    }

    if (!destination) {
      Alert.alert("No location available");
      return;
    }

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Enable location permission");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const origin = `${loc.coords.latitude},${loc.coords.longitude}`;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;

      Linking.openURL(url);

    } catch {
      Alert.alert("Location error");
    }
  };

  /* ================= FILTER ================= */
  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((t) => t.status?.toLowerCase() === filter.toLowerCase());

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Tasks</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.filters}>
        {["All", "Pending", "Accepted", "Picked", "Delivered"].map((item) => {
          const active = filter === item;
          return (
            <TouchableOpacity
              key={item}
              style={[styles.filterBtn, active && styles.filterActive]}
              onPress={() => setFilter(item)}
            >
              <Text style={[styles.filterText, active && styles.filterTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredTasks.map((task) => (
          <View key={task._id} style={styles.card}>

            <View style={styles.cardHeader}>
              <View style={styles.iconBox}>
                <Ionicons name="cube-outline" size={20} color="#7C3AED" />
              </View>
              <Text style={styles.status}>{task.status?.toUpperCase()}</Text>
            </View>

            <Text style={styles.title}>
              {task.items?.[0]?.category || "Donation Delivery"}
            </Text>

            <Text style={styles.desc}>
              {task.items?.[0]?.description || "Item delivery"}
            </Text>

            <View style={styles.metaItem}>
              <Ionicons name="cube-outline" size={14} />
              <Text style={styles.metaText}>
                Qty: {task.items?.[0]?.quantity || "1"}
              </Text>
            </View>

            <View style={styles.metaItem}>
              <Ionicons name="arrow-up-circle-outline" size={14} />
              <Text style={styles.metaText}>Pickup: {task.donorAddress}</Text>
            </View>

            {/* 📍 PICKUP LOCATION COORDINATES */}
            {(task.pickupLocation?.latitude || task.donorLocation?.lat) && (
              <View style={styles.locationBox}>
                <Ionicons name="navigate-circle-outline" size={16} color="#7C3AED" />
                <Text style={styles.locationText}>
                  📍 Pickup GPS: {
                    task.pickupLocation?.latitude
                      ? `${task.pickupLocation.latitude.toFixed(4)}, ${task.pickupLocation.longitude.toFixed(4)}`
                      : `${task.donorLocation.lat.toFixed(4)}, ${task.donorLocation.lng.toFixed(4)}`
                  }
                </Text>
              </View>
            )}

            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={14} />
              <Text style={styles.metaText}>Drop: {task.homeAddress}</Text>
            </View>

            {/* 📍 DROP LOCATION COORDINATES */}
            {task.homeLocation?.lat && (
              <View style={styles.locationBox}>
                <Ionicons name="home-outline" size={16} color="#16A34A" />
                <Text style={[styles.locationText, {color: "#16A34A"}]}>
                  🏠 Drop GPS: {task.homeLocation.lat.toFixed(4)}, {task.homeLocation.lng.toFixed(4)}
                </Text>
              </View>
            )}

            {/* 🔥 MAP BUTTON FIXED */}
            <TouchableOpacity
              style={styles.mapBtn}
              onPress={() => openMaps(task)}
            >
              <Ionicons name="navigate" size={16} color="#fff" />
              <Text style={styles.mapText}>Navigate Route</Text>
            </TouchableOpacity>

            {task.status === "Pending" && (
              <TouchableOpacity style={styles.acceptBtn} onPress={() => acceptDelivery(task._id)}>
                <Text style={styles.btnText}>Accept Delivery</Text>
              </TouchableOpacity>
            )}

            {task.status === "Accepted" && (
              <TouchableOpacity
                style={[styles.acceptBtn,{backgroundColor:"#F59E0B"}]}
                onPress={() => markPicked(task)}
              >
                <Text style={styles.btnText}>Mark Picked</Text>
              </TouchableOpacity>
            )}

            {task.status === "Picked" && (
              <TouchableOpacity
                style={[styles.acceptBtn,{backgroundColor:"#16A34A"}]}
                onPress={() => openOtpModal(task._id)}
              >
                <Text style={styles.btnText}>Complete Delivery</Text>
              </TouchableOpacity>
            )}

          </View>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* OTP MODAL */}
      <Modal visible={otpModal} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <Text style={{fontWeight:"700",fontSize:16}}>Enter Home OTP</Text>

            <TextInput
              placeholder="Enter OTP"
              value={otp}
              onChangeText={setOtp}
              style={styles.otpInput}
              keyboardType="numeric"
            />

            <TouchableOpacity style={styles.acceptBtn} onPress={verifyOtp}>
              <Text style={styles.btnText}>Verify & Complete</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>setOtpModal(false)}>
              <Text style={{marginTop:10,color:"red"}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const PURPLE="#7C3AED";

const styles=StyleSheet.create({
container:{flex:1,backgroundColor:"#F9FAFB",paddingHorizontal:16},
header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginVertical:14},
headerTitle:{fontSize:16,fontWeight:"700"},
filters:{flexDirection:"row",flexWrap:"wrap",marginBottom:16},
filterBtn:{paddingHorizontal:14,paddingVertical:8,borderRadius:20,backgroundColor:"#E5E7EB",marginRight:8,marginBottom:8},
filterActive:{backgroundColor:"#EDE9FE"},
filterText:{fontSize:12,fontWeight:"600",color:"#6B7280"},
filterTextActive:{color:PURPLE},
card:{backgroundColor:"#fff",borderRadius:16,padding:14,marginBottom:14},
cardHeader:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginBottom:8},
iconBox:{width:36,height:36,borderRadius:10,backgroundColor:"#EDE9FE",alignItems:"center",justifyContent:"center"},
status:{fontSize:11,fontWeight:"700",paddingHorizontal:10,paddingVertical:4,borderRadius:10,backgroundColor:"#EDE9FE",color:PURPLE},
title:{fontWeight:"700",fontSize:15,marginBottom:4},
desc:{fontSize:13,color:"#6B7280",marginBottom:10},
metaItem:{flexDirection:"row",alignItems:"center",marginTop:4},
metaText:{marginLeft:6,fontSize:12,color:"#6B7280"},
locationBox:{flexDirection:"row",alignItems:"center",marginTop:6,backgroundColor:"#F3F0FF",paddingHorizontal:10,paddingVertical:6,borderRadius:10},
locationText:{marginLeft:6,fontSize:12,color:"#7C3AED",fontWeight:"600"},
acceptBtn:{backgroundColor:PURPLE,padding:12,borderRadius:12,marginTop:12,alignItems:"center"},
btnText:{color:"#fff",fontWeight:"700"},
mapBtn:{backgroundColor:"#2563EB",padding:10,borderRadius:10,marginTop:10,flexDirection:"row",justifyContent:"center",alignItems:"center"},
mapText:{color:"#fff",fontWeight:"700",marginLeft:6},
modalBg:{flex:1,backgroundColor:"rgba(0,0,0,0.5)",justifyContent:"center",alignItems:"center"},
modalBox:{backgroundColor:"#fff",padding:20,borderRadius:20,width:"80%",alignItems:"center"},
otpInput:{borderWidth:1,borderColor:"#ccc",width:"100%",padding:10,marginTop:10,borderRadius:10}
});
