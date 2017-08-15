import {Link} from 'react-router-dom';
import React from 'react';
import {SIGN_IN, SIGN_UP} from '../routes';

export default props => (
  <p>
    Welcome! Please
    {' '}
    <Link to={SIGN_IN}>sign in</Link>
    {' '}
    or
    {' '}
    <Link to={SIGN_UP}>sign up</Link>.
  </p>
);
