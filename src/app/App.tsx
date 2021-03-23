import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import LogInPage from '../features/auth/LogInPage'
import SignUpPage from '../features/auth/SignUpPage'
import SimulatorPage from '../features/simulator/SimulatorPage'
import WelcomePage from '../features/welcome-page/WelcomePage'
import WorkSpace from '../features/workspace/WorkSpace'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={WelcomePage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/login" component={LogInPage} />
        <Route exact path="/simulator/:id" component={SimulatorPage} />
        <Route path="/workspace" component={WorkSpace} />
        <Route path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
