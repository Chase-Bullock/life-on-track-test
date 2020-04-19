import React, { useEffect, useState, Fragment } from "react";

import * as CONST from "../constants";
import { useActivityTypes as useActivityTypes, addActivityTypes } from "../useTaskTypes";
import { useAppState } from "../context/app-state";
import AddActivity from "./AddTaskType";
import Activity from "./Activity";
import {
  CardActions,
  Typography,
  CardContent,
  Grid,
  makeStyles
} from "@material-ui/core";
import Card from "../UI/Card";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Dashboard = () => {
  const styles = useStyles();
  const [{ user }] = useAppState();
  const activityTypes = useActivityTypes(user.uid);
  const [spacing, setSpacing] = useState(2);

  console.log(activityTypes);
  
  return (
    <>
      <Grid container className={styles.root} spacing={2}>
        {activityTypes &&
          activityTypes.map((activityType) => {
            return (
              <Grid fullWidth spacing={spacing} item xs={4}>
                <Card title={activityType.activityName}>
                  <Activity passedInActivityType={activityType} uid={user.uid} />
                </Card>
              </Grid>
            );
          })}
        <Grid spacing={spacing}  item xs={3}>
          <Card title={"Add new Activity"}>
            <Activity uid={user.uid} />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
