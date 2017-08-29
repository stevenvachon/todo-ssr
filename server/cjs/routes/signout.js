'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

var _validation = require('../modules/validation');

var _expressPromiseRouter = require('express-promise-router');

var _expressPromiseRouter2 = _interopRequireDefault(_expressPromiseRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = state => {

  const { destroySession } = (0, _auth2.default)(state);
  const router = (0, _expressPromiseRouter2.default)();

  // There is no GET in order to avoid "logout CSRF"

  router.post('/', destroySession, (request, response, next) => {
    response.format({
      'application/json': () => {
        response.status(201).send({});
      }

      /*'text/html': () => {
        // TODO :: redirect to homepage
      }*/
    });
  });

  return router;
};