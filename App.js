import React from "react";
import { View, ActivityIndicator, LogBox, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold, Poppins_900Black, useFonts } from "@expo-google-fonts/poppins";
import { RFPercentage } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import CustomTabBar from "./app/components/common/CustomTabBar";

// Screens
import Onboarding from "./app/screens/Onboarding";
import Login from "./app/screens/Login";
import ForgotPassword from "./app/screens/ForgotPassword";
import Signup from "./app/screens/Signup";
import Home from "./app/screens/Home";
import CarDetails from "./app/screens/CarDetails";
import AddCar from "./app/screens/AddCar";

//screens
import Colors from "./app/config/Colors";
import Profile from "./app/screens/Profile";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

LogBox.ignoreAllLogs();

export default function App() {
  // Font
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  if (!fontsLoaded)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={RFPercentage(6)} color={Colors.primary} />
      </View>
    );

  // Bottom Tab
  const HomeTab = () => (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <CustomTabBar {...props} navigation={props.navigation} />}
      screenOptions={{
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          header: () => null,
          tabBarIcon: ({ color }) => <AntDesign name="home" style={{ fontSize: RFPercentage(3.5) }} color={color} />,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          header: () => null,
          tabBarIcon: ({ color }) => <AntDesign name="user" color={color} style={{ fontSize: RFPercentage(3.5) }} />,
        }}
      />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Onboarding">
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="HomeTab" component={HomeTab} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="CarDetails" component={CarDetails} />
        <Stack.Screen name="AddCar" component={AddCar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Happy Coding :)
