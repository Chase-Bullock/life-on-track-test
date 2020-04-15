import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as action from '../actions/actions';

import { useStore } from '../store/store';
import Card from '../UI/Card';
import * as CONST from '../constants';
import  {useTaskTypes } from '../useTaskTypes';
import { addTaskType } from '../useTaskTypes';




const Dashboard = () => {
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
      taskName: "Game",
      importance: 1,
      satisfaction: 3
    }
    addTaskType(newTaskType);
  }

  return (
    <div>
      <div className="row">
        {
          taskTypes && taskTypes.map(task => {
            console.log(task)
            return <Card className="col s2">{task.taskName}</Card>
          })
        }
      </div>
    </div>
  );
}


export default Dashboard;
