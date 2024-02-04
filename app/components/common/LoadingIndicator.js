import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

import Colors from '../../config/Colors'

const LoadingIndicator = ({ show }) =>
  show ? (
    <View
      style={{
        width: '100%',
        height: RFPercentage(10),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: RFPercentage(10),
          height: RFPercentage(10),
          borderRadius: 10,
          backgroundColor: Colors.purple,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size={RFPercentage(5)} color={Colors.primary} />
      </View>
    </View>
  ) : null

export default LoadingIndicator
