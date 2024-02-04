import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";

// components
import Screen from "../components/Screen";
import InputField from "../components/common/InputField";

// config
import Colors from "../config/Colors";
import MyAppButton from "../components/common/MyAppButton";
import {resetPassword} from "../api/auth";

function ForgotPassword(props) {
  const [inputField, SetInputField] = useState([
    {
      placeholder: "Enter your email",
      value: "",
    },
  ]);

  const handleChange = (text, i) => {
    let tempfeilds = [...inputField];
    tempfeilds[i].value = text;
    SetInputField(tempfeilds);
  };

  const handleResetPassword = async() => {
    try {
      await resetPassword(inputField[0].value)
      alert('Check your email to reset your password.')
    } catch (error) {
      alert(error?.message)
    }
  }

  return (
    <Screen style={styles.screen}>
      <View style={{ marginTop: RFPercentage(1), width: "90%", justifyContent: "center", alignItems: "center", alignSelf: "center", flexDirection: "row" }}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("Login")} style={{ position: "absolute", left: 0 }}>
          <Ionicons name="chevron-back" style={{ fontSize: RFPercentage(3.2) }} color={Colors.black} />
        </TouchableOpacity>
        <Image style={{ width: RFPercentage(20), height: RFPercentage(8) }} source={require("../../assets/Images/logo.png")} />
      </View>

      <Text style={{ marginTop: RFPercentage(5), color: Colors.black, fontSize: RFPercentage(2.8), fontFamily: "Poppins_500Medium" }}>Reset Your Password!</Text>

      {/* Input field */}
      <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
        {inputField.map((item, i) => (
          <View key={i} style={{ marginTop: i == 0 ? RFPercentage(5) : RFPercentage(2) }}>
            <InputField
              placeholder={item.placeholder}
              placeholderColor={Colors.grey}
              height={RFPercentage(6.2)}
              backgroundColor={Colors.white}
              borderWidth={RFPercentage(0.1)}
              borderColor={Colors.lightGrey}
              secure={item.secure}
              borderRadius={RFPercentage(1.6)}
              color={Colors.black}
              fontSize={RFPercentage(1.8)}
              fontFamily={"Poppins_400Regular"}
              handleFeild={(text) => handleChange(text, i)}
              value={item.value}
              width={"94%"}
            />
          </View>
        ))}
      </View>

      {/* Login Button */}
      <MyAppButton onPress={handleResetPassword} title="Send OTP" />
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

export default ForgotPassword;
