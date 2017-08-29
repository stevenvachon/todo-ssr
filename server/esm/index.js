import 'babel-polyfill';
import bodyParser from 'body-parser';
import ConnectSessionKnex from 'connect-session-knex';
import cors from 'cors';
import debug from 'debug';
import express from 'express';
import knex from 'knex';
import morgan from 'morgan-debug';
import routes from './routes';
import session from 'express-session';

const KnexSessionStore = ConnectSessionKnex(session);

export default config => {
  const app = express();

  const db = knex({
    client: 'pg',
    connection: {
      database: config.dbName,
      host:     config.dbHost,
      password: config.dbPassword,
      port:     config.dbPort,
      user:     config.dbUser
    }
  });

  const log = debug('todo');

  const state = { db, log };

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(cors());

  app.use(express.static(`${__dirname}/../../client/dist`, {
    index: false
  }));

  app.use(morgan('todo', 'common'));

  app.use(session({
    cookie: { maxAge: 30*24*60*60*1000 },  // 30 days
    resave: false,
    saveUninitialized: false,
    secret: config.appSecret,
    store: new KnexSessionStore({
      knex: db,
      tablename: 'sessions'
    })
  }));

  app.use('/', routes(state));

  const server = app.listen(config.appPort, config.appHostname, function() {
    const {address, port} = this.address();
    log(`Server running on http://${address}:${port}/ (Press CTRL+C to quit)`);
  });

  return {app, server};
};
