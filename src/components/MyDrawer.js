import React, { Fragment, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import LocalActivityIcon from "@material-ui/icons/LocalActivity";
import DashboardIcon from '@material-ui/icons/Dashboard';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MyDrawer() {
  const classes = useStyles();

  const drawerList = [
    {text: "Dashboard", clickHandler: dashboardNavHandler, icon: <DashboardIcon />},
    {text: "My Day", clickHandler: myDayNavHandler, icon: <CalendarTodayIcon />},
    {text: "Activities", clickHandler: activitiesNavHandler, icon: <LocalActivityIcon />}
  ]

  let history = useHistory();

  function myDayNavHandler() {
    history.push("/calendar");
  }

  function activitiesNavHandler() {
    history.push("/activityTypes");
  }

  function dashboardNavHandler() {
    history.push("/dashboard");
  }

  return (
    <Fragment>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer} />
        <Divider />
        <List>
          {drawerList.map((listObject, index) => (
            <ListItem onClick={listObject.clickHandler} button key={listObject.text}>
              <ListItemIcon>
                {listObject.icon}
              </ListItemIcon>
              <ListItemText primary={listObject.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Fragment>
  );
}

