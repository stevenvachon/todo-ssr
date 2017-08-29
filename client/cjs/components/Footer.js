'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = props => _react2.default.createElement(
  'footer',
  null,
  _react2.default.createElement(
    'p',
    null,
    '\xA9 ',
    _react2.default.createElement(
      'time',
      null,
      new Date().getFullYear()
    ),
    ' No one.'
  )
);