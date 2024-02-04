import AsyncStorage from '@react-native-async-storage/async-storage'

import { USER } from '../constants/constants'

export const saveCurrentUser = (value) => AsyncStorage.setItem(USER, JSON.stringify(value))

export const getCurrentUser = async () => {
  const userDetails = await AsyncStorage.getItem(USER)
  return JSON.parse(userDetails)
}

export const removeCurrentUser = () => AsyncStorage.removeItem(USER)

export const getErrorByCode = (code) => {
  if (code == "auth/email-already-exists")
    return "The email address you have entered is already registered. If this is your email, please sign in.";
  else if (code == "auth/email-already-in-use")
    return "The email address you have entered is already in use with another account. Please use a different email or sign in.";
  else if (code == "auth/invalid-email")
    return "The email address you entered is invalid. Please check for any typos and try again.";
  else if (code == "auth/wrong-password")
    return "The password you entered is incorrect. Please try again or reset your password if you've forgotten it.";
  else if (code == "auth/weak-password")
    return "Your password is too weak. Please create a stronger password with at least 6 characters.";
  else return "Something went wrong, please try again.";
};
