import { ActionType } from 'redux-promise-middleware'

const initialState = {
  error: false,
  pending: false,
  report: null,
}

const REPORT_PENDING = `REPORT_${ActionType.Pending}`
const REPORT_FULFILLED = `REPORT_${ActionType.Fulfilled}`
const REPORT_REJECTED = `REPORT_${ActionType.Rejected}`


const ReportReducer = (state = initialState, action:any) => {
  switch(action.type) {
    case REPORT_PENDING: {
      return {
        ...state,
        pending: true,
      }
    }

    case REPORT_FULFILLED: {
      return {
        ...state,
        error: false,
        pending: false,
        report: action.payload,
      }
    }

    case REPORT_REJECTED: {
      return {
        ...state,
        pending: false,
        error: action.payload,
      }
    }

    default: return state
  }
}

export default ReportReducer
