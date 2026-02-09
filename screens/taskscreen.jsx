import React, { useState, useEffect } from "react";
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


const BASE_URL = "http://172.18.41.124:5000";

export default function TasksScreen({ navigation }) {

  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState([]);
  const [volunteerId, setVolunteerId] = useState("");

  const [otpModal, setOtpModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [otp, setOtp] = useState("");

  /* ================= GET VOLUNTEER ID ================= */
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
      const res = await fetch(`${BASE_URL}/api/donations/pending`);
      const data = await res.json();
      setTasks(data);
    } catch {
      Alert.alert("Server error loading tasks");
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

      Alert.alert("Accepted", "Delivery assigned to you\nOTP: " + data.otp);
      fetchTasks();
    } catch {
      Alert.alert("Server error");
    }
  };

  /* ================= MARK PICKED ================= */
  const markPicked = async (id) => {
  try {

    await fetch(`${BASE_URL}/api/donations/pickup/${id}`, {
      method: "PUT",
    });

    // ⭐ START LIVE TRACKING HERE
    startLiveTracking(id);

    Alert.alert("Picked", "Now delivering to home");
    fetchTasks();

  } catch {
    Alert.alert("Error updating");
  }
};


  /* ================= OPEN OTP MODAL ================= */
  const openOtpModal = (id) => {
    setSelectedDonation(id);
    setOtp("");
    setOtpModal(true);
  };

  /* ================= VERIFY OTP ================= */
  const verifyOtp = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/donations/verify-otp/${selectedDonation}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Wrong OTP");
        return;
      }

      Alert.alert("Success", "Delivery Completed 🎉");
      setOtpModal(false);
      fetchTasks();

    } catch {
      Alert.alert("Server error");
    }
  };

  /* ================= GOOGLE MAP ================= */
  const openMaps = (pickup, drop) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${pickup}&destination=${drop}`;
    Linking.openURL(url);
  };

  /* ================= FILTER ================= */
  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((t) => t.status?.toLowerCase() === filter.toLowerCase());

      const startLiveTracking = async (donationId) => {

  // ask location permission
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    alert("Allow location permission");
    return;
  }

  // send location every 5 seconds
  setInterval(async () => {

    try {
      let loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });

      await fetch(`${BASE_URL}/api/donations/location/${donationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude
        })
      });

      console.log("📍 Live location sent");

    } catch (err) {
      console.log("Location error");
    }

  }, 5000); // every 5 seconds
};


  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Tasks</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        {["All", "Pending", "Accepted", "Picked", "Delivered"].map((item) => {
          const active = filter === item;
          return (
            <TouchableOpacity
              key={item}
              style={[styles.filterBtn, active && styles.filterActive]}
              onPress={() => setFilter(item)}
            >
              <Text
                style={[
                  styles.filterText,
                  active && styles.filterTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredTasks.map((task) => (
          <View key={task._id} style={styles.card}>

            {/* Status */}
            <View style={styles.cardHeader}>
              <View style={styles.iconBox}>
                <Ionicons name="cube-outline" size={20} color="#7C3AED" />
              </View>
              <Text style={styles.status}>{task.status?.toUpperCase()}</Text>
            </View>

            {/* Title */}
            <Text style={styles.title}>
              {task.items?.[0]?.category || "Donation Delivery"}
            </Text>

            <Text style={styles.desc}>
              {task.items?.[0]?.description || "Item delivery"}
            </Text>

            {/* Quantity */}
            <View style={styles.metaItem}>
              <Ionicons name="cube-outline" size={14} />
              <Text style={styles.metaText}>
                Qty: {task.items?.[0]?.quantity || "1"}
              </Text>
            </View>

            {/* Pickup */}
            <View style={styles.metaItem}>
              <Ionicons name="arrow-up-circle-outline" size={14} />
              <Text style={styles.metaText}>
                Pickup: {task.donorAddress}
              </Text>
            </View>

            {/* Drop */}
            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={14} />
              <Text style={styles.metaText}>
                Drop: {task.homeAddress}
              </Text>
            </View>

            {/* Phone */}
            <View style={styles.metaItem}>
              <Ionicons name="call-outline" size={14} />
              <Text style={styles.metaText}>
                {task.homeId?.phone || "No phone"}
              </Text>
            </View>

            {/* MAP */}
            <TouchableOpacity
              style={styles.mapBtn}
              onPress={() => openMaps(task.donorAddress, task.homeAddress)}
            >
              <Ionicons name="navigate" size={16} color="#fff" />
              <Text style={styles.mapText}>Navigate Route</Text>
            </TouchableOpacity>

            {/* Accept */}
            {task.status === "Pending" && (
              <TouchableOpacity
                style={styles.acceptBtn}
                onPress={() => acceptDelivery(task._id)}
              >
                <Text style={styles.btnText}>Accept Delivery</Text>
              </TouchableOpacity>
            )}

            {/* Picked */}
            {task.status === "Accepted" && (
              <TouchableOpacity
                style={[styles.acceptBtn,{backgroundColor:"#F59E0B"}]}
                onPress={() => markPicked(task._id)}
              >
                <Text style={styles.btnText}>Mark Picked</Text>
              </TouchableOpacity>
            )}

            {/* Delivered */}
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

const PURPLE = "#7C3AED";

const styles = StyleSheet.create({
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

acceptBtn:{backgroundColor:PURPLE,padding:12,borderRadius:12,marginTop:12,alignItems:"center"},
btnText:{color:"#fff",fontWeight:"700"},

mapBtn:{backgroundColor:"#2563EB",padding:10,borderRadius:10,marginTop:10,flexDirection:"row",justifyContent:"center",alignItems:"center"},
mapText:{color:"#fff",fontWeight:"700",marginLeft:6},

modalBg:{flex:1,backgroundColor:"rgba(0,0,0,0.5)",justifyContent:"center",alignItems:"center"},
modalBox:{backgroundColor:"#fff",padding:20,borderRadius:20,width:"80%",alignItems:"center"},
otpInput:{borderWidth:1,borderColor:"#ccc",width:"100%",padding:10,marginTop:10,borderRadius:10}
});
