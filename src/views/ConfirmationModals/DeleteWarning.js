/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
import { apiHeader } from "services/helper-function/api-header";

const useStyles = makeStyles(styles);

export default function DeleteWarning(props) {
  const classes = useStyles();
  const [alert, setAlert] = React.useState(null);
  const [headers, setHeaders] = useState();

  useEffect(() => {
    apiHeader((headers) => {
      setHeaders(headers);
    });
  }, []);

  useEffect(() => {
    warningWithConfirmMessage();
  }, []);

  const warningWithConfirmMessage = () => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Are you sure?"
        onConfirm={() => successDelete()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
        cancelBtnCssClass={classes.button + " " + classes.danger}
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        showCancel
      >
        You will not be able to recover this data!
      </SweetAlert>
    );
  };

  const successDelete = () => {
    setAlert(
      <SweetAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Deleted!"
        onConfirm={() => confirmAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
      >
        Data has been deleted.
      </SweetAlert>
    );
  };

  const confirmAlert = () => {
    // Record delete handler
    axios
      .delete(props.deleteUrl, headers)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    props.onDeleteChangeFlag(false);

    setAlert(null);
  };

  const hideAlert = () => {
    props.onDeleteChangeFlag(false);
    setAlert(null);
  };

  return <div>{alert}</div>;
}
