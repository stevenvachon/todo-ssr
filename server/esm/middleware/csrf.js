import timingSafeEqual from 'crypto';

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

export default (request, response, next) => {
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
