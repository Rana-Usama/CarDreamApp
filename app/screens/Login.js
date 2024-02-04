import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";

// components
import Screen from "../components/Screen";
import InputField from "../components/common/InputField";

// config
import Colors from "../config/Colors";
import MyAppButton from "../components/common/MyAppButton";
import LoadingModal from "../components/common/LoadingModal";
import {signIn} from "../api/auth";
import {getErrorByCode} from "../utils/helpers";

function Login(props) {
  const [indicator, showIndicator] = useState(false);

  const [inputField, SetInputField] = useState([
    {
      placeholder: "Username or Email",
      value: "",
    },
    {
      placeholder: "Password",
      value: "",
      secure: true,
    },
  ]);

  const handleChange = (text, i) => {
    let tempfeilds = [...inputField];
    tempfeilds[i].value = text;
    SetInputField(tempfeilds);
  };

  const handleLogin = async() => {
    showIndicator(true)
    let tempfeilds = [...inputField];

    if (tempfeilds[0].value === "" || tempfeilds[1].value === "") {
      alert("Please fill all the feilds to proceed");
      showIndicator(false)
      return true;
    }
    try {
      await signIn(tempfeilds[0].value , tempfeilds[1].value)
      props.navigation.navigate("HomeTab")
    } catch (error) {
      alert(getErrorByCode(error?.code));
    }

    showIndicator(false);
  };

  return (
    <Screen style={styles.screen}>
      <LoadingModal show={indicator}  />
      <View style={{ marginTop: RFPercentage(1), width: "90%", justifyContent: "center", alignItems: "center", alignSelf: "center", flexDirection: "row" }}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("Onboarding")} style={{ position: "absolute", left: 0 }}>
          <Ionicons name="chevron-back" style={{ fontSize: RFPercentage(3.2) }} color={Colors.black} />
        </TouchableOpacity>
        <Image style={{ width: RFPercentage(20), height: RFPercentage(8) }} source={require("../../assets/Images/logo.png")} />
      </View>

      <Text style={{ marginTop: RFPercentage(7), color: Colors.black, fontSize: RFPercentage(3.2), fontFamily: "Poppins_500Medium" }}>Welcome Back!</Text>

      {/* Input field */}
      <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
        {inputField.map((item, i) => (
          <View key={i} style={{ marginTop: i == 0 ? RFPercentage(7) : RFPercentage(2) }}>
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

      {/* Forget password */}
      <View
        style={{
          width: "88%",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: RFPercentage(1.5),
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={() => props.navigation.navigate("ForgotPassword")} activeOpacity={0.5} style={{ position: "absolute", right: 0 }}>
          <Text
            style={{
              color: "#322D31",
              fontSize: RFPercentage(1.7),
              fontFamily: "Poppins_400Regular",
            }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <MyAppButton onPress={handleLogin} />

      {/* Social Media Login */}
      <View
        style={{
          marginTop: RFPercentage(5),
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: RFPercentage(6),
            height: RFPercentage(0.1),
            backgroundColor: Colors.lightGrey,
          }}
        />
        <Text
          style={{
            color: Colors.darkGrey,
            marginHorizontal: RFPercentage(0.7),
            fontFamily: "Poppins_400Regular",
            fontSize: RFPercentage(1.7),
          }}
        >
          or login with
        </Text>
        <View
          style={{
            width: RFPercentage(6),
            height: RFPercentage(0.1),
            backgroundColor: Colors.lightGrey,
          }}
        />
      </View>

      {/* Social Media Icons */}
      <View
        style={{
          marginTop: RFPercentage(3),
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity activeOpacity={0.8}>
          <Image
            style={{
              width: RFPercentage(5),
              height: RFPercentage(5),
            }}
            source={require("../../assets/Images/goicon.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8}>
          <Image
            style={{
              width: RFPercentage(5),
              marginHorizontal: RFPercentage(3),
              height: RFPercentage(5),
            }}
            source={require("../../assets/Images/fbicon.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8}>
          <Image
            style={{
              width: RFPercentage(5),
              height: RFPercentage(5),
            }}
            source={require("../../assets/Images/apple.png")}
          />
        </TouchableOpacity>
      </View>

      <View
        activeOpacity={0.8}
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: RFPercentage(5),
        }}
      >
        <Text
          style={{
            fontSize: RFPercentage(1.7),
            color: Colors.darkGrey,
            fontFamily: "Poppins_400Regular",
          }}
        >
          Don't have an account?
        </Text>

        <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("Signup")}>
          <Text
            style={{
              fontSize: RFPercentage(1.7),
              color: Colors.primary,
              marginLeft: RFPercentage(0.5),
              fontFamily: "Poppins_500Medium",
            }}
          >
            Signup
          </Text>
        </TouchableOpacity>
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

export default Login;
