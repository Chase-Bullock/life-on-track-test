import { db, auth } from "../Firebase";


export async function signup({
    email,
    password,
    displayName = "No Name",
    photoURL = "https://placekitten.com/200/200",
  }) {
    try {
      const { user } = await auth().createUserWithEmailAndPassword(
        email,
        password
      )
      await user.updateProfile({ displayName, photoURL })
      await db.doc(`users/${user.uid}`).set({
        displayName: displayName,
        uid: user.uid,
        photoURL: photoURL,
        createdAt: Date.now
      })
    } catch (e) {
      throw e
    }
  }
  
  export function login(email, password) {
    console.log("logging in...")
    return auth().signInWithEmailAndPassword(email, password)
  }
  
  export function logout() {
    return auth().signOut()
  }
  
  export function onAuthStateChanged(callback) {
    return auth().onAuthStateChanged(callback)
  }
  