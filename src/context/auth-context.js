import React, { useState } from 'react';
import firebase from '../Firebase';

var provider = new firebase.auth.GoogleAuthProvider();

export const AuthContext = React.createContext({
  user: null,
  token: null,
  login: () => {}
});

const AuthContextProvider = props => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  const loginHandler = () => {
    firebase.auth().signInWithPopup(provider).then(function(result) {
        setToken(result.credential.accessToken);
        setUser(result.user);
        console.log(user, token)
        return { user: user, token: token, attempt: true };

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
  };

  return (
    <AuthContext.Provider
      value={{ login: loginHandler, user, token }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;