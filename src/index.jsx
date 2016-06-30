require('./css/bootstrap.css');
require('./css/styles.css');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { MainContainer } from './components/Main';
import { GameContainer } from './components/Game';
import { ResultsContainer } from './components/Results';
import Reducer from './core';
import Demo from './components/Demo';
import thunk from 'redux-thunk';

const store = createStore(Reducer, applyMiddleware(thunk));

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
