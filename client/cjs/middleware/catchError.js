'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isPromise = require('is-promise');

var _isPromise2 = _interopRequireDefault(_isPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import ValidationError from '../util/ValidationError';

// From https://github.com/pburtchaell/redux-promise-middleware/blob/4.3.0/examples/complex/middleware/error.js
exports.default = () => next => action => {
  if (!(0, _isPromise2.default)(action.payload)) {
    return next(action);
  }

  // Dispatch initial pending promise, but catch any errors
  return next(action).catch(error => {
    // TODO :: https://github.com/loganfsmyth/babel-plugin-transform-builtin-extend/issues/14
    if (error.name !== 'ValidationError') {
      // TODO :: use some kind of flash messaging
      alert(`${error.name}: ${error.message}`);
    }
  });
};