import * as actionTypes from './actionTypes';
import axios from 'axios';

import {Config} from '../../Config/config';

export const submitTransaction = (
    name, category, amount, type, date, token, image, day, monthName, monthNumber, year
) => async (dispatch) => {
    console.log(date.toString());
    try {
      const res = await axios.post(Config.API_URL+'/transaction',{
          "name" :name, 
          "category": category, 
          "amount": amount, 
          "type": type, 
          "date": date.toString(), 
          "token": token, 
          "image": image,
          "day": day,
          "monthName": monthName,
          "monthNumber": monthNumber,
          "year": year
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