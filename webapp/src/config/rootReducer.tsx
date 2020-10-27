import { combineReducers } from 'redux'

import AuthReducer from '../Auth/reducers/authReducer'
import CampaignReducer from '../Campaigns/reducers/campaignReducer'
import NewsReducer from '../News/reducers/newsReducer'
import ReportReducer from '../Report/reducers/reportReducer'

const rootReducer = combineReducers({
  auth: AuthReducer,
  campaign: CampaignReducer,
  news: NewsReducer,
  report: ReportReducer,
})

export default rootReducer