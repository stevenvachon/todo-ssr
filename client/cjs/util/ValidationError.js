'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// TODO :: https://github.com/facebookincubator/create-react-app/issues/2952
// manually patched local "babel-preset-create-react-app" for now
class ValidationError extends Error {
  constructor(invalidations) {
    super('Invalid input(s)');
    this.invalidations = invalidations;
    this.name = 'ValidationError';
  }
}

exports.default = ValidationError; /*const wtf = new ValidationError(['message'])
                                   console.log(wtf instanceof ValidationError)
                                   
                                   
                                   try {
                                     throw new ValidationError(['message']);
                                   } catch (error) {
                                     if (error instanceof ValidationError) {
                                       console.log('ok');
                                     } else {
                                       //throw error;
                                     }
                                   }*/