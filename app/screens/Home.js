import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ImageBackground, FlatList } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { fetchAllCars } from "../api/cars";
import { useRoute } from "@react-navigation/native";

// components
import Screen from "../components/Screen";
import InputField from "../components/common/InputField";
import LoadingIndicator from "../components/common/LoadingIndicator";

// config
import Colors from "../config/Colors";

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

const carTypes = ["Sedan", "Hatchback", "SUV", "Crossover", "Truck", "Convertible", "Van", "Coupe", "Electric"];

function Home(props) {
  const [inputField, SetInputField] = useState([
    {
      placeholder: "Search",
      value: "",
    },
  ]);

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedCarTypes, setSelectedCarTypes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [indicator, showIndicator] = useState(false);
  const [allCars, setAllCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  console.log("selectedCarTypes", selectedFilters, selectedCarTypes, allCars);

  const { params } = useRoute();

  useEffect(() => {
    getAllCars();
  }, [params]);

  useEffect(() => {
    const filteredCars = allCars.filter((car) => {
      const stateCondition = selectedFilters.length === 0 || selectedFilters.includes(car.state);
      const carTypeCondition = selectedCarTypes.length === 0 || selectedCarTypes.includes(car.carType);

      return stateCondition && carTypeCondition;
    });

    setFilteredCars(filteredCars);
  }, [selectedFilters, selectedCarTypes]);

  useEffect(() => {
    const filteredCars = allCars.filter((car) => car.carName.toLowerCase().includes(searchText?.toLowerCase()));
    setFilteredCars(filteredCars);
  }, [searchText]);

  const getAllCars = async () => {
    try {
      showIndicator(true);
      const cars = await fetchAllCars();
      setAllCars(cars);
      setFilteredCars(cars);
    } catch (error) {
    } finally {
      showIndicator(false);
    }
  };

  const handleChange = (text, i) => {
    setSearchText(text);
  };

  const handleFilterPress = (state) => {
    if (selectedFilters.includes(state)) {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== state));
    } else {
      setSelectedFilters([...selectedFilters, state]);
    }
  };
  const handleCarTypeFilterPress = (type) => {
    if (selectedCarTypes.includes(type)) {
      setSelectedCarTypes(selectedCarTypes.filter((carType) => carType !== type));
    } else {
      setSelectedCarTypes([...selectedCarTypes, type]);
    }
  };

  const handleClearFilters = () => {
    setSelectedFilters([]);
  };

  const [filter, setFilter] = useState(false);

  const toggleFilter = () => {
    setFilter(!filter);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "..";
    }
    return text;
  };

  return (
    <Screen style={styles.screen}>
      <ScrollView style={{ width: "100%" }} contentContainerStyle={{ width: "100%", alignItems: "center" }}>
        <View
          style={{
            marginTop: RFPercentage(2),
            width: "90%",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            flexDirection: "row",
          }}
        >
          <Image
            style={{
              position: "absolute",
              left: 0,
              width: RFPercentage(12),
              height: RFPercentage(4.6),
            }}
            source={require("../../assets/Images/logo.png")}
          />

          <Text
            style={{
              color: Colors.black,
              fontSize: RFPercentage(2.5),
              fontFamily: "Poppins_500Medium",
            }}
          >
            Welcome!
          </Text>
          <TouchableOpacity
            onPress={() => toggleFilter()}
            activeOpacity={0.5}
            style={{
              position: "absolute",
              right: 0,
              width: RFPercentage(4.5),
              height: RFPercentage(4.5),
              justifyContent: "center",
              alignItems: "center",
              shadowColor: Colors.primary,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 2,
              elevation: 3,
              backgroundColor: Colors.white,
              borderRadius: RFPercentage(1),
            }}
          >
            <Image style={{ width: RFPercentage(2.5), height: RFPercentage(2.5) }} source={require("../../assets/Images/filt.png")} />
          </TouchableOpacity>
        </View>

        {/* State Filter */}
        {filter ? (
          <View
            style={{
              marginTop: RFPercentage(3.2),
              width: "90%",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: Colors.black,
                fontSize: RFPercentage(2),
                fontFamily: "Poppins_500Medium",
              }}
            >
              States
            </Text>
            {selectedFilters.length > 0 && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleClearFilters}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  position: "absolute",
                  right: 0,
                }}
              >
                <Text style={{ color: Colors.darkGrey, fontSize: RFPercentage(1.8) }}>Clear</Text>
                <Image
                  style={{
                    marginLeft: RFPercentage(0.5),
                    width: RFPercentage(1.7),
                    height: RFPercentage(1.7),
                  }}
                  source={require("../../assets/Images/clear.png")}
                />
              </TouchableOpacity>
            )}
          </View>
        ) : null}

        {filter ? (
          <View
            style={{
              marginTop: RFPercentage(1.5),
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: RFPercentage(1.3) }}>
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
                    backgroundColor: selectedFilters.includes(state) ? Colors.primary : null,
                    borderColor: selectedFilters.includes(state) ? Colors.primary : Colors.lightGrey,
                    borderWidth: RFPercentage(0.1),
                    marginLeft: RFPercentage(1),
                  }}
                >
                  <Text
                    style={{
                      color: selectedFilters.includes(state) ? Colors.white : Colors.black,
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
        ) : null}

        {/*Type Filter*/}
        {filter ? (
          <View
            style={{
              marginTop: RFPercentage(3.2),
              width: "90%",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: Colors.black,
                fontSize: RFPercentage(2),
                fontFamily: "Poppins_500Medium",
              }}
            >
              Car Types
            </Text>
            {selectedCarTypes.length > 0 && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedCarTypes([])}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  position: "absolute",
                  right: 0,
                }}
              >
                <Text style={{ color: Colors.darkGrey, fontSize: RFPercentage(1.8) }}>Clear</Text>
                <Image
                  style={{
                    marginLeft: RFPercentage(0.5),
                    width: RFPercentage(1.7),
                    height: RFPercentage(1.7),
                  }}
                  source={require("../../assets/Images/clear.png")}
                />
              </TouchableOpacity>
            )}
          </View>
        ) : null}

        {filter ? (
          <View
            style={{
              marginTop: RFPercentage(1.5),
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: RFPercentage(1.3) }}>
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
                    backgroundColor: selectedCarTypes.includes(type) ? Colors.primary : null,
                    borderColor: selectedCarTypes.includes(type) ? Colors.primary : Colors.lightGrey,
                    borderWidth: RFPercentage(0.1),
                    marginLeft: RFPercentage(1),
                  }}
                >
                  <Text
                    style={{
                      color: selectedCarTypes.includes(type) ? Colors.white : Colors.black,
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
        ) : null}

        {/* Input field */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginTop: RFPercentage(3),
          }}
        >
          {inputField.map((item, i) => (
            <View key={i}>
              <InputField
                placeholder={item.placeholder}
                placeholderColor={Colors.grey}
                height={RFPercentage(5.6)}
                backgroundColor={Colors.white}
                borderWidth={RFPercentage(0.1)}
                borderColor={Colors.lightGrey}
                secure={item.secure}
                borderRadius={RFPercentage(1.6)}
                color={Colors.black}
                leftIconName="search"
                fontSize={RFPercentage(1.8)}
                fontFamily={"Poppins_400Regular"}
                handleFeild={(text) => handleChange(text, i)}
                value={searchText}
                width={"97%"}
              />
            </View>
          ))}
        </View>

        <View
          style={{
            marginTop: RFPercentage(2),
            width: "90%",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: Colors.black,
              fontSize: RFPercentage(2.2),
              fontFamily: "Poppins_400Regular",
            }}
          >
            {" "}
            Let's find your favourite {"\n"} car here
          </Text>
        </View>

        {/* Listing of cars */}
        <View
          style={{
            flexWrap: "wrap",
            width: "90%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: RFPercentage(2),
          }}
        >
          <FlatList
            data={filteredCars}
            keyExtractor={(_, index) => index.toString()}
            numColumns={2}
            columnWrapperStyle={{ gap: 15 }}
            contentContainerStyle={{ paddingBottom: RFPercentage(2) }}
            ListEmptyComponent={
              indicator ? (
                <LoadingIndicator show={true} />
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: RFPercentage(2),
                  }}
                >
                  <Text style={{ fontSize: RFPercentage(2.2), color: Colors.primary }}>No Result Found!</Text>
                </View>
              )
            }
            renderItem={({ item: car, index }) => (
              <TouchableOpacity
                onPress={() => props.navigation.navigate("CarDetails", { slectedCar: car })}
                key={index}
                activeOpacity={0.8}
                style={{
                  backgroundColor: "#ffff",
                  shadowColor: Colors.primary,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 2,
                  elevation: 3,
                  width: "48%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  height: RFPercentage(33.5),
                  borderRadius: RFPercentage(1.5),
                  marginTop: !index == 0 || !index == 1 ? RFPercentage(2) : null,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    overflow: "hidden",
                    borderTopRightRadius: RFPercentage(1.5),
                    borderTopLeftRadius: RFPercentage(1.5),
                  }}
                >
                  <ImageBackground style={{ width: "100%", height: RFPercentage(20) }} source={{ uri: car.images[0] }}></ImageBackground>
                </View>
                <View
                  style={{
                    marginTop: RFPercentage(0.8),
                    width: "90%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: RFPercentage(1.8),
                      fontFamily: "Poppins_500Medium",
                    }}
                  >
                    {car.carName}
                  </Text>
                  <Text
                    style={{
                      marginVertical: RFPercentage(0.5),
                      color: Colors.primary,
                      fontSize: RFPercentage(2),
                      fontFamily: "Poppins_500Medium",
                    }}
                  >{`$${car.price}`}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image style={{ width: RFPercentage(2), height: RFPercentage(2) }} source={require("../../assets/Images/petrol.png")} />
                      <Text
                        style={{
                          marginLeft: RFPercentage(0.6),
                          color: Colors.grey,
                          fontSize: RFPercentage(1.6),
                          fontFamily: "Poppins_400Regular",
                        }}
                      >
                        {car.engineType}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "55%",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <Image style={{ width: RFPercentage(2), height: RFPercentage(2) }} source={require("../../assets/Images/km.png")} />
                      <Text
                        style={{
                          marginLeft: RFPercentage(0.6),
                          color: Colors.grey,
                          fontSize: RFPercentage(1.6),
                          fontFamily: "Poppins_400Regular",
                        }}
                      >
                        {truncateText(car.kmDriver, 6)} KM
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: RFPercentage(0.6),
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image style={{ width: RFPercentage(2), height: RFPercentage(2) }} source={require("../../assets/Images/type.png")} />
                      <Text
                        style={{
                          marginLeft: RFPercentage(0.6),
                          color: Colors.grey,
                          fontSize: RFPercentage(1.6),
                          fontFamily: "Poppins_400Regular",
                        }}
                      >
                        {car.type}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Listing */}
        <View
          style={{
            marginTop: RFPercentage(3),
            width: "90%",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        ></View>
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

export default Home;
