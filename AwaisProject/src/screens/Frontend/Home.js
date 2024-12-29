import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Text, TextInput } from 'react-native-paper';
import { URL } from '../../components/Global';


const Home = () => {

  const [events,setEvents] = useState([])
  const [filterEvents,setFilterEvents] = useState([])
  
  useEffect(() => {
    // setIsLoading(true)
    axios.get(`${URL}/read`)
      .then((res) => {
        const { data } = res //destructure response 
        setEvents(data)
        setFilterEvents(data)
        console.log("data =>", data)
      })
      .catch((err) => {
        console.error("Error", err)
      })
      .finally(() => {
        // setIsLoading(false)
      })
  }, [])

//////////////////////////////////////////////////// Search ////////////////////////////////////////////////////
const handlesearch = search => {
  // console.log(search)
  let searchData = search //data to search
  let filteredDocuments = filterEvents.filter(doc => doc.title.toLowerCase().includes(searchData.toLowerCase()))
  setFilterEvents(filteredDocuments)
}
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.h1}>Our Events</Text>
      
                <TextInput style={styles.formControle}
                placeholder="Serch by Title"
                mode="outlined"
                label="Serch"
                theme={{
                    roundness: 20,
                }}
                onChangeText={val =>handlesearch(val)} 
            />
        {events.map((event,i) => (
          <Card key={i} style={styles.card}>
            <Card.Content>
              <Title>{event.title}</Title>
              <Text style={styles.location}>{event.location}</Text>
              <Paragraph>{event.description}</Paragraph>
              {/* <Text style={styles.date}>Date: {event.date}</Text> */}
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
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
        textShadowColor: "rgba(0, 0, 0, 0.2)",
        textShadowOffset: { width: 4, height: 2 },
        textShadowRadius: 4,
        letterSpacing: 1,


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
  date: {
    fontSize: 12,
    color: '#424242',
    marginTop: 5,
  },
  formControle: {
    marginBottom: 10,
    width: "100%",
    height: 40,
},
});

export default Home;
