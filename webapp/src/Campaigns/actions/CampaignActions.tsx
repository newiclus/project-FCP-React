import { createAction } from 'redux-actions'
import CampaignService from '../services/CampaignService'


const UpdateCampaignAction = createAction('CAMPAIGN_EDIT', async (id:string, campaignData:any) => {
  const objectCampaign = Object.assign({}, campaignData, { updated: new Date() })
  const response = await CampaignService.updateCampaign(id, objectCampaign)

  return response
})


const GetCampaignAction = createAction('CAMPAIGN', async () => {
  const response = await CampaignService.getCampaign()

  return response
})


export {
  UpdateCampaignAction,
  GetCampaignAction,
}
