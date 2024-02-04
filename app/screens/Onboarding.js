import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, Platform } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";

// components
import Screen from "../components/Screen";


// config
import Colors from "../config/Colors";
import {getCurrentUser} from "../utils/helpers";
import LoadingModal from "../components/common/LoadingModal";

const onboardingData = [
  {
    image: require("../../assets/Images/o1.png"),
    title: "Get A Real Offer For Your Car",
    description: "Connect with genuine sellers for a smooth, trustworthy car purchase.",
  },
  {
    image: require("../../assets/Images/o2.png"),
    title: "List Your Car And Get It Sell",
    description: "List your car with all the information and we will make it available in market for the buyers.",
  },
  {
    image: require("../../assets/Images/o3.png"),
    title: "So What Are You Waiting For!",
    description: "Just click on get started to look for cars or sell yours.",
  },
];

function Onboarding(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicator, showIndicator] = useState(true);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const checkUserLogin = async () => {
    showIndicator(true);
    const user = await getCurrentUser();
    if (!user) {
      showIndicator(false);
      // props.navigation.navigate("Login");
      return;
    }
    showIndicator(false);
    props.navigation.navigate("HomeTab");
  };

  useEffect(() => {
    checkUserLogin()
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, []);

  const handleNext = () => {
    if (activeIndex < onboardingData.length - 1) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start(() => {
        setActiveIndex(activeIndex + 1);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: false,
        }).start();
      });
    } else {
      props.navigation.navigate("Login");
    }
  };

  const handleDotPress = (index) => {
    setActiveIndex(index);
  };

  const calculateImageHeight = () => {
    if (activeIndex === 1) {
      return Platform.OS == "android" ? RFPercentage(25.8) : RFPercentage(25.2);
    } else if (activeIndex === 2) {
      return RFPercentage(26);
    } else {
      return RFPercentage(24.6);
    }
  };
  const calculateImageWidth = () => {
    if (activeIndex === 1) {
      return "90%";
    } else if (activeIndex === 2) {
      return "75%";
    } else {
      return "75%";
    }
  };

  const renderDots = () => {
    return onboardingData.map((_, index) => (
      <TouchableOpacity
        onPress={() => handleDotPress(index)}
        key={index}
        activeOpacity={0.8}
        style={{
          marginHorizontal: RFPercentage(0.7),
          width: RFPercentage(1),
          height: RFPercentage(1),
          backgroundColor: index === activeIndex ? Colors.primary : Colors.grey,
          borderRadius: RFPercentage(20),
        }}
      />
    ));
  };

  const renderNextButtonText = () => {
    if (activeIndex === onboardingData.length - 1) {
      return "Get Started";
    } else {
      return "Next";
    }
  };

  const { image, title, description } = onboardingData[activeIndex];

  return (
    <Screen style={styles.screen}>
      <LoadingModal show={indicator}  />
      <Image style={{ width: RFPercentage(20), height: RFPercentage(8), marginTop: RFPercentage(3) }} source={require("../../assets/Images/logo.png")} />

      <Animated.View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        }}
      >
        <Image style={{ width: calculateImageWidth(), height: calculateImageHeight(), marginTop: RFPercentage(18) }} source={image} />

        <Text style={{ marginTop: RFPercentage(2), color: Colors.black, fontSize: RFPercentage(2.6), fontFamily: "Poppins_500Medium" }}>{title}</Text>
        <View style={{ width: "75%", justifyContent: "center", alignItems: "center", marginTop: RFPercentage(0.5) }}>
          <Text style={{ lineHeight: RFPercentage(2.7), textAlign: "center", color: Colors.grey, fontSize: RFPercentage(1.7), fontFamily: "Poppins_400Regular" }}>{description}</Text>
        </View>
      </Animated.View>

      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", position: "absolute", bottom: RFPercentage(14) }}>{renderDots()}</View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          position: "absolute",
          bottom: RFPercentage(5),
          width: RFPercentage(20),
          height: RFPercentage(6.2),
          borderRadius: RFPercentage(20),
          overflow: "hidden",
        }}
        onPress={handleNext}
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
          <Text style={{ color: Colors.white, fontSize: RFPercentage(2), fontFamily: "Poppins_600SemiBold" }}>{renderNextButtonText()}</Text>
        </LinearGradient>
      </TouchableOpacity>
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

export default Onboarding;
