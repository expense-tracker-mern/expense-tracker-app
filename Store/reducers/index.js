import { combineReducers } from 'redux';
import auth from './auth';
import transactionTypes from './transactionTypes';
import categories from './categories';

export default combineReducers({
  auth: auth,
  transactionTypes: transactionTypes,
  categories: categories,
});
