import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { selectIsAuthenticated } from './authSlice'

const ProtectedRoute = ({ children, ...rest }: RouteProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default ProtectedRoute
