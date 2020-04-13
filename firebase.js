require('firebase/firestore');
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyBa8bOTYhzHiTVQ7_NMEPT3ppa7S0LrdUc',
  authDomain: 'react-intro-blog-74815.firebaseapp.com',
  databaseURL: 'https://react-intro-blog-74815.firebaseio.com',
  projectId: 'react-intro-blog-74815',
  storageBucket: 'react-intro-blog-74815.appspot.com',
  messagingSenderId: '319435969393',
  appId: '1:319435969393:web:44fdc27c99948193da1cd0',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export const auth = firebase.auth();
export const firestore = firebase.firestore;
export default db;
