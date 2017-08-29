'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

var _validation = require('../modules/validation');

var _expressPromiseRouter = require('express-promise-router');

var _expressPromiseRouter2 = _interopRequireDefault(_expressPromiseRouter);

var _validate = require('../middleware/validate');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const signupSchema = {
  email: _validation.fields.string().email().required().label('Email address'),
  firstName: _validation.fields.string().required().label('First name'),
  lastName: _validation.fields.string().required().label('Last name'),
  password: _validation.fields.string().required().label('Password')
};

exports.default = state => {

  const { createAccount, createSession /*, redirectAfterSignIn, redirectIfSignedIn*/ } = (0, _auth2.default)(state);
  const router = (0, _expressPromiseRouter2.default)();

  /*router.get('/', redirectIfSignedIn, (request, response) => {
    response.format({
      'text/html': () => response.render('signup', {})
    });
  });*/

  router.post('/', (0, _validate2.default)(signupSchema), createAccount, createSession, (request, response, next) => {
    const { invalidations } = request;

    response.format({
      'application/json': () => {
        if (invalidations.length > 0) {
          response.status(400).json({ invalidations });
        } else {
          response.status(201).json(request.session.user);
        }
      }

      /*'text/html': () => {
        if (invalidations.length > 0) {
          const {email, firstName, lastName, password} = request.body;
          response.render('signup', { email, firstName, lastName, invalidations });
        } else {
          next();
        }
      }*/
    });
  } /*, redirectAfterSignIn*/);

  return router;
};