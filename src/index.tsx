import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/App.css';

const Store = React.createContext('');

const test = 'testval';

ReactDOM.render(
  <Store.Provider value={test}>
    <App />
  </Store.Provider>,
  document.getElementById('twitter-app'),
);
