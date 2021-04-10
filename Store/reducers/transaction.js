import {ADD_TRANSACTION_FAIL, ADD_TRANSACTION_SUCCESS} from '../actions/actionTypes';

const initialState = {
    errors: null,
};
  
const reducer = (state = initialState, action) => {
    const { payload, type } = action;
  
    switch (type) {
      case ADD_TRANSACTION_SUCCESS:
        return {
          ...state,
          errors: null,
        };
      case ADD_TRANSACTION_FAIL:
        return {
          ...state,
          errors: payload,
          types: null
        };
      default:
        return { ...state };
    }
  };
  
  export default reducer;
  