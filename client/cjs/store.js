'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _catchError = require('./middleware/catchError');

var _catchError2 = _interopRequireDefault(_catchError);

var _account = require('./reducers/account');

var _account2 = _interopRequireDefault(_account);

var _reduxPromiseMiddleware = require('redux-promise-middleware');

var _reduxPromiseMiddleware2 = _interopRequireDefault(_reduxPromiseMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.createStore)((0, _redux.combineReducers)({
  account: _account2.default
}), (0, _redux.applyMiddleware)(_catchError2.default, (0, _reduxPromiseMiddleware2.default)()));