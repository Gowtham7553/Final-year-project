import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "./screens/welcomescreen";
import SignUpScreen from "./screens/signup";
import HomeScreen from "./screens/homescreen";
import RegisterHomeScreen from "./screens/registerhomescreen";
import NotificationsScreen from "./screens/notificationscreen";
import RoleSelectScreen from "./screens/roleselect";
import LoginScreen from "./screens/loginscreen";
import HomeProfileScreen from "./screens/homeprofilescreen";
import DonorHubScreen from "./screens/donorhubscreen";
import DonationHistoryScreen from "./screens/donationhistoryscreen";
import DonateScreen from "./screens/donatescreen";
import DonationSuccessScreen from "./screens/donationsuccessscreen";
import VolunteerHubScreen from "./screens/volunteerhubscreen";
import TasksScreen from "./screens/taskscreen";
import TasksHistoryScreen from "./screens/taskshistoryscreen";
import Volunteerprofilescreen from "./screens/volunteerprofilescreen";
import Donationregistrationscreen from "./screens/donationregistrationscreen";
import ItemDonationScreen from "./screens/itemsdonation";
import Donorprofilescreen from "./screens/donorprofilescreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RegisterHome" component={RegisterHomeScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="HomeProfile" component={HomeProfileScreen} />
        <Stack.Screen name="DonorHub" component={DonorHubScreen} />
        <Stack.Screen
          name="DonationHistory"
          component={DonationHistoryScreen}
        />
        <Stack.Screen name="Donate" component={DonateScreen} />
        <Stack.Screen name="DonationSuccess" component={DonationSuccessScreen} />
        <Stack.Screen name="VolunteerHub" component={VolunteerHubScreen} />
        <Stack.Screen name="Tasks" component={TasksScreen} />
        <Stack.Screen name="TasksHistory" component={TasksHistoryScreen} />
        <Stack.Screen name="VolunteerProfile" component={Volunteerprofilescreen} />
        <Stack.Screen name="DonationRegistration" component={Donationregistrationscreen} />
        <Stack.Screen name="ItemDonation" component={ItemDonationScreen} />
        <Stack.Screen name="DonorProfile" component={Donorprofilescreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
