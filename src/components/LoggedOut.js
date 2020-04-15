import React from "react"
import { BrowserRouter, Route } from "react-router-dom";


import Header from './Header';
import Login from './Login';
import Dashboard from './Dashboard';

const LoggedOut = () => {
  return (
    <div className="LoggedOut">
      <BrowserRouter>
        <div>
          <Header />
          <div className="container">
            <div className="row">
              <Route
                exact
                path="/"
                name="Login Page"
                component={Login}
              />
              <Route
                exact
                path="/register"
                name="Register Page"
                component={Dashboard}
              />
              <Route
                exact
                path="/dashboard"
                name="Landing"
                component={Dashboard}
              />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default LoggedOut;