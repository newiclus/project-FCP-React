import { createAction } from 'redux-actions'
import UploadService from '../service/UploadService'


const ReportUploadAction = createAction('REPORT', async (file:File, metadata:object) => {
  const response = await UploadService.upload(file, metadata)
  return response
})


export {
  ReportUploadAction
}
