import { createAction } from 'redux-actions'
import NewsService from '../services/NewsService'
import { INews } from '../NewsInterfaces'


const ProcessNewsAction = createAction('NEWS', async (id:any, newsData:INews) => {
  let response = null
  if (id && id !== "") {
    const objectNews = Object.assign({}, newsData, { updated: new Date() })
    delete objectNews.date
    
    response = await NewsService.updateNews(id, objectNews)
  } else {
    response = await NewsService.addNews(newsData)
  }
  
  return response
})


const GetNewsAction = createAction('NEWS_LIST', async () => {
  const response = await NewsService.getNews()
  return response
})


export {
  ProcessNewsAction,
  GetNewsAction,
}
