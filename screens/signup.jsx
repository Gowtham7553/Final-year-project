import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SignUpScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [availability, setAvailability] = useState("6:00-12:00");
  const [skills, setSkills] = useState(["Teaching"]);
  const [loading, setLoading] = useState(false);

  const skillOptions = [
    "Teaching",
    "Mentoring",
    "Arts & Crafts",
    "Sports",
    "Cooking",
    "Event Support",
  ];

  const toggleSkill = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  const handleSignUp = async () => {
    if (!fullName || !email || !password || !phone) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://10.172.162.124:5000/api/volunteers/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName,
            email,
            password,
            availability,
            skills,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message || "Signup failed");
        return;
      }

      Alert.alert("Success", "Volunteer account created successfully!");
    } catch (error) {
      Alert.alert("Error", "Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} />
        <Text style={styles.headerTitle}>Volunteer Registration</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Image */}
      <Image source={require("../assets/hands.jpg")} style={styles.image} />

      {/* Title */}
      <Text style={styles.title}>Become a Hope Connector</Text>
      <Text style={styles.subtitle}>
        Join our trusted community and make a real difference in a child's life today.
      </Text>

      {/* Verified Box */}
      <View style={styles.verifiedBox}>
        <Ionicons name="shield-checkmark" size={20} color="#7C3AED" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.verifiedTitle}>Verified & Secure Process</Text>
          <Text style={styles.verifiedText}>
            We background check all volunteers for safety.
          </Text>
        </View>
      </View>

      {/* Full Name */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Jane Doe"
        value={fullName}
        onChangeText={setFullName}
      />

      {/* Email */}
      <Text style={styles.label}>Email Address</Text>
      <View style={styles.inputWithIcon}>
        <TextInput
          style={styles.flex}
          placeholder="jane@example.com"
          value={email}
          onChangeText={setEmail}
        />
        <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
      </View>

      {/* Phone */}
      <Text style={styles.label}>Phone Number</Text>
      <View style={styles.inputWithIcon}>
        <TextInput
          style={styles.flex}
          placeholder="+91 55500 0000"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <Ionicons name="call-outline" size={20} color="#9CA3AF" />
      </View>

      {/* ✅ SKILLS (NEW – ONLY ADDITION) */}
      <Text style={styles.label}>What can you bring?</Text>
      <View style={styles.skillsRow}>
        {skillOptions.map((skill) => {
          const active = skills.includes(skill);
          return (
            <TouchableOpacity
              key={skill}
              style={[styles.skillChip, active && styles.skillActive]}
              onPress={() => toggleSkill(skill)}
            >
              <Text
                style={[styles.skillText, active && styles.skillTextActive]}
              >
                {skill}
              </Text>
              {active && (
                <Ionicons
                  name="checkmark"
                  size={14}
                  color="#fff"
                  style={{ marginLeft: 6 }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.inputWithIcon}>
        <TextInput
          style={styles.flex}
          placeholder="Min. 8 characters"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Ionicons name="eye-off-outline" size={20} color="#9CA3AF" />
      </View>

      {/* Availability */}
      <Text style={styles.label}>When are you free?</Text>
      <View style={styles.timeRow}>
        {["6:00-12:00", "12:00-18:00", "18:00-24:00"].map((time) => {
          const active = availability === time;
          return (
            <TouchableOpacity
              key={time}
              style={[styles.timeChip, active && styles.timeActive]}
              onPress={() => setAvailability(time)}
            >
              <Text style={[styles.timeText, active && styles.timeTextActive]}>
                {time}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Security */}
      <View style={styles.security}>
        <Ionicons name="lock-closed" size={16} color="#6B7280" />
        <Text style={styles.securityText}>Your data is encrypted securely.</Text>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>
          {loading ? "Creating..." : "Create Volunteer Account"}
        </Text>
      </TouchableOpacity>

      {/* Terms */}
      <Text style={styles.terms}>
        By registering, you agree to our{" "}
        <Text style={styles.link}>Terms of Service</Text> and{" "}
        <Text style={styles.link}>Background Check Policy</Text>.
      </Text>
    </ScrollView>
  );
}

const PURPLE = "#7C3AED";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  image: {
    width: "100%",
    height: 170,
    borderRadius: 18,
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 20,
  },

  verifiedBox: {
    flexDirection: "row",
    backgroundColor: "#F3E8FF",
    padding: 14,
    borderRadius: 12,
    marginBottom: 24,
  },

  verifiedTitle: { fontWeight: "700" },
  verifiedText: { fontSize: 13, color: "#6B7280" },

  label: {
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  flex: { flex: 1 },

  /* Skills */
  skillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
  },

  skillChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
    marginRight: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  skillActive: {
    backgroundColor: PURPLE,
    borderColor: PURPLE,
  },

  skillText: {
    fontWeight: "600",
    fontSize: 12,
  },

  skillTextActive: {
    color: "#fff",
  },

  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },

  timeChip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
  },

  timeActive: {
    backgroundColor: PURPLE,
    borderColor: PURPLE,
  },

  timeText: {
    fontWeight: "600",
    fontSize: 12,
  },

  timeTextActive: {
    color: "#fff",
  },

  security: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },

  securityText: {
    marginLeft: 8,
    color: "#6B7280",
  },

  button: {
    backgroundColor: PURPLE,
    padding: 18,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  terms: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 40,
  },

  link: {
    color: PURPLE,
    fontWeight: "600",
  },
});
