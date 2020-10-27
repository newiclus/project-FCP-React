import React, { useState } from 'react'
import { Button, Confirm, Form, Checkbox, Grid, Header } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import Dropzone, { IDropzoneProps } from 'react-dropzone-uploader'

import { ReportUploadAction } from '../actions/reportActions'
import MainLayout from '../../common/layout/MainLayout'
import ProgressWithMessage from '../../common/ProgressWithMessage/ProgressWithMessage'
import parseFilename from '../../utils/parseFilename'
import './Dropzone.css'


const UploadData = () => {
  /** Dialog */
  const [open, setOpen] = useState(false)
  /** DropFile */
  const [metadata, setMetadata] = useState({})
  const [isEndMonth, setIsEndMonth] = useState(false)
  const report = useSelector((state: any) => state.report)
  const dispatchUpload = useDispatch()

  const getUploadParams: IDropzoneProps['getUploadParams'] = () => { 
    return { url: 'https://httpbin.org/post' } 
  }
  
  // called every time a file's `status` changes
  const handleChangeStatus: IDropzoneProps['onChangeStatus'] = ({ meta, file }, status) => {
    if (status === 'headers_received') {
      setOpen(true) // Open Dialog
    }

    if (status === 'done' || status === 'headers_received') {
      const getNameMonth = parseFilename(file.name)
      const customMetadata = {
        'endMonth': String(isEndMonth),
        'month': getNameMonth.month,
        'year': getNameMonth.year
      }
      setMetadata( Object.assign({}, meta, { customMetadata }, getNameMonth) )
    }
  }
  
  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
    dispatchUpload(ReportUploadAction(files[0].file, metadata))
    allFiles.forEach(f => f.remove())
  }

  const handleChangeChk = (event:any, data:any) => {
    setIsEndMonth(data.checked)
  }

  const handleConfirm = () => {
    setIsEndMonth(true)
    setOpen(false)
  }
  const handleCancel = () => {
    setIsEndMonth(false)
    setOpen(false)
  }

  return (
    <MainLayout>
      { report.pending && <ProgressWithMessage message="El reporte se esta subiendo" /> }

      <Grid>
        <Grid.Column>
          <Header as='h2' className="title">
            Actualización diaria
          </Header>
          <Form size='large' className="upload-report">
            <div className="ui aligned left" style={{ textAlign: 'left' }}>
              <Checkbox label="¿Este reporte es un cierre de mes?" toggle onChange={handleChangeChk} checked={isEndMonth} />
            </div>
            <Dropzone
              getUploadParams={getUploadParams}
              onChangeStatus={handleChangeStatus}
              onSubmit={handleSubmit}
              submitButtonContent="Procesar"
              inputContent="Arrastre el archivo o click para buscarlo"
              maxFiles={1}
              multiple={false}
              accept="text/csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            />
          </Form>
        
          <Confirm
            open={open}
            cancelButton='No'
            confirmButton='Si'
            content='¿Este reporte es un cierre de mes?'
            onCancel={handleCancel}
            onConfirm={handleConfirm}
            size='tiny'
          />
        </Grid.Column>
      </Grid>
    </MainLayout>
  )
}

export default UploadData