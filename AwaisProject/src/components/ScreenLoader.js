import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

export default function ScreenLoader() {
  return (
    <View style={Styles.continer}>
      <ActivityIndicator size="small" color="white"/>
    </View>
  )
}

const Styles = StyleSheet.create({
    continer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"rgba(0,0,0,0.5)"
    }
})