import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SignUpScreen({navigation}) {
  const [selectedSkills, setSelectedSkills] = useState(["Teaching"]);

  const skills = [
    "Teaching",
    "Mentoring",
    "Arts & Crafts",
    "Sports",
    "Cooking",
    "Event Support",
  ];

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#000" />
        <Text style={styles.headerTitle}>Sign Up</Text>
        <View style={{ width: 24 }} />
      </View>

     

      {/* Title */}
      <Text style={styles.title}>Become a Hope{`\n`}Connector</Text>
      <Text style={styles.subtitle}>
        Join our trusted community and make a real difference in a child's life
        today.
      </Text>

      {/* Verified Box */}
      <View style={styles.verifiedBox}>
        <View style={styles.verifiedIcon}>
          <Ionicons name="shield-checkmark" size={20} color="#7C3AED" />
        </View>
        <View>
          <Text style={styles.verifiedTitle}>Verified & Secure Process</Text>
          <Text style={styles.verifiedText}>
            We background check all volunteers for safety.
          </Text>
        </View>
      </View>

      {/* Inputs */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} placeholder="e.g. Jane Doe" />

      <Text style={styles.label}>Email Address</Text>
      <View style={styles.inputWithIcon}>
        <TextInput
          style={styles.flex}
          placeholder="jane@example.com"
          keyboardType="email-address"
        />
        <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
      </View>

      <Text style={styles.label}>Password</Text>
      <View style={styles.inputWithIcon}>
        <TextInput
          style={styles.flex}
          placeholder="Min. 8 characters"
          secureTextEntry
        />
        <Ionicons name="eye-off-outline" size={20} color="#9CA3AF" />
      </View>

      {/* Skills */}
      <Text style={styles.label}>What can you bring?</Text>
      <View style={styles.skillContainer}>
        {skills.map((skill) => {
          const active = selectedSkills.includes(skill);
          return (
            <TouchableOpacity
              key={skill}
              style={[
                styles.skillChip,
                active && styles.skillChipActive,
              ]}
              onPress={() => toggleSkill(skill)}
            >
              <Text
                style={[
                  styles.skillText,
                  active && styles.skillTextActive,
                ]}
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

      {/* Availability */}
      <Text style={styles.label}>When are you free?</Text>
      <View style={styles.inputWithIcon}>
        <Text style={{ color: "#9CA3AF" }}>Select availability</Text>
        <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
      </View>

      {/* Security Text */}
      <View style={styles.security}>
        <Ionicons name="lock-closed" size={16} color="#6B7280" />
        <Text style={styles.securityText}>
          Your data is encrypted securely.
        </Text>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.buttonText}>Create Volunteer Account</Text>
      </TouchableOpacity>

      {/* Terms */}
      <Text style={styles.terms}>
        By registering, you agree to our{" "}
        <Text style={styles.link}>Terms of Service</Text> and acknowledge our{" "}
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
    alignItems: "center",
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
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
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

  verifiedIcon: {
    marginRight: 12,
    backgroundColor: "#E9D5FF",
    padding: 8,
    borderRadius: 20,
  },

  verifiedTitle: {
    fontWeight: "700",
  },

  verifiedText: {
    fontSize: 13,
    color: "#6B7280",
  },

  label: {
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
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
    justifyContent: "space-between",
  },

  flex: {
    flex: 1,
  },

  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
  },

  skillChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },

  skillChipActive: {
    backgroundColor: PURPLE,
    borderColor: PURPLE,
  },

  skillText: {
    fontWeight: "600",
  },

  skillTextActive: {
    color: "#fff",
  },

  security: {
    flexDirection: "row",
    alignItems: "center",
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
