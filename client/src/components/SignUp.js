import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import {connect} from 'react-redux';
import includesInvalidation from '../util/includesInvalidation';
import Invalidations from './Invalidations';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import {SIGN_IN, SIGN_UP} from '../routes';
import {signUp} from '../actions/account';

class SignUp extends React.PureComponent {
  static defaultProps = {
    action: signUp,
    invalidations: [],
    isInert: false,
  };

  static propTypes = {
    action: PropTypes.func.isRequired,
    invalidations: PropTypes.array,
    isInert: PropTypes.bool
  };

  constructor() {
    super();

    this.handleInput  = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: ''
    };
  }

  handleInput(event) {
    const name  = event.currentTarget.getAttribute('name');
    const value = event.currentTarget.value;

    this.setState({...this.state, [name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();

    const {email, firstName, lastName, password} = this.state;

    this.props.action({email, firstName, lastName, password});
  }

  isValid(propertyName) {
    return includesInvalidation(this.props.invalidations, propertyName);
  }

  render() {
    return (
      <form
        action={SIGN_UP}
        method="post"
        onSubmit={this.handleSubmit}>

          <fieldset>
            <legend>Sign Up</legend>

            <Invalidations items={this.props.invalidations}/>

            <label>
              First Name
              <input
                className={classNames({invalid: this.isValid('firstName')})}
                name="firstName"
                onChange={this.handleInput}
                required
                type="text"
                value={this.state.firstName}/>
            </label>

            <label>
              Last Name
              <input
                className={classNames({invalid: this.isValid('lastName')})}
                name="lastName"
                onChange={this.handleInput}
                required
                type="text"
                value={this.state.lastName}/>
            </label>

            <label>
              Email
              <input
                className={classNames({invalid: this.isValid('email')})}
                name="email"
                onChange={this.handleInput}
                required
                type="email"
                value={this.state.email}/>
            </label>

            <label>
              Password
              <input
                className={classNames({invalid: this.isValid('password')})}
                name="password"
                onChange={this.handleInput}
                required
                type="password"/>
            </label>

            <button
              disabled={this.props.isInert}
              type="submit">
                Sign Up
            </button>

            <p>
              Already have an account?
              {' '}
              <Link to={SIGN_IN}>Sign in</Link>
            </p>

          </fieldset>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  action: bindActionCreators(ownProps.action, dispatch)
});

export default connect(null, mapDispatchToProps)(SignUp);
