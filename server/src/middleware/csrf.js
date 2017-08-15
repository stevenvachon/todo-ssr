'use strict';
const {timingSafeEqual} = require('crypto');

const csrf = (request, response, next) => {
  response.format({
    'application/json': () => {
      if (!safe(request)) {
        response.status(400).send({});
      } else {
        next();
      }
    },

    'text/html': () => next()
  });
};

const safe = request => {
  try {
    return timingSafeEqual(
      Buffer.from(request.body.csrf),
      Buffer.from(request.session.id)
    );
  } catch(error) {
    return false;
  }
};

module.exports = csrf;
