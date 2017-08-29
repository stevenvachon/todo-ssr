'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouterDom = require('react-router-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _routes = require('../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = props => _react2.default.createElement(
  'p',
  null,
  'Welcome! Please',
  ' ',
  _react2.default.createElement(
    _reactRouterDom.Link,
    { to: _routes.SIGN_IN },
    'sign in'
  ),
  ' ',
  'or',
  ' ',
  _react2.default.createElement(
    _reactRouterDom.Link,
    { to: _routes.SIGN_UP },
    'sign up'
  ),
  '.'
);