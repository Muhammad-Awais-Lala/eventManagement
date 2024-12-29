import { View, Text, StyleSheet, Platform, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { Button, TextInput } from 'react-native-paper'
import { Toastify,regex,URL } from '../../components/Global'
import axios from 'axios'

const initialState = {name:"", email: "", password: "" ,confirmPassword:""}

export default function Register({ navigation }) {

    const { dispatch } = useAuthContext()
    const [state, setState] = useState(initialState)
    const [isProcessing,setIsProcessing] = useState(false)

    const handleChange = (name, value) => {
        setState(s => ({ ...s, [name]: value }))
    }


    const handleRegister = () => {
        let { name ,email, password,confirmPassword } = state

        if(!name||!email||!password||!confirmPassword){
         return Toastify("Please Fill all inputs", "error")
         }

        name = name.trim()
        email = email.trim()
        password = password.trim()
        confirmPassword = confirmPassword.trim()

        if (name.length < 3) return Toastify("Please Enter a valid name", "error")
        if (password.length < 6) return Toastify("Password must longer then 6 digits", "error")
        if (confirmPassword !== password) return Toastify("Please enter same password", "error")
        if(!regex.test(email)){
            return Toastify("Invalid Email Address","error")
        }

    
        setIsProcessing(true);
        axios.post(`${URL}/auth/register`, { name, email, password })
            .then((res) => {
                // const result = res.json()
                const {data} = res;
                const { message,success } = data;
                if (success) {
                    Toastify(message,"success")
                    navigation.navigate("Login")
                }else{
                    Toastify(message,"error")
                }
                
            })
            .catch((err) => {
                if (err.response) { // Check if error has a response
                    const { data } = err.response; // Destructure response data
                    const { message } = data; 
                    // console.error("Error Message =>", message);
                    Toastify(message, "error");
                } else {
                    // console.error("Unexpected Error =>", err);
                    Toastify("An unexpected error occurred", "error");
                }
            })
            .finally(() => {
                setIsProcessing(false)
            }
            )

    }


    return (
        <View style={styles.flexContainer}>
            <Text style={styles.h1}>Register</Text>

            <TextInput style={styles.formControle}
                placeholder="Name"
                mode="outlined"
                label="Full Name"
                // right={<TextInput.Affix text="Active" />}
                theme={{
                    roundness: 20,
                }}
                onChangeText={val => handleChange("name", val)} 
            />
            <TextInput style={styles.formControle}
                placeholder="abc@gmail.com"
                mode="outlined"
                label="Enter your Email"
                // right={<TextInput.Affix text="Active" />}
                theme={{
                    roundness: 20,
                }}
                keyboardType='email-address'            //which type of keyboard shown for user
                onChangeText={val => handleChange("email", val)} // As we do in React using onchange={handleChange}
            />

            <TextInput style={styles.formControle}
                placeholder="Password"
                secureTextEntry     // Password invisible in the form od dots
                right={<TextInput.Icon icon="eye" />} //from paper icon
                theme={{
                    roundness: 20,
                }}
                onChangeText={val => handleChange("password", val)}
            />
            <TextInput style={styles.formControle}
                placeholder="Confirm Password"
                secureTextEntry     
                right={<TextInput.Icon icon="eye" />} 
                theme={{
                    roundness: 20,
                }}
                onChangeText={val => handleChange("confirmPassword", val)}
            />

            <View style={{ width: "100%" }}>
                <Button mode="contained" loading={isProcessing} disabled={isProcessing} onPress={handleRegister} >register</Button>
            </View>

            <View style={styles.container}>
                <Text style={styles.text}>Already have an account</Text>
                <TouchableHighlight
                    style={styles.btn}
                    underlayColor="magenta"
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    h1: {
        fontSize: 48,
        color: "#6200ee",
        marginBottom: 16,
        fontWeight: "bold",
        textAlign: "center",
        textShadowColor: "rgba(0, 0, 0, 0.2)",
        textShadowOffset: { width: 4, height: 2 },
        textShadowRadius: 4,
        letterSpacing: 1,


    },
    formControle: {
        marginBottom: 10,
        width: "100%",
        height: 40,
    },
    btn: {
        backgroundColor: '#6200ee',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        marginTop: 10,

        marginLeft: '90',
    },

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },
    text: {
        fontSize: 16,
        marginRight: 5,
        marginLeft:70
    },
    btn: {
        // backgroundColor: '#6200ee', // Button background color
        // // paddingVertical: 8,
        // paddingHorizontal: 16,
        // borderRadius: 5,
    },
    buttonText: {
        color: '#6200ee',
        fontSize: 16,
    }

})