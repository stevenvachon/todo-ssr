'use strict';
const {fields, Invalidation} = require('../modules/validation');
const Router = require('express-promise-router');

module.exports = state => {

  const {destroySession} = require('../middleware/auth')(state);
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
