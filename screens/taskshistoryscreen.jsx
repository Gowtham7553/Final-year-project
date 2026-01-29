import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TasksHistoryScreen({ navigation }) {
  const history = [
    {
      id: 1,
      title: "Monthly Grocery Supply",
      donor: "Global Food Initiative",
      date: "Nov 14, 2024",
      qty: "12 Boxes",
    },
    {
      id: 2,
      title: "Educational Kits",
      donor: "Sunshine Foundation",
      date: "Oct 28, 2024",
      qty: "45 Kits",
    },
    {
      id: 3,
      title: "Winter Clothing Bundles",
      donor: "Community Drive",
      date: "Oct 15, 2024",
      qty: "30 Bundles",
    },
    {
      id: 4,
      title: "Fresh Produce Delivery",
      donor: "Local Farmers Market",
      date: "Sep 30, 2024",
      qty: "Bulk Order",
    },
  ];

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
          <Text style={styles.statsValue}>112</Text>
          <Text style={styles.statsSub}>
            Supporting our children’s future
          </Text>
        </View>

        {/* Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Past Tasks</Text>
          <View style={styles.yearBox}>
            <Text style={styles.yearText}>2024</Text>
          </View>
        </View>

        {/* History List */}
        {history.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={styles.status}>
                <Ionicons
                  name="checkmark-circle"
                  size={14}
                  color="#16A34A"
                />
                <Text style={styles.statusText}>COMPLETED</Text>
              </View>
            </View>

            <Text style={styles.donor}>
              <Ionicons name="person-outline" size={12} /> Donor:{" "}
              {item.donor}
            </Text>

            <View style={styles.meta}>
              <View style={styles.metaItem}>
                <Ionicons name="calendar-outline" size={14} />
                <Text style={styles.metaText}>{item.date}</Text>
              </View>

              <Text style={styles.qty}>{item.qty}</Text>
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
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 14,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  statsCard: {
    backgroundColor: PURPLE,
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    marginBottom: 24,
  },

  statsLabel: {
    color: "#E9D5FF",
    fontSize: 12,
    marginBottom: 4,
  },

  statsValue: {
    fontSize: 36,
    fontWeight: "800",
    color: "#fff",
  },

  statsSub: {
    color: "#EDE9FE",
    marginTop: 4,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
  },

  yearBox: {
    backgroundColor: "#EDE9FE",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },

  yearText: {
    color: PURPLE,
    fontWeight: "700",
    fontSize: 12,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  cardTitle: {
    fontWeight: "700",
    fontSize: 14,
  },

  status: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  statusText: {
    marginLeft: 4,
    fontSize: 11,
    fontWeight: "700",
    color: "#15803D",
  },

  donor: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 8,
  },

  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  metaText: {
    marginLeft: 6,
    fontSize: 12,
    color: "#6B7280",
  },

  qty: {
    color: PURPLE,
    fontWeight: "700",
    fontSize: 12,
  },
});
