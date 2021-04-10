import {GET_CATEGORIES_FAIL, GET_CATEGORIES_SUCCESS} from '../actions/actionTypes';

const initialState = {
    error: null,
    categories: null
};
  
const reducer = (state = initialState, action) => {
    const { payload, type, error } = action;
  
    switch (type) {
      case GET_CATEGORIES_SUCCESS:
        return {
          ...state,
          error: null,
          categories: payload
        };
      case GET_CATEGORIES_FAIL:
        return {
          ...state,
          error: 'Unable to get Categories',
          categories: null
        };
      default:
        return { ...state };
    }
  };
  
  export default reducer;
  