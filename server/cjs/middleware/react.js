'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _App = require('todo-ssr-client/cjs/components/App');

var _App2 = _interopRequireDefault(_App);

var _stringTemplate = require('string-template');

var _stringTemplate2 = _interopRequireDefault(_stringTemplate);

var _reactRedux = require('react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fs = require('fs');

var _server = require('react-dom/server');

var _store = require('todo-ssr-client/cjs/store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO :: use some html babel plugin for this instead?
const template = (0, _fs.readFileSync)(require.resolve('todo-ssr-client/bundle/index.html'), 'utf8');

exports.default = (request, response, next) => {
  response.format({
    'application/json': () => next(),

    'text/html': () => response.send((0, _stringTemplate2.default)(template, {
      app: (0, _server.renderToStaticMarkup)(_react2.default.createElement(
        _reactRedux.Provider,
        { store: _store2.default },
        _react2.default.createElement(_App2.default, null)
      )),
      path: '/',
      title: '??'
    }))
  });
};