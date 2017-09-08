import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import ReduxPromise from 'redux-promise'
import ReduxThunk from 'redux-thunk'

import './index.css';

import App from './components/App';
import reducer from './reducers'

// https://github.com/zalmoxisus/redux-devtools-extension
// If you write the way below:
// ..., compose(
//   applyMiddleware(ReduxPromise, ReduxThunk),
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// )
// It will work in Chrome but break in Safari.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(ReduxPromise, ReduxThunk),
))


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
