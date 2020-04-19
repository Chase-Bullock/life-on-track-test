import React, { useEffect, Fragment } from "react"
import { BrowserRouter, Route } from "react-router-dom";

import { fetchDoc } from "../actions/actions"
import { useAppState } from "../context/app-state"

import Dashboard from "./Dashboard";
import { Container, makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4)
  }
}));

const LoggedIn = (props) => {
  const [{ auth, user }, dispatch] = useAppState()
  const styles = useStyles();
  
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
      <BrowserRouter>
        <Container maxWidth="md">
          <div className={styles.root}>
          { user &&
            <Route
              exact
              path="/"
              name="Landing"
              component={Dashboard}
            />
          }
          </div>
        </Container>
      </BrowserRouter>
    </Fragment>
  )

}

export default LoggedIn;