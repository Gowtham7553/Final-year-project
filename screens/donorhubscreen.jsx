import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';   // ADD THIS
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DonorHubScreen({ navigation }) {
  const [donorId, setDonorId] = useState(null);

  /* LOAD DONOR ID */
  useEffect(() => {
    const loadDonor = async () => {
      const stored = await AsyncStorage.getItem("donor");
      if (stored) {
        const parsed = JSON.parse(stored);
        setDonorId(parsed.donorId);
      }
    };
    loadDonor();
  }, []);

  if (!donorId) {
    return (
      <View style={styles.loading}>
        <Text>Loading Donor Hub...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            }
          >
            <Ionicons name="arrow-back" size={22} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Donor Hub</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("DonorNotifications")}
          >
            <Ionicons name="notifications-outline" size={22} />
          </TouchableOpacity>
        </View>

        {/* HERO */}
        <ImageBackground
          source={require("../assets/donorhero.jpg")}
          style={styles.heroCard}
          imageStyle={{ borderRadius: 18 }}
        >
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTag}>HOPE CONNECT</Text>
            <Text style={styles.heroTitle}>Welcome, Changemaker</Text>
            <Text style={styles.heroDesc}>
              Your journey to making a difference starts here.
            </Text>
          </View>
        </ImageBackground>

        {/* QUICK ACTIONS */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        {/* DONATE MONEY */}
        <View style={styles.donateCard}>
          <View style={styles.donateLeft}>
            <View style={styles.iconCircle}>
              <Ionicons name="hand-left" size={20} color="#7C3AED" />
            </View>
            <View>
              <Text style={styles.donateTitle}>Make a Donation</Text>
              <Text style={styles.donateDesc}>
                Securely support a child
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.donateBtn}
            onPress={() => navigation.navigate("Donate", { donorId })}
          >
            <Text style={styles.donateBtnText}>Donate</Text>
          </TouchableOpacity>
        </View>

        {/* GRID */}
        <View style={styles.grid}>

          {/* Donate Items */}
          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => navigation.navigate("ItemDonation")}
          >
            <View style={[styles.gridIcon, { backgroundColor: "#EDE9FE" }]}>
              <Ionicons name="cube-outline" size={22} color="#7C3AED" />
            </View>
            <Text style={styles.gridTitle}>Donate Items</Text>
            <Text style={styles.gridDesc}>
              Give daily needs & supplies
            </Text>
          </TouchableOpacity>

          {/* Track Delivery */}
          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => navigation.navigate("TrackDonation", { donorId })}
          >
            <View style={[styles.gridIcon,{backgroundColor:"#DBEAFE"}]}>
              <Ionicons name="navigate" size={22} color="#2563EB"/>
            </View>
            <Text style={styles.gridTitle}>Track Delivery</Text>
            <Text style={styles.gridDesc}>Live volunteer tracking</Text>
          </TouchableOpacity>

          {/* Donation History */}
          <TouchableOpacity
            style={styles.gridCard}
            onPress={() =>
              navigation.navigate("DonationHistory", { donorId })
            }
          >
            <View style={[styles.gridIcon, { backgroundColor: "#FEF3C7" }]}>
              <Ionicons name="time-outline" size={22} color="#D97706" />
            </View>
            <Text style={styles.gridTitle}>Donation History</Text>
            <Text style={styles.gridDesc}>
              Track your past contributions
            </Text>
          </TouchableOpacity>

          {/* My Profile */}
          <TouchableOpacity
            style={styles.gridCard}
            onPress={() =>
              navigation.navigate("DonorProfile", { donorId })
            }
          >
            <View style={[styles.gridIcon,{backgroundColor:"#E0F2FE"}]}>
              <Ionicons name="person-outline" size={22} color="#0284C7"/>
            </View>
            <Text style={styles.gridTitle}>My Profile</Text>
            <Text style={styles.gridDesc}>
              Manage your personal details
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
  onPress={() => navigation.navigate("Chatbot")}
  style={{
    position:"absolute",
    bottom:20,
    right:20,
    backgroundColor:"#7C3AED",
    padding:15,
    borderRadius:30
  }}
>
  <MaterialIcons name="support-agent" size={24} color="#fff"/>
</TouchableOpacity>

        </View>

        {/* INFO */}
        <View style={styles.infoBox}>
          <Ionicons name="bulb-outline" size={20} color="#7C3AED" />
          <Text style={styles.infoText}>
            Did you know? Just <Text style={styles.bold}>₹500</Text>{" "}
            provides a week of nutritious meals for a child.
          </Text>
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
}

const PURPLE = "#7C3AED";

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#F9FAFB",paddingHorizontal:16},
  loading:{flex:1,justifyContent:"center",alignItems:"center"},

  header:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginVertical:14,
  },

  headerTitle:{fontSize:16,fontWeight:"700"},

  heroCard:{height:180,borderRadius:18,marginBottom:20,overflow:"hidden"},
  heroOverlay:{
    flex:1,padding:18,justifyContent:"flex-end",
    backgroundColor:"rgba(0,0,0,0.45)"
  },

  heroTag:{color:"#E9D5FF",fontSize:12},
  heroTitle:{color:"#fff",fontSize:22,fontWeight:"800",marginTop:6},
  heroDesc:{color:"#E5E7EB",marginTop:4},

  sectionTitle:{fontSize:18,fontWeight:"800",marginBottom:12},

  donateCard:{
    backgroundColor:"#fff",borderRadius:16,padding:14,
    flexDirection:"row",justifyContent:"space-between",
    alignItems:"center",marginBottom:16,
  },

  donateLeft:{flexDirection:"row",alignItems:"center"},

  iconCircle:{
    width:42,height:42,borderRadius:21,backgroundColor:"#EDE9FE",
    alignItems:"center",justifyContent:"center",marginRight:12,
  },

  donateTitle:{fontWeight:"700"},
  donateDesc:{fontSize:12,color:"#6B7280"},

  donateBtn:{
    backgroundColor:PURPLE,paddingHorizontal:16,
    paddingVertical:8,borderRadius:20,
  },

  donateBtnText:{color:"#fff",fontWeight:"700"},

  grid:{
    flexDirection:"row",
    justifyContent:"space-between",
    flexWrap:"wrap",
    marginBottom:16
  },

  gridCard:{
    width:"48%",
    backgroundColor:"#fff",
    borderRadius:16,
    padding:14,
    marginBottom:14
  },

  gridIcon:{
    width:38,height:38,borderRadius:12,
    alignItems:"center",justifyContent:"center",
    marginBottom:8
  },

  gridTitle:{fontWeight:"700"},
  gridDesc:{fontSize:12,color:"#6B7280"},

  infoBox:{
    backgroundColor:"#F3E8FF",borderRadius:16,
    padding:14,flexDirection:"row",alignItems:"center",
    marginBottom:16,
  },

  infoText:{marginLeft:10,color:"#4C1D95",flex:1},
  bold:{fontWeight:"800"},
});
