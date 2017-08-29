import App from 'todo-ssr-client/cjs/components/App';
import format from 'string-template';
import {Provider} from 'react-redux';
import React from 'react';
import {readFileSync} from 'fs';
import {renderToStaticMarkup} from 'react-dom/server';
import store from 'todo-ssr-client/cjs/store';

// TODO :: use some html babel plugin for this instead?
const template = readFileSync(require.resolve('todo-ssr-client/bundle/index.html'), 'utf8');

export default (request, response, next) => {
  response.format({
  	'application/json': () => next(),

    'text/html': () => response.send(format(template, {
      app: renderToStaticMarkup(<Provider store={store}><App/></Provider>),
      path: '/',
      title: '??'
    }))
  });
};
