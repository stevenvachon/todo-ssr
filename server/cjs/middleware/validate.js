'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validation = require('../modules/validation');

exports.default = schema => {
  return async (request, response, next) => {
    try {
      const coercions = await (0, _validation.validate)(request.body, schema);
      request.invalidations = [];
      request.body = coercions; // TODO :: use `Object.assign()` ?
      next();
    } catch (error) {
      if (error instanceof _validation.ValidationError) {
        request.invalidations = error.invalidations;
        next();
      } else {
        next(error);
      }
    }
  };
};