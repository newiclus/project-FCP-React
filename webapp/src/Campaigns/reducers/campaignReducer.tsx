import { ActionType } from 'redux-promise-middleware'

const initialState = {
  error: false,
  pending: false,
  campaign: {},
  status: ""
}

const CAMPAIGN_PENDING = `CAMPAIGN_${ActionType.Pending}`
const CAMPAIGN_FULFILLED = `CAMPAIGN_${ActionType.Fulfilled}`
const CAMPAIGN_REJECTED = `CAMPAIGN_${ActionType.Rejected}`

const CAMPAIGN_EDIT_PENDING = `CAMPAIGN_EDIT_${ActionType.Pending}`
const CAMPAIGN_EDIT_FULFILLED = `CAMPAIGN_EDIT_${ActionType.Fulfilled}`
const CAMPAIGN_EDIT_REJECTED = `CAMPAIGN_EDIT_${ActionType.Rejected}`


const CampaignReducer = (state = initialState, action:any) => {
  switch(action.type) {
    case CAMPAIGN_PENDING: {
      return {
        ...state,
        pending: true,
        status: "Cargando la Campaña"
      }
    }

    case CAMPAIGN_FULFILLED: {
      return {
        ...state,
        error: false,
        pending: false,
        campaign: action.payload,
      }
    }

    case CAMPAIGN_REJECTED: {
      return {
        ...state,
        pending: false,
        error: action.payload,
      }
    }

    case CAMPAIGN_EDIT_PENDING: {
      return {
        ...state,
        pending: true,
        status: "Editando Campaña"
      }
    }

    case CAMPAIGN_EDIT_FULFILLED: {
      return {
        ...state,
        error: false,
        pending: false,
        status: action.payload,
      }
    }

    case CAMPAIGN_EDIT_REJECTED: {
      return {
        ...state,
        pending: false,
        error: action.payload,
      }
    }

    default: return state
  }
}

export default CampaignReducer
