import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ImageBackground, TextInput } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import ToastManager, { Toast } from "toastify-react-native";

// components
import Screen from "../components/Screen";
import InputField from "../components/common/InputField";
import { uploadImage } from "../api/helpers";
import LoadingModal from "../components/common/LoadingModal";
import { addCar } from "../api/cars";
import LoadingIndicator from "../components/common/LoadingIndicator";

// config
import Colors from "../config/Colors";

function AddCar({ navigation }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedCarTypes, setSelectedCarTypes] = useState([]);
  const [features, setFeatures] = useState(false);
  const [comment, setComment] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [indicator, showIndicator] = useState(false);
  const [imageLengthWarning, setImageLengthWarning] = useState("");

  const toggleFeatures = () => {
    setFeatures(!features);
  };

  useEffect(() => {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      (async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      })();
    }
  }, []);

  let pendingUploads = [];
  let [pending, setPending] = useState([]);

  const pickImages = async () => {
    try {
      if (selectedImages.length >= 6) {
        setImageLengthWarning("You can only select up to 6 images");
        return;
      }

      console.log("6-selectedImages.length,", 6 - selectedImages.length);
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
        multiple: true,
        allowsMultipleSelection: true,
        selectionLimit: 6 - selectedImages.length,
      });
      setImageLoading(true);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        pendingUploads.push(...result.assets);
        setPending([...pending, ...result.assets]);

        for (const asset of pendingUploads) {
          try {
            const imgURL = await uploadImage(asset.uri);
            setSelectedImages((prevImages) => [...prevImages, imgURL]);
            setPending(pending.splice(0, 1));
          } catch (error) {
            console.error("Error uploading image", error);
            Toast.error("Failed to upload one or more images.");
          }
        }

        pendingUploads = [];
        setPending([]);
      }

      selectedImages.length === 5 && setImageLengthWarning("You can only select up to 6 images");
    } catch (error) {
      console.error("Error picking images", error);
    } finally {
      setImageLoading(false);
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
    selectedImages.length !== 5 && setImageLengthWarning("");
  };

  // Car Details
  const [inputField, SetInputField] = useState([
    {
      placeholder: "Car Name",
      value: "",
    },
    {
      placeholder: "Price $ e.g 25000",
      value: "",
      keyboardType: "numeric",
    },
    {
      placeholder: "Seller Contact Number",
      value: "",
      keyboardType: "phone-pad",
    },
    {
      placeholder: "Seller Address",
      value: "",
    },
    {
      placeholder: "Engine Capacity(cc) e.g. 3000",
      value: "",
      keyboardType: "numeric",
    },
    {
      placeholder: "Exterior Color",
      value: "",
    },
    {
      placeholder: "Assembly",
      value: "",
    },
    {
      placeholder: "KM Driven e.g. 100000",
      value: "",
      keyboardType: "numeric",
    },
    {
      placeholder: "Engine e.g. Petrol",
      value: "",
    },
    {
      placeholder: "Type e.g. Auto",
      value: "",
    },
  ]);

  const handleChange = (text, i) => {
    let tempfeilds = [...inputField];
    tempfeilds[i].value = text;
    SetInputField(tempfeilds);
  };

  // Modal Dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1979 }, (_, index) => currentYear - index);
    const carItems = years.map((year) => ({ label: year.toString(), value: year.toString() }));
    setItems(carItems);
  }, []);

  // States Data
  const governorateStates = [
    "Basra",
    "Diyala",
    "Kirkuk",
    "Maysan",
    "Dhi Qar",
    "Duhok",
    "Najaf",
    "Karbala",
    "Babil",
    "Wasit",
    "Erbil",
    "Sulaymaniyah",
    "Baghdad",
    "Salahuddin",
    "Mosul (Nineveh)",
    "Al-Qadisiyyah",
    "Anbar",
    "Halabja",
    "Al-Muthanna",
  ];

  // Car Types
  const carTypes = ["Sedan", "Hatchback", "SUV", "Crossover", "Truck", "Convertible", "Van", "Coupe", "Electric"];

  // State
  const handleFilterPress = (state) => {
    const isStateSelected = selectedFilters.includes(state);

    if (isStateSelected) {
      return;
    }

    const updatedFilters = [state];
    setSelectedFilters(updatedFilters);
  };

  const handleCarTypeFilterPress = (type) => {
    const isCarTypeSelected = selectedCarTypes.includes(type);

    if (isCarTypeSelected) {
      return;
    }

    const updatedCarTypes = [type];
    setSelectedCarTypes(updatedCarTypes);
  };

  // Features
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const toggleFeatureSelection = (feature) => {
    const isSelected = selectedFeatures.includes(feature);

    if (isSelected) {
      const updatedFeatures = selectedFeatures.filter((item) => item !== feature);
      setSelectedFeatures(updatedFeatures);
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const featuresList = [
    { t1: "Air Bag", t2: "Air Conditioner" },
    { t1: "Power Windows", t2: "Power Steering" },
    { t1: "Power Locks", t2: "Keyless Entry" },
    { t1: "Power Mirrors", t2: "Cruise Control" },
    { t1: "ABS", t2: "Navigation" },
    { t1: "AM/FM Radio", t2: "CD Player" },
    { t1: "Alloy Rims", t2: "Immobilizer Key" },
    { t1: "Cool Box", t2: "DVD Player" },
  ];

  const allFeatures = featuresList.reduce((acc, curr) => [...acc, curr.t1, curr.t2], []);

  const checkMissingValues = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && key !== "comment") {
        if (Array.isArray(obj[key]) && obj[key].length === 0) {
          return true;
        } else if (!Array.isArray(obj[key]) && (obj[key] === undefined || obj[key] === "")) {
          return true;
        }
      }
    }
    return false;
  };

  const handleAddVehicle = async () => {
    try {
      showIndicator(true);
      const data = {
        images: selectedImages,
        carName: inputField[0].value,
        price: inputField[1].value,
        sellerContactNumber: inputField[2].value,
        sellerAddress: inputField[3].value,
        engineCapacity: inputField[4].value,
        exteriorColor: inputField[5].value,
        assembly: inputField[6].value,
        kmDriver: inputField[7].value,
        engineType: inputField[8].value,
        type: inputField[9].value,
        comment: comment,
        modalNumber: value,
        state: selectedFilters[0],
        carType: selectedCarTypes[0],
        features: selectedFeatures,
      };

      if (checkMissingValues(data)) {
        alert("Please fill all the fields");
        showIndicator(false);
        return;
      }

      const res = await addCar(data);
      console.log("resss", res);
      Toast.success("Vehicle Successfully Added.");
      navigation.navigate("Home", { images: selectedImages[0] });
    } catch (error) {
      alert(error?.message);
    } finally {
      showIndicator(false);
    }
  };

  return (
    <Screen style={styles.screen}>
      <ToastManager textStyle={{ fontSize: RFPercentage(2), maxWidth: "90%" }} />
      <LoadingModal show={indicator} />
      <ScrollView style={{ width: "100%" }} contentContainerStyle={{ width: "100%", alignItems: "center" }} stickyHeaderIndices={[0]}>
        {/* Nav */}
        <View
          style={{
            backgroundColor: Colors.white,
            marginTop: RFPercentage(2),
            width: "90%",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={{
              position: "absolute",
              left: 0,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Ionicons name="chevron-back" style={{ fontSize: RFPercentage(3) }} color={Colors.black} />
          </TouchableOpacity>
          <Text
            style={{
              alignSelf: "center",
              color: Colors.black,
              fontSize: RFPercentage(2.2),
              fontFamily: "Poppins_500Medium",
            }}
          >
            Sell Your Car
          </Text>

          <TouchableOpacity onPress={handleAddVehicle} activeOpacity={0.8} style={{ position: "absolute", right: 0 }}>
            <Text
              style={{
                color: Colors.primary,
                fontSize: RFPercentage(1.8),
                fontFamily: "Poppins_500Medium",
              }}
            >
              Done
            </Text>
          </TouchableOpacity>
        </View>

        {/* Image Upload */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={pickImages}
          disabled={!!imageLengthWarning}
          style={{
            marginTop: RFPercentage(2),
            backgroundColor: "rgba(242, 242, 242, 0.9)",
            width: "90%",
            height: RFPercentage(25),
            borderRadius: RFPercentage(2),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image style={{ width: RFPercentage(5.5), height: RFPercentage(5.5) }} source={require("../../assets/Images/addcar.png")} />
          <Text
            style={{
              fontSize: RFPercentage(1.7),
              marginTop: RFPercentage(0.6),
              color: Colors.primary,
              fontFamily: "Poppins_400Regular",
            }}
          >
            Add Photos
          </Text>
          <Text
            style={{
              fontSize: RFPercentage(1.7),
              marginTop: RFPercentage(0.6),
              color: Colors.secondary,
              fontFamily: "Poppins_400Regular",
            }}
          >
            {imageLengthWarning}
          </Text>
        </TouchableOpacity>

        {/* Picked Images */}
        <View
          style={{
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: RFPercentage(2),
            alignSelf: "center",
            flexDirection: "row",
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: RFPercentage(2), paddingRight: RFPercentage(2) }}>
            {selectedImages.map((imageUri, index) => (
              <>
                <ImageBackground
                  key={index}
                  style={{
                    marginLeft: RFPercentage(1),
                    width: RFPercentage(12),
                    height: RFPercentage(12),
                    borderRadius: RFPercentage(1),
                    overflow: "hidden",
                  }}
                  source={{ uri: imageUri }}
                >
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => removeImage(index)}
                    style={{
                      position: "absolute",
                      right: RFPercentage(0.1),
                      top: RFPercentage(0.1),
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <MaterialIcons name="cancel" style={{ fontSize: RFPercentage(3) }} color={"rgba(242, 242, 242, 0.8)"} />
                  </TouchableOpacity>
                </ImageBackground>
              </>
            ))}

            {imageLoading
              ? pending.map(() => (
                  <View
                    style={{
                      marginLeft: RFPercentage(1),
                      width: RFPercentage(12),
                      height: RFPercentage(12),
                      borderRadius: RFPercentage(1),
                      overflow: "hidden",
                    }}
                  >
                    <LoadingIndicator show={true} />
                  </View>
                ))
              : null}
          </ScrollView>
        </View>

        {/* Input details */}
        <View
          style={{
            width: "90%",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            alignSelf: "center",
            marginTop: RFPercentage(2),
          }}
        >
          <Text
            style={{
              color: Colors.darkGrey2,
              fontSize: RFPercentage(2),
              fontFamily: "Poppins_500Medium",
            }}
          >
            Input Car Details
          </Text>
          <Image style={{ width: RFPercentage(3), height: RFPercentage(3), marginLeft: RFPercentage(1) }} source={require("../../assets/Images/insert.png")} />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
          {inputField.map((item, i) => (
            <View key={i} style={{ marginTop: i == 0 ? RFPercentage(1) : RFPercentage(1) }}>
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
                keyboardType={item.keyboardType}
                fontSize={RFPercentage(1.8)}
                fontFamily={"Poppins_400Regular"}
                handleFeild={(text) => handleChange(text, i)}
                value={item.value}
                width={"94%"}
              />
            </View>
          ))}
        </View>

        {/* seller comments */}
        <View
          style={{
            marginTop: RFPercentage(2),
            width: "90%",
            height: RFPercentage(20),
            borderRadius: RFPercentage(1.6),
            borderColor: Colors.lightGrey,
            borderWidth: RFPercentage(0.1),
          }}
        >
          <View style={{ width: "100%", paddingLeft: RFPercentage(2), paddingTop: RFPercentage(1) }}>
            <TextInput style={{ fontSize: RFPercentage(1.8), fontFamily: "Poppins_400Regular" }} multiline={true} onChangeText={(value) => setComment(value)} placeholder="Comments" />
          </View>
        </View>

        {/* Modal */}
        <DropDownPicker
          style={{
            height: RFPercentage(6.2),
            marginTop: RFPercentage(2.5),
            backgroundColor: Colors.white,
            borderColor: Colors.lightGrey,
            width: "90%",
            alignSelf: "center",
            borderRadius: RFPercentage(1.6),
          }}
          dropDownContainerStyle={{
            marginTop: RFPercentage(2),
            width: "90%",
            alignSelf: "center",
            borderColor: Colors.lightGrey,
            borderWidth: RFPercentage(0.1),
          }}
          open={open}
          placeholderStyle={{ color: Colors.grey }}
          value={value}
          maxHeight={RFPercentage(20)}
          autoScroll={true}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder={"Modal"}
        />

        {/* Select State */}
        <View
          style={{
            width: "89%",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            alignSelf: "center",
            marginTop: RFPercentage(3),
          }}
        >
          <Text
            style={{
              color: Colors.grey,
              fontSize: RFPercentage(1.8),
              fontFamily: "Poppins_400Regular",
            }}
          >
            Select State: <Text style={{ color: Colors.black }}>{selectedFilters}</Text>
          </Text>
        </View>
        <View
          style={{
            marginTop: RFPercentage(1.6),
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: RFPercentage(1.6) }}>
            {governorateStates.map((state, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={index}
                onPress={() => handleFilterPress(state)}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: RFPercentage(1),
                  borderRadius: RFPercentage(1.3),
                  borderColor: selectedFilters.includes(state) ? Colors.primary : Colors.lightGrey,
                  borderWidth: RFPercentage(0.1),
                  marginLeft: RFPercentage(1),
                }}
              >
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: RFPercentage(1.7),
                    fontFamily: "Poppins_400Regular",
                  }}
                >
                  {state}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Car Type */}
        <View
          style={{
            width: "89%",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            alignSelf: "center",
            marginTop: RFPercentage(2.5),
          }}
        >
          <Text
            style={{
              color: Colors.grey,
              fontSize: RFPercentage(1.8),
              fontFamily: "Poppins_400Regular",
            }}
          >
            Select Car Type: <Text style={{ color: Colors.black }}>{selectedCarTypes}</Text>
          </Text>
        </View>
        <View
          style={{
            marginTop: RFPercentage(1.6),
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: RFPercentage(1.6) }}>
            {carTypes.map((type, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={index}
                onPress={() => handleCarTypeFilterPress(type)}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: RFPercentage(1),
                  borderRadius: RFPercentage(1.3),
                  borderColor: selectedCarTypes.includes(type) ? Colors.primary : Colors.lightGrey,
                  borderWidth: RFPercentage(0.1),
                  marginLeft: RFPercentage(1),
                }}
              >
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: RFPercentage(1.7),
                    fontFamily: "Poppins_400Regular",
                  }}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Features */}
        <View
          style={{
            width: "90%",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            alignSelf: "center",
            marginTop: RFPercentage(3),
          }}
        >
          <TouchableOpacity onPress={() => toggleFeatures()} activeOpacity={0.8} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            {features ? (
              <Image style={{ width: RFPercentage(2.8), height: RFPercentage(2.8) }} source={require("../../assets/Images/minus.png")} />
            ) : (
              <Image style={{ width: RFPercentage(2.8), height: RFPercentage(2.8) }} source={require("../../assets/Images/addf.png")} />
            )}
            <Text
              style={{
                color: Colors.darkGrey2,
                fontSize: RFPercentage(2),
                fontFamily: "Poppins_500Medium",
                marginLeft: RFPercentage(1),
              }}
            >
              Features
            </Text>
          </TouchableOpacity>
        </View>
        {features ? (
          <View style={{ width: "90%", marginTop: RFPercentage(2) }}>
            <Text
              style={{
                color: Colors.darkGrey2,
                fontSize: RFPercentage(1.8),
                fontFamily: "Poppins_500Medium",
              }}
            >
              Select Features:
            </Text>
            {allFeatures.map((feature, index) => (
              <TouchableOpacity activeOpacity={0.8} key={index} onPress={() => toggleFeatureSelection(feature)} style={{ flexDirection: "row", alignItems: "center", marginTop: RFPercentage(1) }}>
                <View
                  style={{
                    width: RFPercentage(3),
                    height: RFPercentage(3),
                    borderRadius: RFPercentage(1.6),
                    borderWidth: RFPercentage(0.2),
                    borderColor: Colors.lightGrey,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {selectedFeatures.includes(feature) && (
                    <View
                      style={{
                        width: RFPercentage(2),
                        height: RFPercentage(2),
                        borderRadius: RFPercentage(1),
                        backgroundColor: Colors.primary,
                      }}
                    />
                  )}
                </View>
                <Text
                  style={{
                    marginLeft: RFPercentage(1),
                    color: Colors.black,
                    fontSize: RFPercentage(1.8),
                    fontFamily: "Poppins_400Regular",
                  }}
                >
                  {feature}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
        <View style={{ marginBottom: RFPercentage(5) }} />
      </ScrollView>
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

export default AddCar;
