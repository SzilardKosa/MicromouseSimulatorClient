import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import WelcomePage from '../features/welcome-page/WelcomePage'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/welcome" component={WelcomePage} />
        <Route path="/">
          <Redirect to="/welcome" />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
