import React, { Fragment } from "react";
import { Grid, Typography } from "@material-ui/core";
const Dashboard = () => {

  return (
    <Fragment>
      <Grid
        container
        justify="center"
        spacing={2}
        minHeight={1000}
      >
        <Grid item>
          <Typography>Dashboard goes here :)</Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Dashboard;
