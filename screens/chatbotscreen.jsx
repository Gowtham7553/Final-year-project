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
  ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

export default function ChatbotScreen() {

  const flatListRef = useRef();

  const [messages, setMessages] = useState([
    { id: "1", text: "Hi 👋 I am HopeConnect AI.\nAsk about donate, volunteer or urgent help.", sender: "bot" }
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  /* ===============================
     SEND MESSAGE TO BACKEND
  ===============================*/
  const sendMessage = async (customText) => {

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
      const response = await fetch("http://10.160.239.124:5000/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();

      const botMsg = {
        id: (Date.now()+1).toString(),
        text: data.reply,
        sender: "bot"
      };

      setMessages(prev => [...prev, botMsg]);

    } catch (error) {
      console.log("AI ERROR:", error);

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
    <SafeAreaView style={{flex:1, backgroundColor:"#F8F9FD"}}>
      <KeyboardAvoidingView
        style={{flex:1}}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >

        {/* CHAT LIST */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item)=>item.id}
          contentContainerStyle={{padding:15, paddingBottom:90}}
          showsVerticalScrollIndicator={false}
          renderItem={({item})=>(
            <View style={[
              styles.message,
              item.sender==="user"?styles.user:styles.bot
            ]}>
              <Text style={{
                color:item.sender==="user"?"#fff":"#000",
                fontSize:15
              }}>
                {item.text}
              </Text>
            </View>
          )}
        />

        {/* typing indicator */}
        {typing && (
          <View style={{flexDirection:"row", paddingLeft:20, paddingBottom:5}}>
            <ActivityIndicator size="small" color="#7C3AED"/>
            <Text style={{marginLeft:6}}>AI thinking...</Text>
          </View>
        )}

        {/* QUICK BUTTONS */}
        <View style={styles.quickRow}>
          {["Donate","Volunteer","Urgent","Nearest"].map((item)=>(
            <TouchableOpacity
              key={item}
              style={styles.quickBtn}
              onPress={()=>sendMessage(item)}
            >
              <Text style={styles.quickText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* INPUT */}
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
            onPress={()=>sendMessage()}
          >
            <MaterialIcons name="send" size={22} color="#fff"/>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

message:{
  padding:12,
  borderRadius:18,
  marginVertical:6,
  maxWidth:"85%"
},

user:{
  backgroundColor:"#7C3AED",
  alignSelf:"flex-end"
},

bot:{
  backgroundColor:"#E5E7EB",
  alignSelf:"flex-start"
},

inputRow:{
  flexDirection:"row",
  padding:10,
  alignItems:"center"
},

input:{
  flex:1,
  backgroundColor:"#fff",
  borderRadius:25,
  paddingHorizontal:15,
  paddingVertical:10,
  maxHeight:100
},

send:{
  backgroundColor:"#7C3AED",
  padding:12,
  borderRadius:25,
  marginLeft:8
},

quickRow:{
  flexDirection:"row",
  justifyContent:"space-around",
  paddingVertical:10
},

quickBtn:{
  backgroundColor:"#DDD6FE",
  paddingVertical:8,
  paddingHorizontal:15,
  borderRadius:20
},

quickText:{
  color:"#5B21B6",
  fontWeight:"600"
}

});