import React, { Fragment } from "react";

import "./Card.css";
import {
  makeStyles,
  CardContent,
  Typography,
  CardActions,
  Card
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 295,
  },
  title: {
    fontSize: 16,
  },
});

const Card2 = (props) => {
  const style = useStyles();
  return (
    <Fragment>
      <Card className={style.root}>
        <CardContent>
          <Typography className={style.title} gutterBottom variant="h5" component="h2">
            {props?.title}
          </Typography>
            {props.children}
        </CardContent>
        <CardActions>{props?.buttons}</CardActions>
      </Card>
    </Fragment>
  );
};

export default Card2;
