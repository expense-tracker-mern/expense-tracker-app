import * as actionTypes from './actionTypes';
import axios from 'axios';
import auth from '@react-native-firebase/auth';

import {Config} from '../../Config/config';

// Register New User
export const signup = (email,password) => async (dispatch) => {
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
        console.log('User successfully created!')
        axios.post(Config.API_URL+'/auth/register', {"id" : res.user.uid,"email" :res.user.email})
        .then(console.log('User saved in database!'))
        .catch(error => {
            console.log(error);
            auth().currentUser.delete();
            dispatch({
                type: actionTypes.SIGNUP_FAIL,
                payload: error.message,
            });
        })
        dispatch({
            type: actionTypes.SIGNUP_SUCCESS,
        });  
    })
    .catch(error => {
        dispatch({
            type: actionTypes.SIGNUP_FAIL,
            payload: error.message,
        });
        console.log(error.message);
    });
};

export const login = (email,password) => async (dispatch) => {
    auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
        });
    })
    .catch(error => {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            payload: error.message,
        });
        console.log(error.message);
    });
};