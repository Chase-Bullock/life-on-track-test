import React, { Fragment } from "react";
import { useActivityTypes } from "../useTaskTypes";
import { useAppState } from "../context/app-state";
import ActivityType from "./ActivityType";
import {
  Grid,
  makeStyles,
} from "@material-ui/core";
import MyCalendar from "./MyCalendar";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const Dashboard = () => {
  const styles = useStyles();
  const [{ user }] = useAppState();
  const activityTypes = useActivityTypes(user.uid);

  return (
    <Fragment>
      <MyCalendar />
      <Grid container className={styles.root} spacing={2}>
        {activityTypes &&
          activityTypes.map((activityType) => {
            return (
              <Grid key={activityType.id} item xs={4}>
                <ActivityType
                  passedInActivityType={activityType}
                  uid={user.uid}
                />
              </Grid>
            );
          })}
        <Grid item xs={3}>
          <ActivityType uid={user.uid} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Dashboard;
