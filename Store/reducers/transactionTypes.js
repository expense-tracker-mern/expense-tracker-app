import {GET_TRANSACTION_TYPES_FAIL, GET_TRANSACTION_TYPES_SUCCESS} from '../actions/actionTypes';

const initialState = {
    error: null,
    types: null
};
  
const reducer = (state = initialState, action) => {
    const { payload, type, error } = action;
  
    switch (type) {
      case GET_TRANSACTION_TYPES_SUCCESS:
        return {
          ...state,
          error: null,
          types: payload
        };
      case GET_TRANSACTION_TYPES_FAIL:
        return {
          ...state,
          error: 'Unable to get Transaction Types',
          types: null
        };
      default:
        return { ...state };
    }
  };
  
  export default reducer;
  