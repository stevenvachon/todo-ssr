'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _routes = require('../routes');

var _account = require('../actions/account');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SignOut = props => {
  const handleSubmit = event => {
    event.preventDefault();
    props.action();
  };

  return _react2.default.createElement(
    'form',
    {
      action: _routes.SIGN_OUT,
      method: 'post',
      onSubmit: handleSubmit },
    _react2.default.createElement(
      'button',
      {
        disabled: props.isInert,
        type: 'submit' },
      'Sign Out'
    )
  );
};

SignOut.defaultProps = {
  action: _account.signOut,
  isInert: false
};

SignOut.propTypes = {
  action: _propTypes2.default.func.isRequired,
  isInert: _propTypes2.default.bool
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  action: (0, _redux.bindActionCreators)(ownProps.action, dispatch)
});

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(SignOut);