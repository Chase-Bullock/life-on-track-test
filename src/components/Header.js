import React, { useEffect } from "react";
import { fetchDoc, logout } from "../actions/actions";
import { useAppState } from "../context/app-state";
import {
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  IconButton,
  Typography,
  ButtonGroup,
  Grid,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow : 1
  }
}));

const Header = (props) => {
  const [{ auth, user }, dispatch] = useAppState();
  const { onSignInClick, onSignUpClick } = props;
  const classes = useStyles();

  useEffect(() => {
    if (!user && auth) {
      fetchDoc(`users/${auth.uid}`).then((user) => {
        // okay to dispatch even if unmounted, might as well
        // get it in the app state cache
        dispatch({ type: "LOAD_USER", user });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, auth, auth?.uid, dispatch]);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Life on Track
            </Typography>
            {!user ? (
              <ButtonGroup color="inherit">
                <Button onClick={onSignUpClick}>Sign up</Button>
                <Button onClick={onSignInClick}>Sign in</Button>
              </ButtonGroup>
            ) : (
              <Button color="inherit" onClick={logout}>
                Sign out
              </Button>
            )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
