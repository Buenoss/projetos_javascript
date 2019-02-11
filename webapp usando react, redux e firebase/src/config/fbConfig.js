import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCfWudA7o0-BAdvO0EEtPyUKqQHnD_JRr0",
    authDomain: "react-redux-firebase-teste.firebaseapp.com",
    databaseURL: "https://react-redux-firebase-teste.firebaseio.com",
    projectId: "react-redux-firebase-teste",
    storageBucket: "react-redux-firebase-teste.appspot.com",
    messagingSenderId: "184228596872"
  };
  firebase.initializeApp(config);
  firebase.firestore().settings({})

  export default firebase;