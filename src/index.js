import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

global.BASE_URL = 'https://www.reddit.com/r';
global.SUB_LIMIT = 10;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


