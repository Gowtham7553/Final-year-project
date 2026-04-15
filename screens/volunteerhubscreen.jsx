import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function VolunteerHubScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: height * 0.05 }}
      >

        {/* Header */}
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

          <Text style={styles.headerTitle}>Volunteer Hub</Text>

          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={22} />
          </TouchableOpacity>
        </View>

        {/* Hero */}
        <ImageBackground
          source={require("../assets/childrens.jpg")}
          style={styles.heroCard}
          imageStyle={{ borderRadius: 18 }}
        >
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTag}>HOPE CONNECT</Text>
            <Text style={styles.heroTitle}>Welcome, Hero</Text>
            <Text style={styles.heroSub}>Ready to change lives?</Text>
          </View>
        </ImageBackground>

        {/* Quick Actions */}
        <Text style={styles.section}>Quick Actions</Text>

        {/* Ongoing Tasks */}
        <View style={styles.actionCard}>
          <View style={styles.actionLeft}>
            <View style={styles.iconCircle}>
              <Ionicons name="clipboard-outline" size={20} color="#7C3AED" />
            </View>
            <View>
              <Text style={styles.actionTitle}>Ongoing Tasks</Text>
              <Text style={styles.actionDesc}>
                You have 3 tasks pending review
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => navigation.navigate("Tasks")}
          >
            <Text style={styles.actionBtnText}>View Tasks</Text>
          </TouchableOpacity>
        </View>

        {/* Grid */}
        <View style={styles.grid}>
          <TouchableOpacity style={styles.gridCard}>
            <Ionicons name="heart" size={22} color="#7C3AED" />
            <Text style={styles.gridTitle}>Donate if you can!</Text>
            <Text style={styles.gridDesc}>
              Support children’s homes directly
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => navigation.navigate("TasksHistory")}
          >
            <Ionicons name="time-outline" size={22} color="#7C3AED" />
            <Text style={styles.gridTitle}>Tasks History</Text>
            <Text style={styles.gridDesc}>
              Review your completed help
            </Text>
          </TouchableOpacity>
        </View>

        {/* Profile */}
        <TouchableOpacity
          style={styles.profileCard}
          onPress={() => navigation.navigate("VolunteerProfile")}
        >
          <View style={styles.profileLeft}>
            <View style={styles.iconCircle}>
              <Ionicons name="person-outline" size={20} color="#7C3AED" />
            </View>
            <Text style={styles.profileText}>My Profile</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        </TouchableOpacity>

        {/* 🤖 Chatbot BELOW PROFILE (FIXED) */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Chatbot")}
          style={styles.chatbotBtn}
        >
          <MaterialIcons name="support-agent" size={22} color="#fff" />
          <Text style={styles.chatbotText}>Need Help? Chat with us</Text>
        </TouchableOpacity>

        {/* Tip */}
        <View style={styles.tipBox}>
          <Ionicons name="bulb-outline" size={20} color="#7C3AED" />
          <Text style={styles.tipText}>
            Consistent involvement (even just{" "}
            <Text style={styles.bold}>2 hours</Text> a week) builds stronger bonds
            with the children.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>🔒 Secure SSL</Text>
          <Text style={styles.footerText}>✔ Verified NGO</Text>
        </View>

        <Text style={styles.copy}>
          © 2024 Hope Connect. Making impact visible.
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const PURPLE = "#7C3AED";

const styles = StyleSheet.create({

container:{
  flex:1,
  backgroundColor:"#F9FAFB",
  paddingHorizontal: width * 0.05,
},

header:{
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"space-between",
  marginVertical: height * 0.02,
},

headerTitle:{
  fontSize: width * 0.045,
  fontWeight:"700",
},

heroCard:{
  height: height * 0.22,
  borderRadius:18,
  marginBottom: height * 0.025,
  overflow:"hidden"
},

heroOverlay:{
  flex:1,
  padding: width * 0.05,
  justifyContent:"flex-end",
  backgroundColor:"rgba(0,0,0,0.45)"
},

heroTag:{color:"#E9D5FF",fontSize: width * 0.03},
heroTitle:{color:"#fff",fontSize: width * 0.055,fontWeight:"800",marginTop:6},
heroSub:{color:"#E5E7EB",marginTop:4},

section:{fontSize: width * 0.05,fontWeight:"800",marginBottom:12},

actionCard:{
  backgroundColor:"#fff",
  borderRadius:16,
  padding: width * 0.04,
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",
  marginBottom: height * 0.02,
},

actionLeft:{flexDirection:"row",alignItems:"center"},

iconCircle:{
  width: width * 0.1,
  height: width * 0.1,
  borderRadius:20,
  backgroundColor:"#EDE9FE",
  alignItems:"center",
  justifyContent:"center",
  marginRight:10,
},

actionTitle:{fontWeight:"700"},
actionDesc:{fontSize: width * 0.03,color:"#6B7280"},

actionBtn:{
  backgroundColor:PURPLE,
  paddingHorizontal: width * 0.04,
  paddingVertical: height * 0.01,
  borderRadius:16,
},

actionBtnText:{color:"#fff",fontWeight:"700",fontSize: width * 0.03},

grid:{flexDirection:"row",justifyContent:"space-between",marginBottom:16},

gridCard:{
  width:"48%",
  backgroundColor:"#fff",
  borderRadius:16,
  padding: width * 0.04,
},

gridTitle:{fontWeight:"700",marginTop:10},
gridDesc:{fontSize: width * 0.03,color:"#6B7280",marginTop:4},

profileCard:{
  backgroundColor:"#fff",
  borderRadius:16,
  padding: width * 0.04,
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",
  marginBottom: height * 0.02,
},

profileLeft:{flexDirection:"row",alignItems:"center"},
profileText:{marginLeft:10,fontWeight:"700"},

/* 🤖 Chatbot Button */
chatbotBtn:{
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"center",
  backgroundColor:PURPLE,
  padding: width * 0.04,
  borderRadius:20,
  marginBottom: height * 0.02,
},

chatbotText:{
  color:"#fff",
  marginLeft:8,
  fontWeight:"700",
},

tipBox:{
  backgroundColor:"#F3E8FF",
  borderRadius:16,
  padding: width * 0.04,
  flexDirection:"row",
  alignItems:"center",
  marginBottom:20,
},

tipText:{marginLeft:10,color:"#4C1D95",flex:1,fontSize: width * 0.032},
bold:{fontWeight:"800"},

footer:{flexDirection:"row",justifyContent:"center",gap:20,marginBottom:6},
footerText:{fontSize: width * 0.03,color:"#6B7280"},
copy:{fontSize: width * 0.028,color:"#9CA3AF",textAlign:"center"}

});