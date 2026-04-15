import React, { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, ScrollView, Alert, Image,
  KeyboardAvoidingView, Platform, Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

const { width, height } = Dimensions.get("window");

const BASE_URL = "http://10.90.184.124:5000";

export default function RegisterHomeScreen({ navigation, route }) {

  const [homeName,setHomeName]=useState("");
  const [regNo,setRegNo]=useState("");
  const [repName,setRepName]=useState("");
  const [phone,setPhone]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [showPassword,setShowPassword]=useState(false);
  const [about,setAbout]=useState("");

  const [street,setStreet]=useState("");
  const [city,setCity]=useState("");
  const [zip,setZip]=useState("");
  const [capacity,setCapacity]=useState("");

  const [image,setImage]=useState(null);

  const [latitude,setLatitude]=useState("");
  const [longitude,setLongitude]=useState("");
  const [fullAddress,setFullAddress]=useState("");

  useEffect(()=>{
    if(route?.params){
      const lat = route.params.lat || route.params.latitude;
      const lng = route.params.lng || route.params.longitude;

      if(route.params.pickedAddress){
        setFullAddress(route.params.pickedAddress);
        setLatitude(lat);
        setLongitude(lng);
      }
    }
  },[route?.params]);

  // ✅ FIXED IMAGE PICKER (ONLY CHANGE)
  const pickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert("Permission required", "Allow gallery access");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
        allowsEditing: true,
      });

      if (!result.canceled && result.assets?.length > 0) {
        setImage(result.assets[0]); // store full object
      }

    } catch (e) {
      console.log(e);
      Alert.alert("Error picking image");
    }
  };

  const getCurrentLocation = async()=>{
    try{
      let { status } = await Location.requestForegroundPermissionsAsync();

      if(status!=="granted"){
        Alert.alert("Allow location permission");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      const { latitude, longitude } = loc.coords;

      setLatitude(latitude);
      setLongitude(longitude);

      const address = await Location.reverseGeocodeAsync({latitude,longitude});

      if(address.length>0){
        const place = `${address[0].name||""}, ${address[0].street||""}, ${address[0].city||""}`;
        setFullAddress(place);
      }else{
        setFullAddress(`${latitude}, ${longitude}`);
      }

    }catch{
      Alert.alert("Enable GPS & Internet");
    }
  };

  const handleSubmit = async()=>{

    if(!homeName || !email || !password){
      Alert.alert("Fill required fields");
      return;
    }

    if(!latitude || !longitude){
      Alert.alert("Please select home location");
      return;
    }

    const formData = new FormData();

    formData.append("homeName",homeName);
    formData.append("registrationNumber",regNo);
    formData.append("representativeName",repName);
    formData.append("phone",phone);
    formData.append("email",email);
    formData.append("password",password);
    formData.append("about",about);
    formData.append("capacity",capacity);

    formData.append("street",street);
    formData.append("city",city);
    formData.append("zipCode",zip);

    formData.append("latitude",latitude);
    formData.append("longitude",longitude);
    formData.append("fullAddress",fullAddress);

    // ✅ FIXED IMAGE UPLOAD (ONLY CHANGE)
    if (image) {
      formData.append("image", {
        uri: image.uri,
        name: image.fileName || "photo.jpg",
        type: image.type || "image/jpeg",
      });
    }

    try{
      const res = await fetch(`${BASE_URL}/api/homes/register`,{
        method:"POST",
        body:formData,
        headers:{ "Content-Type":"multipart/form-data" }
      });

      const data = await res.json();

      if(!res.ok){
        Alert.alert("Error",data.message);
        return;
      }

      Alert.alert("Home Registered Successfully");

      navigation.replace("HomeProfile",{ homeId:data.homeId });

    }catch{
      Alert.alert("Server error");
    }
  };

  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        style={{flex:1}}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={{paddingBottom: height * 0.05}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
              <Ionicons name="arrow-back" size={22}/>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Register Home</Text>
            <View style={{width:22}}/>
          </View>

          <Text style={styles.title}>Join our network</Text>
          <Text style={styles.subtitle}>
            Register your children's home to receive support and volunteers.
          </Text>

          {/* Image */}
          <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
            {image ?
              <Image source={{uri:image.uri}} style={styles.image}/> :
              <Ionicons name="camera" size={36} color="#7C3AED"/>
            }
            <Text style={{fontSize:width*0.03,marginTop:5}}>Upload Image</Text>
          </TouchableOpacity>

          {/* REST OF YOUR UI — UNCHANGED */}
          
          <Text style={styles.section}>Organization Details</Text>
          <TextInput style={styles.input} placeholder="Home Name" value={homeName} onChangeText={setHomeName}/>
          <TextInput style={styles.input} placeholder="Registration Number" value={regNo} onChangeText={setRegNo}/>

          <Text style={styles.section}>Contact Information</Text>
          <TextInput style={styles.input} placeholder="Representative Name" value={repName} onChangeText={setRepName}/>
          <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone}/>
          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail}/>

          <Text style={styles.section}>Security</Text>
          <View style={styles.input}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
              <TextInput
                style={{flex:1}}
                placeholder="Create Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.section}>About Home</Text>
          <TextInput style={[styles.input,{height:90}]} multiline value={about} onChangeText={setAbout}/>

          <Text style={styles.section}>Location & Capacity</Text>
          <TextInput style={styles.input} placeholder="Street Address" value={street} onChangeText={setStreet}/>

          <View style={{flexDirection:"row"}}>
            <TextInput style={[styles.input,{flex:1,marginRight:8}]} placeholder="City" value={city} onChangeText={setCity}/>
            <TextInput style={[styles.input,{flex:1}]} placeholder="Zip Code" value={zip} onChangeText={setZip}/>
          </View>

          <TextInput style={styles.input} placeholder="Capacity" value={capacity} onChangeText={setCapacity}/>

          <TextInput style={styles.input} placeholder="Selected Map Address" value={fullAddress} onChangeText={setFullAddress}/>

          <TouchableOpacity style={styles.locBtn} onPress={getCurrentLocation}>
            <Ionicons name="locate" size={18} color="#7C3AED"/>
            <Text style={styles.locText}>Use Current Location</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.locBtn,{backgroundColor:"#E0E7FF"}]}
            onPress={() => navigation.navigate("MapPicker", { returnScreen: "RegisterHome" })}
          >
            <Ionicons name="map" size={18} color="#4F46E5"/>
            <Text style={[styles.locText,{color:"#4F46E5"}]}>
              Select Location On Map
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
            <Text style={{color:"#fff",fontWeight:"700",fontSize:width*0.04}}>
              Submit Registration
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const PURPLE="#7C3AED";

const styles=StyleSheet.create({
container:{flex:1,paddingHorizontal:width*0.05},
header:{flexDirection:"row",justifyContent:"space-between",marginBottom:height*0.015,marginTop:5},
headerTitle:{fontWeight:"700",fontSize:width*0.045},

title:{fontSize:width*0.06,fontWeight:"800",marginBottom:height*0.005},
subtitle:{color:"#6B7280",marginBottom:height*0.025,fontSize:width*0.035},

section:{fontWeight:"700",marginTop:height*0.025,marginBottom:height*0.01,fontSize:width*0.04},

imageBox:{height:width*0.28,width:width*0.28,borderRadius:(width*0.28)/2,backgroundColor:"#eee",alignSelf:"center",justifyContent:"center",alignItems:"center",marginBottom:height*0.025},
image:{height:width*0.28,width:width*0.28,borderRadius:(width*0.28)/2},

input:{backgroundColor:"#fff",paddingVertical:height*0.018,paddingHorizontal:width*0.035,borderRadius:12,marginBottom:height*0.015,borderWidth:1,borderColor:"#E5E7EB"},

locBtn:{flexDirection:"row",alignItems:"center",justifyContent:"center",backgroundColor:"#F3E8FF",paddingVertical:height*0.018,borderRadius:12,marginTop:height*0.015},
locText:{color:PURPLE,fontWeight:"700",marginLeft:6,fontSize:width*0.035},

btn:{backgroundColor:PURPLE,paddingVertical:height*0.02,borderRadius:30,alignItems:"center",marginTop:height*0.03}
});