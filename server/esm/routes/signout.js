import AuthFactory from '../middleware/auth';
import {fields, Invalidation} from '../modules/validation';
import Router from 'express-promise-router';

export default state => {

  const {destroySession} = AuthFactory(state);
  const router = Router();

  // There is no GET in order to avoid "logout CSRF"

  router.post('/', destroySession, (request, response, next) => {
    response.format({
      'application/json': () => {
        response.status(201).send({});
      },

      /*'text/html': () => {
        // TODO :: redirect to homepage
      }*/
    });
  });

  return router;

};
