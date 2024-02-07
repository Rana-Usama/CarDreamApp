import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { signOutUser } from "../api/auth";
import { getCurrentUser } from "../utils/helpers";

// components
import Screen from "../components/Screen";
import MyAppButton from "../components/common/MyAppButton";
import LoadingModal from "../components/common/LoadingModal";

// config
import Colors from "../config/Colors";

function Profile({ navigation }) {
  const [indicator, showIndicator] = useState(false);
  const [user, setUser] = useState({});

  const handleLogout = async () => {
    try {
      showIndicator(true);
      await signOutUser();
      navigation.navigate("Login");
      showIndicator(false);
    } catch (error) {
    } finally {
      showIndicator(false);
    }
  };

  const getUser = async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Screen style={styles.screen}>
      <LoadingModal show={indicator} />
      <View
        style={{
          marginTop: RFPercentage(1),
          width: "90%",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("Onboarding")} style={{ position: "absolute", left: 0 }}>
          <Ionicons name="chevron-back" style={{ fontSize: RFPercentage(3.2) }} color={Colors.black} />
        </TouchableOpacity>
        <Image style={{ width: RFPercentage(16), height: RFPercentage(6) }} source={require("../../assets/Images/logo.png")} />
      </View>

      <Text style={{ color: Colors.black, marginTop: RFPercentage(4), fontFamily: "Poppins_500Medium", fontSize: RFPercentage(2.4) }}>Profile</Text>

      <View style={{ width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
        <Text
          style={{
            marginTop: RFPercentage(5),
            color: Colors.black,
            fontSize: RFPercentage(1.8),
            fontFamily: "Poppins_500Medium",
          }}
        >
          <Text style={{ color: Colors.grey, fontSize: RFPercentage(1.9), fontFamily: "Poppins_400Regular" }}>Email:</Text> {user.email}
        </Text>
      </View>
      <View
        style={{
          marginTop: RFPercentage(1),
          width: "90%",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          backgroundColor: Colors.newInputFieldBorder,
          height: RFPercentage(0.1),
        }}
      />

      <View style={{ width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
        <Text
          style={{
            marginTop: RFPercentage(4),
            color: Colors.black,
            fontSize: RFPercentage(1.8),
            fontFamily: "Poppins_500Medium",
          }}
        >
          <Text style={{ color: Colors.grey, fontSize: RFPercentage(1.9), fontFamily: "Poppins_400Regular" }}>Username:</Text> {user.firstName} {user.lastName}
        </Text>
      </View>
      <View
        style={{
          marginTop: RFPercentage(1),
          width: "90%",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          backgroundColor: Colors.newInputFieldBorder,
          height: RFPercentage(0.1),
        }}
      />

      {/* Logout Button */}
      <View style={{ position: "absolute", bottom: RFPercentage(8) }}>
        <MyAppButton title="Logout" onPress={handleLogout} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
});

export default Profile;
