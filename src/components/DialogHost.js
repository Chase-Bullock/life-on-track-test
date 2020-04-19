import React from "react";

import { Hidden } from "@material-ui/core";


import SignUpDialog from "./SignUpDialog";
import SignInDialog from "./SignInDialog";

const DialogHost = (props) => {
    // Properties
    const { theme, dialogs } = props;

    // Functions
    const { openSnackbar } = props;

    const signUpDialog = dialogs.signUpDialog;
    const signInDialog = dialogs.signInDialog;

    return (
        <Hidden xsDown>
            <>
              <SignUpDialog
                dialogProps={signUpDialog.dialogProps}
                theme={theme}
                openSnackbar={openSnackbar}
                {...signUpDialog.props}
              />

              <SignInDialog
                dialogProps={signInDialog.dialogProps}
                theme={theme}
                openSnackbar={openSnackbar}
                {...signInDialog.props}
                signUpDialogProps={signUpDialog.dialogProps}
              />
            </>
        </Hidden>
    );
}

export default DialogHost;
