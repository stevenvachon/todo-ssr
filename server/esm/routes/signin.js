import AuthFactory from '../middleware/auth';
import {fields, Invalidation} from '../modules/validation';
//import {renderToStaticMarkup} from 'react-dom/server';
import Router from 'express-promise-router';
import validate from '../middleware/validate';

const signinSchema = {
  email:    fields.string().email().required().label('Email address'),
  password: fields.string().required().label('Password')
};

export default state => {

  const {createSession/*, redirectAfterSignIn, redirectIfSignedIn*/} = AuthFactory(state);
  const router = Router();

  /*router.get('/', redirectIfSignedIn, (request, response) => {
    response.format({
      'text/html': () => response.render('signin', {})
    });
  });*/

  // TODO :: https://npmjs.com/aphrodite for inline styles
  router.post('/', validate(signinSchema), createSession, (request, response, next) => {
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
          //const {email} = request.body;
          //response.render('signin', { email, invalidations });
        } else {
          next();
        }
      }*/
    });
  }/*, redirectAfterSignIn*/);

  return router;

};
