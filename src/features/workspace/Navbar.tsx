import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

const Navbar = () => {
  let { url } = useRouteMatch()

  return (
    <ul>
      <li>
        <Link to={`${url}/simulations`}>sims</Link>
      </li>
      <li>
        <Link to={`${url}/help`}>help</Link>
      </li>
      <li>
        <Link to={`${url}/settings`}>settings</Link>
      </li>
    </ul>
  )
}

export default Navbar
