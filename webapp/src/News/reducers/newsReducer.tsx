import { ActionType } from 'redux-promise-middleware'

const initialState = {
  status: "no events",
  error: false,
  pending: false,
  list: [],
}

const NEWS_PENDING = `NEWS_${ActionType.Pending}`
const NEWS_FULFILLED = `NEWS_${ActionType.Fulfilled}`
const NEWS_REJECTED = `NEWS_${ActionType.Rejected}`

const NEWS_LIST_PENDING = `NEWS_LIST_${ActionType.Pending}`
const NEWS_LIST_FULFILLED = `NEWS_LIST_${ActionType.Fulfilled}`
const NEWS_LIST_REJECTED = `NEWS_LIST_${ActionType.Rejected}`


const NewsReducer = (state = initialState, action:any) => {
  switch(action.type) {
    case NEWS_PENDING: {
      return {
        ...state,
        pending: true,
        status: "Actualizando noticias"
      }
    }

    case NEWS_FULFILLED: {
      return {
        ...state,
        error: false,
        pending: false,
        status: action.payload,
      }
    }

    case NEWS_REJECTED: {
      return {
        ...state,
        pending: false,
        error: action.payload,
      }
    }

    case NEWS_LIST_PENDING: {
      return {
        ...state,
        pending: true,
        status: "Obteniendo lista de noticias"
      }
    }

    case NEWS_LIST_FULFILLED: {
      return {
        ...state,
        error: false,
        pending: false,
        list: action.payload,
      }
    }

    case NEWS_LIST_REJECTED: {
      return {
        ...state,
        pending: false,
        error: action.payload,
      }
    }

    default: return state
  }
}

export default NewsReducer
