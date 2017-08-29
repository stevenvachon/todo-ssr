import addEnder from 'add-ender';
import joi from 'joi';

export const fields = {
  alternatives: joi.alternatives,
  any:          joi.any,
  array:        joi.array,
  boolean:      joi.boolean,
  binary:       joi.binary,
  date:         joi.date,
  func:         joi.func,
  number:       joi.number,
  object:       joi.object,
  string:       joi.string
};

const options = { abortEarly: false };

export const validate = (values, schema) => {
  return new Promise((resolve, reject) => {
    joi.validate(values, schema, options, (error, coercions) => {
      if (error != null) {
        const invalidations = error.details.map(detail => {
          return new Invalidation(
            addEnder(detail.message),
            detail.path
          );
        });
        reject(new ValidationError(invalidations));
      } else {
        resolve(coercions);
      }
    });
  });
};

export class Invalidation extends Error {
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

export class ValidationError extends Error {
  constructor(invalidations=[]) {
    super('Invalid input(s)');
    this.name = 'ValidationError';
    this.invalidations = invalidations;
  }
}
