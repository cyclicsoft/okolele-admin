/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";

const useStyles = makeStyles(styles);

export default function ActivationWarning(props) {
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
        title="Are you sure?"
        onConfirm={() => successUpdate()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
        cancelBtnCssClass={classes.button + " " + classes.danger}
        confirmBtnText="Yes, Update!"
        cancelBtnText="Cancel"
        showCancel
      >
        You can change status any time!
      </SweetAlert>
    );
  };


  const successUpdate = () => {
    setAlert(
      <SweetAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Updated!"
        onConfirm={() => confirmAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
      >
        Status has been updated.
        
      </SweetAlert>
    );
    
  };

  const confirmAlert = () => {
    // Record delete handler
    axios.put(props.updateUrl)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

    props.onStatusUpdateChangeFlag(false);

    setAlert(null);
    
  };

  const hideAlert = () => {
    props.onStatusUpdateChangeFlag(false);
    setAlert(null);
  };


  return (
    <div>
      {alert}
    </div>
  );


}
