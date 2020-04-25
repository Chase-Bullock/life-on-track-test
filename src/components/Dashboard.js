import React, { Fragment } from "react";
import { Grid, Typography } from "@material-ui/core";
const Dashboard = () => {

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
