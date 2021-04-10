import * as actionTypes from './actionTypes';

export const getYear = (year, option) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.GET_YEAR,
        year: year,
        option: option
      });
    } catch (error) {
      dispatch({
        error: error
      });
    }
};