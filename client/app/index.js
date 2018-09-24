import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';
import Home from './components/Home/Home';
import Movie from './components/Movie/Movie';
import './styles/styles.scss';
import movieReducer from './store/reducers/movie';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(movieReducer, composeEnhancers(
  applyMiddleware(thunk)
));



render((
  <Provider store={store}>
    <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/movie/:id" component={Movie}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
  </Provider>
), document.getElementById('app'));
