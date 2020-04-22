import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  makeStyles,
  withStyles,
  Typography,
} from "@material-ui/core";
import Card from "../UI/Card";
import { SECONDARY_LIGHT } from "../constants";

import { addActivityTypes, updateActivityTypes } from "../useActivityTypes";

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
    id: passedInActivityType?.id,
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

  const validationSubmission = (functionToCall) => {
    if (
      (activityType.activityName !== "" || null) &&
      (activityType.importance !== "" || null || 0) &&
      (activityType.satisfaction !== "" || null || 0)
    ) {
      setError("");
      functionToCall();
      setEdit(false);
    } else {
      setError({message:"Please fill out all fields"});
    }
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
      <div style={{height:25}}>
        {error && (
            <Typography color='error' variant="caption">{error.message}</Typography>
        )}
        </div>
        <Grid item xs={12}>
          <DarkerDisabledTextField
            fullWidth
            error={error && !activityType.importance ? true : false}
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
            error={error && !activityType.importance ? true : false}
            onChange={updateImportanceField}
            disabled={!props.passedInActivityType ? false : edit ? false : true}
            inputProps={{ min: "1", max: "5", step: "1" }}
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
            error={error && !activityType.importance ? true : false}
            disabled={!props.passedInActivityType ? false : edit ? false : true}
            inputProps={{ min: "1", max: "5", step: "1" }}
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
                onClick={() => validationSubmission(updateActivityHandler)}
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
                  : () => validationSubmission(addNewActivityType)
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
