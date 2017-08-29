import {signIn as _signIn, signOut as _signOut, signUp as _signUp} from '../services/account';

export const signIn = data => ({
  type: 'SIGN_IN',
  payload: _signIn(data)
});

export const signOut = () => ({
  type: 'SIGN_OUT',
  payload: _signOut()
});

export const signUp = data => ({
  type: 'SIGN_UP',
  payload: _signUp(data)
});
