import * as actionTypes from './actionTypes';
import axios from 'axios';

import {Config} from '../../Config/config';

//Get Transaction Types
export const getTransactionTypes = () => async (dispatch) => {
    try {
      const res = await axios.get(Config.API_URL+'/transaction-type/all');
      let transactionTypes = [];

      res.data.forEach(element => {
        const type = {};
        type.label = element.name.charAt(0).toUpperCase() + element.name.slice(1);
        type.value = element._id;
        transactionTypes.push(type);
      });

      console.log(transactionTypes);

      dispatch({
        type: actionTypes.GET_TRANSACTION_TYPES_SUCCESS,
        payload: transactionTypes,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.GET_TRANSACTION_TYPES_FAIL,
        error: err
      });
      console.log(err);
    }
};