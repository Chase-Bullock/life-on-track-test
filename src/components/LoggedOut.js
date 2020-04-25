import React, { Fragment } from "react"
import { BrowserRouter, Route } from "react-router-dom";

import Dashboard from './Dashboard';
import Landing from './Landing';
import { Container } from "@material-ui/core";
import MyDrawer from "./MyDrawer";


const LoggedOut = (props) => {
  return (
    <Fragment>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
      <MyDrawer />
        <div>
          <Container maxWidth="lg">
              <Route
                exact
                path="/register"
                name="Register Page"
                component={Landing}
              />
              <Route
                exact
                path="/"
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