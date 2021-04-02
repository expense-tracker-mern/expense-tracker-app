import * as actionTypes from './actionTypes';
import axios from 'axios';
import auth from '@react-native-firebase/auth';

// Register New User
export const signup = (email,password) => async (dispatch) => {
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
    console.log('User account created & signed in!');
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