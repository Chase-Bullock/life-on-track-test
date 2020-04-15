import React, { useEffect, Fragment } from "react"
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { fetchDoc } from "../actions/actions"
import { useAppState } from "../context/app-state"
import Header from './Header';

import Login from './Login';
import Dashboard from "./Dashboard";

const LoggedIn = () => {
  const [{ auth, user }, dispatch] = useAppState()

  useEffect(() => {
    if (!user) {
      fetchDoc(`users/${auth.uid}`).then(user => {
        // okay to dispatch even if unmounted, might as well
        // get it in the app state cache
        dispatch({ type: "LOAD_USER", user })
      })
    }
  }, [user, auth.uid, dispatch])

  return (
    <Fragment>
      <Header />
      <BrowserRouter>
          <div className="container">
            <div className="row">
              <Route
                exact
                path="/"
                name="Landing"
                component={Dashboard}
              />
            </div>
          </div>
      </BrowserRouter>
    </Fragment>
  )
  
}

export default LoggedIn;