'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const safe = request => {
  try {
    return (0, _crypto2.default)(Buffer.from(request.body.csrf), Buffer.from(request.session.id));
  } catch (error) {
    return false;
  }
};

exports.default = (request, response, next) => {
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