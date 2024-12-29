import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Footer() {
  return (
    <View style={styles.Footer}>
      <Text style={styles.text}>Footer</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    Footer:{
        backgroundColor:'orange',
        paddingVertical:10
    },
    text:{
        color:'white',
        textAlign:'center'
    }
})
