import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { WithSensor } from './WithSensor'
import { WithoutSensor } from './WithoutSensor'
import * as serviceWorker from './serviceWorker'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route path="/withsensor">
        <WithSensor />
      </Route>
      <Route path="/withoutsensor">
        <WithoutSensor />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
