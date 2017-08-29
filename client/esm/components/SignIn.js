import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import {connect} from 'react-redux';
import includesInvalidation from '../util/includesInvalidation';
import Invalidations from './Invalidations';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import {SIGN_IN, SIGN_UP} from '../routes';
import {signIn} from '../actions/account';

class SignIn extends React.PureComponent {
  static defaultProps = {
    action: signIn,
    invalidations: [],
    isInert: false
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
      password: ''
    };
  }

  handleInput(event) {
    const name  = event.currentTarget.getAttribute('name');
    const value = event.currentTarget.value;

    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();

    const {email, password} = this.state;

    this.props.action({email, password});
  }

  isValid(propertyName) {
    return includesInvalidation(this.props.invalidations, propertyName);
  }

  render() {
    return (
      <form
        action={SIGN_IN}
        method="post"
        onSubmit={this.handleSubmit}>

          <fieldset>
            <legend>Sign In</legend>

            <Invalidations items={this.props.invalidations}/>

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
                Sign In
            </button>

            <p>
              Don't have an account?
              {' '}
              <Link to={SIGN_UP}>Sign up</Link>
            </p>

          </fieldset>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  action: bindActionCreators(ownProps.action, dispatch)
});

export default connect(null, mapDispatchToProps)(SignIn);
