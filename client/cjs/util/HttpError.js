'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class HttpError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    this.name = 'HttpError';
  }
}
exports.default = HttpError;