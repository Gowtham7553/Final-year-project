import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://172.18.41.124:5000";

export default function TasksHistoryScreen({ navigation }) {

  const [history, setHistory] = useState([]);
  const [volunteerId, setVolunteerId] = useState("");
  const [total, setTotal] = useState(0);

  /* ================= GET VOLUNTEER ================= */
  useEffect(() => {
    const getVolunteer = async () => {
      try {
        const stored = await AsyncStorage.getItem("volunteer");

        console.log("Stored volunteer:", stored);

        if (!stored) {
          Alert.alert("Volunteer not logged in");
          return;
        }

        const parsed = JSON.parse(stored);
        console.log("Volunteer parsed:", parsed);

        if (!parsed?.volunteerId) {
          Alert.alert("Volunteer ID missing");
          return;
        }

        setVolunteerId(parsed.volunteerId);

      } catch (err) {
        console.log("Volunteer parse error:", err);
        Alert.alert("Login data error");
      }
    };

    getVolunteer();
  }, []);

  /* ================= FETCH HISTORY ================= */
  useEffect(() => {
    if (volunteerId) fetchHistory();
  }, [volunteerId]);

  const fetchHistory = async () => {
    try {
      console.log("Fetching history for:", volunteerId);

      const res = await fetch(
        `${BASE_URL}/api/donations/history/${volunteerId}`
      );

      // 🔥 SAFE JSON PARSE (prevents < html crash)
      const text = await res.text();
      console.log("Raw history response:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.log("❌ Not JSON response");
        Alert.alert("Server error: check backend running");
        return;
      }

      console.log("Parsed history:", data);

      if (!res.ok) {
        Alert.alert("Error", data.message || "Failed to load history");
        return;
      }

      setHistory(data || []);
      setTotal(data?.length || 0);

    } catch (err) {
      console.log("History error:", err);
      Alert.alert("Server connection error");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tasks History</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats Card */}
        <View style={styles.statsCard}>
          <Text style={styles.statsLabel}>TOTAL TASKS COMPLETED</Text>
          <Text style={styles.statsValue}>{total}</Text>
          <Text style={styles.statsSub}>
            Supporting our children’s future
          </Text>
        </View>

        {/* Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Past Tasks</Text>
          <View style={styles.yearBox}>
            <Text style={styles.yearText}>{new Date().getFullYear()}</Text>
          </View>
        </View>

        {/* EMPTY */}
        {history.length === 0 && (
          <Text style={{ textAlign: "center", marginTop: 40, color: "gray" }}>
            No completed deliveries yet
          </Text>
        )}

        {/* HISTORY LIST */}
        {history.map((item) => (
          <View key={item._id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>
                {item.items?.[0]?.category || "Donation"}
              </Text>

              <View style={styles.status}>
                <Ionicons
                  name="checkmark-circle"
                  size={14}
                  color="#16A34A"
                />
                <Text style={styles.statusText}>COMPLETED</Text>
              </View>
            </View>

            {/* Home name */}
            <Text style={styles.donor}>
              <Ionicons name="home-outline" size={12} /> Home:{" "}
              {item.homeId?.homeName || "Home"}
            </Text>

            <View style={styles.meta}>
              <View style={styles.metaItem}>
                <Ionicons name="calendar-outline" size={14} />
                <Text style={styles.metaText}>
                  {item.updatedAt
                    ? new Date(item.updatedAt).toDateString()
                    : "Date"}
                </Text>
              </View>

              <Text style={styles.qty}>
                {item.items?.[0]?.quantity || "1"}
              </Text>
            </View>
          </View>
        ))}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const PURPLE = "#7C3AED";

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:"#F9FAFB", paddingHorizontal:16 },

  header:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginVertical:14
  },

  headerTitle:{ fontSize:16, fontWeight:"700" },

  statsCard:{
    backgroundColor:PURPLE,
    borderRadius:18,
    padding:20,
    alignItems:"center",
    marginBottom:24
  },

  statsLabel:{ color:"#E9D5FF", fontSize:12 },
  statsValue:{ fontSize:36, fontWeight:"800", color:"#fff" },
  statsSub:{ color:"#EDE9FE", marginTop:4 },

  sectionHeader:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:12
  },

  sectionTitle:{ fontSize:16, fontWeight:"800" },

  yearBox:{
    backgroundColor:"#EDE9FE",
    paddingHorizontal:12,
    paddingVertical:4,
    borderRadius:12
  },

  yearText:{ color:PURPLE, fontWeight:"700", fontSize:12 },

  card:{
    backgroundColor:"#fff",
    borderRadius:16,
    padding:14,
    marginBottom:12
  },

  cardHeader:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:6
  },

  cardTitle:{ fontWeight:"700", fontSize:14 },

  status:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#DCFCE7",
    paddingHorizontal:8,
    paddingVertical:4,
    borderRadius:12
  },

  statusText:{
    marginLeft:4,
    fontSize:11,
    fontWeight:"700",
    color:"#15803D"
  },

  donor:{ fontSize:12, color:"#6B7280", marginBottom:8 },

  meta:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },

  metaItem:{ flexDirection:"row", alignItems:"center" },

  metaText:{ marginLeft:6, fontSize:12, color:"#6B7280" },

  qty:{ color:PURPLE, fontWeight:"700", fontSize:12 }
});
