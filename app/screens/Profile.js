import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Ionicons } from '@expo/vector-icons'

// components
import Screen from '../components/Screen'

// config
import Colors from '../config/Colors'
import MyAppButton from '../components/common/MyAppButton'
import LoadingModal from '../components/common/LoadingModal'
import {  signOutUser } from '../api/auth'
import { getCurrentUser } from '../utils/helpers'

function Profile({ navigation }) {
  const [indicator, showIndicator] = useState(false)
  const [user, setUser] = useState({})

  const handleLogout = async () => {
    try {
      showIndicator(true)
      await signOutUser()
      navigation.navigate('Login')
      showIndicator(false)
    } catch (error) {
    } finally {
      showIndicator(false)
    }
  }

  const getUser = async () => {
    const currentUser = await getCurrentUser()
    setUser(currentUser)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <Screen style={styles.screen}>
      <LoadingModal show={indicator} />
      <View
        style={{
          marginTop: RFPercentage(1),
          width: '90%',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => props.navigation.navigate('Onboarding')}
          style={{ position: 'absolute', left: 0 }}
        >
          <Ionicons
            name='chevron-back'
            style={{ fontSize: RFPercentage(3.2) }}
            color={Colors.black}
          />
        </TouchableOpacity>
        <Image
          style={{ width: RFPercentage(20), height: RFPercentage(8) }}
          source={require('../../assets/Images/logo.png')}
        />
      </View>

      <Text
        style={{
          marginTop: RFPercentage(7),
          color: Colors.black,
          fontSize: RFPercentage(3.2),
          fontFamily: 'Poppins_500Medium',
        }}
      >
        Welcome {user.firstName} {user.firstName} {user.lastName}
      </Text>

      <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}></View>
      {/* Logout Button */}
      <MyAppButton title='Logout' onPress={handleLogout} />
    </Screen>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
})

export default Profile
