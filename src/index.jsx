require('./css/bootstrap.css');
require('./css/styles.css');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import { createStore } from 'redux';
import { MainContainer } from './components/Main';
import { GameContainer } from './components/Game';
import { ResultsContainer } from './components/Results';
import Reducer from './core';
import Demo from './components/Demo';

const store = createStore(Reducer);

store.subscribe(function(){

  console.log(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={MainContainer} />
      <Route path='/game' component={GameContainer} />
      <Route path='/demo' component={Demo} />
      <Route path='/results' component={ResultsContainer} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
