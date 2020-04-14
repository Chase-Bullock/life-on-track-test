import { initStore } from './store';
import firebase from '../Firebase';


var provider = new firebase.auth.GoogleAuthProvider();


const configureStore = () => {
  const actions = {
    LOGIN: () => {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
            localStorage.setItem("user", user);
            localStorage.setItem("token", token);
            return { user: user, token: token };

          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            return (errorCode, email, credential, errorMessage)
          });
    },
    LOGOUT: () => {
        firebase.auth().signOut().then(function() {
            return { user: null, token: null }
          }).catch(function(error) {
            // An error happened.
          });
    }
  };
  initStore(actions, {
   user: localStorage.getItem('user'),
   token : localStorage.getItem('token'),
  });
};

export default configureStore;