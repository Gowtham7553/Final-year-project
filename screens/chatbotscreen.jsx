import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

// 🔴 CHANGE THIS TO YOUR PC IP
const API_URL = "http://10.90.184.124:5000/api/ai/chat";

export default function ChatbotScreen() {

  const flatListRef = useRef();

  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hi 👋 I am HopeConnect AI.\nAsk about donate, volunteer or urgent help.",
      sender: "bot"
    }
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  /* ================= SEND MESSAGE ================= */
  const sendMessage = async (customText) => {

    if (typing) return;

    const text = customText || input.trim();
    if (!text) return;

    const userMsg = {
      id: Date.now().toString(),
      text,
      sender: "user"
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    try {
      // ✅ THIS IS WHERE YOUR FETCH GOES
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();

      console.log("BACKEND RESPONSE:", data);

      const botReply = data?.reply || "⚠️ No response from AI";

      const botMsg = {
        id: (Date.now() + 1).toString(),
        text: botReply,
        sender: "bot"
      };

      setMessages(prev => [...prev, botMsg]);

    } catch (error) {
      console.log("API ERROR:", error);

      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "⚠️ Cannot connect to server",
          sender: "bot"
        }
      ]);
    }

    setTyping(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F9FD" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 20}
      >

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            padding: width * 0.04,
            paddingBottom: height * 0.12
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <View
              style={[
                styles.message,
                item.sender === "user" ? styles.user : styles.bot
              ]}
            >
              <Text
                style={{
                  color: item.sender === "user" ? "#fff" : "#000",
                  fontSize: width * 0.038
                }}
              >
                {item.text}
              </Text>
            </View>
          )}
        />

        {typing && (
          <View style={{ flexDirection: "row", paddingLeft: 20 }}>
            <ActivityIndicator size="small" color="#7C3AED" />
            <Text style={{ marginLeft: 6 }}>AI thinking...</Text>
          </View>
        )}

        <View style={styles.quickRow}>
          {["Donate", "Volunteer", "Urgent", "Nearest"].map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.quickBtn}
              onPress={() => sendMessage(item)}
            >
              <Text style={styles.quickText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.inputRow}>
          <TextInput
            placeholder="Ask HopeConnect AI..."
            value={input}
            onChangeText={setInput}
            style={styles.input}
            multiline
          />

          <TouchableOpacity
            style={styles.send}
            onPress={() => sendMessage()}
          >
            <MaterialIcons name="send" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  message: {
    padding: width * 0.03,
    borderRadius: 18,
    marginVertical: 6,
    maxWidth: "85%"
  },
  user: {
    backgroundColor: "#7C3AED",
    alignSelf: "flex-end"
  },
  bot: {
    backgroundColor: "#E5E7EB",
    alignSelf: "flex-start"
  },
  inputRow: {
    flexDirection: "row",
    padding: width * 0.03,
    alignItems: "center"
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100
  },
  send: {
    backgroundColor: "#7C3AED",
    padding: width * 0.03,
    borderRadius: 25,
    marginLeft: 8
  },
  quickRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: height * 0.01
  },
  quickBtn: {
    backgroundColor: "#DDD6FE",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20
  },
  quickText: {
    color: "#5B21B6",
    fontWeight: "600"
  }
});