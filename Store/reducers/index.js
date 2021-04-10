import { combineReducers } from 'redux';
import auth from './auth';
import transactionTypes from './transactionTypes';

export default combineReducers({
  auth: auth,
  transactionTypes: transactionTypes,
});
