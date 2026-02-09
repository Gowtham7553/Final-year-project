import React, { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, ScrollView, Alert, Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

const BASE_URL = "http://172.18.41.124:5000";

export default function RegisterHomeScreen({ navigation, route }) {

  const [homeName,setHomeName]=useState("");
  const [regNo,setRegNo]=useState("");
  const [repName,setRepName]=useState("");
  const [phone,setPhone]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [about,setAbout]=useState("");

  const [street,setStreet]=useState("");
  const [city,setCity]=useState("");
  const [zip,setZip]=useState("");
  const [capacity,setCapacity]=useState("");

  const [image,setImage]=useState(null);

  // 📍 location states
  const [latitude,setLatitude]=useState("");
  const [longitude,setLongitude]=useState("");
  const [fullAddress,setFullAddress]=useState("");

  /* ================= RECEIVE LOCATION FROM MAP ================= */
  useEffect(()=>{
    if(route?.params?.pickedAddress){
      setFullAddress(route.params.pickedAddress);
      setLatitude(route.params.lat);
      setLongitude(route.params.lng);
    }
  },[route?.params]);

  /* ================= IMAGE PICK ================= */
  const pickImage = async()=>{
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality:0.7
    });

    if(!result.canceled){
      setImage(result.assets[0].uri);
    }
  };

  /* ================= CURRENT LOCATION ================= */
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

  /* ================= REGISTER ================= */
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

    // 📍 LOCATION SAVE
    formData.append("latitude",latitude);
    formData.append("longitude",longitude);
    formData.append("fullAddress",fullAddress);

    if(image){
      formData.append("image",{
        uri:image,
        name:"home.jpg",
        type:"image/jpeg"
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

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

      {/* IMAGE */}
      <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
        {image ?
          <Image source={{uri:image}} style={styles.image}/> :
          <Ionicons name="camera" size={36} color="#7C3AED"/>
        }
        <Text style={{fontSize:12,marginTop:5}}>Upload Image</Text>
      </TouchableOpacity>

      {/* ORGANIZATION */}
      <Text style={styles.section}>Organization Details</Text>
      <TextInput style={styles.input} placeholder="Home Name" value={homeName} onChangeText={setHomeName}/>
      <TextInput style={styles.input} placeholder="Registration Number" value={regNo} onChangeText={setRegNo}/>

      {/* CONTACT */}
      <Text style={styles.section}>Contact Information</Text>
      <TextInput style={styles.input} placeholder="Representative Name" value={repName} onChangeText={setRepName}/>
      <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone}/>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail}/>

      {/* PASSWORD */}
      <Text style={styles.section}>Security</Text>
      <TextInput style={styles.input} placeholder="Create Password" secureTextEntry value={password} onChangeText={setPassword}/>

      {/* ABOUT */}
      <Text style={styles.section}>About Home</Text>
      <TextInput
        style={[styles.input,{height:90}]}
        multiline
        placeholder="Describe about home"
        value={about}
        onChangeText={setAbout}
      />

      {/* LOCATION */}
      <Text style={styles.section}>Location & Capacity</Text>

      <TextInput style={styles.input} placeholder="Street Address" value={street} onChangeText={setStreet}/>

      <View style={{flexDirection:"row"}}>
        <TextInput style={[styles.input,{flex:1,marginRight:8}]} placeholder="City" value={city} onChangeText={setCity}/>
        <TextInput style={[styles.input,{flex:1}]} placeholder="Zip Code" value={zip} onChangeText={setZip}/>
      </View>

      <TextInput style={styles.input} placeholder="Current Capacity (Children)" value={capacity} onChangeText={setCapacity}/>

      {/* MAP ADDRESS */}
      <TextInput
        style={styles.input}
        placeholder="Selected Map Address"
        value={fullAddress}
        onChangeText={setFullAddress}
      />

      <TouchableOpacity style={styles.locBtn} onPress={getCurrentLocation}>
        <Ionicons name="locate" size={18} color="#7C3AED"/>
        <Text style={styles.locText}>Use Current Location</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.locBtn,{backgroundColor:"#E0E7FF"}]}
        onPress={()=>navigation.navigate("MapPicker",{
          returnScreen:"RegisterHome"
        })}
      >
        <Ionicons name="map" size={18} color="#4F46E5"/>
        <Text style={[styles.locText,{color:"#4F46E5"}]}>
          Select Location On Map
        </Text>
      </TouchableOpacity>

      {/* SUBMIT */}
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={{color:"#fff",fontWeight:"700",fontSize:16}}>
          Submit Registration
        </Text>
      </TouchableOpacity>

      <View style={{height:40}}/>
    </ScrollView>
  );
}

const PURPLE="#7C3AED";

const styles=StyleSheet.create({
container:{flex:1,backgroundColor:"#F9FAFB",padding:20},
header:{flexDirection:"row",justifyContent:"space-between",marginBottom:10},
headerTitle:{fontWeight:"700",fontSize:16},

title:{fontSize:22,fontWeight:"800",marginBottom:5},
subtitle:{color:"#6B7280",marginBottom:20},

section:{fontWeight:"700",marginTop:20,marginBottom:10},

imageBox:{height:120,width:120,borderRadius:60,backgroundColor:"#eee",alignSelf:"center",justifyContent:"center",alignItems:"center",marginBottom:20},
image:{height:120,width:120,borderRadius:60},

input:{backgroundColor:"#fff",padding:14,borderRadius:12,marginBottom:12,borderWidth:1,borderColor:"#E5E7EB"},

locBtn:{flexDirection:"row",alignItems:"center",justifyContent:"center",backgroundColor:"#F3E8FF",padding:14,borderRadius:12,marginTop:10},
locText:{color:PURPLE,fontWeight:"700",marginLeft:6},

btn:{backgroundColor:PURPLE,padding:16,borderRadius:30,alignItems:"center",marginTop:20}
});
