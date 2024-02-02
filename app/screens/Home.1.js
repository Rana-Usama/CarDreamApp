import React from "react";
import { View, Text, ScrollView, TouchableOpacity, ImageBackground } from "react-native";
import Swiper from "react-native-swiper";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../config/Colors";
import { styles } from "./CarDetails";

export function Home(props) {
  const carImages = [
    require("../../assets/Images/cv1.jpg"),
    require("../../assets/Images/cv4.jpg"),
    require("../../assets/Images/cv3.jpg"),
    require("../../assets/Images/cv2.jpg"),
    require("../../assets/Images/cv6.jpg"),
  ];

  return (
    <View style={styles.screen}>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <Swiper style={styles.swiperContainer} showsButtons={false} autoplay={false} dotStyle={styles.dot} activeDotStyle={styles.activeDot}>
          {carImages.map((image, index) => (
            <View key={index} style={styles.slide}>
              <ImageBackground source={image} style={styles.image} resizeMode="cover">
                <View style={{ marginTop: RFPercentage(7), width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("Home")} style={styles.iconContainer}>
                    <Ionicons name="chevron-back" style={styles.icon} />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          ))}
        </Swiper>
        <View style={{ width: "90%", justifyContent: "center", alignItems: "flex-start", alignSelf: "center", marginTop: RFPercentage(1) }}>
          <Text style={{ fontSize: RFPercentage(2.8), fontFamily: "Poppins_500Medium", color: Colors.black }}>Honda Civic X</Text>
          <Text style={{ fontSize: RFPercentage(2.4), fontFamily: "Poppins_400Regular", color: Colors.primary }}>$5000</Text>
        </View>
      </ScrollView>
    </View>
  );
}
