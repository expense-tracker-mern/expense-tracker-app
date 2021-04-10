import * as actionTypes from './actionTypes';
import axios from 'axios';

import {Config} from '../../Config/config';

//Get Categories from Transaction Type
export const getCategories = (type) => async (dispatch) => {
    try {
      const res = await axios.get(Config.API_URL+'/category/'+type);
      let categories = [];

      res.data.forEach(element => {
        const category = {};
        category.label = element.name.charAt(0).toUpperCase() + element.name.slice(1);
        category.value = element._id;
        categories.push(category);
      });

      console.log(categories);

      dispatch({
        type: actionTypes.GET_CATEGORIES_SUCCESS,
        payload: categories,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.GET_CATEGORIES_FAIL,
        error: err
      });
      console.log(err);
    }
};