import { limitCalls, getDocsFromSnapshot } from "./actions";
import { db } from "../Firebase";

export const addNewActivityService = async (newActivity) => {
  console.log(newActivity);
  return db
    .collection("activity")
    .add({ createdAt: Date.now(), ...newActivity })
    .then((ref) => ref.get())
    .then((doc) => ({ ...doc.data(), id: doc.id }));
};

export const updateActivityService = async (updateActivity) => {
  console.log(updateActivity);
  let activity = db.doc(`activity/${updateActivity.id}`);
  console.log('firebase', activity)
    activity.update({ updatedAt: Date.now(), ...updateActivity })
};

export const fetchActivities = limitCalls(function fetchActivities(
  uid,
  callback
) {
  let collection = db
    .collection("activity")
    .orderBy("createdAt")
    .where("uid", "==", uid);
  return collection.onSnapshot((snapshot) =>
    callback(getDocsFromSnapshot(snapshot))
  );
});
