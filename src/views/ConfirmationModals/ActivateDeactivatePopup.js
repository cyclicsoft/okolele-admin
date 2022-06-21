/*eslint-disable*/
import React, { useState, useEffect } from "react";
// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";

const useStyles = makeStyles(styles);

export default function ActivateDeactivatePopup(props) {
  const classes = useStyles();
  const [alert, setAlert] = React.useState(null);

  useEffect(() => {
    warningWithConfirmMessage();
  }, []);

  const warningWithConfirmMessage = () => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Change Status?"
        onConfirm={() => successUpdate()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
        cancelBtnCssClass={classes.button + " " + classes.danger}
        confirmBtnText="Yes, Update!"
        cancelBtnText="Cancel"
        showCancel
      >
        You can change again any time!
      </SweetAlert>
    );
  };

  const successUpdate = () => {
    setAlert(
      <SweetAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Updating..."
        onConfirm={() => confirmAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
      >
        Status update in-progress!
      </SweetAlert>
    );
  };

  const confirmAlert = () => {
    props.statusChangeFlag(true);

    setAlert(null);
  };

  const hideAlert = () => {
    props.statusChangeFlag(false);
    setAlert(null);
  };

  return <div>{alert}</div>;
}
