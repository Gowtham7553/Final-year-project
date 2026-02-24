import React, { useEffect, useState } from "react";
import {
  View, Text, FlatList,
  TouchableOpacity, StyleSheet
} from "react-native";

const BASE_URL = "http://10.160.239.124:5000";

export default function DonorNotificationScreen({ navigation }){

  const [requests,setRequests] = useState([]);

  useEffect(()=>{
    fetchRequests();
  },[]);

  const fetchRequests = async()=>{
    const res = await fetch(`${BASE_URL}/api/requests`);
    const data = await res.json();
    setRequests(data);
  };

  return(
    <FlatList
      data={requests}
      keyExtractor={(item)=>item._id}
      contentContainerStyle={{padding:20}}
      renderItem={({item})=>(
        <View style={styles.card}>
          <Text style={styles.title}>
            {item.homeId?.homeName}
          </Text>

          <Text>Need: {item.needType}</Text>
          <Text>Urgency: {item.urgency}</Text>
          <Text>AI Score: {item.aiPriorityScore}</Text>

          <TouchableOpacity
            style={styles.btn}
            onPress={()=>navigation.navigate("DonateItems",{request:item})}
          >
            <Text style={{color:"#fff"}}>
              Donate Now
            </Text>
          </TouchableOpacity>

        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
card:{
  backgroundColor:"#fff",
  padding:16,
  borderRadius:14,
  marginBottom:15
},
title:{
  fontWeight:"800",
  fontSize:16
},
btn:{
  backgroundColor:"#7C3AED",
  padding:12,
  borderRadius:20,
  alignItems:"center",
  marginTop:10
}
});