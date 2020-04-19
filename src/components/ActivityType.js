import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import Card from "../UI/Card";

import { addActivityTypes, updateActivityTypes } from "../useTaskTypes";

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

const DarkerDisabledTextField = withStyles({
  root: {
    marginRight: 8,
    "& .MuiInputBase-root.Mui-disabled": {
      color: "rgba(0, 0, 0, 0.75)", // (default alpha is 0.38)
    },
  },
})(TextField);

const ActivityType = (props) => {
  const { passedInActivityType } = props;

  const styles = useStyles();
  const [activityType, setActivityType] = useState({
    activityName: passedInActivityType?.activityName || "",
    importance: passedInActivityType?.importance || "",
    satisfaction: passedInActivityType?.satisfaction || "",
    uid: props.uid,
    id: passedInActivityType?.id || null,
  });
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(false);

  const updateActivityNameField = (event) => {
    const activityName = event.target.value;

    setActivityType({
      ...activityType,
      activityName,
    });
  };

  const updateImportanceField = (event) => {
    const importance = event.target.value;
    console.log(activityType);

    setActivityType({
      ...activityType,
      importance,
    });
  };

  const updateSatisfactionField = (event) => {
    const satisfaction = event.target.value;
    console.log(activityType);

    setActivityType({
      ...activityType,
      satisfaction,
    });
  };

  const addNewActivityType = async () => {
    setLoading(true);
    console.log(activityType);
    try {
      await addActivityTypes(activityType);
      setLoading(false);
      setActivityType({
        activityName: passedInActivityType?.activityName || "",
        importance: passedInActivityType?.importance || "",
        satisfaction: passedInActivityType?.satisfaction || "",
        uid: props.uid,
      });
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  const updateActivityHandler = async () => {
    setLoading(true);
    try {
      await updateActivityTypes(activityType);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  const toggleEditActivity = async () => {
    setEdit(!edit);
  };

  return (
    <Card
      title={
        props.passedInActivityType
          ? passedInActivityType.activityName
          : "Add a new activity"
      }
      className={styles.root}
    >
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
          <DarkerDisabledTextField
            fullWidth
            onChange={updateActivityNameField}
            disabled={!props.passedInActivityType ? false : edit ? false : true}
            type="text"
            placeholder="Activity Name"
            label="Activity Name"
            value={activityType.activityName}
          />
        </Grid>
        <Grid item xs={12}>
          <DarkerDisabledTextField
            fullWidth
            onChange={updateImportanceField}
            disabled={!props.passedInActivityType ? false : edit ? false : true}
            type="number"
            placeholder="1 - 5"
            label={
              props.passedInActivityType
                ? "Importance"
                : "How important is this to you?"
            }
            value={activityType.importance}
          />
        </Grid>
        <Grid item xs={12}>
          <DarkerDisabledTextField
            fullWidth
            disabled={!props.passedInActivityType ? false : edit ? false : true}
            onChange={updateSatisfactionField}
            type="number"
            placeholder="1 - 5"
            label={
              props.passedInActivityType
                ? "Satisfaction"
                : "Satisfaction from activity"
            }
            value={activityType.satisfaction}
          />
        </Grid>
        {edit ? (
          <Grid justify="space-between" container>
            <Grid item xs={5}>
              <Button
                className={styles.button}
                variant="outlined"
                color="secondary"
                onClick={toggleEditActivity}
              >
                <span>{"cancel"}</span>
              </Button>
            </Grid>
            <Grid item xs={5}>
              <Button
                className={styles.button}
                variant="contained"
                color="primary"
                onClick={updateActivityHandler}
              >
                <span>{loading ? "Loading..." : "Done"}</span>
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid>
            <Button
              className={styles.button}
              variant="contained"
              color="primary"
              onClick={
                props.passedInActivityType
                  ? toggleEditActivity
                  : addNewActivityType
              }
            >
              <span>
                {loading
                  ? "Loading..."
                  : props.passedInActivityType
                  ? "Edit"
                  : "Add"}
              </span>
            </Button>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default ActivityType;
