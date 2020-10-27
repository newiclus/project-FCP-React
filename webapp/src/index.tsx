import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'

import firebase from './Api/firebase'
import store from './config/store'
import App from './App'

const app = (
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)


firebase.auth().onAuthStateChanged(() => {
  render(app, document.getElementById('root'));
});

