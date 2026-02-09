import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";

const BASE_URL = "http://172.18.41.124:5000";

export default function TrackDonationScreen({ route }) {

  const { donorId } = route.params;

  const [region, setRegion] = useState(null);
  const [volunteerLocation, setVolunteerLocation] = useState(null);

  /* ================= FETCH LIVE LOCATION ================= */
  useEffect(() => {

    const fetchLive = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/donations/pending`);
        const data = await res.json();

        // find donor active delivery
        const delivery = data.find(
          (d) =>
            d.donorId?._id === donorId &&
            d.status !== "Delivered"
        );

        if (!delivery) return;

        const loc = delivery.volunteerLocation;

        if (loc?.latitude) {
          setVolunteerLocation({
            latitude: loc.latitude,
            longitude: loc.longitude,
          });

          setRegion({
            latitude: loc.latitude,
            longitude: loc.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }

      } catch (err) {
        console.log("Track error:", err);
      }
    };

    fetchLive();
    const interval = setInterval(fetchLive, 4000);
    return () => clearInterval(interval);

  }, []);

  if (!region) {
    return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Text>Waiting for volunteer location...</Text>
      </View>
    );
  }

  return (
    <MapView style={{flex:1}} region={region}>
      {volunteerLocation && (
        <Marker
          coordinate={volunteerLocation}
          title="Volunteer"
          pinColor="blue"
        />
      )}
    </MapView>
  );
}
