import {GET_YEAR} from '../actions/actionTypes';

const initialState = {
    year: null,
    option: null
};
  
const reducer = (state = initialState, action) => {
    const { year, type, option } = action;

    console.log(year);

    const y = (new Date(1270917314000)).getFullYear();
    const years = Array.from(new Array(500),( val, index) => index + y);

    const key = years.indexOf(year);
    console.log(key);

    switch (type) {
      case GET_YEAR:
        return {
          ...state,
          year: option === 'plus' ? years[key + 1 ] : years[key - 1],
        };
      default:
        return { ...state };
    }
  };
  
  export default reducer;