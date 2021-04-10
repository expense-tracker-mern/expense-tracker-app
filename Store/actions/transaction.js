import * as actionTypes from './actionTypes';
import axios from 'axios';

import {Config} from '../../Config/config';

export const submitTransaction = (
    name, category, amount, type, date, token, image 
) => async (dispatch) => {
    console.log(image);
    try {
      const res = await axios.post(Config.API_URL+'/transaction',{
          "name" :name, 
          "category": category, 
          "amount": amount, 
          "type": type, 
          "date": date, 
          "token": token, 
          "image": image
        });
      console.log(res);
      dispatch({
        type: actionTypes.ADD_TRANSACTION_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.ADD_TRANSACTION_FAIL,
        payload: error.response.data.errors,
      });
      console.log(error.response.data.errors)
    }
  };