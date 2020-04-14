import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as action from '../actions/actions';

import { useStore } from '../store/store';
import Card from '../UI/Card';
import * as CONST from '../constants';
import  {useTaskTypes } from '../useTaskTypes';
import { addTaskType } from '../useTaskTypes';




const Login = () => {
  const [state, dispatch] = useStore();
  const taskTypes = useTaskTypes(1);

  const history = useHistory();

  console.log(taskTypes)


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
    <div>
      <div>
        {
          taskTypes && taskTypes.map(task => {
            console.log(task)
            return <div>{task.taskName}</div>
          })
        }
      </div>
      <Card className="row">
        <h5 className="center-align">
          Login with Google, {state?.user?.firstName}
        </h5>
        <div className="right-align">
          <button
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
            onClick={addNewTaskType}
            >
            Log In
        </button>
        </div>
      </Card>
    </div>
  );
}

export default Login;
