import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Footer from './Footer';
import Header from './Header';
import {HOME, SIGN_IN, SIGN_UP} from '../routes';
import PropTypes from 'prop-types';
import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Welcome from './Welcome';

class App extends React.PureComponent {
  static propTypes = {
    accountInvalidations: PropTypes.array.isRequired,
    accountIsUnderway: PropTypes.bool.isRequired,
    isSignedIn: PropTypes.bool.isRequired
  };

  notSignedInRoutes() {
    if (!this.props.isSignedIn) {
      return [
        <Route key="a" path={HOME} exact={true} component={Welcome}/>,

        <Route key="b" path={SIGN_IN} render={() => (
          <SignIn
            invalidations={this.props.accountInvalidations}
            isInert={this.props.accountIsUnderway}/>
        )}/>,

        <Route key="c" path={SIGN_UP} render={() => (
          <SignUp
            invalidations={this.props.accountInvalidations}
            isInert={this.props.accountIsUnderway}/>
        )}/>
      ];
    }
  }

  signedInRoutes() {
    if (this.props.isSignedIn) {
      return [
        <Route key="a" path={HOME} exact={true} render={() => <p>Signed in.</p>}/>,
        <Redirect key="b" from={SIGN_IN} to={HOME}/>,
        <Redirect key="c" from={SIGN_UP} to={HOME}/>
      ];
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header showSignOut={this.props.isSignedIn}/>

          <main>
            <Switch>

              {this.notSignedInRoutes()}
              {this.signedInRoutes()}

            </Switch>
          </main>

          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  accountInvalidations: state.account.invalidations,
  accountIsUnderway: state.account.isUnderway,
  isSignedIn: state.account.isSignedIn
});

export default connect(mapStateToProps)(App);
