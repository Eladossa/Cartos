import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './index.css';

const history = createBrowserHistory();

ReactDOM.render(
  <StrictMode>
    <Router history={history}>
      <App />
    </Router>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
