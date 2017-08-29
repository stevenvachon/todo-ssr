'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = exports.signOut = exports.signIn = undefined;

var _HttpRequest = require('../util/HttpRequest');

var _HttpRequest2 = _interopRequireDefault(_HttpRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const signIn = exports.signIn = data => _HttpRequest2.default.post('signin', data);

const signOut = exports.signOut = () => _HttpRequest2.default.post('signout');

const signUp = exports.signUp = data => _HttpRequest2.default.post('signup', data);