import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Avatar, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuthContext } from '../../contexts/AuthContext';

const DashboardScreen = ({ navigation }) => {
    const {user} = useAuthContext()
  return (
    <View style={styles.container}>
      
      <View style={styles.userContainer}>
        <Avatar.Image size={200} source={{ uri: 'https://placekitten.com/200/200' }} />
        <Text style={styles.userName}>{user.name}</Text>
      </View>

      {/* create event */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>Create Event</Title>
          <Paragraph>Create new Event with EventEase.</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button
            icon={() => <Icon name="plus" size={20} color="white" />}
            mode="contained"
            onPress={() => navigation.navigate("Create")}
          >
            Add
          </Button>
        </Card.Actions>
      </Card>

      {/* My Events */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>My Events</Title>
          <Paragraph>your Events on EventEase.</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button
            icon={() => <Icon name="list" size={20} color="white" />}
            mode="contained"
            onPress={() => navigation.navigate('MyEvents')}
          >
            Show
          </Button>
        </Card.Actions>
      </Card>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
  },
  userContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 20,
  },
});

export default DashboardScreen;
