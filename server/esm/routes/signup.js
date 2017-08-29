import AuthFactory from '../middleware/auth';
import {fields, Invalidation} from '../modules/validation';
import Router from 'express-promise-router';
import validate from '../middleware/validate';

const signupSchema = {
  email:     fields.string().email().required().label('Email address'),
  firstName: fields.string().required().label('First name'),
  lastName:  fields.string().required().label('Last name'),
  password:  fields.string().required().label('Password')
};

export default state => {

  const {createAccount, createSession/*, redirectAfterSignIn, redirectIfSignedIn*/} = AuthFactory(state);
  const router = Router();

  /*router.get('/', redirectIfSignedIn, (request, response) => {
    response.format({
      'text/html': () => response.render('signup', {})
    });
  });*/

  router.post('/', validate(signupSchema), createAccount, createSession, (request, response, next) => {
    const {invalidations} = request;

    response.format({
      'application/json': () => {
        if (invalidations.length > 0) {
          response.status(400).json({ invalidations });
        } else {
          response.status(201).json(request.session.user);
        }
      },

      /*'text/html': () => {
        if (invalidations.length > 0) {
          const {email, firstName, lastName, password} = request.body;
          response.render('signup', { email, firstName, lastName, invalidations });
        } else {
          next();
        }
      }*/
    });
  }/*, redirectAfterSignIn*/);

  return router;

};
