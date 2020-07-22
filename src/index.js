import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import Firebase, { fireBaseContext}  from './components/Firebase/index'




ReactDOM.render(
  <fireBaseContext.Provider value={new Firebase()}>
    <App />
  </fireBaseContext.Provider>,
  document.getElementById('root')
);
