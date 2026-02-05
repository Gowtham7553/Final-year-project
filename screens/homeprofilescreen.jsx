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

const BASE_URL = "http://10.172.162.124:5000";

export default function HomeProfileScreen({ navigation, route }) {

  const [homeId, setHomeId] = useState(route?.params?.homeId);
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);

  // ⭐ about read more toggle
  const [expanded, setExpanded] = useState(false);

  /* GET HOME ID */
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

  /* FETCH PROFILE */
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
      } catch (err) {
        Alert.alert("Error", "Server not reachable");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
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

  /* ================= ABOUT LOGIC ================= */
  const aboutText = home.about || "No description added";
  const words = aboutText.split(" ");
  const isLong = words.length > 30;

  const shortText = words.slice(0, 30).join(" ");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        }>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Home Profile</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <Ionicons name="notifications-outline" size={22} />
        </TouchableOpacity>
      </View>

      {/* HERO IMAGE */}
      <Image
        source={
          home?.image
            ? { uri: `${BASE_URL}${home.image}` }
            : require("../assets/childrens.jpg")
        }
        style={styles.cover}
      />

      {/* Name */}
      <Text style={styles.name}>{home.homeName}</Text>

      {/* Badges */}
      <View style={styles.badges}>
        <View style={styles.badge}>
          <Ionicons name="shield-checkmark" size={14} color="#7C3AED" />
          <Text style={styles.badgeText}>Verified NGO</Text>
        </View>

        <View style={styles.badge}>
          <Ionicons name="location-outline" size={14} color="#7C3AED" />
          <Text style={styles.badgeText}>
            {home.address?.city || "City"}
          </Text>
        </View>
      </View>

      {/* Submit Request */}
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => navigation.navigate("SubmitRequest",{homeId})}
      >
        <Text style={styles.primaryBtnText}>Submit Request</Text>
      </TouchableOpacity>

      {/* ================= STATS (VOLUNTEERS REMOVED) ================= */}
      <View style={styles.stats}>
        <View style={styles.statCard}>
          <Ionicons name="happy-outline" size={22} color="#F97316" />
          <Text style={styles.statNumber}>{home.capacity || 0}</Text>
          <Text style={styles.statLabel}>Children</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="home-outline" size={22} color="#22C55E" />
          <Text style={styles.statNumber}>
            {new Date(home.createdAt).getFullYear()}
          </Text>
          <Text style={styles.statLabel}>Established</Text>
        </View>
      </View>

      {/* ================= ABOUT CARD ================= */}
      <Text style={styles.sectionTitle}>About Us</Text>

      <View style={styles.aboutCard}>
        <Text style={styles.aboutCardText}>
          {expanded || !isLong ? aboutText : shortText + "..."}
        </Text>

        {/* SHOW READ MORE ONLY IF >30 WORDS */}
        {isLong && (
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text style={styles.readMore}>
              {expanded ? "Show less" : "Read more"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Registration */}
      <Text style={styles.sectionTitle}>Registration Details</Text>
      <Text style={styles.aboutText}>Reg No: {home.registrationNumber}</Text>
      <Text style={styles.aboutText}>Representative: {home.representativeName}</Text>

      {/* Contact */}
      <Text style={styles.sectionTitle}>Contact Info</Text>
      <Text style={styles.aboutText}>📞 {home.phone}</Text>
      <Text style={styles.aboutText}>📧 {home.email}</Text>

      {/* Address */}
      <Text style={styles.sectionTitle}>Location</Text>
      <Text style={styles.aboutText}>
        {home.address?.street}, {home.address?.city} - {home.address?.zipCode}
      </Text>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const PURPLE = "#7C3AED";

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#F9FAFB",paddingHorizontal:20},
  header:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginVertical:14},
  headerTitle:{fontSize:16,fontWeight:"700"},
  cover:{width:"100%",height:180,borderRadius:18,marginBottom:14},
  name:{fontSize:20,fontWeight:"800",marginBottom:8},
  badges:{flexDirection:"row",gap:10,marginBottom:16},
  badge:{flexDirection:"row",alignItems:"center",gap:6,backgroundColor:"#EDE9FE",paddingHorizontal:10,paddingVertical:4,borderRadius:20},
  badgeText:{fontSize:12,color:PURPLE,fontWeight:"600"},
  primaryBtn:{backgroundColor:PURPLE,padding:14,borderRadius:24,alignItems:"center",marginBottom:20},
  primaryBtnText:{color:"#fff",fontWeight:"700"},
  stats:{flexDirection:"row",gap:12,marginBottom:24},
  statCard:{flex:1,backgroundColor:"#fff",borderRadius:16,padding:14,alignItems:"center"},
  statNumber:{fontSize:18,fontWeight:"800",marginTop:6},
  statLabel:{fontSize:12,color:"#6B7280"},
  sectionTitle:{fontSize:18,fontWeight:"800",marginBottom:8},
  aboutText:{color:"#6B7280",lineHeight:20,marginBottom:10},
  aboutCard:{backgroundColor:"#F3F4F6",padding:16,borderRadius:14,marginBottom:18},
  aboutCardText:{color:"#374151",lineHeight:20},
  readMore:{color:"#7C3AED",fontWeight:"700",marginTop:6}
});
