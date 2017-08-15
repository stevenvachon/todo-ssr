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

export default (state=initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN_FULFILLED':
    case 'SIGN_UP_FULFILLED': {
      const {email, firstName, id, lastName} = action.payload;

      return {
        ...state,
        email,
        firstName,
        id,
        isSignedIn: true,
        isUnderway: false,
        lastName
      };
    }

    case 'SIGN_IN_PENDING':
    case 'SIGN_OUT_PENDING':
    case 'SIGN_UP_PENDING': {
      return {...state, isUnderway: true};
    }

    case 'SIGN_IN_REJECTED':
    case 'SIGN_UP_REJECTED': {
      // TODO :: https://github.com/loganfsmyth/babel-plugin-transform-builtin-extend/issues/14
      if (action.payload.name === 'ValidationError') {
        return {
          ...state,
          invalidations: action.payload.invalidations,
          isUnderway: false
        };
      } else {
        return {...state, isUnderway: false};
      }
    }

    case 'SIGN_OUT_FULFILLED': {
      return initialState;
    }

    case 'SIGN_OUT_REJECTED': {
      return {...state, isUnderway: false};
    }

    default: {
      return state;
    }
  }
};
