import React, {useState, useEffect ,ChangeEvent} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  Button,
  Container,
  Divider,
  Form, 
  Header,
  Sidebar, 
  InputOnChangeData 
} from 'semantic-ui-react'

import { INews } from '../NewsInterfaces'
import { ProcessNewsAction, GetNewsAction } from '../actions/newsActions'
import MainLayout from '../../common/layout/MainLayout'
import TextEditor from '../../common/TextEditor'
import ProgressWithMessage from '../../common/ProgressWithMessage/ProgressWithMessage'
import ListNews from '../components/ListNews'
import './AddNews.scss'


const monthOptions = [
  { key: 'ene', text: 'Enero', value: 'enero' },
  { key: 'feb', text: 'Febrero', value: 'febrero' },
  { key: 'mar', text: 'Marzo', value: 'marzo' },
  { key: 'abr', text: 'Abril', value: 'abril' },
  { key: 'may', text: 'Mayo', value: 'mayo' },
  { key: 'jun', text: 'Junio', value: 'junio' },
  { key: 'jul', text: 'Julio', value: 'julio' },
  { key: 'ago', text: 'Agosto', value: 'agosto' },
  { key: 'set', text: 'Setiembre', value: 'setiembre' },
  { key: 'oct', text: 'Octubre', value: 'octubre' },
  { key: 'nov', text: 'Noviembre', value: 'noviembre' },
  { key: 'dic', text: 'Diciembre', value: 'diciembre' },
]


const AddNews = () => {
  const news = useSelector((state: any) => state.news)
  const { status, pending, list } = news
  const dispatchAction = useDispatch()

  const [idActive, setIdActive]:any = useState("")
  const [textAction, setTextAction] = useState("Agregar")
  const [title, setTitle] = useState("")
  const [source, setSource] = useState("")
  const [image, setImage] = useState("")
  const [month, setMonth] = useState("setiembre")
  const [content, setContent] = useState("")
  const [listNews, setListNews] = useState(list)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    dispatchAction(GetNewsAction())
  }, [dispatchAction, listNews])

  const handleTextField = (event:ChangeEvent, data:InputOnChangeData) => {
    const { name, value } = data
    
    if (name === "title") {
      setTitle(value)
    }
    if (name === "source") {
      setSource(value)
    }
    if (name === "image") {
      setImage(value)
    }
  }

  const handleMonth = (event:any, data:any) => {
    setMonth(data.value)
  }

  const handleEditor = (value:string) => {
    setContent(value)
  }

  const handleBtnProcessNews = async () => {
    await dispatchAction(
      ProcessNewsAction(idActive, {
        title,
        source,
        content,
        month,
        image,
        date: new Date()
      }
    ))
    
    setListNews(idActive)
    handleBtnAddNews()
  }

  const handleEditNews = (id:string) => {
    const getNewById:INews = list.filter((item:INews) => item.id === id )[0]

    setTitle(getNewById.title)
    setSource(getNewById.source)
    setImage(getNewById.image)
    setMonth(getNewById.month)
    setContent(getNewById.content)

    setTextAction("Editar")
    setIdActive(getNewById.id)
    setVisible(false)
  }

  const handleBtnAddNews = () => {
    setTitle("")
    setSource("")
    setImage("")
    setMonth("enero")
    setContent("")

    setTextAction("Agregar")
    setIdActive("")
    setVisible(false)
  }

  return (
    <MainLayout>
      { pending && <ProgressWithMessage message={status} /> }
      
      <Sidebar.Pushable as={Container} className="news">
        <Sidebar
          as={Container}
          animation='overlay'
          icon='labeled'
          visible={visible}
          onHide={() => setVisible(false)}
          width="wide"
        >
          <div>
            <Button
              basic
              size="medium"
              icon="plus"
              content="Agregar"
              onClick={handleBtnAddNews} />
          </div>
          <Divider />
          <Header as='h3' color='blue'>
            Últimas Noticias
          </Header>
          <ListNews items={list} onEditButton={handleEditNews} />
        </Sidebar>

        <Sidebar.Pusher>
          <Button icon='bars' label="Ver noticias" onClick={() => setVisible(true)} />
          <Header as='h2' className="title">
            {textAction} noticia
          </Header>
          <Form size='large'>
            <Form.Input 
              label="Título:"
              fluid icon='heading'
              iconPosition='left'
              onChange={handleTextField}
              placeholder='Escriba un título para la noticia...'
              type='text'
              name="title"
              value={title} />

            <Form.Input 
              label="Fuente:"
              fluid icon='copyright outline'
              iconPosition='left'
              onChange={handleTextField}
              placeholder='Escriba la fuente de la noticia'
              type='text'
              name="source"
              value={source} />

            <Form.Input 
              label="Imagen:"
              fluid icon='linkify'
              iconPosition='left'
              onChange={handleTextField}
              placeholder='Coloque el link de la imagen'
              type='text'
              name="image"
              value={image} />

            <Form.Select 
              label="Mes de la noticia:"
              value={month}
              options={monthOptions}
              onChange={handleMonth}
              placeholder='Mes de publicación'
            />

            <TextEditor 
              label="Contenido de noticia:" 
              initValue={content} 
              name="newsContent"
              onEditorChange={handleEditor} />
            <br />
            <Button primary fluid size='large' onClick={handleBtnProcessNews}>{textAction} noticia</Button>
          </Form>
      
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </MainLayout>
  )
}
export default AddNews