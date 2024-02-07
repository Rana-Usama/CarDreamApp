import React from "react";
import { Image, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import Colors from "../../config/Colors";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={{ width: "100%" }}>
      <View style={styles.tabBarContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

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

          const imageSource = isFocused ? require("../../../assets/Images/activeTab.png") : null;

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={index}
              onPress={onPress}
              style={[styles.tabButton, route.name === "Home" ? { marginRight: RFPercentage(3) } : {}, route.name === "Profile" ? { marginLeft: RFPercentage(3) } : {}]}
            >
              {imageSource && <Image source={imageSource} style={styles.activeTabImage} />}
              {options.tabBarIcon && <options.tabBarIcon color={isFocused ? Colors.primary : Colors.grey} size={RFPercentage(2.8)} />}
              <Text style={[styles.tabLabel, { color: isFocused ? Colors.primary : Colors.grey }]}>{route.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity activeOpacity={0.8} style={styles.floatingButton} onPress={() => navigation.navigate("AddCar")}>
        <LinearGradient colors={[Colors.primary, "#213EC3"]} style={styles.gradientStyle}>
          <Entypo name="plus" size={24} color="white" />
        </LinearGradient>
        <Text style={styles.sellNowLabel}>Sell Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    height: RFPercentage(9),
    backgroundColor: Colors.white,
    borderTopColor: "lightgrey",
    borderWidth: 0.3,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  activeTabImage: {
    position: "absolute",
    top: -RFPercentage(3.2),
    height: RFPercentage(3),
    width: "28%",
    left: RFPercentage(7.2),
  },
  tabLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: RFPercentage(1.5),
  },
  floatingButton: {
    position: "absolute",
    top: -RFPercentage(3),
    alignSelf: "center",
    zIndex: 10,
  },
  gradientStyle: {
    width: RFPercentage(6.4),
    height: RFPercentage(6.4),
    borderRadius: RFPercentage(30),
    justifyContent: "center",
    alignItems: "center",
  },
  sellNowLabel: {
    marginTop: RFPercentage(0.5),
    color: Colors.grey,
    fontSize: RFPercentage(1.5),
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
});

export default CustomTabBar;
