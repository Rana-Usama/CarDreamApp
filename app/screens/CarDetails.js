import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, Image, StatusBar, Linking } from "react-native";
import Swiper from "react-native-swiper";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";

// components
import Screen from "../components/Screen";
import InputField from "../components/common/InputField";
import MyAppButton from "../components/common/MyAppButton";

// config
import Colors from "../config/Colors";
import {useRoute} from "@react-navigation/native";

function Home(props) {
  const [car, setCar] = useState({});

  const {params} = useRoute()

  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor(Colors.white);
    }
  }, []);
  const carImages = [
    require("../../assets/Images/cv1.jpg"),
    require("../../assets/Images/cv4.jpg"),
    require("../../assets/Images/cv3.jpg"),
    require("../../assets/Images/cv2.jpg"),
    require("../../assets/Images/cv6.jpg"),
  ];

  const [details, setDetails] = useState([
    {
      t1: "Registered in",
      t2: "Karbala",
    },
    {
      t1: "Engine Capacity",
      t2: "3000cc",
    },
    {
      t1: "Body Type",
      t2: "Sedan",
    },
    {
      t1: "Exterior Color",
      t2: "White",
    },
    {
      t1: "Assembly",
      t2: "Local",
    },
    {
      t1: "Ad ID",
      t2: "837483",
    },
  ]);

  const [selectedFeatures, setSlectedFeatures] = useState([])
   
  const features = [
    {
      t1: "Air Bag",
      s1: require("../../assets/Images/airbag.png"),
      t2: "Air Conditioner",
      s2: require("../../assets/Images/airconditioner.png"),
    },
    {
      t1: "Power Windows",
      s1: require("../../assets/Images/powerwindows.png"),
      t2: "Power Steering",
      s2: require("../../assets/Images/powersteering.png"),
    },
    {
      t1: "Power Locks ",
      s1: require("../../assets/Images/keylessentry.png"),
      t2: "Keyless Entry",
      s2: require("../../assets/Images/keylessentry.png"),
    },
    {
      t1: "Power Mirrors",
      s1: require("../../assets/Images/powermirrors.png"),
      t2: "Cruise Contro",
      s2: require("../../assets/Images/cruisecontrol.png"),
    },
    {
      t1: "ABS",
      s1: require("../../assets/Images/abs.png"),
      t2: "Navigation",
      s2: require("../../assets/Images/navigation.png"),
    },
    {
      t1: "AM/FM Radio",
      s1: require("../../assets/Images/amfmradio.png"),
      t2: "CD Player",
      s2: require("../../assets/Images/cdplayer.png"),
    },
    {
      t1: "Alloy Rims",
      s1: require("../../assets/Images/alloyrims.png"),
      t2: "Immobilizer Key",
      s2: require("../../assets/Images/immobilizerkey.png"),
    },
    {
      t1: "Cool Box",
      s1: require("../../assets/Images/coolbox.png"),
      t2: "DVD Player",
      s2: require("../../assets/Images/cdplayer.png"),
    },
  ];

  const updateCarDetails = (slectedCar) => {
    const copyDetails = [...details]
    copyDetails[0].t2 = slectedCar.state
    copyDetails[1].t2 = slectedCar.engineCapacity
    copyDetails[2].t2 = slectedCar.carType
    copyDetails[3].t2 = slectedCar.exteriorColor
    copyDetails[4].t2 = slectedCar.assembly
    copyDetails[5].t2 = slectedCar.docId
    
    const selectedFeatures = [...slectedCar.features]
    const filteredFeatures = [...features].map(feature => {
      if (selectedFeatures.includes(feature.t1) && selectedFeatures.includes(feature.t2)) {
         return { t1: feature.t1, s1: feature.s1, t2: feature.t2, s2: feature.s2 };
      } else if (selectedFeatures.includes(feature.t2)) {
         return { t2: feature.t2, s2: feature.s2 };
      }  else if (selectedFeatures.includes(feature.t1)) {
        return { t1: feature.t1, s1: feature.s1 };
      } else {
         return null;
      }
    }).filter(Boolean);

    setSlectedFeatures(filteredFeatures)
    setCar(slectedCar)
    setDetails(copyDetails)
  }

  useEffect(() => {
    params?.slectedCar && updateCarDetails(params?.slectedCar)
  }, [params])

  const handleCallPress = (phoneNumber) => {
    const phoneNumberToCall = `tel:${phoneNumber}`;
    Linking.openURL(phoneNumberToCall);
  };
  
  const handleWhatsAppPress = (phoneNumber) => {
    const whatsappNumber = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(whatsappNumber);
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <Swiper style={styles.swiperContainer} showsButtons={false} autoplay={false} dotStyle={styles.dot} activeDotStyle={styles.activeDot}>
          {car?.images?.length > 0 ? car?.images.map((image, index) => (
            <View key={index} style={styles.slide}>
              <ImageBackground source={{uri: image}} style={styles.image} resizeMode="cover">
                <View style={{ marginTop: RFPercentage(7), width: "95%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("Home")} style={styles.iconContainer}>
                    <Ionicons name="chevron-back" style={styles.icon} />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          )) : 
          <View style={styles.slide}>
            <Text>No Image Available</Text>
          </View>}
        </Swiper>
        <View style={{ width: "90%", justifyContent: "center", alignItems: "flex-start", alignSelf: "center", marginTop: RFPercentage(1) }}>
          <View style={{ width: "100%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
            <Text style={{ fontSize: RFPercentage(2.8), fontFamily: "Poppins_500Medium", color: Colors.black }}>{car?.carName}</Text>

            {/* Location */}
            <View style={{ position: "absolute", right: 0, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Image style={{ width: RFPercentage(2), height: RFPercentage(2) }} source={require("../../assets/Images/lg.png")} />
              <Text style={{ marginHorizontal: RFPercentage(0.5), color: Colors.grey, fontSize: RFPercentage(1.7), fontFamily: "Poppins_400Regular" }}>{car?.sellerAddress}</Text>
            </View>
          </View>
          <Text style={{ fontSize: RFPercentage(2.4), fontFamily: "Poppins_500Medium", color: Colors.primary, marginVertical: RFPercentage(0.2) }}>${car?.price}</Text>
          <View style={{ width: "100%", marginTop: RFPercentage(2.5), justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image style={{ width: RFPercentage(3), height: RFPercentage(3) }} source={require("../../assets/Images/cb.png")} />
              <Text style={{ marginVertical: RFPercentage(1), fontSize: RFPercentage(1.6), fontFamily: "Poppins_400Regular", color: Colors.darkGrey2 }}>{car?.modalNumber}</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image style={{ width: RFPercentage(3), height: RFPercentage(3) }} source={require("../../assets/Images/mb.png")} />
              <Text style={{ marginVertical: RFPercentage(1), fontSize: RFPercentage(1.6), fontFamily: "Poppins_400Regular", color: Colors.darkGrey2 }}>
                {car?.kmDriver} KM</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image style={{ width: RFPercentage(3), height: RFPercentage(3) }} source={require("../../assets/Images/pb.png")} />
              <Text style={{ marginVertical: RFPercentage(1), fontSize: RFPercentage(1.6), fontFamily: "Poppins_400Regular", color: Colors.darkGrey2 }}>{car?.engineType}</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image style={{ width: RFPercentage(3), height: RFPercentage(3) }} source={require("../../assets/Images/gb.png")} />
              <Text style={{ marginVertical: RFPercentage(1), fontSize: RFPercentage(1.6), fontFamily: "Poppins_400Regular", color: Colors.darkGrey2 }}>{car?.type}</Text>
            </View>
          </View>

          {/* Details list */}
          {details.map((item, i) => (
            <View key={i} style={{ width: "100%", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row", marginTop: !i == 0 ? RFPercentage(3) : RFPercentage(1.5) }}>
              <Text style={{ color: Colors.darkGrey2, fontSize: RFPercentage(1.7), fontFamily: "Poppins_400Regular" }}>{item.t1}</Text>
              <Text style={{ position: "absolute", right: 0, color: Colors.darkGrey2, fontSize: RFPercentage(1.7), fontFamily: "Poppins_400Regular" }}>{item.t2}</Text>
            </View>
          ))}

          {/* Contact Seller */}
          <View style={{ marginTop: RFPercentage(2.5), flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: Colors.black, fontSize: RFPercentage(2.2), fontFamily: "Poppins_500Medium" }}>Seller Details</Text>
          </View>
          <View style={{ width: "100%", marginTop: RFPercentage(1.5), flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
            <View style={{ width: "80%", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start" }}>
              <Image style={{ width: RFPercentage(2.2), height: RFPercentage(2.2) }} source={require("../../assets/Images/lg.png")} />
              <Text style={{ marginLeft: RFPercentage(1), color: Colors.darkGrey2, fontSize: RFPercentage(1.7), fontFamily: "Poppins_400Regular" }}>{car.sellerAddress}</Text>
            </View>
          </View>

          <View style={{ width: "80%", marginTop: RFPercentage(1.5), flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
            <TouchableOpacity onPress={() => handleCallPress(car.sellerContactNumber)} activeOpacity={0.8}>
              <Image style={{ width: RFPercentage(5), height: RFPercentage(5) }} source={require("../../assets/Images/call.png")} />
            </TouchableOpacity>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ marginLeft: RFPercentage(1), color: Colors.darkGrey2, fontSize: RFPercentage(1.8), fontFamily: "Poppins_400Regular" }}>Call with seller</Text>
            </View>
            <View style={{ position: "absolute", right: 0, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity onPress={() => handleWhatsAppPress(car.sellerContactNumber)} activeOpacity={0.8}>
                <Image style={{ width: RFPercentage(5), height: RFPercentage(5) }} source={require("../../assets/Images/whatsapp.png")} />
              </TouchableOpacity>
              <Text style={{ marginLeft: RFPercentage(1), color: Colors.darkGrey2, fontSize: RFPercentage(1.8), fontFamily: "Poppins_400Regular" }}>Whatsapp</Text>
            </View>
          </View>

          {/* Comments */}
          <View style={{ marginTop: RFPercentage(2.5), flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: Colors.black, fontSize: RFPercentage(2.2), fontFamily: "Poppins_500Medium" }}>Seller Comments</Text>
          </View>
          <View style={{ marginTop: RFPercentage(1), flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: Colors.darkGrey2, fontSize: RFPercentage(1.7), fontFamily: "Poppins_400Regular" }}>
              {car.comment}
            </Text>
          </View>

          {/* Features */}
          <View style={{ marginTop: RFPercentage(2.5), flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: Colors.black, fontSize: RFPercentage(2.2), fontFamily: "Poppins_500Medium" }}>Features</Text>
          </View>

          {selectedFeatures.map((item, i) => (
            <View key={i} style={{flex: 1, width: "100%", justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginTop: !i == 0 ? RFPercentage(3) : RFPercentage(1.5) }}>
              {item?.t1 ? <View style={{  flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                  <Image style={{ width: RFPercentage(3), height: RFPercentage(3) }} source={item.s1} />
                  <Text style={{ color: Colors.darkGrey2, fontSize: RFPercentage(1.7), fontFamily: "Poppins_400Regular", marginLeft: RFPercentage(1.5) }}>{item.t1}</Text>
               </View> : null}
              {item?.t2 ? <View style={{ width: '50%', flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                  <Image style={{ width: RFPercentage(3), height: RFPercentage(3) }} source={item.s2} />
                  <Text style={{ color: Colors.darkGrey2, fontSize: RFPercentage(1.7), fontFamily: "Poppins_400Regular", marginLeft: RFPercentage(1.5) }}>{item.t2}</Text>
               </View> : null}
            </View>
          ))}
        </View>
        <View style={{ marginBottom: RFPercentage(10) }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  swiperContainer: {
    height: RFPercentage(40),
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  iconContainer: {
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },
  icon: {
    fontSize: RFPercentage(3.2),
    color: Colors.white,
  },
  dot: {
    backgroundColor: Colors.black,
    width: RFPercentage(0.9),
    height: RFPercentage(0.9),
    borderRadius: RFPercentage(30),
    margin: 3,
  },
  activeDot: {
    backgroundColor: Colors.white,
    width: RFPercentage(1.2),
    height: RFPercentage(1.2),
    borderRadius: RFPercentage(30),
    margin: 3,
  },
});

export default Home;
