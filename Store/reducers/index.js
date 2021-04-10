import { combineReducers } from 'redux';
import auth from './auth';
import transactionTypes from './transactionTypes';
import categories from './categories';
import transaction from './transaction';
import year from './years';

export default combineReducers({
  auth: auth,
  transactionTypes: transactionTypes,
  categories: categories,
  transaction: transaction,
  year: year,
});
