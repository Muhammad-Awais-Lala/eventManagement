import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Toastify = ( message , type) => {
    Toast.show({
        type: type, // 'success', 'error', or 'info'
        text1: message,
        position: 'top', // 'top' or 'bottom'
        visibilityTime: 3000, 
        autoHide: true,
        topOffset: 50,
        bottomOffset: 50,
    });
};
 
export const URL = "https://server-sooty-chi.vercel.app";
export const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;



// Save data
export const storeData = async (key,value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error('Error saving data', e);
  }
};

// Get data
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
      console.log(value);
      return value
    
  } catch (e) {
    console.error('Error reading value', e);
    return false
  }
};


export const deleteData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Data with key "${key}" has been deleted`);
    return null
  } catch (e) {
    console.error('Error deleting data:', e);
  }
};
