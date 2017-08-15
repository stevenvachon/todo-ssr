import 'babel-polyfill';
import App from './components/App';
import {applyMiddleware, createStore} from 'redux';
import catchError from './middleware/catchError';
import {Provider} from 'react-redux';
import promise from 'redux-promise-middleware';
import React from 'react';
import ReactDOM from 'react-dom';
import reducer from './reducers';

const init = () => {
  const store = createStore(reducer, applyMiddleware(catchError, promise()));

  const entryPoint = (
    <Provider store={store}>
      <App/>
    </Provider>
  );

  ReactDOM.render(entryPoint, document.body);

  console.log(document.cookie)
};

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
