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
  InputLabel,
  FormControl,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  TimePicker
} from "@material-ui/pickers";
import { addActivity, updateActivity } from "../useActivity";
import { useActivityTypes } from "../useActivityTypes";
import { useAppState } from "../context/app-state";
import DateFnsUtils from "@date-io/date-fns";
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
      end: moment(dialogProps?.event?.end),
      date: moment(dialogProps?.event?.start),
      start: moment(dialogProps?.event?.start),
      satisfaction: dialogProps?.event?.satisfaction || null,
      activityName: dialogProps?.event?.title,
      uid: user.uid,
    });
  }, [user, dialogProps]);

  const activityTypes = useActivityTypes(user.uid);

  const updateValue = (event) => {
    setActivity({ ...activity, [event.target.id]: event.target.value });
  };

  const updateStartValue = (event) => {
    setActivity({ ...activity, start: event });
  };

  const updateEndValue = (event) => {
    setActivity({ ...activity, end: event });
  };

  const updateDateValue = (date) => {
    setActivity({ ...activity, date: date });
  };

  const updateActivityName = (event) => {
    setActivity({ ...activity, activityName: event.target.value });
  };

  const addNewActivity = (newActivity) => {
    if(newActivity.activityName != undefined) {
    const startDate = moment(newActivity.start).set({'month': moment(newActivity.date).get('month'), 'date': moment(newActivity.date).get('date')})
    const endDate = moment(newActivity.end).set({'month': moment(newActivity.date).get('month'), 'date': moment(newActivity.date).get('date')})
    newActivity.start = startDate.toDate();
    newActivity.end = endDate.toDate();
    addActivity(newActivity);
    dialogProps.toggle();
    } else {
      setError({message:"Choose an activity!"})
    }
  };

  console.log(activity);

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
          <div style={{color: "red"}}>
              <i>{error.message}</i>
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
              <FormControl style={{width: "100%"}}>
              <InputLabel style={{color: error ? 'red': null }} id="activityName">What did you do?</InputLabel>
                <Select
                  fullWidth
                  onChange={updateActivityName}
                  value={activity.activityName}
                  error={error && !activity.activityName ? true : false}
                  id="activityName"
                  displayEmpty
                  label="Activity Type"
                >
                  {activityTypes &&
                    activityTypes.map((activityType) => {
                      return (
                        <MenuItem
                          key={activityType.id}
                          value={activityType.activityName}
                        >
                          {activityType.activityName}
                        </MenuItem>
                      );
                    })}
                </Select>
                </FormControl>
              </Grid>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xs={12}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    margin="normal"
                    id="date"
                    label="Date"
                    value={activity.date}
                    defaultValue={activity.start}
                    onChange={(event) => updateDateValue(event)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
              <Grid item xs={6}>
                <TimePicker
                  fullWidth
                  variant="inline"
                  value={activity.start}
                  defaultValue={moment(activity.start)}
                  onChange={event => updateStartValue(event)}
                  id="start"
                  label="Start Time"
                  minutesStep={5}
                />
              </Grid>
              <Grid item xs={6}>
              <TimePicker
                  fullWidth
                  variant="inline"
                  value={activity.end}
                  defaultValue={activity.end}
                  onChange={event => updateEndValue(event)}
                  id="end"
                  label="End Time"
                  minutesStep={5}
                />
              </Grid>
              </MuiPickersUtilsProvider>
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
