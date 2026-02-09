import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker } from "react-native-maps";

const BASE_URL = "http://172.18.41.124:5000";

export default function HomeProfileScreen({ navigation, route }) {

  const [homeId, setHomeId] = useState(route?.params?.homeId);
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  // 🚚 active delivery
  const [activeDonation, setActiveDonation] = useState(null);

  /* ================= GET HOME ID ================= */
  useEffect(() => {
    const getStoredHome = async () => {
      if (!homeId) {
        const stored = await AsyncStorage.getItem("home");
        if (stored) {
          const parsed = JSON.parse(stored);
          setHomeId(parsed.homeId);
        }
      }
    };
    getStoredHome();
  }, []);

  /* ================= FETCH HOME PROFILE ================= */
  useEffect(() => {
    if (!homeId) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/homes/${homeId}`);
        const data = await res.json();

        if (!res.ok) {
          Alert.alert("Error", data.message || "Failed to load profile");
          return;
        }

        setHome(data);
      } catch {
        Alert.alert("Server not reachable");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [homeId]);

  /* ================= FETCH ACTIVE DELIVERY ================= */
  useEffect(() => {
    if (!homeId) return;

    const fetchDelivery = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/donations/pending`);
        const data = await res.json();

        const delivery = data.find(
          (d) => d.homeId?._id === homeId && d.status !== "Delivered"
        );

        if (delivery) setActiveDonation(delivery);

      } catch (err) {
        console.log("Delivery fetch error", err);
      }
    };

    fetchDelivery();
    const interval = setInterval(fetchDelivery, 5000);
    return () => clearInterval(interval);

  }, [homeId]);

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (!home) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
        <Text>No profile data</Text>
      </View>
    );
  }

  /* ================= ABOUT TEXT ================= */
  const aboutText = home.about || "No description added";
  const words = aboutText.split(" ");
  const isLong = words.length > 30;
  const shortText = words.slice(0, 30).join(" ");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() =>
          navigation.reset({ index:0, routes:[{name:"Login"}] })
        }>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Home Profile</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <Ionicons name="notifications-outline" size={22} />
        </TouchableOpacity>
      </View>

      {/* IMAGE */}
      <Image
        source={
          home?.image
            ? { uri: `${BASE_URL}${home.image}` }
            : require("../assets/childrens.jpg")
        }
        style={styles.cover}
      />

      <Text style={styles.name}>{home.homeName}</Text>

      {/* BADGES */}
      <View style={styles.badges}>
        <View style={styles.badge}>
          <Ionicons name="shield-checkmark" size={14} color="#7C3AED" />
          <Text style={styles.badgeText}>Verified NGO</Text>
        </View>

        <View style={styles.badge}>
          <Ionicons name="location-outline" size={14} color="#7C3AED" />
          <Text style={styles.badgeText}>{home.address?.city || "City"}</Text>
        </View>
      </View>

      {/* SUBMIT REQUEST */}
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => navigation.navigate("SubmitRequest",{homeId})}
      >
        <Text style={styles.primaryBtnText}>Submit Request</Text>
      </TouchableOpacity>

      {/* 🚚 TRACK BUTTON */}
      {activeDonation && activeDonation.volunteerId && (
        <TouchableOpacity
          style={styles.trackBtn}
          onPress={()=>navigation.navigate("LiveTracking",{
            donationId: activeDonation._id
          })}
        >
          <Ionicons name="navigate" size={18} color="#fff"/>
          <Text style={styles.trackText}>Track Volunteer Live</Text>
        </TouchableOpacity>
      )}

      {/* ABOUT */}
      <Text style={styles.sectionTitle}>About</Text>
      <Text style={styles.aboutText}>
        {expanded || !isLong ? aboutText : shortText + "..."}
      </Text>

      {isLong && (
        <TouchableOpacity onPress={()=>setExpanded(!expanded)}>
          <Text style={{color:"#7C3AED",fontWeight:"700",marginBottom:10}}>
            {expanded ? "Show less" : "Read more"}
          </Text>
        </TouchableOpacity>
      )}

      {/* REGISTRATION */}
      <Text style={styles.sectionTitle}>Registration Details</Text>
      <Text style={styles.aboutText}>Reg No: {home.registrationNumber}</Text>
      <Text style={styles.aboutText}>Representative: {home.representativeName}</Text>

      {/* CONTACT */}
      <Text style={styles.sectionTitle}>Contact Info</Text>
      <Text style={styles.aboutText}>📞 {home.phone}</Text>
      <Text style={styles.aboutText}>📧 {home.email}</Text>

      {/* MAP */}
      <Text style={styles.sectionTitle}>Home Location</Text>

      <View style={styles.mapBox}>
        {home.location?.latitude ? (
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: home.location.latitude,
              longitude: home.location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            <Marker
              coordinate={{
                latitude: home.location.latitude,
                longitude: home.location.longitude,
              }}
            />
          </MapView>
        ) : (
          <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text>No location set</Text>
          </View>
        )}
      </View>

      <Text style={styles.aboutText}>{home.fullAddress}</Text>

      <View style={{height:40}}/>
    </ScrollView>
  );
}

const PURPLE="#7C3AED";

const styles=StyleSheet.create({
container:{flex:1,backgroundColor:"#F9FAFB",paddingHorizontal:20},
header:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginVertical:14},
headerTitle:{fontSize:16,fontWeight:"700"},
cover:{width:"100%",height:180,borderRadius:18,marginBottom:14},
name:{fontSize:20,fontWeight:"800",marginBottom:8},

badges:{flexDirection:"row",gap:10,marginBottom:16},
badge:{flexDirection:"row",alignItems:"center",gap:6,backgroundColor:"#EDE9FE",paddingHorizontal:10,paddingVertical:4,borderRadius:20},
badgeText:{fontSize:12,color:PURPLE,fontWeight:"600"},

primaryBtn:{backgroundColor:PURPLE,padding:14,borderRadius:24,alignItems:"center",marginBottom:10},
primaryBtnText:{color:"#fff",fontWeight:"700"},

trackBtn:{
backgroundColor:"#2563EB",
padding:14,
borderRadius:14,
alignItems:"center",
flexDirection:"row",
justifyContent:"center",
marginBottom:20
},
trackText:{color:"#fff",fontWeight:"800",marginLeft:8},

sectionTitle:{fontSize:18,fontWeight:"800",marginBottom:6},
aboutText:{color:"#6B7280",marginBottom:8},

mapBox:{height:220,borderRadius:18,overflow:"hidden",marginBottom:10}
});
