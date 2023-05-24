// Estas claves son públicas - lo importante es poner en la console de firebase
// el dominio desde el cual pueden utilizarse de manera exclusiva
import { userStatus } from '@/components/hooks/useUser'
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  getDocs
} from 'firebase/firestore'

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

const DATABASES = {
  DEVITS: 'devits'
}

const app = initializeApp(firebaseConfig)

const database = getFirestore(app)
const collectionRef = collection(database, DATABASES.DEVITS)

const auth = getAuth(app)
const provider = new GithubAuthProvider()

const normalizedUser = user => {
  const { displayName: username, photoURL: avatarURL, email, uid } = user
  return {
    username,
    avatarURL,
    email,
    uid
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

export const addDevit = async ({ avatar, content, userId, userName }) => {
  return await addDoc(collectionRef, {
    avatar,
    content,
    userId,
    userName,
    createdAt: Timestamp.fromDate(new Date()),
    likesCunt: 0,
    shareCount: 0
  })
}

export const fetchLatestDevits = async () => {
  console.log('fetching! //--> ')

  return getDocs(collectionRef)
    .then(({ docs }) => {
      // docSnapshot.forEach((doc) => {
      //   console.log(doc.id, ' => ', doc.data())
      // })
      return docs.map(doc => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data
        const date = new Date(createdAt.seconds * 1000)
        const normalizeCreatedAt = new Intl.DateTimeFormat('es-AR').format(date)

        return {
          ...data,
          id,
          createdAt: normalizeCreatedAt
        }
      })
    })
}
