import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import LogInPage from '../features/auth/LogInPage'
import ProtectedRoute from '../features/auth/ProtectedRoute'
import SignUpPage from '../features/auth/SignUpPage'
import SimulatorPage from '../features/simulator/SimulatorPage'
import WelcomePage from '../features/welcome-page/WelcomePage'
import WorkSpace from '../features/workspace/WorkSpace'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <WelcomePage />
        </Route>
        <Route exact path="/signup">
          <SignUpPage />
        </Route>
        <Route exact path="/login">
          <LogInPage />
        </Route>
        <ProtectedRoute exact path="/simulator/:id">
          <SimulatorPage />
        </ProtectedRoute>
        <ProtectedRoute path="/workspace">
          <WorkSpace />
        </ProtectedRoute>
        <Route path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
