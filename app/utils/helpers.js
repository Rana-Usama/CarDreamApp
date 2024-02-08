import AsyncStorage from "@react-native-async-storage/async-storage";

import { CARS } from "../constants/constants";

export const saveCurrentUser = (value) => AsyncStorage.setItem("USER", JSON.stringify(value));

export const getCurrentUser = async () => {
  const userDetails = await AsyncStorage.getItem("USER");
  return JSON.parse(userDetails);
};

export const removeCurrentUser = () => AsyncStorage.removeItem("USER");

export const saveLocalStCars = (value) => AsyncStorage.setItem(CARS, JSON.stringify(value));

export const getLocalStCars = async () => {
  const userDetails = await AsyncStorage.getItem(CARS);
  return JSON.parse(userDetails);
};

export const getErrorByCode = (code) => {
  console.log(code);
  if (code == "auth/email-already-exists") return "Email already registered.";
  else if (code == "auth/email-already-in-use") return "Email already in use.";
  else if (code == "auth/invalid-email") return "Incorrect Credentials";
  else if (code == "auth/wrong-password") return "Incorrect Password";
  else if (code == "auth/weak-password") return "Create a stronger password with at least 6 characters.";
  else if (code == "auth/invalid-login-credentials") return "Your Email/Password is incorrect";
  else if (code == "auth/too-many-requests") return "Too many tries, try again after some time.";
  else return "Something went wrong, please try again.";
};
