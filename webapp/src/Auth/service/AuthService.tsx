import firebase from '../../Api/firebase'

const { auth } = firebase

class AuthService {
  static login(email:string, password:string) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await auth().signInWithEmailAndPassword(email, password)
        const authUser = data.user

        resolve(authUser)
      } catch (error) {
        const { code } = error

        if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
          error.message = 'Email o contraseña invalidos'
        }

        reject(error)
      }
    })
  }

  static logOut() {
    return auth().signOut()
  }

  static isLoggedIn() {
    return !!auth().currentUser
  }

  static getLoggedInUser() {
    return new Promise(async (resolve, reject) => {
      try {
        const { currentUser } = await auth()

        resolve(currentUser)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default AuthService
