import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const BASE_URL = "http://10.172.162.124:5000";

export default function MyProfileScreen({ navigation, route }) {
  const donorId = route?.params?.donorId;

  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH DONOR PROFILE
  ========================= */
  useEffect(() => {
    if (!donorId) {
      Alert.alert("Error", "Donor not identified. Please login again.");
      navigation.replace("Login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/donors/${donorId}`);
        const data = await res.json();

        if (!res.ok) {
          Alert.alert("Error", "Failed to load profile");
          return;
        }

        setDonor(data);
      } catch (err) {
        Alert.alert("Error", "Server not reachable");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [donorId]);

  /* =========================
     IMAGE PICKER + UPLOAD
  ========================= */
  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required");
      return;
    }

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

      try {
        const res = await fetch(
          `${BASE_URL}/api/donors/upload/${donorId}`,
          {
            method: "POST",
            body: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          Alert.alert("Upload failed");
          return;
        }

        setDonor({ ...donor, profileImage: data.image });
      } catch (err) {
        Alert.alert("Upload failed");
      }
    }
  };

  /* =========================
     LOGOUT
  ========================= */
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Avatar */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          {donor.profileImage ? (
            <Image
              source={{ uri: `${BASE_URL}${donor.profileImage}` }}
              style={styles.avatarImage}
            />
          ) : (
            <Ionicons name="person" size={48} color="#fff" />
          )}

          <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
            <Ionicons name="pencil" size={14} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>{donor.name}</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {donor.role?.toUpperCase()} · EST.{" "}
            {new Date(donor.createdAt).getFullYear()}
          </Text>
        </View>
      </View>

      {/* Personal Details */}
      <Text style={styles.sectionLabel}>PERSONAL DETAILS</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="mail-outline" size={18} color="#7C3AED" />
          <Text style={styles.rowText}>{donor.email}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Ionicons name="call-outline" size={18} color="#7C3AED" />
          <Text style={styles.rowText}>{donor.phone}</Text>
        </View>
      </View>

      {/* Actions */}
      <Text style={styles.sectionLabel}>DOCUMENTS & SETTINGS</Text>

      <View style={styles.card}>
        <TouchableOpacity
          style={styles.rowBetween}
          onPress={() =>
            navigation.navigate("DonationHistory", {
              donorId,
            })
          }
        >
          <View style={styles.row}>
            <Ionicons name="time-outline" size={18} color="#7C3AED" />
            <Text style={styles.rowText}>Donation History</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.logoutRow} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={18} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const PURPLE = "#7C3AED";

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 14,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#FBBF24",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  editIcon: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: PURPLE,
    borderRadius: 12,
    padding: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 10,
  },
  badge: {
    backgroundColor: "#EDE9FE",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: PURPLE,
  },
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 1,
    color: "#9CA3AF",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowText: {
    fontSize: 14,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },
  logoutRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoutText: {
    color: "#EF4444",
    fontWeight: "600",
  },
});
