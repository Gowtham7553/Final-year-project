import React, { useEffect, useState } from "react";
import {
  View, StyleSheet, TouchableOpacity, Text, Alert, Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function MapPickerScreen({ navigation, route }) {

  // ✅ DEFAULT LOCATION (instant load)
  const DEFAULT_REGION = {
    latitude: 13.0827,
    longitude: 80.2707,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const [region, setRegion] = useState(DEFAULT_REGION);
  const [marker, setMarker] = useState({
    latitude: 13.0827,
    longitude: 80.2707,
  });

  const returnScreen = route?.params?.returnScreen || "ItemDonation";

  useEffect(() => {
    getLocation(); // run in background
  }, []);

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") return;

      const enabled = await Location.hasServicesEnabledAsync();
      if (!enabled) return;

      // ✅ FAST LOCATION (instead of HIGH)
      let loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced, // 🔥 FAST FIX
      });

      if (loc) {
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
      }

    } catch {
      // silent fail (no blocking UI)
    }
  };

  const selectLocation = (e) => {
    setMarker(e.nativeEvent.coordinate);
  };

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

  return (
    <SafeAreaView style={{ flex: 1 }}>

      {/* MAP loads instantly */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={DEFAULT_REGION}   // 🔥 instant render
        region={region}                 // updates smoothly
        showsUserLocation={true}
        showsMyLocationButton={true}
        onPress={selectLocation}
      >
        {marker && <Marker coordinate={marker} />}
      </MapView>

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

      {/* BUTTON */}
      <TouchableOpacity style={styles.btn} onPress={confirmLocation}>
        <Text style={styles.btnText}>Confirm Location</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  header:{
    position:"absolute",
    top: height * 0.02,
    left: width * 0.04,
    right: width * 0.04,
    backgroundColor:"#fff",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    padding: height * 0.018,
    borderRadius:14,
    elevation:6
  },

  headerTitle:{
    fontWeight:"700",
    fontSize: width * 0.045
  },

  btn:{
    position:"absolute",
    bottom: height * 0.05,
    left: width * 0.05,
    right: width * 0.05,
    backgroundColor:"#7C3AED",
    padding: height * 0.02,
    borderRadius:30,
    alignItems:"center",
    elevation:5
  },

  btnText:{
    color:"#fff",
    fontWeight:"700",
    fontSize: width * 0.04
  }

});