import { View, Text, Image, StyleSheet, } from 'react-native'
import React from 'react'


export default function Gallery() {
  return (
    <View style={styles.flexConter}>
    </View>
  )
}

const styles = StyleSheet.create({
  flexConter: {
    // alignContent:"center",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },

  image: {
    width: 200,
    height: 200
  },


})