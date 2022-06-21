/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";

const useStyles = makeStyles(styles);

export default function UpdateWarning(props) {
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
        title="Confirm Update?"
        onConfirm={() => successUpdate()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
        cancelBtnCssClass={classes.button + " " + classes.danger}
        confirmBtnText="Yes, Update!"
        cancelBtnText="Cancel"
        showCancel
      >
        You will not be able to recover previous data!
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
        Info update in-progress!
        
      </SweetAlert>
    );
    
  };

  const confirmAlert = () => {
    props.updateConfirmationFlag(true);
    // props.onUpdateChangeFlag(false);

    setAlert(null);
    
  };

  const hideAlert = () => {
    props.updateConfirmationFlag(false);
    // props.onUpdateChangeFlag(false);
    setAlert(null);
  };


  return (
    <div>
      {alert}
    </div>
  );


}
