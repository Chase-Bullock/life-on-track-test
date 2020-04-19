import React from "react"
import './Button.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// const useStyles = makeStyles({
//   root: {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     color: 'white',
//   },
// });
const LifeButton = (props) => {

  return (
    <Button {...props} onClick={props.onClick} type='submit'>
      {props.children}
    </Button>
  )
}

export default LifeButton
