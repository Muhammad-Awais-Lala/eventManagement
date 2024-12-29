import { View, Text, StyleSheet, Platform, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { Button, TextInput } from 'react-native-paper'
import { regex, storeData, Toastify, URL } from '../../components/Global'
import axios from 'axios'


const initialState = { email: "", password: "" }

export default function Login({ navigation }) {

    const { dispatch } = useAuthContext()
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)


    const handleChange = (name, value) => {
        setState(s => ({ ...s, [name]: value }))
    }


    const handleLogin = () => {
        let { email, password } = state

        if (!email || !password) {
            return Toastify("Please Fill all inputs", "error")
        }

        email = email.trim()
        password = password.trim()

        if (!regex.test(email)) {
            return Toastify("Invalid Email Address", "error")
        }

        console.log(email,password)
        setIsProcessing(true)
        axios.post(`${URL}/auth/login`, { email, password })
            .then((res) => {
                // const result = res.json()
                const { data } = res;
                const { message, success, jwtToken, user } = data;
                console.log(res)
                if (success) {
                    Toastify(message, "success")
                    dispatch({ action: "SET_LOGED_IN", payload: { user } })

                    storeData("jwtToken",jwtToken)
                    // localStorage.setItem("jwt", jwtToken)
                    // localStorage.setItem("userName", name)
                } else {
                    Toastify(message, "error")
                }

            })
            .catch((err) => {
                if (err.response) { // Check if error has a response
                    const { data } = err.response; // Destructure response data
                    const { message } = data;
                    // console.error("Error Message =>", message);
                    Toastify(message, "error");
                } else {
                    console.error("Unexpected Error =>", err);
                    Toastify("An unexpected error occurred", "error");
                }
            })
            .finally(() => {
                setIsProcessing(false)
            }
            )


        // dispatch({ type: "SET_LOGED_IN" })
    }


    return (
        <View style={styles.flexContainer}>
            <Text style={styles.h1}>Login</Text>
            {/* <Text>Operating Syste : {Platform.OS}</Text>
            <Text>Version : {Platform.Version}</Text>
            <Text>Pad : {Platform.isPad ? "true" : "false"}</Text> */}

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

            <View style={{ width: "100%" }}>
                <Button mode="contained"  loading={isProcessing} disabled={isProcessing} onPress={handleLogin} >Login</Button>
            </View>

            <View style={styles.container}>
                <Text style={styles.text}>Not a User </Text>
                <TouchableHighlight
                    style={styles.btn}
                    underlayColor="magenta"
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text style={styles.buttonText}>Register</Text>
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

        // marginLeft: '90',
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
        marginLeft: 70
    },
    btn: {
        // backgroundColor: '#6200ee', // Button background color
        // paddingVertical: 8,
        // paddingHorizontal: 16,
        // borderRadius: 5,
        borderBottomColor:"#6200ee"
    },
    buttonText: {
        color: '#6200ee',
        fontSize: 16,
    }

})