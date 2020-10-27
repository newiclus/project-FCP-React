import { createAction } from 'redux-actions'
import AuthService from '../service/AuthService'


const UserLoginAction = createAction('USER', async (email: string, password: string) => {
  const response = await AuthService.login(email, password)
  return response
})

const UserLogoutAction = createAction('USER_LOGOUT', async () => {
  const response = await AuthService.logOut()
  return response
})

export {
  UserLoginAction,
  UserLogoutAction
}
