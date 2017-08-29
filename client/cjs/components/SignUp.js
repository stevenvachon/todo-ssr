'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRedux = require('react-redux');

var _includesInvalidation = require('../util/includesInvalidation');

var _includesInvalidation2 = _interopRequireDefault(_includesInvalidation);

var _Invalidations = require('./Invalidations');

var _Invalidations2 = _interopRequireDefault(_Invalidations);

var _reactRouterDom = require('react-router-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _routes = require('../routes');

var _account = require('../actions/account');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SignUp extends _react2.default.PureComponent {

  constructor() {
    super();

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: ''
    };
  }

  handleInput(event) {
    const name = event.currentTarget.getAttribute('name');
    const value = event.currentTarget.value;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { email, firstName, lastName, password } = this.state;

    this.props.action({ email, firstName, lastName, password });
  }

  isValid(propertyName) {
    return (0, _includesInvalidation2.default)(this.props.invalidations, propertyName);
  }

  render() {
    return _react2.default.createElement(
      'form',
      {
        action: _routes.SIGN_UP,
        method: 'post',
        onSubmit: this.handleSubmit },
      _react2.default.createElement(
        'fieldset',
        null,
        _react2.default.createElement(
          'legend',
          null,
          'Sign Up'
        ),
        _react2.default.createElement(_Invalidations2.default, { items: this.props.invalidations }),
        _react2.default.createElement(
          'label',
          null,
          'First Name',
          _react2.default.createElement('input', {
            className: (0, _classnames2.default)({ invalid: this.isValid('firstName') }),
            name: 'firstName',
            onChange: this.handleInput,
            required: true,
            type: 'text',
            value: this.state.firstName })
        ),
        _react2.default.createElement(
          'label',
          null,
          'Last Name',
          _react2.default.createElement('input', {
            className: (0, _classnames2.default)({ invalid: this.isValid('lastName') }),
            name: 'lastName',
            onChange: this.handleInput,
            required: true,
            type: 'text',
            value: this.state.lastName })
        ),
        _react2.default.createElement(
          'label',
          null,
          'Email',
          _react2.default.createElement('input', {
            className: (0, _classnames2.default)({ invalid: this.isValid('email') }),
            name: 'email',
            onChange: this.handleInput,
            required: true,
            type: 'email',
            value: this.state.email })
        ),
        _react2.default.createElement(
          'label',
          null,
          'Password',
          _react2.default.createElement('input', {
            className: (0, _classnames2.default)({ invalid: this.isValid('password') }),
            name: 'password',
            onChange: this.handleInput,
            required: true,
            type: 'password' })
        ),
        _react2.default.createElement(
          'button',
          {
            disabled: this.props.isInert,
            type: 'submit' },
          'Sign Up'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Already have an account?',
          ' ',
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: _routes.SIGN_IN },
            'Sign in'
          )
        )
      )
    );
  }
}

SignUp.defaultProps = {
  action: _account.signUp,
  invalidations: [],
  isInert: false
};
SignUp.propTypes = {
  action: _propTypes2.default.func.isRequired,
  invalidations: _propTypes2.default.array,
  isInert: _propTypes2.default.bool
};
const mapDispatchToProps = (dispatch, ownProps) => ({
  action: (0, _redux.bindActionCreators)(ownProps.action, dispatch)
});

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(SignUp);