'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SignOut = require('./SignOut');

var _SignOut2 = _interopRequireDefault(_SignOut);

var _account = require('../actions/account');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Header = props => {
  const signOutForm = () => {
    if (props.showSignOut) {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'p',
          null,
          'Hi, ',
          props.userFirstName,
          '!'
        ),
        _react2.default.createElement(_SignOut2.default, {
          action: _account.signOut,
          isInert: props.signInUnderway })
      );
    }
  };

  return _react2.default.createElement(
    'header',
    null,
    _react2.default.createElement(
      'h1',
      null,
      'To-Do'
    ),
    _react2.default.createElement(
      'h2',
      null,
      'Written with Express.js'
    ),
    signOutForm()
  );
};

Header.defaultProps = {
  showSignOut: false
};

Header.propTypes = {
  showSignOut: _propTypes2.default.bool,
  signOutUnderway: _propTypes2.default.bool.isRequired,
  userFirstName: _propTypes2.default.string.isRequired
};

const mapStateToProps = state => ({
  signOutUnderway: state.account.isUnderway,
  userFirstName: state.account.firstName
});

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Header);