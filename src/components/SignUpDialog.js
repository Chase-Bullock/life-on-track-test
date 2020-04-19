import React, { useState, Fragment } from "react";
import { signup } from "../actions/actions";
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
  Link,
  Button,
} from "@material-ui/core";

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

function TextInput({ id, label, type = "text" }) {
  return (
    <Fragment>
      <TextField
        fullWidth
        id={id}
        type={type}
        placeholder={label}
        label={label}
      />
    </Fragment>
  );
}

const SignUpDialog = (props) => {
  const { dialogProps } = props;
  const theme = createMuiTheme();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();
    setLoading(true);
    const [displayName, photoURL, email, password] = event.target.elements;
    try {
      const userObj = {
        displayName: displayName.value,
        email: email.value,
        password: password.value,
        photoURL: photoURL.value,
      };
      await signup(userObj);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      aria-labelledby="form-dialog-title"
      open={dialogProps?.open}
    >
      <DialogTitle disableTypography>
        <Typography variant="h6">Register</Typography>

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
      <form onSubmit={handleSignup}>
        <DialogContent>
          {error && (
            <div>
              <p>Oops, there was an error logging you in.</p>
              <p>
                <i>{error.message}</i>
              </p>
            </div>
          )}
          <DialogContentText>
            Register with an email to start your journey.
          </DialogContentText>
          <Grid container direction="row">
            <Grid item xs={12}>
              <Divider className={styles.divider} orientation="vertical" />
            </Grid>

            <Grid item xs={7}>
              <Grid container direction="column" spacing={2}>
                <Grid item xs>
                  <TextInput id="displayName" label="Display Name" />
                </Grid>
                <Grid item xs>
                  <TextInput id="photoURL" label="Avatar URL" />
                </Grid>
                <Grid item xs>
                  <TextInput id="email" label="Email" />
                </Grid>
                <Grid item xs>
                  <TextInput id="password" type="password" label="Password" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <DialogActions style={{ justifyContent: "space-between" }}>
            <Link
              variant="caption"
              component="button"
              onClick={dialogProps?.switch}
            >
              Register{" "}
            </Link>
            <Button variant="contained" color="primary" type="submit">
              <span>{loading ? "Loading..." : "Register"}</span>
            </Button>
          </DialogActions>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default withStyles(styles)(SignUpDialog);
