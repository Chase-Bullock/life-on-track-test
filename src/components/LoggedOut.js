import React, { Fragment } from "react"
import { BrowserRouter, Route } from "react-router-dom";

import Dashboard from './Dashboard';
import Landing from './Landing';
import { Container } from "@material-ui/core";
import MyDrawer from "./MyDrawer";


const LoggedOut = (props) => {
  return (
    <Fragment>
      <BrowserRouter>
      <MyDrawer />
        <div>
          <Container maxWidth="lg">
              <Route
                exact
                path="/"
                name="Register Page"
                component={Landing}
              />
              <Route
                exact
                path="/dashboard"
                name="Landing"
                component={Dashboard}
              />
          </Container>
        </div>
      </BrowserRouter>
    </Fragment>
  )
}

export default LoggedOut;