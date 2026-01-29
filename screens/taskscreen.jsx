import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TasksScreen({ navigation }) {
  const [filter, setFilter] = useState("All");

  const tasks = [
    {
      id: 1,
      title: "Monthly Grocery Delivery",
      desc: "15 boxes of essential grains and dairy",
      date: "Oct 24, 2024",
      extra: "15 Units",
      location: "Sunnydale Children's Home",
      status: "CONFIRMED",
    },
    {
      id: 2,
      title: "School Stationery Kits",
      desc: "Kits for 30 students including notebooks and pens",
      date: "Oct 26, 2024",
      extra: "30 Students",
      location: "Hope Haven Home",
      status: "PENDING",
    },
    {
      id: 3,
      title: "Winter Clothing Bundle",
      desc: "Warm coats and blankets for various age groups",
      date: "Oct 28, 2024",
      extra: "Bundle Pack",
      location: "Grace Children's Center",
      status: "CONFIRMED",
    },
  ];

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((t) => t.status === filter.toUpperCase());

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tasks</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        {["All", "Confirmed", "Pending"].map((item) => {
          const active = filter === item;
          return (
            <TouchableOpacity
              key={item}
              style={[styles.filterBtn, active && styles.filterActive]}
              onPress={() => setFilter(item)}
            >
              <Text
                style={[
                  styles.filterText,
                  active && styles.filterTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredTasks.map((task) => (
          <View key={task.id} style={styles.card}>
            {/* Status */}
            <View style={styles.cardHeader}>
              <View style={styles.iconBox}>
                <Ionicons name="cube-outline" size={20} color="#7C3AED" />
              </View>
              <Text
                style={[
                  styles.status,
                  task.status === "CONFIRMED"
                    ? styles.confirmed
                    : styles.pending,
                ]}
              >
                {task.status}
              </Text>
            </View>

            {/* Content */}
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.desc}>{task.desc}</Text>

            {/* Meta */}
            <View style={styles.meta}>
              <View style={styles.metaItem}>
                <Ionicons name="calendar-outline" size={14} />
                <Text style={styles.metaText}>{task.date}</Text>
              </View>

              <View style={styles.metaItem}>
                <Ionicons name="cube-outline" size={14} />
                <Text style={styles.metaText}>{task.extra}</Text>
              </View>
            </View>

            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={14} />
              <Text style={styles.metaText}>{task.location}</Text>
            </View>
          </View>
        ))}

        <View style={{ height: 40 }} />
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

  filters: {
    flexDirection: "row",
    marginBottom: 16,
  },

  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    marginRight: 8,
  },

  filterActive: {
    backgroundColor: "#EDE9FE",
  },

  filterText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },

  filterTextActive: {
    color: PURPLE,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#EDE9FE",
    alignItems: "center",
    justifyContent: "center",
  },

  status: {
    fontSize: 11,
    fontWeight: "700",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  confirmed: {
    backgroundColor: "#DCFCE7",
    color: "#15803D",
  },

  pending: {
    backgroundColor: "#FEF3C7",
    color: "#B45309",
  },

  title: {
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 4,
  },

  desc: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 10,
  },

  meta: {
    flexDirection: "row",
    marginBottom: 6,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 14,
  },

  metaText: {
    marginLeft: 6,
    fontSize: 12,
    color: "#6B7280",
  },
});
