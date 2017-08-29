'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidationError = exports.Invalidation = exports.validate = exports.fields = undefined;

var _addEnder = require('add-ender');

var _addEnder2 = _interopRequireDefault(_addEnder);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fields = exports.fields = {
  alternatives: _joi2.default.alternatives,
  any: _joi2.default.any,
  array: _joi2.default.array,
  boolean: _joi2.default.boolean,
  binary: _joi2.default.binary,
  date: _joi2.default.date,
  func: _joi2.default.func,
  number: _joi2.default.number,
  object: _joi2.default.object,
  string: _joi2.default.string
};

const options = { abortEarly: false };

const validate = exports.validate = (values, schema) => {
  return new Promise((resolve, reject) => {
    _joi2.default.validate(values, schema, options, (error, coercions) => {
      if (error != null) {
        const invalidations = error.details.map(detail => {
          return new Invalidation((0, _addEnder2.default)(detail.message), detail.path);
        });
        reject(new ValidationError(invalidations));
      } else {
        resolve(coercions);
      }
    });
  });
};

class Invalidation extends Error {
  constructor(message, propertyName) {
    super(message);
    this.name = 'Invalidation';
    this.property = propertyName;
  }

  toJSON() {
    return {
      message: this.message,
      property: this.property
    };
  }
}

exports.Invalidation = Invalidation;
class ValidationError extends Error {
  constructor(invalidations = []) {
    super('Invalid input(s)');
    this.name = 'ValidationError';
    this.invalidations = invalidations;
  }
}
exports.ValidationError = ValidationError;