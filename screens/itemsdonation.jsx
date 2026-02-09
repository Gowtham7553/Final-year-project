import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://172.18.41.124:5000";

export default function ItemDonationScreen({ navigation, route }) {

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [donorLocation, setDonorLocation] = useState("");

  const [homes, setHomes] = useState([]);
  const [selectedHome, setSelectedHome] = useState(null);
  const [donorId, setDonorId] = useState("");

  /* ================= GET DONOR ID ================= */
  useEffect(() => {
    const getDonor = async () => {
      const stored = await AsyncStorage.getItem("donor");
      if (stored) {
        const parsed = JSON.parse(stored);
        setDonorId(parsed.donorId);
      }
    };
    getDonor();
  }, []);

  /* ================= RECEIVE LOCATION FROM MAP ================= */
  useEffect(() => {
    if (route?.params?.pickedAddress) {
      setDonorLocation(route.params.pickedAddress);
    }
  }, [route?.params?.pickedAddress]);

  /* ================= LOAD HOMES ================= */
  useEffect(() => {
    fetchHomes();
  }, []);

  const fetchHomes = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/donations/homes`);
      const data = await res.json();
      setHomes(data);
    } catch {
      Alert.alert("Server not reachable");
    }
  };

  /* ================= CURRENT GPS LOCATION ================= */
  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission denied", "Allow location permission");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      const { latitude, longitude } = location.coords;

      const address = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (address.length > 0) {
        const place = `${address[0].name || ""}, ${address[0].street || ""}, ${address[0].city || ""}`;
        setDonorLocation(place);
      } else {
        setDonorLocation(`${latitude}, ${longitude}`);
      }

    } catch (error) {
      console.log(error);
      Alert.alert("Location error", "Enable GPS & Internet");
    }
  };

  /* ================= CREATE DONATION ================= */
  const handleDonate = async () => {

    if (!selectedHome) {
      Alert.alert("Select children's home");
      return;
    }

    if (!donorLocation) {
      Alert.alert("Select pickup location");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/donations/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorId,
          homeId: selectedHome._id,
          category,
          description,
          quantity,
          donorAddress: donorLocation,
          homeAddress:
            selectedHome.address?.street +
            ", " +
            selectedHome.address?.city,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error", data.message);
        return;
      }

      Alert.alert("🎉 Donation created successfully");
      navigation.goBack();

    } catch {
      Alert.alert("Server error");
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Donate Items</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* CATEGORY */}
      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        placeholder="Food / Clothes / Books"
        value={category}
        onChangeText={setCategory}
      />

      {/* DESCRIPTION */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Rice bags, dresses..."
        value={description}
        onChangeText={setDescription}
      />

      {/* QUANTITY */}
      <Text style={styles.label}>Quantity</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />

      {/* PICKUP LOCATION */}
      <Text style={styles.label}>Pickup Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Select pickup location"
        value={donorLocation}
        onChangeText={setDonorLocation}
      />

      {/* CURRENT GPS */}
      <TouchableOpacity style={styles.locationBtn} onPress={getCurrentLocation}>
        <Ionicons name="locate" size={18} color="#7C3AED" />
        <Text style={styles.locationText}>Use Current Location</Text>
      </TouchableOpacity>

      {/* 🔥 NEW BUTTON → MANUAL MAP PICK */}
      <TouchableOpacity
        style={[styles.locationBtn,{backgroundColor:"#DBEAFE"}]}
        onPress={() => navigation.navigate("MapPicker")}
      >
        <Ionicons name="map-outline" size={18} color="#2563EB" />
        <Text style={[styles.locationText,{color:"#2563EB"}]}>
          Enter Location Manually (Open Map)
        </Text>
      </TouchableOpacity>

      {/* HOME LIST */}
      <Text style={styles.label}>Select Children's Home</Text>

      {homes.map((home) => (
        <TouchableOpacity
          key={home._id}
          style={[
            styles.homeCard,
            selectedHome?._id === home._id && { backgroundColor: "#EDE9FE" }
          ]}
          onPress={() => setSelectedHome(home)}
        >
          <Text style={{ fontWeight: "700" }}>{home.homeName}</Text>
          <Text style={{ color: "gray", fontSize: 12 }}>
            {home.address?.city}
          </Text>
        </TouchableOpacity>
      ))}

      {/* BUTTON */}
      <TouchableOpacity style={styles.button} onPress={handleDonate}>
        <Text style={styles.buttonText}>Complete Donation</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const PURPLE = "#7C3AED";

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#F9FAFB",padding:20},

  header:{flexDirection:"row",justifyContent:"space-between",marginBottom:20},
  headerTitle:{fontWeight:"700",fontSize:16},

  label:{fontWeight:"700",marginTop:12},

  input:{
    backgroundColor:"#fff",
    padding:14,
    borderRadius:12,
    marginTop:6
  },

  locationBtn:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#F3E8FF",
    padding:12,
    borderRadius:12,
    marginTop:10
  },

  locationText:{
    color:PURPLE,
    fontWeight:"700",
    marginLeft:6
  },

  homeCard:{
    backgroundColor:"#fff",
    padding:14,
    borderRadius:12,
    marginTop:10
  },

  button:{
    backgroundColor:PURPLE,
    padding:18,
    borderRadius:30,
    alignItems:"center",
    marginTop:20
  },

  buttonText:{color:"#fff",fontWeight:"700"}
});
