import React, { ChangeEvent, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  Button,
  Form, 
  Grid, 
  Header,
  InputOnChangeData, 
  GridColumn
} from 'semantic-ui-react'

import { ICampaign } from '../CampaignInterfaces'
import { GetCampaignAction, UpdateCampaignAction } from '../actions/CampaignActions'
import CampaignService from '../services/CampaignService'
import MainLayout from '../../common/layout/MainLayout'
import ProgressWithMessage from '../../common/ProgressWithMessage/ProgressWithMessage'
import TextEditor from '../../common/TextEditor'

const EditCampaign = () => {
  const dataCampaign = useSelector((state: any) => state.campaign)
  const { pending, status } = dataCampaign
  const dispatchAction = useDispatch()

  let avoidBuble = ""
  const [loaded, setLoaded] = useState(false)
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const [blqOneTitle, setBlqOneTitle] = useState("")
  const [blqOneContent, setBlqOneContent] = useState("")

  const [blqTwoTitle, setBlqTwoTitle] = useState("")
  const [blqTwoContent, setBlqTwoContent] = useState("")

  const [blqThreeTitle, setBlqThreeTitle] = useState("")
  const [blqThreeContent, setBlqThreeContent] = useState("")

  const [blqFourTitle, setBlqFourTitle] = useState("")
  const [blqFourContent, setBlqFourContent] = useState("")

  const loadCampaignData = async () => {
    const result:any = await dispatchAction(GetCampaignAction())
    const data:ICampaign = result.value

    const { 
      from, 
      to, 
      blockOne, 
      blockTwo, 
      blockThree, 
      blockFour 
    } = data

    setDateFrom(from)
    setDateTo(to)

    setBlqOneTitle(blockOne.title)
    setBlqOneContent(blockOne.content)

    setBlqTwoTitle(blockTwo.title)
    setBlqTwoContent(blockTwo.content)

    setBlqThreeTitle(blockThree.title)
    setBlqThreeContent(blockThree.content)

    setBlqFourTitle(blockFour.title)
    setBlqFourContent(blockFour.content)

    setLoaded(true)
  }

  useEffect(() => {
    loadCampaignData()
  }, [avoidBuble])

  const handleTextField = (event:ChangeEvent, data:InputOnChangeData) => {
    const { name, value } = data

    if (name === "dateFrom") {
      setDateFrom(value)
    }

    if (name === "dateTo") {
      setDateTo(value)
    }
    
    if (name === "blqOneTitle") {
      setBlqOneTitle(value)
    }

    if (name === "blqTwoTitle") {
      setBlqTwoTitle(value)
    }

    if (name === "blqThreeTitle") {
      setBlqThreeTitle(value)
    }

    if (name === "blqFourTitle") {
      setBlqFourTitle(value)
    }
  }

  const handleEditorBlqContent = (value:string, id:string) => {
    if (id === "blqOneContent") {
      setBlqOneContent(value)
    }

    if (id === "blqTwoContent") {
      setBlqTwoContent(value)
    }

    if (id === "blqThreeContent") {
      setBlqThreeContent(value)
    }

    if (id === "blqFourContent") {
      setBlqFourContent(value)
    }
  }

  const handleUpdateCampaign = async () => {
    const { id } = dataCampaign.campaign

    await dispatchAction(
      UpdateCampaignAction(id, {
        from: dateFrom,
        to: dateTo,
        blockOne: {
          title: blqOneTitle,
          content: blqOneContent
        },
        blockTwo: {
          title: blqTwoTitle,
          content: blqTwoContent
        },
        blockThree: {
          title: blqThreeTitle,
          content: blqThreeContent
        },
        blockFour: {
          title: blqFourTitle,
          content: blqFourContent
        },
        updated: new Date()
      }
    ))
  }

  const handleUploadImage = (blobInfo:any, success:Function, failure:Function) => {
    CampaignService.uploadImage(blobInfo.blob(), blobInfo.filename())
    .then((imageUrl) => {
      success(imageUrl)
    })
    .catch((error) => {
      throw Error(error)
    })
  }

  return (
    <MainLayout>
      { pending && <ProgressWithMessage message={status} /> }
      <Grid relaxed='very'>
        <GridColumn>
          <Header as='h2'  className="title">
            Actualizar Campaña
          </Header>
          { loaded && (
            <Form size='large'>
              <Form.Input
                label="Desde:"
                fluid icon='calendar'
                iconPosition='left' 
                placeholder='Día de inicio' 
                type='text'
                onChange={handleTextField}
                value={dateFrom}
                name="dateFrom" />
              
              <Form.Input
                label="Hasta:"
                fluid icon='calendar'
                iconPosition='left' 
                placeholder='Día final' 
                type='text'
                onChange={handleTextField}
                value={dateTo}
                name="dateTo" />

              <br />
              <Form.Input 
                label="Bloque Uno:"
                fluid
                placeholder='Título del bloque'
                type='text'
                onChange={handleTextField}
                value={blqOneTitle}
                name="blqOneTitle" />
              <TextEditor 
                initValue={blqOneContent}
                uploadImageHandler={handleUploadImage}
                name="blqOneContent"
                onEditorChange={handleEditorBlqContent} />
              
              <br />
              <Form.Input 
                label="Bloque Dos:"
                fluid
                placeholder='Título del bloque'
                type='text'
                onChange={handleTextField}
                value={blqTwoTitle}
                name="blqTwoTitle" />
              <TextEditor 
                initValue={blqTwoContent}
                uploadImageHandler={handleUploadImage}
                name="blqTwoContent"
                onEditorChange={handleEditorBlqContent} />

              <br />
              <Form.Input 
                label="Bloque Tres:"
                fluid
                placeholder='Título del bloque'
                type='text'
                onChange={handleTextField}
                value={blqThreeTitle}
                name="blqThreeTitle" />
              <TextEditor 
                initValue={blqThreeContent}
                uploadImageHandler={handleUploadImage}
                name="blqThreeContent"
                onEditorChange={handleEditorBlqContent} />
              
              <br />
              <Form.Input 
                label="Bloque Cuatro:"
                fluid
                placeholder='Título del bloque'
                type='text'
                onChange={handleTextField}
                value={blqFourTitle}
                name="blqFourTitle" />
              <TextEditor 
                initValue={blqFourContent}
                name="blqFourContent"
                onEditorChange={handleEditorBlqContent} />

              <br />
              <Button 
                primary fluid 
                size='large' 
                onClick={handleUpdateCampaign}
              >
                Actualizar
              </Button>
            </Form>
          )}
        </GridColumn>
      </Grid>
    </MainLayout>
  )
}

export default EditCampaign