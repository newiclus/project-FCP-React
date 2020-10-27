import firebase from '../../Api/firebase'

const storageRef = firebase.storage().ref()

class UploadService {
  static upload(file:File, metadata:any) {
    // Create the reference
    const PATH_FOLDER = 'assessors_reports'

    const reportFileRef = storageRef.child(`${PATH_FOLDER}/${metadata.name}`)

    return new Promise(async (resolve, reject) => {
      try {
        const data = await reportFileRef.put(file, metadata)
        resolve(data)
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

export default UploadService
