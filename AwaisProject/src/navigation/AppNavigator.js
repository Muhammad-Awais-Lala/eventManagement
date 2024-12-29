import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'


import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/FontAwesome'


import Home from '../screens/Frontend/Home';
import About from '../screens/Frontend/About';
import Contact from '../screens/Frontend/Contact';
// import Footer from '../components/Footer';
// import logo from '../assets/images/logo.png'
import Gallery from '../screens/Frontend/Gallery'
import Login from '../screens/Auth/Login'
import Register from '../screens/Auth/Register'
import { useAuthContext } from '../contexts/AuthContext'
import { Button, Drawer } from 'react-native-paper'
import { getData } from '../components/Global'
import Dashboard from '../screens/Dashboard/Dashboard'
import Create from '../screens/Dashboard/Create'
import MyEvents from '../screens/Dashboard/MyEvents'


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();


// Tab Navigation
const MyTabs = () => {
    return (
        <Tab.Navigator screenOptions={{

            tabBarStyle: { backgroundColor: '#6200ee' }, // Changes tab bar background color
            tabBarLabelStyle: { color: 'black', fontSize: 12 }, 
            tabBarActiveTintColor: '#a1a1a1', // Changes active tab icon and label color
            tabBarInactiveTintColor: 'white', // Changes inactive tab icon and label color
            headerShown: false,
            tabBarShowLabel:false
        }}>
            <Tab.Screen name='Home' component={Home} options={{
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name="home" color={color} size={size} />
                )
            }} />
            {/* <Tab.Screen name='Gallery' component={Gallery} options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name='picture-o' color={color} size={size} />
                )
            }} /> */}
            <Tab.Screen name='Dashboard' component={Dashboard} options={{
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name='credit-card' color={color} size={size} />
                )
            }} />
            {/* <Tab.Screen name='Contact' component={Contact} initialParams={{ number: "123", email: "abc@gmail.com" }} options={{
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name='phone' color={color} size={size} />
                ),
                tabBarBadge: 5,
            }} /> */}
        </Tab.Navigator>
    )
}



///////////////////////////////////////////////////// Main Component ///////////////////////////////////////
export default function AppNavigator() {

    const {isAuth,handleLogout} = useAuthContext()
    const [jwtToken,setJwtToken] = useState("")

    useEffect(()=>{
       let token = getData("jwtToken")
       setJwtToken(token)
       console.log(jwtToken)
       
    },[])

    
    return (
        <NavigationContainer>
    
            {/* <Mydrawer/>   */}

            {/* Stack Navigation  */}
            <Stack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: "#6200ee"
                },
                headerTintColor: "white"
            }}>
                {
                    isAuth?<Stack.Group screenOptions={{headerShown:true}}>
                    <Stack.Screen name='Root' component={MyTabs} options={{
                            headerTitle: "EventEase",
                            // headerTitle:()=> <Image source={lalaLogo} style={{width:205,height:25}}></Image>,
                            headerRight:()=> <Button mode='outlined' buttonColor='white' onPress={handleLogout}>Logout</Button>
                        }} />
                    <Stack.Screen name='About' component={About} />
                    <Stack.Screen name='Contact' component={Contact} />
                    <Stack.Screen name='Create' component={Create} />
                    <Stack.Screen name='MyEvents' component={MyEvents} />
                    {/* <Footer/> */}
                </Stack.Group>

                :<Stack.Group screenOptions={{headerShown:false}}>
                    <Stack.Screen name='Login' component={Login} />
                    <Stack.Screen name='Register' component={Register} />
                </Stack.Group>
                }

            </Stack.Navigator>

        </NavigationContainer>
    )
} 