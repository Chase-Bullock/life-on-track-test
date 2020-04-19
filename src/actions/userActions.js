import { db, auth } from "../Firebase";
import { format as formatDate } from "date-fns";
export const DATE_FORMAT = "yyyy-mm-dd"

export async function signup(userObj) {
  const {
    email,
    password,
    displayName = "No Name",
    photoURL = "https://placekitten.com/200/200",
  } = userObj;
  try {
    const { user } = await auth().createUserWithEmailAndPassword(
      email,
      password
    );
    const date = formatDate(new Date(), DATE_FORMAT);
    await user.updateProfile({ displayName, photoURL });
    await db.doc(`users/${user.uid}`).set({
      displayName: displayName,
      uid: user.uid,
      photoURL: photoURL,
      createdAt: date,
    });
  } catch (e) {
    throw e;
  }
}

export function login(email, password) {
  console.log("logging in...");
  return auth().signInWithEmailAndPassword(email, password);
}

export function logout() {
  return auth().signOut();
}

export function onAuthStateChanged(callback) {
  return auth().onAuthStateChanged(callback);
}
