import * as firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyCSci7KYsMHf3qjdNCazu5y-zyQYpuCaIs",
  authDomain: "wireleibrary-app.firebaseapp.com",
  databaseURL: "https://wireleibrary-app.firebaseio.com",
  projectId: "wireleibrary-app",
  storageBucket: "wireleibrary-app.appspot.com",
  messagingSenderId: "753389289639",
  appId: "1:753389289639:web:7d4f70e6cfc651f0db1b82"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
