import {SIGNUP_FAIL,SIGNUP_SUCCESS} from '../actions/actionTypes';

const initialState = {
    error: null,
};
  
const reducer = (state = initialState, action) => {
    const { payload, type } = action;
  
    switch (type) {
      case SIGNUP_SUCCESS:
        return {
          ...state,
          error: null,
        };
      case SIGNUP_FAIL:
        return {
          ...state,
          error: payload,
        };
      default:
        return { ...state };
    }
  };
  
  export default reducer;
  