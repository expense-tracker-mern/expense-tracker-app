import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar,TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import Auth from './App/Components/AuthScreen/Auth';
import Dashboard from './App/Components/Dashboard/Dashboard';


function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Auth/>
    );
  }

  return (
    <Dashboard user = {user}/>
  );
}

export default App