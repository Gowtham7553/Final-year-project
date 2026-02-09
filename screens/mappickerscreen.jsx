import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

export default function MapPickerScreen({ navigation, route }) {

  const [region, setRegion] = useState(null);
  const [marker, setMarker] = useState(null);

  // return screen name
  const returnScreen = route?.params?.returnScreen || "ItemDonation";

  /* ================= GET LOCATION ================= */
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      console.log("📍 Getting location...");

      // ask permission
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission denied", "Please allow location permission");
        return;
      }

      // check GPS enabled
      const enabled = await Location.hasServicesEnabledAsync();
      if (!enabled) {
        Alert.alert("GPS OFF", "Turn ON location/GPS");
        return;
      }

      let loc = null;

      // try HIGH accuracy
      try {
        loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
      } catch (err) {
        console.log("⚠️ High accuracy failed, using last known");
        loc = await Location.getLastKnownPositionAsync();
      }

      // fallback default (Chennai) if still null
      if (!loc) {
        console.log("⚠️ Using default Chennai location");
        loc = {
          coords: {
            latitude: 13.0827,
            longitude: 80.2707,
          },
        };
      }

      const newRegion = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setRegion(newRegion);
      setMarker({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

    } catch (err) {
      console.log("LOCATION ERROR:", err);

      // fallback Chennai
      const fallback = {
        latitude: 13.0827,
        longitude: 80.2707,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setRegion(fallback);
      setMarker({
        latitude: 13.0827,
        longitude: 80.2707,
      });

      Alert.alert("Location issue", "Showing default location (Chennai)");
    }
  };

  /* ================= USER TAP ================= */
  const selectLocation = (e) => {
    setMarker(e.nativeEvent.coordinate);
  };

  /* ================= CONFIRM ================= */
  const confirmLocation = async () => {
    if (!marker) {
      Alert.alert("Select location first");
      return;
    }

    try {
      const address = await Location.reverseGeocodeAsync(marker);

      let place = `${marker.latitude}, ${marker.longitude}`;

      if (address.length > 0) {
        place = `${address[0].name || ""}, ${address[0].street || ""}, ${address[0].city || ""}`;
      }

      navigation.navigate(returnScreen, {
        pickedAddress: place,
        lat: marker.latitude,
        lng: marker.longitude,
      });

    } catch {
      navigation.navigate(returnScreen, {
        pickedAddress: `${marker.latitude}, ${marker.longitude}`,
        lat: marker.latitude,
        lng: marker.longitude,
      });
    }
  };

  /* ================= LOADING ================= */
  if (!region) {
    return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Select Location</Text>

        <TouchableOpacity onPress={getLocation}>
          <Ionicons name="locate" size={24} color="#7C3AED" />
        </TouchableOpacity>
      </View>

      {/* MAP */}
      <MapView
        style={{ flex: 1 }}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onPress={selectLocation}
        onRegionChangeComplete={(r) => setRegion(r)}
      >
        {marker && <Marker coordinate={marker} />}
      </MapView>

      {/* CONFIRM BUTTON */}
      <TouchableOpacity style={styles.btn} onPress={confirmLocation}>
        <Text style={{ color: "#fff", fontWeight: "700", fontSize:16 }}>
          Confirm Location
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  header:{
    position:"absolute",
    top:50,
    left:15,
    right:15,
    zIndex:10,
    backgroundColor:"#fff",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    padding:14,
    borderRadius:14,
    elevation:6
  },

  headerTitle:{
    fontWeight:"700",
    fontSize:16
  },

  btn:{
    position:"absolute",
    bottom:40,
    left:20,
    right:20,
    backgroundColor:"#7C3AED",
    padding:18,
    borderRadius:30,
    alignItems:"center",
    elevation:5
  }
});
