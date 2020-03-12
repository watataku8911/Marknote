import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCXDRV4lUaZTLDdunOvOv_7y3adibiqfcY",
    authDomain: "marknote-e7f85.firebaseapp.com",
    databaseURL: "https://marknote-e7f85.firebaseio.com",
    projectId: "marknote-e7f85",
    storageBucket: "marknote-e7f85.appspot.com",
    messagingSenderId: "711337142219",
    appId: "1:711337142219:web:2a7b0218046e2caebcb84e",
    measurementId: "G-QHY1ZDR59T"
  })
}

export default firebase