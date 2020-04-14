import { db, auth } from '../Firebase';


const setUser = (user) => {
    return {
        type: 'LOGIN',
        payload: user
    }
}

function error(err){
    return {
        type: 'ERROR',
        payload: err
    }
}


export const addNewTaskType = async (newTask)  =>  {
    return db
    .collection("taskType")
    .add({ createdAt: Date.now(), ...newTask })
    .then(ref => ref.get())
    .then(doc => ({ ...doc.data(), id: doc.id }))
}


export const fetchTaskTypes = limitCalls(function fetchTaskTypes(
    uid,
    callback
  ) {
    let collection = db
      .collection("taskType")
      .orderBy("createdAt")
      .where("uid", "==", uid)
    return collection.onSnapshot(snapshot =>
      callback(getDocsFromSnapshot(snapshot))
    )
  })
  
  function limitCalls(fn, limit = 20) {
    let calls = 0
    return (...args) => {
      calls++
      if (calls > limit) {
        throw new Error(
          `EASY THERE: You've called "${
            fn.name
          }" too many times too quickly, did you forget the second argument to useEffect? Also, this is a message from Ryan and Michael, not React.`
        )
      } else {
        setTimeout(() => (calls = 0), 3000)
      }
      return fn(...args)
    }
  }

function getDocsFromSnapshot(snapshot) {
    const docs = []
    snapshot.forEach(doc => {
      docs.push(getDataFromDoc(doc))
    })
    return docs
  }

  function getDataFromDoc(doc) {
    return { ...doc.data(), id: doc.id }
  }
  