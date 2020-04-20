import React, { useRef, useState, Fragment } from "react";
import { Button, TextField, Grid, makeStyles } from "@material-ui/core";

import { addActivityTypes } from "../useTaskTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  button: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
}));

const AddActivity = (props) => {
  const styles = useStyles();
  const [newActivity, setNewActivity] = useState({
    activityName: "",
    importance: "",
    satisfaction: "",
    uid: props.uid,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const updateActivityNameField = (event) => {
    const activityName = event.target.value;

    setNewActivity({
      ...newActivity,
      activityName,
    });
  };

  const updateImportanceField = (event) => {
    const importance = event.target.value;

    setNewActivity({
      ...newActivity,
      importance,
    });
  };

  const updateSatisfactionField = (event) => {
    const satisfaction = event.target.value;

    setNewActivity({
      ...newActivity,
      satisfaction,
    });
  };

  const addNewActivity = async () => {
    setLoading(true);
    try {
      console.log("AddTaskType", newActivity);
      await addActivityTypes(newActivity);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  return (
    <div className={styles.root}>
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="stretch"
      >
        {error && (
          <div>
            <p>Oops, there was an error logging you in.</p>
            <p>
              <i>{error.message}</i>
            </p>
          </div>
        )}
        <Grid item xs={12}>
          <TextField
            fullWidth
            onChange={updateActivityNameField}
            required
            type="text"
            placeholder="Activity Name"
            label="Activity Name"
            value={newActivity.activityName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            onChange={updateImportanceField}
            required
            type="number"
            placeholder="1 - 5"
            label="How important is this to you?"
            value={newActivity.importance}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            onChange={updateSatisfactionField}
            required
            type="number"
            placeholder="1 - 5"
            label="Satisfaction from activity"
            value={newActivity.satisfaction}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            className={styles.button}
            variant="contained"
            color="primary"
            onClick={addNewActivity}
          >
            <span>{loading ? "Loading..." : "Add"}</span>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddActivity;
