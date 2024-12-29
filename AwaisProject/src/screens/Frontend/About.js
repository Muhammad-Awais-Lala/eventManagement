import { View, Text, StyleSheet, Image, Button } from 'react-native'
import React from 'react'

export default function About({navigation}) {
  return (
    <View style={styles.flexContainer}>
       <Image 
        style={styles.roundedImage} 
        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/todo-demo-practice.appspot.com/o/images%2Fvn3sa7uon1o-myimg.jpeg?alt=media&token=f948dfff-bbbb-4ce2-af3a-8565f0c23058' }} 
      />
      <Text style={[styles.textColor,styles.h1]}>Muhammad Awais</Text>
      <Text style={[styles.textColor,styles.h1]}>191373</Text>
      <Text style={styles.textColor}>React Native Developer</Text>

      <Text style={[styles.textColor,styles.p]}>I am a MERN stack web and mobile app developer, trained at SMIT Faisalabad. With a year of experience, I specialize in creating dynamic and impactful digital solutions</Text>
      {/* Navigate on other screen and also pass data/props from one screen to other screen */}
      <Button title='Contact' color='orange' onPress={()=>{navigation.navigate("Contact" , {number:"+92 3014795922",email:"awaislala909090@gmail.com"})}} />
    </View>
  )
}

const styles = StyleSheet.create({
  flexContainer:{
    justifyContent: "center",
    alignItems: "center",
    flex:1,
    backgroundColor: "#1d3557",
    paddingLeft: 20,
    paddingRight:20,
  },

  roundedImage: {
    width: 100,
    height: 100,
    borderRadius: 50, 
    marginBottom: 20, 
  },

  textColor:{
    color:"white",
  },

h1:{
  fontSize: 28,
  fontWeight: 'bold',
},

p:{
  marginTop: 20,
  marginBottom: 10,
}
})