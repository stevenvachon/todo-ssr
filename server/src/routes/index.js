'use strict';
const csrf = require('../middleware/csrf');
const Router = require('express-promise-router');

module.exports = state => {

  const router = Router();

  router.use('*', csrf);

  //router.use('/', require('./welcome')(state));

  router.use('/signin',  require('./signin')(state));
  router.use('/signout', require('./signout')(state));
  router.use('/signup',  require('./signup')(state));
  //router.use('/todos',   require('./todos')(state));

  return router;

};
