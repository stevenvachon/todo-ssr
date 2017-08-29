'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _connectSessionKnex = require('connect-session-knex');

var _connectSessionKnex2 = _interopRequireDefault(_connectSessionKnex);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _knex = require('knex');

var _knex2 = _interopRequireDefault(_knex);

var _morganDebug = require('morgan-debug');

var _morganDebug2 = _interopRequireDefault(_morganDebug);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const KnexSessionStore = (0, _connectSessionKnex2.default)(_expressSession2.default);

exports.default = config => {
  const app = (0, _express2.default)();

  const db = (0, _knex2.default)({
    client: 'pg',
    connection: {
      database: config.dbName,
      host: config.dbHost,
      password: config.dbPassword,
      port: config.dbPort,
      user: config.dbUser
    }
  });

  const log = (0, _debug2.default)('todo');

  const state = { db, log };

  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: false }));

  app.use((0, _cors2.default)());

  app.use(_express2.default.static(`${__dirname}/../../client/dist`, {
    index: false
  }));

  app.use((0, _morganDebug2.default)('todo', 'common'));

  app.use((0, _expressSession2.default)({
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    resave: false,
    saveUninitialized: false,
    secret: config.appSecret,
    store: new KnexSessionStore({
      knex: db,
      tablename: 'sessions'
    })
  }));

  app.use('/', (0, _routes2.default)(state));

  const server = app.listen(config.appPort, config.appHostname, function () {
    const { address, port } = this.address();
    log(`Server running on http://${address}:${port}/ (Press CTRL+C to quit)`);
  });

  return { app, server };
};