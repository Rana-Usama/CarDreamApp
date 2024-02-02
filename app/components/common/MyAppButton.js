import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";

// Config
import Colors from "../../config/Colors";

function MyAppButton({ onPress, width = RFPercentage(20), marginTop = RFPercentage(5), title = "Login" }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        width: width,
        height: RFPercentage(6.2),
        borderRadius: RFPercentage(20),
        overflow: "hidden",
        marginTop: marginTop,
      }}
      onPress={onPress}
    >
      <LinearGradient
        colors={[Colors.primary, "#213EC3"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: Colors.white, fontSize: RFPercentage(2), fontFamily: "Poppins_600SemiBold" }}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default MyAppButton;
