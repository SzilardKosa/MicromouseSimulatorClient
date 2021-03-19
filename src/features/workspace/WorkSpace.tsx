import React from 'react'
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom'
import HelpPage from './help-page/HelpPage'
import Navbar from './Navbar'
import SettingsPage from './settings-page/SettingsPage'
import SimulationListPage from './simulation-list-page/SimulationListPage'

const WorkSpace = () => {
  let { path, url } = useRouteMatch()
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path={`${path}/simulations`} component={SimulationListPage} />
        <Route exact path={`${path}/help`} component={HelpPage} />
        <Route exact path={`${path}/settings`} component={SettingsPage} />
        <Route path={path}>
          <Redirect to={`${url}/simulations`} />
        </Route>
      </Switch>
    </>
  )
}

export default WorkSpace
