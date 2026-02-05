import React, { useEffect, useState } from "react";
import {
  View, Text, StyleSheet, Image,
  ScrollView, TouchableOpacity, Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const BASE_URL = "http://10.172.162.124:5000";

export default function ProfileScreen({ navigation }) {

  const [volunteerId, setVolunteerId] = useState(null);
  const [volunteer, setVolunteer] = useState(null);

  /* GET ID */
  useEffect(() => {
    const getUser = async () => {
      const stored = await AsyncStorage.getItem("volunteer");
      if (stored) {
        const parsed = JSON.parse(stored);
        setVolunteerId(parsed.volunteerId);
      }
    };
    getUser();
  }, []);

  /* FETCH PROFILE */
  useEffect(() => {
    if (!volunteerId) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/volunteers/${volunteerId}`);
        const data = await res.json();

        if (!res.ok) {
          Alert.alert("Error", "Failed to load profile");
          return;
        }

        setVolunteer(data);
      } catch {
        Alert.alert("Server not reachable");
      }
    };

    fetchProfile();
  }, [volunteerId]);

  /* IMAGE PICK */
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      const formData = new FormData();

      formData.append("image", {
        uri: result.assets[0].uri,
        name: "profile.jpg",
        type: "image/jpeg",
      });

      const res = await fetch(
        `${BASE_URL}/api/volunteers/upload/${volunteerId}`,
        {
          method: "POST",
          body: formData,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const data = await res.json();
      setVolunteer({ ...volunteer, image: data.image });
    }
  };

  if (!volunteer) {
    return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* PROFILE CARD */}
        <View style={styles.profileCard}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={
                volunteer.image
                  ? { uri: BASE_URL + volunteer.image }
                  : require("../assets/profile.jpeg")
              }
              style={styles.avatar}
            />
          </TouchableOpacity>

          <Text style={styles.name}>{volunteer.fullName}</Text>

          <View style={styles.verified}>
            <Ionicons name="checkmark-circle" size={14} color="#7C3AED"/>
            <Text style={styles.verifiedText}>Volunteer</Text>
          </View>

          <Text style={styles.info}>📧 {volunteer.email}</Text>
          <Text style={styles.info}>📞 {volunteer.phone || "No phone added"}</Text>
        </View>

        {/* 🔥 TASK STATS ADDED */}
        <Text style={styles.sectionTitle}>Your Tasks</Text>

        <View style={styles.taskRow}>
          <View style={styles.taskCard}>
            <Ionicons name="clipboard-outline" size={24} color="#7C3AED" />
            <Text style={styles.taskValue}>{volunteer.tasksAssigned || 0}</Text>
            <Text style={styles.taskLabel}>Tasks Assigned</Text>
          </View>

          <View style={styles.taskCard}>
            <Ionicons name="checkmark-done-outline" size={24} color="#22C55E" />
            <Text style={styles.taskValue}>{volunteer.tasksCompleted || 0}</Text>
            <Text style={styles.taskLabel}>Tasks Completed</Text>
          </View>
        </View>

        {/* SKILLS */}
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsWrap}>
          {volunteer.skills?.map((skill,i)=>(
            <View key={i} style={styles.skillChip}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>

        {/* LOGOUT */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            })
          }
        >
          <Ionicons name="log-out-outline" size={18} color="#DC2626" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const PURPLE = "#7C3AED";

const styles = StyleSheet.create({
container:{flex:1,backgroundColor:"#F5F3FF",paddingHorizontal:16},

header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginVertical:14},
headerTitle:{fontSize:16,fontWeight:"700"},

profileCard:{backgroundColor:"#F3E8FF",borderRadius:20,padding:20,alignItems:"center",marginBottom:24},

avatar:{width:90,height:90,borderRadius:45,marginBottom:12},

name:{fontSize:20,fontWeight:"800",marginBottom:4},

verified:{flexDirection:"row",alignItems:"center",marginBottom:10},
verifiedText:{marginLeft:6,color:PURPLE,fontWeight:"600",fontSize:12},

info:{fontSize:14,color:"#374151",marginTop:4},

sectionTitle:{fontSize:16,fontWeight:"800",marginBottom:12},

/* TASK CARD */
taskRow:{flexDirection:"row",justifyContent:"space-between",marginBottom:24},
taskCard:{
  width:"48%",
  backgroundColor:"#fff",
  borderRadius:16,
  padding:18,
  alignItems:"center"
},
taskValue:{fontSize:22,fontWeight:"800",marginTop:6},
taskLabel:{fontSize:12,color:"#6B7280"},

skillsWrap:{flexDirection:"row",flexWrap:"wrap",marginBottom:30},
skillChip:{backgroundColor:"#EDE9FE",paddingHorizontal:12,paddingVertical:6,borderRadius:16,marginRight:8,marginBottom:8},
skillText:{color:PURPLE,fontSize:12,fontWeight:"600"},

logoutBtn:{backgroundColor:"#FEE2E2",borderRadius:20,paddingVertical:12,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:8},
logoutText:{color:"#DC2626",fontWeight:"700"},
});
