import React, { useState, useEffect } from "react";
import { Close as CloseIcon } from "@material-ui/icons";
import {
  DialogContentText,
  DialogActions,
  DialogContent,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  Tooltip,
  IconButton,
  Grid,
  Divider,
  withStyles,
  createMuiTheme,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
import { addActivity, updateActivity } from "../useActivity";
import { useActivityTypes } from "../useActivityTypes";
import { useAppState } from "../context/app-state";

import moment from "moment";

const styles = (theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },

  icon: {
    marginRight: theme.spacing(0.5),
  },

  divider: {
    margin: "auto",
  },

  grid: {
    marginBottom: theme.spacing(2),
  },
});

const ActivityDialog = (props) => {
  const { dialogProps, user } = props;
  const theme = createMuiTheme();
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(null);
  const [activity, setActivity] = useState({
    end: moment(),
    start: moment(),
    satisfaction: 1,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setActivity({
      end: moment(dialogProps?.event?.end).format("hh:mm"),
      start: moment(dialogProps?.event?.start).format("hh:mm"),
      satisfaction: dialogProps?.event?.satisfaction || null,
      activityName: dialogProps?.event?.title,
      uid: user.uid
    });
  }, [user, dialogProps]);

  const activityTypes = useActivityTypes(user.uid);

  const updateValue = (event) => {
    setActivity({ ...activity, [event.target.id]: event.target.value });
    console.log(activity);
  };

  const updateActivityName = (event) => {
    setActivity({ ...activity, activityName: event.target.value });
    console.log(activity);
  };

  const addNewActivity = (newActivity) => {
    newActivity.start = moment(newActivity.start, 'HH:mm').toDate();
    newActivity.end = moment(newActivity.end, 'HH:mm').toDate();
    addActivity(newActivity);
    dialogProps.toggle();
  };

  return (
    <Dialog
      fullWidth
      open={dialogProps?.open}
      maxWidth="sm"
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle disableTypography>
        <Typography variant="h6">Add a new activity :)</Typography>
        <Tooltip title="Close">
          <IconButton
            style={{
              position: "absolute",
              right: theme.spacing(1),
              top: theme.spacing(1),
            }}
            onClick={dialogProps?.toggle}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </DialogTitle>
      <DialogContent>
        {error && (
          <div>
            <p>Oops, there was an error adding the activity.</p>
            <p>
              <i>{error.message}</i>
            </p>
          </div>
        )}
        <DialogContentText>
          Think about how you felt while you were doing your activity.
        </DialogContentText>
        <Grid container direction="row">
          <Grid item xs={12}>
            <Divider className={styles.divider} orientation="vertical" />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  onChange={updateActivityName}
                  value={activity.activityName}
                  placeholder="What did you do?"
                  id="activityName"
                  displayEmpty
                  label="Activity Type"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {activityTypes &&
                    activityTypes.map((activityType) => {
                      return (
                        <MenuItem key={activityType.id} value={activityType.activityName}>
                          {activityType.activityName}
                        </MenuItem>
                      );
                    })}
                </Select>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  inputProps={{ step: 900 }}
                  onChange={(event) => updateValue(event)}
                  value={activity.start}
                  id="start"
                  placeholder={moment().format("hh, mm, a")}
                  type="time"
                  label="Start"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  value={activity.end}
                  inputProps={{ step: 900 }}
                  onChange={(event) => updateValue(event)}
                  id="end"
                  placeholder={moment().format("hh")}
                  type="time"
                  label="End"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  type="number"
                  inputProps={{ min: "1", max: "5", step: "1" }}
                  onChange={(event) => updateValue(event)}
                  id="satisfaction"
                  value={activity.satisfaction || 1}
                  label={"Satisfaction"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  type="text"
                  onChange={(event) => updateValue(event)}
                  id="satisfactionReason"
                  label={"What did you enjoy/dislike?"}
                  value={activity.satisfactionReason}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <DialogActions style={{ justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => addNewActivity(activity)}
          >
            <span>{loading ? "Loading..." : "Add"}</span>
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(ActivityDialog);
