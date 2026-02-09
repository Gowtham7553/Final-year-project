import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const BASE_URL = "http://172.18.41.124:5000";

export default function LiveTrackingScreen({ route }) {

  const { donationId } = route.params || {};

  const [volunteerLocation, setVolunteerLocation] = useState(null);
  const [homeLocation, setHomeLocation] = useState(null);

  /* ================= GET VOLUNTEER LIVE ================= */
  useEffect(() => {

    const interval = setInterval(fetchLiveLocation, 4000);

    return () => clearInterval(interval);

  }, []);

  const fetchLiveLocation = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/donations/pending`);
      const data = await res.json();

      const donation = data.find(d => d._id === donationId);

      if (!donation) return;

      if (donation.volunteerLocation) {
        setVolunteerLocation({
          latitude: donation.volunteerLocation.latitude,
          longitude: donation.volunteerLocation.longitude,
        });
      }

      if (donation.homeLocation) {
        setHomeLocation({
          latitude: donation.homeLocation.lat,
          longitude: donation.homeLocation.lng,
        });
      }

    } catch (err) {
      console.log("Live tracking error:", err.message);
    }
  };

  if (!homeLocation) {
    return (
      <View style={styles.center}>
        <Text>Waiting for volunteer to accept...</Text>
      </View>
    );
  }

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: homeLocation.latitude,
        longitude: homeLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >

      {/* 🏠 Home */}
      <Marker coordinate={homeLocation} title="Home" pinColor="green" />

      {/* 🚴 Volunteer */}
      {volunteerLocation && (
        <Marker coordinate={volunteerLocation} title="Volunteer" pinColor="blue" />
      )}

    </MapView>
  );
}

const styles = StyleSheet.create({
  center:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
});
