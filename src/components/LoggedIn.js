import React, { useEffect, Fragment } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { fetchDoc } from "../actions/actions";
import { useAppState } from "../context/app-state";

import ActivityTypes from "./ActivityTypes";
import { Container, makeStyles } from "@material-ui/core";
import MyDrawer from "./MyDrawer";
import MyCalendar from "./MyCalendar";
import Dashboard from "./Dashboard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
  },
}));

const LoggedIn = (props) => {
  const [{ auth, user }, dispatch] = useAppState();
  const styles = useStyles();

  useEffect(() => {
    if (!user) {
      fetchDoc(`users/${auth.uid}`).then((user) => {
        // okay to dispatch even if unmounted, might as well
        // get it in the app state cache
        dispatch({ type: "LOAD_USER", user });
      });
    }
  }, [user, auth.uid, dispatch]);

  console.log(user);
  return (
    <Fragment>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <MyDrawer />
        <Container maxWidth="md">
          <div className={styles.root}>
            {user != null && (
              <Fragment>
                <Route exact path="/calendar">
                  <MyCalendar />
                </Route>
                <Route
                  exact
                  path="/activityTypes"
                  name="Activity Types"
                  component={ActivityTypes}
                />
                <Route
                  exact
                  path="/"
                  name="Dashboard"
                  component={Dashboard}
                />
              </Fragment>
            )}
          </div>
        </Container>
      </BrowserRouter>
    </Fragment>
  );
};

export default LoggedIn;
