import firebase from '../../Api/firebase'

const db = firebase.firestore()

class NewsService {
  static addNews(news:object) {
    return new Promise(async(resolve, reject) => {
      try {
        const docRef = await db.collection("news").add(news)
        resolve(docRef.id)
      } catch (error) {
        console.error("Error adding document: ", error)
        reject(error)
      }
    })
  }

  static updateNews(id:string, news:object) {
    return new Promise(async(resolve, reject) => {
      try {
        const docRef = await db.collection("news").doc(id).set(news, { merge: true })
        resolve(docRef)
      } catch (error) {
        console.error("Error adding document: ", error)
        reject(error)
      }
    })
  }

  static getNews() {
    return new Promise(async(resolve, reject) => {
      try {
        const newsRef = await db.collection("news").orderBy("date", "desc").limit(6).get()
        const listNews = newsRef.docs.map(
          doc => Object.assign({}, { id: doc.id }, doc.data())
        )

        resolve(listNews)
      } catch (error) {
        console.error("Error getting documents: ", error)
        reject(error)
      }
    })
  }
}

export default NewsService