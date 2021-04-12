import {ADD_TRANSACTION_FAIL, ADD_TRANSACTION_SUCCESS} from '../actions/actionTypes';

const initialState = {
    errors: null,
    success: false
};
  
const reducer = (state = initialState, action) => {
    const { payload, type } = action;
  
    switch (type) {
      case ADD_TRANSACTION_SUCCESS:
        return {
          ...state,
          errors: null,
          success: true
        };
      case ADD_TRANSACTION_FAIL:
        return {
          ...state,
          errors: payload,
          types: null,
          success: false
        };
      default:
        return { ...state };
    }
  };
  
  export default reducer;
  