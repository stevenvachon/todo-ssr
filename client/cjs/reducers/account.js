'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// TODO :: `invalidations` not cleared when switching between signin and signup routes
const initialState = {
  email: '',
  firstName: '',
  id: -1,
  invalidations: [],
  isSignedIn: false,
  isUnderway: false,
  lastName: ''
};

exports.default = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN_FULFILLED':
    case 'SIGN_UP_FULFILLED':
      {
        const { email, firstName, id, lastName } = action.payload;

        return _extends({}, state, {
          email,
          firstName,
          id,
          isSignedIn: true,
          isUnderway: false,
          lastName
        });
      }

    case 'SIGN_IN_PENDING':
    case 'SIGN_OUT_PENDING':
    case 'SIGN_UP_PENDING':
      {
        return _extends({}, state, { isUnderway: true });
      }

    case 'SIGN_IN_REJECTED':
    case 'SIGN_UP_REJECTED':
      {
        // TODO :: https://github.com/loganfsmyth/babel-plugin-transform-builtin-extend/issues/14
        if (action.payload.name === 'ValidationError') {
          return _extends({}, state, {
            invalidations: action.payload.invalidations,
            isUnderway: false
          });
        } else {
          return _extends({}, state, { isUnderway: false });
        }
      }

    case 'SIGN_OUT_FULFILLED':
      {
        return initialState;
      }

    case 'SIGN_OUT_REJECTED':
      {
        return _extends({}, state, { isUnderway: false });
      }

    default:
      {
        return state;
      }
  }
};