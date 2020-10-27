import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthService from '../service/AuthService'
import Routes from '../../config/routes'

interface IPrivateRoute {
  component: Function
  exact: boolean
  path: string
  rest?: any
}

const PrivateRoute = ({component: Component, ...rest}: IPrivateRoute) => (
  <Route
    {...rest}
    render={
      props => (
        AuthService.isLoggedIn()
          ? (
            <Component {...props} />
          ) : (
            <Redirect 
              to={{
                pathname: Routes.LOGIN,
                state: {
                  from: props.location,
                },
              }}
            />
          )
      )
    }
  />
)


export default PrivateRoute
