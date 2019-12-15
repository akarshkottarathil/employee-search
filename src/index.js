import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createStore, applyMiddleware } from "redux";
import employeesReducer from "./reducers/employees";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';

const store = createStore(employeesReducer, {}, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root'));