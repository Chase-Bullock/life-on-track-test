import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import * as CONST from '../constants';
import { useStore } from '../store/store';
import Card from '../UI/Card';


const Dashboard = () => {

  const [state, dispatch] = useStore();

  console.log(state)

  if(!state.token) {
  console.log(state)
    return (
  <Redirect to={'/login'} />
  )
    }

  return (
    <div>
      <Card className="row">
        <div className="right-align">
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
          onClick={() => dispatch(CONST.LOGOUT)}>
          Log out
        </button>
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;
