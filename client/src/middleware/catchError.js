import isPromise from 'is-promise';
//import ValidationError from '../util/ValidationError';

// From https://github.com/pburtchaell/redux-promise-middleware/blob/4.3.0/examples/complex/middleware/error.js
export default () => next => action => {
  if (!isPromise(action.payload)) {
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
