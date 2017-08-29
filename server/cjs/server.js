'use strict';

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _2.default)({
  appHostname: process.env.APP_HOSTNAME,
  appPort: process.env.APP_PORT,
  appProtocol: process.env.APP_PROTOCOL,
  appSecret: process.env.APP_SECRET_KEY,
  dbHost: process.env.POSTGRES_HOST,
  dbName: process.env.POSTGRES_NAME,
  dbPassword: process.env.POSTGRES_PASSWORD,
  dbPort: process.env.POSTGRES_PORT,
  dbUser: process.env.POSTGRES_USER
});