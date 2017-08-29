'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _csrf = require('../middleware/csrf');

var _csrf2 = _interopRequireDefault(_csrf);

var _react = require('../middleware/react');

var _react2 = _interopRequireDefault(_react);

var _expressPromiseRouter = require('express-promise-router');

var _expressPromiseRouter2 = _interopRequireDefault(_expressPromiseRouter);

var _signin = require('./signin');

var _signin2 = _interopRequireDefault(_signin);

var _signout = require('./signout');

var _signout2 = _interopRequireDefault(_signout);

var _signup = require('./signup');

var _signup2 = _interopRequireDefault(_signup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = state => {

  const router = (0, _expressPromiseRouter2.default)();

  router.get('*', /*csrf, */_react2.default);

  //router.use('/', WelcomeFactory(state));

  router.use('/signin', (0, _signin2.default)(state));
  router.use('/signout', (0, _signout2.default)(state));
  router.use('/signup', (0, _signup2.default)(state));
  //router.use('/todos',   TodosFactory(state));

  return router;
};