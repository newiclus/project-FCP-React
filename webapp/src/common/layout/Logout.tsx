import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

import { UserLogoutAction } from '../../Auth/actions/authActions'
import Routes from '../../config/routes'
import './Logout.css'

const Logout = () => {
  const [isLogout, setIsLogout] = useState(false)
  const dispatchLogout = useDispatch()

  const handleLogOutUser = async () => {
    const { action }:any = await dispatchLogout(UserLogoutAction())

    if (action.type === "USER_LOGOUT_FULFILLED") {
      setIsLogout(true)
    }
  }

  return (
    isLogout ? (
      <Redirect to={Routes.LOGIN}/>
    ) : (
      <div className="Logout-bottom">
        <Button 
          inverted
          basic
          color='teal'
          labelPosition='right'
          content='cerrar sesión' 
          icon='power off' 
          size='medium' 
          onClick={handleLogOutUser} />
      </div>
    )
  )
}

export default Logout
