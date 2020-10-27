import { ActionType } from 'redux-promise-middleware'

const initialState = {
  error: false,
  pending: false,
  user: null,
}

const USER_PENDING = `USER_${ActionType.Pending}`
const USER_FULFILLED = `USER_${ActionType.Fulfilled}`
const USER_REJECTED = `USER_${ActionType.Rejected}`

const USER_LOGOUT_PENDING = `USER_LOGOUT_${ActionType.Pending}`
const USER_LOGOUT_FULFILLED = `USER_LOGOUT_${ActionType.Fulfilled}`
const USER_LOGOUT_REJECTED = `USER_LOGOUT_${ActionType.Rejected}`


const AuthReducer = (state = initialState, action:any) => {
  switch(action.type) {
    case USER_PENDING: {
      return {
        ...state,
        error: false,
        pending: true,
      }
    }

    case USER_FULFILLED: {
      return {
        ...state,
        error: false,
        pending: false,
        user: action.payload,
      }
    }

    case USER_REJECTED: {
      return {
        ...state,
        pending: false,
        error: action.payload,
      }
    }

    case USER_LOGOUT_PENDING: {
      return {
        ...state,
        pending: true,
      }
    }

    case USER_LOGOUT_FULFILLED: {
      return {
        ...state,
        error: false,
        pending: false,
        user: false,
      }
    }

    case USER_LOGOUT_REJECTED: {
      return {
        ...state,
        pending: false,
        error: action.payload,
      }
    }

    default: return state
  }
}

export default AuthReducer
