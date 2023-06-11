// Estas claves son públicas - lo importante es poner en la console de firebase
// el dominio desde el cual pueden utilizarse de manera exclusiva
import { USER_STATUS } from '@/components/hooks/useUser'
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  // getDocs,
  orderBy,
  query,
  onSnapshot,
  limit
} from 'firebase/firestore'

import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  onAuthStateChanged
} from 'firebase/auth'

import {
  getStorage,
  ref,
  uploadBytesResumable
} from 'firebase/storage'

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)

export const DATABASES = {
  DEVITS: 'devits'
}

export const clientApp = initializeApp(firebaseConfig)

const databaseClient = getFirestore(clientApp)

const devitsCollectionRef = collection(databaseClient, DATABASES.DEVITS)

const auth = getAuth(clientApp)
const provider = new GithubAuthProvider()

const storage = getStorage(clientApp)

const mapUserFromFirebaseToUser = user => {
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
    .then(mapUserFromFirebaseToUser)
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
    setStatus(USER_STATUS.LOGGED_OUT)
    return
  }
  setStatus(USER_STATUS.LOGGED_IN)
  onChange(mapUserFromFirebaseToUser(user))
})

export const addDevit = async ({ avatar, content, userId, userName, img }) => {
  return await addDoc(devitsCollectionRef, {
    avatar,
    content,
    userId,
    userName,
    img,
    createdAt: Timestamp.fromDate(new Date()),
    likesCunt: 0,
    shareCount: 0
  })
}

const mapDevitsFromFirebaseToDevitsObject = doc => {
  const data = doc.data()
  const id = doc.id
  const { createdAt } = data
  return {
    ...data,
    id,
    createdAt: +createdAt.toDate()
  }
}

export const listenLatestDevits = handleUpdatedDevits => {
  const q = query(devitsCollectionRef, orderBy('createdAt', 'desc'))
  return onSnapshot(q, ({ docs }) => {
    const updatedDevits = docs.map(mapDevitsFromFirebaseToDevitsObject)
    handleUpdatedDevits(updatedDevits)
  })
}

export const uploadImage = (file) => {
  const imagesRef = ref(storage, `/images/${file.name}`)
  return uploadBytesResumable(imagesRef, file)
}
