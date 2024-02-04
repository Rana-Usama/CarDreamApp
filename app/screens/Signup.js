import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";

// components
import Screen from "../components/Screen";
import InputField from "../components/common/InputField";
import MyAppButton from "../components/common/MyAppButton";
import { signUp } from "../api/auth";

// config
import Colors from "../config/Colors";
import LoadingModal from "../components/common/LoadingModal";
import {getErrorByCode} from "../utils/helpers";

function Signup(props) {
  const [indicator, showIndicator] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const [inputField, SetInputField] = useState([
    {
      placeholder: "First Name",
      value: "",
    },
    {
      placeholder: "Last Name",
      value: "",
    },
    {
      placeholder: "Email",
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

  const handleSignup = async() => {
    try {
      showIndicator(true);
      
      let tempfeilds = [...inputField];
      const userDetails = { firstName: tempfeilds[0].value, lastName: tempfeilds[1].value === "", email: tempfeilds[2].value, password: tempfeilds[3].value } 
      
      if (userDetails.firstName === "" || userDetails.lastName === "" || userDetails.email === "" || userDetails.password === "") {
        alert("Please fill all the feilds to proceed");
        showIndicator(false);
        return;
      }

      await signUp(userDetails)
      setSuccessModalVisible(true);
      // props.navigation.navigate("HomeTab")
    } catch (error) {
      alert(getErrorByCode(error?.code));
    } finally {
      showIndicator(false);
    }

  };

  const closeModal = () => {
    setSuccessModalVisible(false);
    props.navigation.navigate("Login");
  };

  return (
    <Screen style={styles.screen}>
      <LoadingModal show={indicator} />
      <View style={{ marginTop: RFPercentage(1), width: "90%", justifyContent: "center", alignItems: "center", alignSelf: "center", flexDirection: "row" }}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("Login")} style={{ position: "absolute", left: 0 }}>
          <Ionicons name="chevron-back" style={{ fontSize: RFPercentage(3.2) }} color={Colors.black} />
        </TouchableOpacity>
        <Image style={{ width: RFPercentage(20), height: RFPercentage(8) }} source={require("../../assets/Images/logo.png")} />
      </View>

      <Text style={{ marginTop: RFPercentage(5), color: Colors.black, fontSize: RFPercentage(3), fontFamily: "Poppins_500Medium" }}>Create Your Account!</Text>

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

      {/* Signup Button */}
      <MyAppButton title="Signup" onPress={handleSignup} />

      {/* Social Media Login */}
      {/* <View
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
          or signup with
        </Text>
        <View
          style={{
            width: RFPercentage(6),
            height: RFPercentage(0.1),
            backgroundColor: Colors.lightGrey,
          }}
        />
      </View> */}

      {/* Social Media Icons */}
      {/* <View
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
              marginLeft: RFPercentage(3),
              height: RFPercentage(5),
            }}
            source={require("../../assets/Images/fbicon.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8}>
          <Image
            style={{
              marginLeft: RFPercentage(3),
              width: RFPercentage(5),
              height: RFPercentage(5),
            }}
            source={require("../../assets/Images/apple.png")}
          />
        </TouchableOpacity>
      </View> */}

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
          Already have an account?
        </Text>

        <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("Login")}>
          <Text
            style={{
              fontSize: RFPercentage(1.7),
              color: Colors.primary,
              marginLeft: RFPercentage(0.5),
              fontFamily: "Poppins_500Medium",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <Modal visible={successModalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image style={{ width: RFPercentage(9), height: RFPercentage(9) }} source={require("../../assets/Images/done.png")} />
            <Text style={styles.modalText}>Account created successfully!</Text>
            <MyAppButton title="OK" onPress={() => closeModal()} marginTop={RFPercentage(0)} width={RFPercentage(16)} />
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalContent: {
    backgroundColor: Colors.white,
    height: RFPercentage(32),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RFPercentage(3),
    width: "75%",
  },
  modalText: {
    fontSize: RFPercentage(2),
    color: Colors.black,
    fontFamily: "Poppins_500Medium",
    marginVertical: RFPercentage(3),
  },
  modalButton: {
    width: RFPercentage(10),
    height: RFPercentage(6),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFPercentage(2),
    marginTop: RFPercentage(3),
  },
});

export default Signup;
