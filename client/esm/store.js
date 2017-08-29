import {applyMiddleware, combineReducers, createStore} from 'redux';
import catchError from './middleware/catchError';
import account from './reducers/account';
import promise from 'redux-promise-middleware';

export default createStore(
  combineReducers({
    account
  }),
  applyMiddleware(
    catchError,
    promise()
  )
);
