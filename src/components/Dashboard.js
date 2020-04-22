import React, { Fragment } from "react";
import { useActivityTypes } from "../useActivityTypes";
import { useAppState } from "../context/app-state";
import ActivityType from "./ActivityType";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import MyCalendar from "./MyCalendar";
import { sizing } from '@material-ui/system';
const Dashboard = () => {
  const [{ user }] = useAppState();
  const activityTypes = useActivityTypes(user.uid);

  return (
    <Fragment>
      {/* <MyCalendar /> */}
      <Grid
        container
        justify="center"
        spacing={2}
        minHeight={1000}
      >
        <Grid item>
          <Typography>Dashboard goes here :)</Typography>
        </Grid>
        {/* {activityTypes &&
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
        </Grid> */}
      </Grid>
    </Fragment>
  );
};

export default Dashboard;
