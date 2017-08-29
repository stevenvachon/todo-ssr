'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = exports.signOut = exports.signIn = undefined;

var _account = require('../services/account');

const signIn = exports.signIn = data => ({
  type: 'SIGN_IN',
  payload: (0, _account.signIn)(data)
});

const signOut = exports.signOut = () => ({
  type: 'SIGN_OUT',
  payload: (0, _account.signOut)()
});

const signUp = exports.signUp = data => ({
  type: 'SIGN_UP',
  payload: (0, _account.signUp)(data)
});