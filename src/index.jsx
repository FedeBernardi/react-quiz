require('./css/bootstrap.css');
require('./css/styles.css');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import Reducer from './core';
import Demo from './components/Demo';
import thunk from 'redux-thunk';
import api from './middlewares/api';

import { LogInContainer } from './components/LogIn';
import { MainContainer } from './components/Main';
import Registration from './components/Registration';
import { GameContainer } from './components/Game';
import { ResultsContainer } from './components/Results';
import Header from './components/Header';
import Footer from './components/Footer';

const store = createStore(Reducer, applyMiddleware(thunk, api));

store.subscribe(function (){
  console.log(store.getState());
});

ReactDOM.render(
  <div className="main container">
    <Header appName="React Quiz"/>
    <div>
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path='/' component={LogInContainer} />
          <Route path='/registration' component={Registration} />
          <Route path='/main' component={MainContainer} />
          <Route path='/game' component={GameContainer} />
          <Route path='/demo' component={Demo} />
          <Route path='/results' component={ResultsContainer} />
        </Router>
      </Provider>
    </div>
    <Footer />
  </div>,
  document.getElementById('app')
);
