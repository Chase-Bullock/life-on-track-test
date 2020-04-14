import React, { useReducer, useContext, useState } from 'react';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { useStore } from '../store/store';

import Header from './Header';
import Login from './Login';
import Dashboard from './Dashboard';

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <div className="container">
            <div className="row">
              <Route
                exact
                path="/login"
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
                path="/"
                name="Landing"
                component={Dashboard}
              />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
