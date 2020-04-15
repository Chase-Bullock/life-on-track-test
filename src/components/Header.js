import React, { useEffect } from 'react';
import { fetchDoc, logout, login, signup } from "../actions/actions"
import { useAppState } from "../context/app-state"

const Header = () => {
  const [{ auth, user }, dispatch] = useAppState()
  console.log(auth);
  console.log("user", user);
   
  useEffect(() => {
    if (!user && auth) {
      fetchDoc(`users/${auth.uid}`).then(user => {
        // okay to dispatch even if unmounted, might as well
        // get it in the app state cache
        dispatch({ type: "LOAD_USER", user })
      })
    }
  }, [user, auth, auth?.uid, dispatch])

  return (
    <nav>
    <div className="nav-wrapper" style={{marginLeft:10}}>
      <a className="left brand-logo">
        Life on Track
      </a>
      <ul className="right">
      { user ? 
        <li>
        <div>{`Hi, ${user.displayName}`}</div>
        </li> :
        <li>
          <a onClick={logout}>Login with Google</a>
        </li>
      }
      </ul>
    </div>
    </nav>
  );
}

export default Header;

