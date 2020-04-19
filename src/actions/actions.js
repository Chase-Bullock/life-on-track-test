import { db, auth } from '../Firebase';
export * from './userActions';
export * from './activityTypeActions';

// const setUser = (user) => {
//     return {
//         type: 'LOGIN',
//         payload: user
//     }
// }

// function error(err){
//     return {
//         type: 'ERROR',
//         payload: err
//     }
// }

  export function onAuthStateChanged(callback) {
    return auth().onAuthStateChanged(callback)
  }
  
export function limitCalls(fn, limit = 20) {
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

export function getDocsFromSnapshot(snapshot) {
    const docs = []
    snapshot.forEach(doc => {
      docs.push(getDataFromDoc(doc))
    })
    return docs
  }

  function getDataFromDoc(doc) {
    return { ...doc.data(), id: doc.id }
  }
  
export const fetchDoc = limitCalls(function fetchDoc(path) {
    return db
      .doc(path)
      .get()
      .then(doc => doc.data())
  })
  
  