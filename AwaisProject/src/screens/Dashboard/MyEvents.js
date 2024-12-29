
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Modal, Button } from 'react-native';
import { Card, Title, Paragraph, Text, IconButton, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { Toastify, URL } from '../../components/Global';
import { useAuthContext } from '../../contexts/AuthContext';

const MyEvents = () => {
    const { user } = useAuthContext();
    const [events, setEvents] = useState([]);
    const [filterEvents, setFilterEvents] = useState([]);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editableEvent, setEditableEvent] = useState({ title: '', location: '', description: '' });

    ////////////////////////////////////////////////Read///////////////////////////////////////////////////////////
    useEffect(() => {
        axios.get(`${URL}/read`)
            .then((res) => {
                const { data } = res;
                setEvents(data);
                setFilterEvents(data);
            })
            .catch((err) => {
                console.error("Error", err);
            });
    }, []);

    /////////////////////////////////////////////////Update///////////////////////////////////////////////////////
    const handleEdit = (event) => {
        setEditableEvent(event); // Set the event to be edited
        setEditModalVisible(true); // Open the modal
    };

    const handleSaveEdit = () => {
        // console.log("Editeable events======>",editableEvent)
        axios.post(`${URL}/update`, editableEvent)
        .then((res) =>{
            console.log("Response", res)
            Toastify(res,"success")                                                         
        })
        .catch((err) =>
           { Toastify(res,"success")                                                         
            console.log("Error", err)}
        )
    };

    //////////////////////////////////////////////Delete//////////////////////////////////////////////////////////
    const handleDelete = (event) => {
        axios.post(`${URL}/delete`, event)
            .then((res) => {
                const { data } = res;
                Toastify(data.message, "success");
                const updatedEvents = filterEvents.filter((evt) => evt._id !== event._id);
                setFilterEvents(updatedEvents);
            })
            .catch((err) => {
                console.error("Error deleting event", err);
            });
    };

    /////////////////////////////////////////////Search///////////////////////////////////////////////////////////
    const handlesearch = (search) => {
        const searchData = search.toLowerCase();
        const filteredDocuments = events.filter((doc) =>
            doc.title.toLowerCase().includes(searchData)
        );
        setFilterEvents(filteredDocuments);
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.h1}>Your Events</Text>
                <TextInput
                    style={styles.formControle}
                    placeholder="Search by Title"
                    mode="outlined"
                    label="Search"
                    theme={{
                        roundness: 20,
                    }}
                    onChangeText={(val) => handlesearch(val)}
                />
                {filterEvents
                    .filter((event) => event.uid === user._id)
                    .map((event) => (
                        <Card key={event._id} style={styles.card}>
                            <Card.Content>
                                <Title>{event.title}</Title>
                                <Text style={styles.location}>{event.location}</Text>
                                <Paragraph>{event.description}</Paragraph>
                                <View style={styles.buttonContainer}>
                                    <IconButton
                                        icon={() => <Icon name="edit" size={20} color="#6200ee" />}
                                        onPress={() => handleEdit(event)}
                                        style={styles.button}
                                    />
                                    <IconButton
                                        icon={() => <Icon name="delete" size={20} color="#d32f2f" />}
                                        onPress={() => handleDelete(event)}
                                        style={styles.button}
                                    />
                                </View>
                            </Card.Content>
                        </Card>
                    ))}
            </ScrollView>

            {/* Edit Modal */}
            <Modal
                visible={editModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setEditModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Event</Text>
                        <TextInput
                            mode="outlined"
                            label="Title"
                            value={editableEvent.title}
                            onChangeText={(text) =>
                                setEditableEvent({ ...editableEvent, title: text })
                            }
                            style={styles.input}
                        />
                        <TextInput
                            mode="outlined"
                            label="Location"
                            value={editableEvent.location}
                            onChangeText={(text) =>
                                setEditableEvent({ ...editableEvent, location: text })
                            }
                            style={styles.input}
                        />
                        <TextInput
                            mode="outlined"
                            label="Description"
                            value={editableEvent.description}
                            onChangeText={(text) =>
                                setEditableEvent({ ...editableEvent, description: text })
                            }
                            style={styles.input}
                            multiline
                        />
                        <Button title="Save" color='#6200ee' onPress={handleSaveEdit} />
                        <Button
                            title="Cancel"
                            color="red"
                            onPress={() => setEditModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    h1: {
        fontSize: 48,
        color: "#6200ee",
        marginBottom: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    card: {
        marginBottom: 10,
        backgroundColor: '#ffffff',
        elevation: 3,
    },
    location: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        padding: 0,
    },
    formControle: {
        marginBottom: 10,
        width: "100%",
        height: 40,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 10,
    },
});

export default MyEvents;
