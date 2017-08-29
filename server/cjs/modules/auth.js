'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _scryptForHumans = require('scrypt-for-humans');

var _validation = require('./validation');

var _validation2 = _interopRequireDefault(_validation);

var _caseConverter = require('case-converter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO :: https://github.com/tgriesser/knex/issues/2084

exports.default = ({ db, log }) => {

  const createAccount = async (email, firstName, lastName, password) => {
    const users = await db.table('users').where({ email });

    if (users.length > 0) {
      throw new _validation2.default(`An account for ${email} already exists.`, 'email');
    } else {
      const hashedPassword = await (0, _scryptForHumans.hash)(password);

      await db.table('users').insert((0, _caseConverter.toSnakeCase)({ email, firstName, hashedPassword, lastName }));
    }
  };

  const createSession = async (email, password) => {
    const users = await db.table('users').where({ email });

    if (users.length === 1) {
      const { firstName, hashedPassword, id, lastName } = (0, _caseConverter.toCamelCase)(users[0]);

      try {
        await (0, _scryptForHumans.verifyHash)(password, hashedPassword);

        return { email, firstName, id, lastName };
      } catch (error) {
        if (error.name === 'ScryptPasswordError') {
          throw new _validation2.default('Incorrect password.', 'password');
        } else {
          throw error;
        }
      }
    } else if (users.length === 0) {
      throw new _validation2.default(`An account for ${email} does not exist.`, 'email');
    } else {
      throw new Error(`Multiple accounts for ${email} found.`);
    }
  };

  const destroySession = session => {
    return new Promise((resolve, reject) => {
      session.destroy(error => {
        if (error != null) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };

  // TODO :: make this a middleware?
  const saveSession = (session, userData) => {
    return new Promise((resolve, reject) => {

      Object.assign(session, { user: userData });

      // Modern browsers do not complete a response when there's a location header, so it's safest to manually save the session
      session.save(error => {
        if (error != null) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };

  return { createAccount, createSession, destroySession, saveSession };
};