import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import {SIGN_OUT} from '../routes';
import {signOut} from '../actions/account';

const SignOut = props => {
  const handleSubmit = event => {
    event.preventDefault();
    props.action();
  };

  return (
    <form
      action={SIGN_OUT}
      method="post"
      onSubmit={handleSubmit}>
        <button
          disabled={props.isInert}
          type="submit">
            Sign Out
        </button>
    </form>
  );
};

SignOut.defaultProps = {
  action: signOut,
  isInert: false
};

SignOut.propTypes = {
  action: PropTypes.func.isRequired,
  isInert: PropTypes.bool
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  action: bindActionCreators(ownProps.action, dispatch)
});

export default connect(null, mapDispatchToProps)(SignOut);
