import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as action from '../actions/actions';

import { useStore } from '../store/store';
import Card from '../UI/Card';
import * as CONST from '../constants';
import { useTaskTypes } from '../useTaskTypes';
import { addTaskType } from '../useTaskTypes';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';




const Login = () => {
  const [state, dispatch] = useStore();
  const taskTypes = useTaskTypes(1);

  const history = useHistory();

  const loginHandler = () => {
    dispatch(CONST.LOGIN)
    history.push("/");
  };

  const addNewTaskType = () => {
    const newTaskType = {
      uid: 1,
      taskName: "Game"
    }
    addTaskType(newTaskType);
  }

  return (
    <div className="row">
      <Card className="col s6">
        <h5 className="center-align">
          Login
        </h5>
        <LoginForm />
      </Card>
      <Card className="col s6">
        <h5 className="center-align">
          Sign Up
        </h5>
       <SignupForm />
      </Card>
    </div>
  );
}

export default Login;
