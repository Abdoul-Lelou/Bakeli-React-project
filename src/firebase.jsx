import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDmi9wvoG616bFNAfQhrOhVSfrbvHymfSk",
  authDomain: "online-eduaction.firebaseapp.com",
  projectId: "online-eduaction",
  storageBucket: "online-eduaction.appspot.com",
  messagingSenderId: "869064024106",
  appId: "1:869064024106:web:a43bafe7739aba7707a353"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//firebase methods  
export const auth = firebase.auth();
export const db= firebase.database();
export const dbFirestore = firebase.firestore().collection("users");
export const dbFirestores = firebase.firestore();
export const dbCours = firebase.firestore().collection("cours");
export const dbArchive = firebase.firestore().collection("archive");
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()