import { limitCalls, getDocsFromSnapshot } from "./actions";
import { db } from "../Firebase";

export const addNewActivityTypeService = async (newActivityType) => {
  console.log(newActivityType);
  return db
    .collection("activityType")
    .add({ createdAt: Date.now(), ...newActivityType })
    .then((ref) => ref.get())
    .then((doc) => ({ ...doc.data(), id: doc.id }));
};

export const updateActivityTypeService = async (updateActivityType) => {
  console.log(updateActivityType);
  db.doc(`activityType/${updateActivityType.uid}`)
    .add({ updatedAt: Date.now(), ...updateActivityType })
    .then((ref) => ref.get())
    .then((doc) => ({ ...doc.data(), id: doc.id }));
};

export const fetchActivityTypes = limitCalls(function fetchActivityTypes(
  uid,
  callback
) {
  let collection = db
    .collection("activityType")
    .orderBy("createdAt")
    .where("uid", "==", uid);
  return collection.onSnapshot((snapshot) =>
    callback(getDocsFromSnapshot(snapshot))
  );
});
