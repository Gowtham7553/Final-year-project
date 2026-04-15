import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Text, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function PickupMapScreen({ route, navigation }) {

  const { requestId, homeLocation } = route.params;

  const [marker, setMarker] = useState(null);
  const mapRef = useRef(null); // ✅ FIXED

  console.log("📦 Screen Loaded");
  console.log("🆔 Request ID:", requestId);
  console.log("🏠 Home Location:", homeLocation);

  /* 📍 GET CURRENT LOCATION */
  const getCurrentLocation = async () => {
    console.log("📍 My Location button clicked");

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log("🔐 Permission Status:", status);

      if (status !== "granted") {
        Alert.alert("Permission Denied", "Allow location access");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });

      console.log("📡 Raw Location Object:", location);

      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      };

      console.log("📍 Extracted Coords:", coords);

      setMarker(coords);

      console.log("✅ Marker Set");

      // Move map
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          ...coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        });
        console.log("🗺️ Map moved to current location");
      } else {
        console.log("⚠️ mapRef not available");
      }

      // Save automatically
      console.log("🚚 Auto saving pickup...");
      await savePickup(coords);

    } catch (err) {
      console.log("❌ Location Error:", err);
    }
  };

  /* 🚚 SAVE PICKUP */
  const savePickup = async (coords) => {

    console.log("🚚 savePickup called");
    console.log("📍 Sending coords:", coords);

    try {
      const url = `http://10.90.184.124:5000/api/helprequests/pickup/${requestId}`;
      console.log("🌐 API URL:", url);

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pickupLocation: coords
        })
      });

      console.log("📡 Response Status:", res.status);

      const text = await res.text();
      console.log("📡 RAW RESPONSE:", text);

      if (!res.ok) {
        console.log("❌ Server returned error status");
        return;
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.log("❌ JSON Parse Failed:", parseError);
        return;
      }

      console.log("✅ Pickup Saved Successfully:", data);

    } catch (err) {
      console.log("❌ Save Error:", err);
    }
  };

  /* 🚚 CONFIRM PICKUP */
  const confirmPickup = async () => {

    console.log("🚚 Confirm button clicked");

    if (!marker) {
      console.log("⚠️ No marker selected");
      Alert.alert("Select Location");
      return;
    }

    console.log("📍 Confirming Marker:", marker);

    await savePickup(marker);

    Alert.alert("Success", "Pickup saved 🚀");

    console.log("🔙 Navigating back");
    navigation.goBack();
  };

  return (
    <View style={{ flex:1 }}>

      <MapView
        ref={mapRef}
        style={{ flex:1 }}
        initialRegion={{
          latitude: homeLocation?.latitude || 13.0827,
          longitude: homeLocation?.longitude || 80.2707,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}
        onPress={(e) => {
          const coord = e.nativeEvent.coordinate;
          console.log("📍 Map tapped:", coord);
          setMarker(coord);
        }}
      >
        {marker && <Marker coordinate={marker} pinColor="red" />}
        {homeLocation && (
          <Marker coordinate={homeLocation} pinColor="green" />
        )}
      </MapView>

      {/* 📍 CURRENT LOCATION */}
      <TouchableOpacity
        style={{
          position:"absolute",
          top:40,
          right:20,
          backgroundColor:"#fff",
          padding:10,
          borderRadius:20,
          elevation:5
        }}
        onPress={getCurrentLocation}
      >
        <Text style={{ fontWeight:"700" }}>📍 My Location</Text>
      </TouchableOpacity>

      {/* 🚚 CONFIRM */}
      <TouchableOpacity
        style={{
          position:"absolute",
          bottom:40,
          left:20,
          right:20,
          backgroundColor:"#7C3AED",
          padding:16,
          borderRadius:20,
          alignItems:"center"
        }}
        onPress={confirmPickup}
      >
        <Text style={{ color:"#fff", fontWeight:"700" }}>
          Confirm Pickup Location
        </Text>
      </TouchableOpacity>

    </View>
  );
}