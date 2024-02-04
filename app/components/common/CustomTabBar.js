import React from "react";
import { Image, View, TouchableOpacity, Text } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import Colors from "../../config/Colors";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const CustomTabBar = ({ state, descriptors, navigation, props }) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          height: RFPercentage(9),
          backgroundColor: Colors.white,
          borderTopColor: "lightgrey",
          borderRightColor: "lightgrey",
          borderBottomColor: Colors.white,
          borderLeftColor: "lightgrey",
          borderWidth: 0.3,
          width: "100%",
        }}
      >
        <View style={{ position: "absolute", top: RFPercentage(-3), width: "100%", justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              overflow: "hidden",
              borderRadius: RFPercentage(30),
              backgroundColor: Colors.primary,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("AddCar")}
          >
            <LinearGradient
              colors={[Colors.primary, "#213EC3"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={{
                width: RFPercentage(6.4),
                justifyContent: "center",
                height: RFPercentage(6.4),
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ width: RFPercentage(6.4), height: RFPercentage(6.4), justifyContent: "center", alignItems: "center" }}
                onPress={() => navigation.navigate("AddCar")}
              >
                <Entypo name="plus" size={24} color="white" />
              </TouchableOpacity>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={{ marginTop: RFPercentage(0.5), color: Colors.grey, fontSize: RFPercentage(1.5), fontFamily: "Poppins_400Regular" }}>Sell Now</Text>
        </View>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const imageSource = isFocused ? require("../../../assets/Images/activeTab.png") : null;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <View
              key={index}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                width: "100%",
              }}
            >
              {/* Display the image and the existing icon */}
              <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={{ right: route.name == "Home" ? RFPercentage(3) : RFPercentage(-3), justifyContent: "center", alignItems: "center" }}>
                {imageSource && (
                  <Image
                    source={imageSource}
                    style={{
                      width: RFPercentage(6.5),
                      height: RFPercentage(3),
                      right: RFPercentage(-0.4),
                      position: "absolute",
                      top: RFPercentage(-3.2),
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                )}

                {options.tabBarIcon && <options.tabBarIcon color={isFocused ? Colors.primary : Colors.grey} size={RFPercentage(3)} />}
                <Text style={{ fontFamily: "Poppins_400Regular", fontSize: RFPercentage(1.5), color: isFocused ? Colors.primary : Colors.grey }}>{route.name}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </>
  );
};

export default CustomTabBar;
