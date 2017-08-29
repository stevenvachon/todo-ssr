import AuthFactory from '../modules/auth';
import Invalidation from '../modules/validation';

const acceptsHTML = request => request.accepts('text/html') !== false;

const redirectAfterSignIn = (request, response, next) => {
  if (acceptsHTML(request)) {
    response.redirect(303, '/todos');
  } else {
    next();
  }
};

const redirectIfNotSignedIn = (request, response, next) => {
  if (acceptsHTML(request) && request.session.user === undefined) {
    response.redirect(307, '/signin');
  } else {
    next();
  }
};

const redirectIfSignedIn = (request, response, next) => {
  if (acceptsHTML(request) && request.session.user !== undefined) {
    response.redirect(307, '/todos');
  } else {
    next();
  }
};

export default state => {

  const {createAccount: _createAccount, createSession: _createSession, destroySession: _destroySession, saveSession} = AuthFactory(state);

  const createAccount = async (request, response, next) => {
    const {invalidations} = request;

    if (invalidations.length > 0) {
      next();
    } else {
      try {
        const {email, firstName, lastName, password} = request.body;

        await _createAccount(email, firstName, lastName, password);

        const userData = await _createSession(email, password);

        await saveSession(request.session, userData);

        next();
      } catch (error) {
        if (error instanceof Invalidation) {
          invalidations.push(error);
          next();
        } else {
          next(error);
        }
      }
    }
  };

  const createSession = async (request, response, next) => {
    const {email, password} = request.body;
    const {invalidations} = request;

    if (invalidations.length > 0) {
      next();
    } else {
      try {
        const userData = await _createSession(email, password);

        await saveSession(request.session, userData);

        next();
      } catch (error) {
        if (error instanceof Invalidation) {
          invalidations.push(error);
          next();
        } else {
          next(error);
        }
      }
    }
  };

  const destroySession = async (request, response, next) => {
    await _destroySession(request.session);
    next();
  };

  return {
    createAccount,
    createSession,
    destroySession,
    redirectAfterSignIn,
    redirectIfNotSignedIn,
    redirectIfSignedIn
  };

};
