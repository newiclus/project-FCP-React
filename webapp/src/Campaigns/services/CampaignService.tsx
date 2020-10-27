import firebase from '../../Api/firebase'

const db = firebase.firestore()
const storageRef = firebase.storage().ref()

class CampaignService {
  static updateCampaign(id:string, campaign:object) {
    return new Promise(async(resolve, reject) => {
      try {
        const docRef = await db.collection("campaigns").doc(id).set(campaign)
        resolve(docRef)
      } catch (error) {
        console.error("Error adding document: ", error)
        reject(error)
      }
    })
  }

  static getCampaign() {
    return new Promise(async(resolve, reject) => {
      try {
        const campaignRef = await db.collection("campaigns").get()
        const listCampaign = campaignRef.docs.map(
          doc => Object.assign({}, { id: doc.id }, doc.data())
        )

        resolve(listCampaign[0])
      } catch (error) {
        console.error("Error getting documents: ", error)
        reject(error)
      }
    })
  }

  static uploadImage(file:Blob, name:string) {
    // Create the reference
    const PATH_FOLDER = 'campaigns'
    const reportFileRef = storageRef.child(`${PATH_FOLDER}/${name}`)

    return new Promise(async (resolve, reject) => {
      try {
        const dataImage = await reportFileRef.put(file)
        const imageURL = await storageRef.child(dataImage.ref.fullPath).getDownloadURL()
        
        resolve(imageURL)
      } catch (error) {
        const { code } = error

        switch (code) {
          case 'storage/unauthorized':
            error.message = 'El usuario no tiene permiso para acceder al objeto'
            break
      
          case 'storage/canceled':
            error.message = 'El usuario canceló la subida del archivo'
            break

          default:
            error.message = 'Error desconocido, inspeccione la respuesta del servidor'
            break
        }

        reject(error)
      }
    })
  }
}

export default CampaignService