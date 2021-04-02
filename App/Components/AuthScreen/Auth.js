import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar,TextInput, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native';
import auth from '@react-native-firebase/auth';

function Auth() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signup = () => {
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            console.log('User account created & signed in!');
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }
    
            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }
    
            console.error(error);
        });
    }

    const login = () => {
        auth()
         .signInWithEmailAndPassword(email, password)
         .then(res => {
             console.log(res.user.email);
          })
         .catch(error => console.log(error));
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
            <Text style={styles.header}>Expense Tracker</Text>
            </View>
            <View>
                <Image source={require('../../../piggy.png')} style={{ width: 200, height: 200 }}/>
            </View>
            <StatusBar style="auto" />
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Email"
                placeholderTextColor="#fff"
                name="email"
                keyboardType="email-address"
                onChangeText={text => setEmail(text)}
                defaultValue={email}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Password"
                placeholderTextColor="#fff"
                secureTextEntry={true}
                name="password"
                onChangeText={text => setPassword(text)}
                defaultValue={password}
              />
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={login}>
              <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={signup}>
              <Text style={styles.loginText}>SIGN UP</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: "#404996",
      alignItems: "center",
      justifyContent: "center",
    },
  
    image: {
      marginBottom: 40,
    },
  
    inputView: {
      backgroundColor: "#404996",
      width: "70%",
      height: 45,
      marginBottom: 20,
      borderColor: '#fff',
      borderBottomWidth : 1,
    },
  
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
    },
  
    forgot_button: {
      height: 30,
      marginBottom: 30,
    },
  
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#4682B4",
    },
  
    header: {
      fontSize: 40,
      paddingBottom: 50,
      fontWeight: "bold",
      color: "#fff",
    }
  });

export default Auth
