import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import SignOut from './SignOut';
import {signOut} from '../actions/account';

const Header = props => {
  const signOutForm = () => {
    if (props.showSignOut) {
      return (
        <div>
          <p>Hi, {props.userFirstName}!</p>
          <SignOut
            action={signOut}
            isInert={props.signInUnderway}/>
        </div>
      );
    }
  };

  return (
    <header>
      <h1>To-Do</h1>
      <h2>Written with Express.js</h2>
      {signOutForm()}
    </header>
  );
};

Header.defaultProps = {
  showSignOut: false
};

Header.propTypes = {
  showSignOut: PropTypes.bool,
  signOutUnderway: PropTypes.bool.isRequired,
  userFirstName: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  signOutUnderway: state.account.isUnderway,
  userFirstName: state.account.firstName
});

export default connect(mapStateToProps)(Header);
