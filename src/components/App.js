import React, { useReducer, useContext, useState } from 'react';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { useStore } from '../store/store';
import useAuth from '../useAuth';

import LoggedIn from "./LoggedIn"
import LoggedOut from "./LoggedOut"
import { AppStateProvider } from "../context/app-state"
import appReducer, { initialState } from "../appReducer"

const App = () => {
  const {authAttempted, auth} = useAuth()
  console.log("auth attempted", authAttempted, auth);
  if(!authAttempted) return null
  return <div>{auth ? <LoggedIn /> : <LoggedOut />}</div>
}

export default () => (
  <AppStateProvider reducer={appReducer} initialState={initialState}>
    <App />
  </AppStateProvider>
)
