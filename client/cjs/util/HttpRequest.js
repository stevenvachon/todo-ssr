'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _HttpError = require('./HttpError');

var _HttpError2 = _interopRequireDefault(_HttpError);

var _ValidationError = require('./ValidationError');

var _ValidationError2 = _interopRequireDefault(_ValidationError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HttpRequest {
  /*static delete(endpoint, params, headers) {
    return request(endpoint, params, headers, 'delete');
  }*/

  static get(endpoint, headers) {
    return request(endpoint, undefined, headers, 'get');
  }

  /*static patch(endpoint, params, headers) {
    return request(endpoint, params, headers, 'patch');
  }*/

  static post(endpoint, params, headers) {
    return request(endpoint, params, headers, 'post');
  }

  /*static update(endpoint, params, headers) {
    return request(endpoint, params, headers, 'update');
  }*/
}

exports.default = HttpRequest;
const request = async (endpoint, params = {}, headers = {}, method) => {
  headers = new Headers(headers);

  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  params = JSON.stringify(params);

  const body = params === '{}' ? null : params;
  const mode = 'cors';
  const options = { body, headers, method, mode };

  const response = await fetch(`http://localhost:8080/${endpoint}`, options);
  const json = await response.json();

  if (response.ok) {
    return json;
  } else if (json.invalidations && json.invalidations.length > 0) {
    throw new _ValidationError2.default(json.invalidations);
  } else {
    throw new _HttpError2.default('Network response was not ok.', response.status);
  }
};