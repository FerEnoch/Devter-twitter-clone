// Estas claves son públicas - lo importante es poner en la console de firebase
// el dominio desde el cual pueden utilizarse de manera exclusiva
import { userStatus } from '@/components/hooks/useUser'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  onAuthStateChanged
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDFhr9chpxggEXKmlef_uL1cgJh5yPCdes',
  authDomain: 'devter-59aff.firebaseapp.com',
  projectId: 'devter-59aff',
  storageBucket: 'devter-59aff.appspot.com',
  messagingSenderId: '1022675825504',
  appId: '1:1022675825504:web:b13e72c75c5bdc3057e405',
  measurementId: 'G-26TE6KYX4S'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GithubAuthProvider()

const normalizedUser = user => {
  const { displayName: username, photoURL: avatarURL, email } = user
  return {
    username,
    avatarURL,
    email
  }
}

export const loginWithGitHub = async () => {
  return signInWithPopup(auth, provider)
    .then(normalizedUser)
    .catch(error => {
      console.table(
        {
          'Something went wrong': ':(',
          'error.message //--> ': error.message,
          'error.code //--> ': error.code
        })
    })
}

export const authStateChange = ({ setUser: onChange, setStatus }) => onAuthStateChanged(auth, user => {
  if (!user) {
    setStatus(userStatus.LOGGED_OUT)
    return console.log('user has logged out')
  }
  console.log('user is logged in')
  setStatus(userStatus.LOGGED_IN)
  onChange(normalizedUser(user))
})
