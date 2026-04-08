import React, { useEffect, useState } from "react";
import {
  View, Text, StyleSheet,
  FlatList, TouchableOpacity,
  Dimensions, ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BASE_URL = "http://10.90.184.124:5000";

const { width } = Dimensions.get("window");
const scale = width / 375;
const normalize = (size) => Math.round(scale * size);

export default function DonorNotificationScreen({ navigation }) {

  const [activeTab, setActiveTab] = useState("received");
  const [requests, setRequests] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
  fetchRequests();

  const interval = setInterval(()=>{
    fetchRequests();
  },5000); // every 5 sec realtime

  return ()=> clearInterval(interval);

},[]);

  const fetchRequests = async()=>{
    try{
      const res = await fetch(`${BASE_URL}/api/requests`);
      const data = await res.json();

      // received = open requests
      const received = data.filter(r=>r.status==="Open");
      const done = data.filter(r=>r.status==="Completed");

      setRequests(received);
      setCompleted(done);

    }catch(err){
      console.log(err);
    }finally{
      setLoading(false);
    }
  };

  /* ===== CARD ===== */
  const renderCard = ({item})=>(
    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
  <Text style={styles.homeName}>
    {item.homeId?.homeName}
  </Text>

  {item.aiPriorityScore > 120 && (
    <View style={{
      backgroundColor:"#EF4444",
      paddingHorizontal:8,
      paddingVertical:3,
      borderRadius:10
    }}>
      <Text style={{color:"#fff",fontSize:11,fontWeight:"700"}}>
        HIGH PRIORITY
      </Text>
    </View>
  )}

      <Text style={styles.info}>📦 Need: {item.needType}</Text>
      <Text style={styles.info}>⚡ Urgency: {item.urgency}</Text>
      <Text style={styles.info}>🤖 AI Score: {item.aiPriorityScore}</Text>
      <Text style={styles.info}>📍 {item.homeId?.address?.city}</Text>

      {activeTab==="received" && (
        <TouchableOpacity
          style={styles.donateBtn}
          onPress={()=>navigation.navigate("ItemDonation",{request:item})}
        >
          <Text style={{color:"#fff",fontWeight:"700"}}>
            Donate Now
          </Text>
        </TouchableOpacity>
      )}

    </View>
  );

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Ionicons name="arrow-back" size={normalize(22)} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Notifications</Text>

        <View style={{width:22}}/>
      </View>

      {/* TABS */}
      <View style={styles.tabRow}>

        <TouchableOpacity
          style={[styles.tabBox, activeTab==="received" && styles.activeTab]}
          onPress={()=>setActiveTab("received")}
        >
          <Text style={[
            styles.tabText,
            activeTab==="received" && {color:"#fff"}
          ]}>
            Received
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBox, activeTab==="completed" && styles.activeTab]}
          onPress={()=>setActiveTab("completed")}
        >
          <Text style={[
            styles.tabText,
            activeTab==="completed" && {color:"#fff"}
          ]}>
            Completed
          </Text>
        </TouchableOpacity>

      </View>

      {/* LOADING */}
      {loading ? (
        <ActivityIndicator size="large" color="#7C3AED" style={{marginTop:40}}/>
      ) : (

        <FlatList
          data={activeTab==="received" ? requests : completed}
          keyExtractor={(item)=>item._id}
          contentContainerStyle={{padding:normalize(16)}}
          renderItem={renderCard}
          ListEmptyComponent={
            <Text style={{textAlign:"center",marginTop:50,color:"#777"}}>
              No notifications
            </Text>
          }
        />
      )}

    </View>
  );
}

const PURPLE="#7C3AED";

const styles = StyleSheet.create({

container:{
  flex:1,
  backgroundColor:"#F9FAFB"
},

header:{
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",
  paddingHorizontal:normalize(16),
  paddingVertical:normalize(14),
  backgroundColor:"#fff",
  elevation:3
},

headerTitle:{
  fontSize:normalize(18),
  fontWeight:"800"
},

tabRow:{
  flexDirection:"row",
  justifyContent:"center",
  marginTop:normalize(15),
  marginBottom:normalize(10)
},

tabBox:{
  width:"40%",
  paddingVertical:normalize(10),
  borderRadius:25,
  backgroundColor:"#E5E7EB",
  marginHorizontal:8,
  alignItems:"center"
},

activeTab:{
  backgroundColor:PURPLE
},

tabText:{
  fontWeight:"700",
  fontSize:normalize(13),
  color:"#374151"
},

card:{
  backgroundColor:"#fff",
  borderRadius:18,
  padding:normalize(16),
  marginBottom:normalize(14),
  elevation:2
},

homeName:{
  fontSize:normalize(16),
  fontWeight:"800"
},

info:{
  color:"#6B7280",
  marginTop:4,
  fontSize:normalize(13)
},

urgentBadge:{
  backgroundColor:"#EF4444",
  paddingHorizontal:8,
  paddingVertical:3,
  borderRadius:10
},

donateBtn:{
  backgroundColor:PURPLE,
  padding:normalize(12),
  borderRadius:20,
  alignItems:"center",
  marginTop:12
}

});