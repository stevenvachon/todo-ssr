'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouterDom = require('react-router-dom');

var _reactRedux = require('react-redux');

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _routes = require('../routes');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SignIn = require('./SignIn');

var _SignIn2 = _interopRequireDefault(_SignIn);

var _SignUp = require('./SignUp');

var _SignUp2 = _interopRequireDefault(_SignUp);

var _Welcome = require('./Welcome');

var _Welcome2 = _interopRequireDefault(_Welcome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class App extends _react2.default.PureComponent {

  notSignedInRoutes() {
    if (!this.props.isSignedIn) {
      return [_react2.default.createElement(_reactRouterDom.Route, { key: 'a', path: _routes.HOME, exact: true, component: _Welcome2.default }), _react2.default.createElement(_reactRouterDom.Route, { key: 'b', path: _routes.SIGN_IN, render: () => _react2.default.createElement(_SignIn2.default, {
          invalidations: this.props.accountInvalidations,
          isInert: this.props.accountIsUnderway }) }), _react2.default.createElement(_reactRouterDom.Route, { key: 'c', path: _routes.SIGN_UP, render: () => _react2.default.createElement(_SignUp2.default, {
          invalidations: this.props.accountInvalidations,
          isInert: this.props.accountIsUnderway }) })];
    }
  }

  signedInRoutes() {
    if (this.props.isSignedIn) {
      return [_react2.default.createElement(_reactRouterDom.Route, { key: 'a', path: _routes.HOME, exact: true, render: () => _react2.default.createElement(
          'p',
          null,
          'Signed in.'
        ) }), _react2.default.createElement(_reactRouterDom.Redirect, { key: 'b', from: _routes.SIGN_IN, to: _routes.HOME }), _react2.default.createElement(_reactRouterDom.Redirect, { key: 'c', from: _routes.SIGN_UP, to: _routes.HOME })];
    }
  }

  render() {
    return _react2.default.createElement(
      _reactRouterDom.BrowserRouter,
      null,
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Header2.default, { showSignOut: this.props.isSignedIn }),
        _react2.default.createElement(
          'main',
          null,
          _react2.default.createElement(
            _reactRouterDom.Switch,
            null,
            this.notSignedInRoutes(),
            this.signedInRoutes()
          )
        ),
        _react2.default.createElement(_Footer2.default, null)
      )
    );
  }
}

App.propTypes = {
  accountInvalidations: _propTypes2.default.array.isRequired,
  accountIsUnderway: _propTypes2.default.bool.isRequired,
  isSignedIn: _propTypes2.default.bool.isRequired
};
const mapStateToProps = state => ({
  accountInvalidations: state.account.invalidations,
  accountIsUnderway: state.account.isUnderway,
  isSignedIn: state.account.isSignedIn
});

exports.default = (0, _reactRedux.connect)(mapStateToProps)(App);