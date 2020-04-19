import React, { useState } from 'react';
import useAuth from '../useAuth';

import LoggedIn from "./LoggedIn"
import LoggedOut from "./LoggedOut"
import DialogHost from "./DialogHost";

import { AppStateProvider } from "../context/app-state"
import appReducer, { initialState } from "../appReducer"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Header from './Header';

const App = () => {
  const {authAttempted, auth} = useAuth()
  const [signInDialog, setSignInDialog] = useState(false);
  const [signUpDialog, setSignUpDialog] = useState(false);
  const prefersDarkMode = false;
  console.log("auth attempted", authAttempted, auth);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: {
            main: '#ff6d00',
            contrastText: '#ffffff'
          },
          secondary: {
            main: "#1a237e"
          },
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  if(!authAttempted) return null
  return (
  <ThemeProvider theme={theme}>
      <DialogHost
        theme={theme}
        dialogs={{
          signUpDialog: {
            dialogProps: {
              open: signUpDialog,
              toggle: () => setSignUpDialog(!signUpDialog),
              switch: () => {
                setSignUpDialog(!signUpDialog);
                setSignInDialog(!signInDialog);
              }
            }
          },
          signInDialog: {
            dialogProps: {
              open: signInDialog,
              toggle: () => setSignInDialog(!signInDialog),
              switch: () => {
                setSignInDialog(!signInDialog);
                setSignUpDialog(!signUpDialog);
              }
            }
          }
        }}
      />
      <Header
      onSignUpClick={() => setSignUpDialog(true)}
      onSignInClick={() => setSignInDialog(true)}
       />
  {auth ? <LoggedIn /> : <LoggedOut />}
  </ThemeProvider>
  );

}


export default () => (
  <AppStateProvider reducer={appReducer} initialState={initialState}>
    <App />
  </AppStateProvider>
)
