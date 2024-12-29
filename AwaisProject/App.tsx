import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import AppNavigator from './src/navigation/AppNavigator'

import { PaperProvider } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import AuthContextProvider from './src/contexts/AuthContext'


export default function App() {
  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor='#1d5968' />
      <AuthContextProvider>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </AuthContextProvider>
      
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  )
}