import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar,TextInput, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native';
import {Input} from 'react-native-elements'
import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux';

import * as actions from '../../../Store/actions/index';
import ErrorBox from '../ErrorBox/ErrorBox'

export const Auth = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailEmpty, setEmailEmpty] = useState(false);
    const [isPasswordEmpty, setPasswordEmpty] = useState(false);

    const signup = () => {
        email && password ? props.signup(email,password) : validate();
    }

    const login = () => {
        email && password ? props.login(email,password) : validate();
    }

    const validate = () => {
        if(email == '' && password == ''){
            setEmailEmpty(true);
            setPasswordEmpty(true);
        }else if(email == ''){
            setEmailEmpty(true);
        }else{
            setPasswordEmpty(true);
        }
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
            { props.error ? 
                <ErrorBox error = {props.error}/>
            : null}
            <View style={styles.inputView}>
              <Input
                placeholder="Email"
                placeholderTextColor="#fff"
                name="email"
                keyboardType="email-address"
                leftIcon={{ type: 'email', name: 'email', color: 'white' }}
                onChangeText={text => setEmail(text)}
                defaultValue={email}
                errorStyle={{ color: 'red' }}
                errorMessage={isEmailEmpty ? 'Email is required' : null}
              />
            </View>

            <View style={styles.inputView}>
              <Input
                placeholder="Password"
                placeholderTextColor="#fff"
                secureTextEntry={true}
                name="password"
                leftIcon={{ type: 'email', name: 'lock', color: 'white' }}
                onChangeText={text => setPassword(text)}
                defaultValue={password}
                errorStyle={{ color: 'red' }}
                errorMessage={isPasswordEmpty ? 'Password is required' : null}
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
      height: 60,
      marginBottom: 20,
      borderColor: '#fff',
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

  const mapStateToProps = (state) => {
    return {
      error: state.auth.error,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      signup: (email, password) =>
        dispatch(actions.signup(email, password)),
      login: (email, password) =>
        dispatch(actions.login(email, password)),
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Auth);
