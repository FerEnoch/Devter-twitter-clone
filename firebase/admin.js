// const admin = require('firebase-admin')
const { initializeApp, cert, getApps } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const { serviceAccount } = require('./firebase-keys.js')

const apps = getApps()
const adminApp = !apps.length && initializeApp({
  credential: cert(serviceAccount)
})

export const databaseAdmin = getFirestore(adminApp)
