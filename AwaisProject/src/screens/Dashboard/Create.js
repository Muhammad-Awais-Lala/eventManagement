import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { getData, Toastify, URL } from '../../components/Global';
import axios from 'axios';
import { useAuthContext } from '../../contexts/AuthContext';

const initialState = { title: "", description: "", location: "", category: "" };

export default function Create({ navigation }) {

    const [state, setState] = useState(initialState);
    const [isProcessing, setIsProcessing] = useState(false);
    const {user} = useAuthContext()

    const handleChange = (name, value) => {
        setState(s => ({ ...s, [name]: value }));
    };

    const handleAddEvent = () => {
        let { title, description, location, category } = state;

        if (!title || !description || !location ) {
            return Toastify("Please fill all inputs", "error");
        }

        title = title.trim();
        description = description.trim();
        location = location.trim();
    

        if (title.length < 3) return Toastify("Title must be at least 3 characters", "error");
        if (description.length < 10) return Toastify("Description must be at least 10 characters", "error");
    
        const {_id} = user
        // const headers = { headers: { 'authorization': jwtToken} }
        const uid = _id

        console.log("user from AuthContext",user)
        let event = {
            uid,
            title,
            location,
            description,
        }


        // console.log("Header===>",headers)
        // axios.post(`${URL}/create`, event, headers)
        setIsProcessing(true)
        axios.post(`${URL}/create`, event)
            .then((res) =>{
                const {data} =res
                const {message} = data
                console.log("message==>",message)
                Toastify(message,"success" )
            })
            .catch((err) =>{
                if(err.response) { // Check if error has a response
                    const { data } = err.response; // Destructure response data
                    const { message } = data;
                    Toastify(message, "error");
                } else {
                    console.error("Unexpected Error =>", err);
                    Toastify("An unexpected error occurred", "error");
                }
            })
            .finally(()=>{
                setIsProcessing(false)
            })
    };

    return (
        <View style={styles.flexContainer}>
            <Text style={styles.h1}>Add Event</Text>

            <TextInput style={styles.formControle}
                placeholder="Event Title"
                mode="outlined"
                label="Title"
                theme={{ roundness: 20 }}
                onChangeText={val => handleChange("title", val)}
            />
            <TextInput style={styles.formControle}
                placeholder="Event Description"
                mode="outlined"
                label="Description"
                theme={{ roundness: 20 }}
                // multiline
                numberOfLines={4}
                onChangeText={val => handleChange("description", val)}
            />
            <TextInput style={styles.formControle}
                placeholder="Event Location"
                mode="outlined"
                label="Event Location"
                theme={{ roundness: 20 }}
                onChangeText={val => handleChange("location", val)}
            />
            {/* <TextInput style={styles.formControle}
                placeholder="Category"
                mode="outlined"
                label="Category"
                theme={{ roundness: 20 }}
                onChangeText={val => handleChange("category", val)}
            /> */}

            <View style={{ width: "100%" }}>
                <Button mode="contained" loading={isProcessing} disabled={isProcessing} onPress={handleAddEvent}>
                    Add Event
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    h1: {
        fontSize: 36,
        color: "#6200ee",
        marginBottom: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    formControle: {
        marginBottom: 10,
        width: "100%",
        height: 40,
    },
});
