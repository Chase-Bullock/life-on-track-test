import * as firebase from 'firebase';
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyB9VIxIKm8TCcXe1qdGHrVzvf1n5s5oU5w",
    authDomain: "life-on-track-8096c.firebaseapp.com",
    databaseURL: "https://life-on-track-8096c.firebaseio.com",
    projectId: "life-on-track-8096c",
    storageBucket: "life-on-track-8096c.appspot.com",
    messagingSenderId: "872915757737",
    appId: "1:872915757737:web:2820ef091dda14b8f5d7b8"
  };

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export const auth = () => firebase.auth();


export default firebase;