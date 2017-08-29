import App from '../esm/components/App';
import {describe, it} from 'mocha';
import expect from 'chai';
import {/*mount, */shallow} from 'enzyme';
import React from 'react';
//import ReactDOM from 'react-dom';

describe('Unit', () => {
  it('?', () => {
    console.log(App.WrappedComponent)
  });

  it('mounts without crashing', () => {
  	//console.log(shallow(<App/>));
    //mount(<App/>);
  });
});

describe('Integrated', () => {
  it('affects redux', () => {});
});
