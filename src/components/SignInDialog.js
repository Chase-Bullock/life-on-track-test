import React, { useState, useRef } from "react";
import { login } from "../actions/actions";
import { Close as CloseIcon } from "@material-ui/icons";
import {
  DialogContentText,
  DialogActions,
  DialogContent,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  Tooltip,
  IconButton,
  Grid,
  Divider,
  withStyles,
  createMuiTheme,
  Link,
  Button
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

const SignInDialog = (props) => {
  const { dialogProps } = props;
  const theme = createMuiTheme();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const handleShowPassword = (event) => {
    setShowPassword(event.target.checked);
  };


  return (
    <Dialog
      fullWidth
      open={dialogProps?.open}
      maxWidth="sm"
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle disableTypography>
        <Typography variant="h6">Sign in to your account</Typography>
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
            <p>Oops, there was an error logging you in.</p>
            <p>
              <i>{error.message}</i>
            </p>
          </div>
        )}
        <DialogContentText>
          To login to this website, please enter your email address and
          password.
        </DialogContentText>
        <form onSubmit={handleLogin}>
          <Grid container direction="row">
            <Grid item xs={12}>
              <Divider className={styles.divider} orientation="vertical" />
            </Grid>
            <Grid item xs={7}>
              <Grid container direction="column" spacing={2}>
                <Grid item xs>
                  <TextField
                    autoFocus
                    fullWidth
                    ref={emailRef}
                    id="login:email"
                    placeholder="you@example.com"
                    type="text"
                    label="Email"
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    ref={passwordRef}
                    id="login:password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    label="password"
                  />
                </Grid>
                <Grid item xs>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        onChange={handleShowPassword}
                        defaultChecked={showPassword}
                      />
                    }
                    label="show password"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
        <DialogActions style={{ justifyContent: "space-between" }}>
          <Link variant="caption" component="button" onClick={dialogProps?.switch}>Register </Link>
          <Button variant="contained" color="primary" type="submit">
            <span>{loading ? "Loading..." : "Login"}</span>
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(SignInDialog);
