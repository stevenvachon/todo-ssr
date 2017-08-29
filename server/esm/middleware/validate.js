import {validate, ValidationError} from '../modules/validation';

export default schema => {
  return async (request, response, next) => {
    try {
      const coercions = await validate(request.body, schema);
      request.invalidations = [];
      request.body = coercions;  // TODO :: use `Object.assign()` ?
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        request.invalidations = error.invalidations;
        next();
      } else {
        next(error);
      }
    }
  };
};
