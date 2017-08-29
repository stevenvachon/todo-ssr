import 'babel-polyfill';
import App from './components/App';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';

const init = () => {
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
