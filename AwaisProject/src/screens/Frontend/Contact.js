import { View, Text, Image, StyleSheet, Button, TouchableOpacity, TouchableHighlight } from 'react-native'
import React from 'react'

// Get Data props with navigation from other screen
export default function Contact({ navigation, route }) {

  const { number, email } = route.params
  console.log(number, email)

  return (
    <View style={styles.flexConter}>

      <Text>Mobile No: {number}</Text>
      <Text>Email: {email}</Text>
      {/* <Button title='Press Me!' color='orange' onPress={() => alert("Button Presed")} /> */}

      <TouchableOpacity style={styles.button}
        activeOpacity={0.5}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>

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


  button: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
})