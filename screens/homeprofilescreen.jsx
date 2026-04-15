import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context"; // ✅ ADDED

const { width, height } = Dimensions.get("window");
const scale = width / 375;
const normalize = (size) => Math.round(scale * size);

const BASE_URL = "http://10.90.184.124:5000";

export default function HomeProfileScreen({ navigation, route }) {

  const [homeId, setHomeId] = useState(route?.params?.homeId);
  const [home, setHome] = useState({});
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [activeDonations, setActiveDonations] = useState([]);
  const [submittedRequests, setSubmittedRequests] = useState([]);
  const [visibleOTPs, setVisibleOTPs] = useState({});

  useEffect(() => {
    const getStoredHome = async () => {
      if (!homeId) {
        const stored = await AsyncStorage.getItem("home");
        if (stored) {
          const parsed = JSON.parse(stored);
          setHomeId(parsed.homeId);
          console.log("🏠 Home ID from storage:", parsed.homeId);
        } else {
          console.log("🏠 No home data in storage");
        }
      } else {
        console.log("🏠 Home ID from params:", homeId);
      }
    };
    getStoredHome();
  }, []);

  useEffect(() => {
    if (!homeId) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/homes/${homeId}`);
        const data = await res.json();
        setHome(data || {});
      } catch {
        Alert.alert("Server not reachable");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [homeId]);

  useEffect(() => {
    if (!homeId) return;
    console.log("🚀 Starting fetchDelivery for homeId:", homeId);

    const fetchDelivery = async () => {
      try {
        const resDonations = await fetch(`${BASE_URL}/api/donations/pending`);
        const donationsData = await resDonations.json();
        console.log("📦 Donations data:", donationsData);

        const pendingDonations = donationsData.filter(
          (d) =>
            d.homeId?._id === homeId &&
            d.type === "items" &&
            d.volunteerId &&
            d.status !== "Delivered"
        );
        console.log("🚚 Pending donations for home:", pendingDonations);
        setActiveDonations(pendingDonations);

        // Fetch all submitted requests for this home
        try {
          console.log("📡 Fetching requests for homeId:", homeId);
          const resAllRequests = await fetch(`${BASE_URL}/api/helprequests/home/${homeId}`);
          if (resAllRequests.ok) {
            const homeRequests = await resAllRequests.json();
            console.log("📝 Received requests:", homeRequests.length);
            homeRequests.forEach(req => {
              console.log("  Req:", req._id, "Status:", req.status, "OTP:", req.otp);
            });
            setSubmittedRequests(homeRequests);
          } else {
            console.log("❌ Failed to fetch requests, status:", resAllRequests.status);
          }
        } catch (e) {
          console.log("No submitted requests found:", e.message);
          setSubmittedRequests([]);
        }
      } catch (error) {
        console.log("❌ Error fetching delivery data:", error);
        setActiveDonations([]);
      }
    };

    fetchDelivery();
    const interval = setInterval(fetchDelivery, 2000);
    return () => clearInterval(interval);
  }, [homeId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );
  }

  const aboutText = home?.about || "No description added";
  const words = aboutText.split(" ");
  const isLong = words.length > 30;
  const shortText = words.slice(0, 30).join(" ");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: height * 0.05 }}
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() =>
            navigation.reset({ index: 0, routes: [{ name: "Login" }] })
          }>
            <Ionicons name="arrow-back" size={normalize(22)} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Home Profile</Text>

          <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
            <Ionicons name="notifications-outline" size={normalize(22)} />
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

        <Text style={styles.name}>{home?.homeName || "Home"}</Text>

        {/* BADGES */}
        <View style={styles.badges}>
          <View style={styles.badge}>
            <Ionicons name="shield-checkmark" size={14} color="#7C3AED" />
            <Text style={styles.badgeText}>Verified NGO</Text>
          </View>

          <View style={styles.badge}>
            <Ionicons name="location-outline" size={14} color="#7C3AED" />
            <Text style={styles.badgeText}>{home?.address?.city || "City"}</Text>
          </View>
        </View>

        {/* SUBMIT REQUEST */}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate("SubmitRequest", { homeId })}
        >
          <Text style={styles.primaryBtnText}>Submit Request</Text>
        </TouchableOpacity>

        {/* TRACK & OTP SECTION */}
        {activeDonations.length > 0 ? (
          activeDonations.map((donation) => {
            console.log("🎯 Rendering donation/request:", donation._id, "OTP:", donation.otp);
            return (
            <View key={donation._id} style={styles.deliveryStatusBox}>
              
              {/* Display OTP for the volunteer */}
              {donation.otp && (
                <View style={styles.otpBox}>
                  <Ionicons name="key" size={24} color="#F59E0B" />
                  <View style={{ marginLeft: 12 }}>
                    <Text style={styles.otpLabel}>Delivery Verification Code</Text>
                    <Text style={styles.otpValue}>{donation.otp}</Text>
                  </View>
                </View>
              )}

              <TouchableOpacity style={styles.trackBtn} onPress={() => navigation.navigate("LiveTracking", { donationId: donation._id })}>
                <Ionicons name="navigate" size={18} color="#fff" />
                <Text style={styles.trackText}>Track Volunteer Live</Text>
              </TouchableOpacity>
            </View>
            );
          })
        ) : (
          <Text style={styles.noOrder}>No orders assigned</Text>
        )}

        {/* SUBMITTED REQUESTS */}
        {submittedRequests.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Submitted Requests</Text>
              <TouchableOpacity 
                style={styles.refreshBtn}
                onPress={() => {
                  console.log("🔄 Manual refresh clicked");
                  // Trigger fetch
                  if (homeId) {
                    fetch(`${BASE_URL}/api/helprequests/home/${homeId}`)
                      .then(res => res.json())
                      .then(data => {
                        console.log("🔄 Manual refresh data:", data);
                        setSubmittedRequests(data);
                      })
                      .catch(err => console.log("🔄 Manual refresh error:", err));
                  }
                }}
              >
                <Ionicons name="refresh" size={16} color="#7C3AED" />
                <Text style={styles.refreshText}>Refresh</Text>
              </TouchableOpacity>
            </View>
            {submittedRequests.map((request) => {
              console.log("📄 Rendering submitted request:", request._id, "OTP:", request.otp);
              return (
              <View key={request._id} style={styles.requestCard}>
                <View style={styles.requestHeader}>
                  <Text style={styles.requestUrgency}>{request.urgency}</Text>
                  <Text style={styles.requestNeed}>{request.needType}</Text>
                </View>
                <Text style={styles.requestDesc}>{request.description}</Text>
                <Text style={styles.requestStatus}>Status: {request.status}</Text>
                
                {/* OTP Section */}
                <TouchableOpacity 
                  style={styles.otpToggle}
                  onPress={() => setVisibleOTPs(prev => ({ ...prev, [request._id]: !prev[request._id] }))}
                >
                  <Ionicons name="key" size={16} color="#7C3AED" />
                  <Text style={styles.otpToggleText}>
                    {visibleOTPs[request._id] ? "Hide OTP" : "View OTP"}
                  </Text>
                  <Ionicons 
                    name={visibleOTPs[request._id] ? "chevron-up" : "chevron-down"} 
                    size={16} 
                    color="#7C3AED" 
                  />
                </TouchableOpacity>

                {/* Display OTP if toggled and available */}
                {visibleOTPs[request._id] && (
                  <View style={styles.otpBox}>
                    {request.otp ? (
                      <>
                        <Ionicons name="key" size={20} color="#F59E0B" />
                        <View style={{ marginLeft: 8 }}>
                          <Text style={styles.otpLabel}>Verification Code</Text>
                          <Text style={styles.otpValue}>{request.otp}</Text>
                        </View>
                      </>
                    ) : (
                      <Text style={styles.noOtpText}>OTP not generated yet</Text>
                    )}
                  </View>
                )}
              </View>
              );
            })}
          </>
        )}
        <Text style={styles.aboutText}>
          {expanded || !isLong ? aboutText : shortText + "..."}
        </Text>

        {isLong && (
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text style={styles.readMore}>
              {expanded ? "Show less" : "Read more"}
            </Text>
          </TouchableOpacity>
        )}

        {/* REGISTRATION */}
        <Text style={styles.sectionTitle}>Registration Details</Text>
        <Text style={styles.aboutText}>
          Reg No: {home?.registrationNumber || "N/A"}
        </Text>
        <Text style={styles.aboutText}>
          Representative: {home?.representativeName || "N/A"}
        </Text>

        {/* CONTACT */}
        <Text style={styles.sectionTitle}>Contact Info</Text>
        <Text style={styles.aboutText}>📞 {home?.phone}</Text>
        <Text style={styles.aboutText}>📧 {home?.email}</Text>

        {/* AI */}
        <Text style={styles.sectionTitle}>Need Help?</Text>
        <TouchableOpacity
          style={styles.aiBox}
          onPress={() => navigation.navigate("Chatbot")}
        >
          <MaterialIcons name="support-agent" size={20} color="#7C3AED" />
          <Text style={styles.aiText}>Ask HopeConnect AI</Text>
        </TouchableOpacity>

        {/* LOCATION */}
        <Text style={styles.sectionTitle}>Home Location</Text>

        <View style={styles.mapBox}>
          {home?.location?.latitude ? (
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
              <Marker coordinate={home.location} />
            </MapView>
          ) : (
            <View style={styles.center}>
              <Text>No location set</Text>
            </View>
          )}
        </View>

        <Text style={styles.aboutText}>{home?.fullAddress}</Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const PURPLE = "#7C3AED";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", paddingHorizontal: width * 0.05 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: height * 0.02
  },

  headerTitle: { fontSize: normalize(16), fontWeight: "700" },

  cover: { width: "100%", height: height * 0.25, borderRadius: 18 },

  name: { fontSize: normalize(20), fontWeight: "800", marginVertical: 8 },

  badges: { flexDirection: "row", flexWrap: "wrap", marginBottom: 16 },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 6,
    backgroundColor: "#EDE9FE",
    padding: 6,
    borderRadius: 20
  },

  badgeText: { fontSize: normalize(12), color: PURPLE },

  primaryBtn: {
    backgroundColor: PURPLE,
    paddingVertical: height * 0.02,
    borderRadius: 24,
    alignItems: "center"
  },

  primaryBtnText: { color: "#fff", fontWeight: "700" },

  trackBtn: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15
  },

  trackText: { color: "#fff", marginLeft: 8 },

  noOrder: { textAlign: "center", marginVertical: 15 },

  sectionTitle: {
    fontSize: normalize(18),
    fontWeight: "800",
    marginTop: 10
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10
  },

  refreshBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20
  },

  refreshText: {
    fontSize: normalize(12),
    color: PURPLE,
    fontWeight: "600",
    marginLeft: 4
  },

  aboutText: { color: "#6B7280", marginBottom: 8 },

  readMore: { color: PURPLE, fontWeight: "700" },

  mapBox: {
    height: height * 0.28,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 10
  },

  aiBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDE9FE",
    padding: 12,
    borderRadius: 14,
    marginBottom: 10
  },

  aiText: {
    marginLeft: 10,
    fontWeight: "700",
    color: PURPLE
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  deliveryStatusBox: {
    marginVertical: 15,
  },

  otpBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#FDE68A"
  },

  otpLabel: {
    fontSize: normalize(12),
    color: "#B45309",
    fontWeight: "600",
    marginBottom: 2
  },

  otpValue: {
    fontSize: normalize(18),
    fontWeight: "800",
    color: "#92400E",
    letterSpacing: 4
  },

  requestCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB"
  },

  requestHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
  },

  requestUrgency: {
    backgroundColor: "#FEF3C7",
    color: "#D97706",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: normalize(12),
    fontWeight: "700"
  },

  requestNeed: {
    fontSize: normalize(14),
    fontWeight: "700",
    color: PURPLE
  },

  requestDesc: {
    fontSize: normalize(14),
    color: "#6B7280",
    marginBottom: 8
  },

  requestStatus: {
    fontSize: normalize(12),
    color: "#374151",
    fontWeight: "600"
  },

  otpToggle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    padding: 10,
    borderRadius: 8,
    marginTop: 8
  },

  otpToggleText: {
    flex: 1,
    fontSize: normalize(14),
    color: PURPLE,
    fontWeight: "600",
    marginLeft: 8
  },

  noOtpText: {
    fontSize: normalize(14),
    color: "#6B7280",
    fontStyle: "italic"
  }
});