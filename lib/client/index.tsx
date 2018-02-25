import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { fetchUser } from './actions/UserActions'
import { App } from './App'
import configureStore from './state/store'

const store = configureStore()

// adding a dev object to window to support debugging
// tslint:disable-next-line:no-string-literal
window['dev'] = { store }

// TODO: Factor out boot-up scripts
store.dispatch(fetchUser())

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)
