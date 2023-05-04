/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
// Dropdown Select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// @material-ui/icons
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
// Custom Input
import CustomInput from "components/CustomInput/CustomInput.js";
import UpdateWarning from "views/ConfirmationModals/UpdateWarning";
import { apiHeader } from "services/helper-function/api-header";

const useStyles = makeStyles(styles);

const SendNotification = (props) => {
  const classes = useStyles();
  // Root Path URL
  const rootPath = process.env.REACT_APP_BASE_URL;
  // headers
  const [headers, setHeaders] = useState();
  const searchButton = classes.top + " " + classes.searchButton;
  //   orderId from props
  var customerId = props.location.customerId;
  //   Notification Info
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationType, setNotificationType] = useState("DEFAULT");
  const [notificationContent, setNotificationContent] = useState("");
  const [activeStatus, setActiveStatus] = useState(true);

  const [customerID, setCustomerID] = useState(customerId);

  const [showUpdateWarningPopup, setShowUpdateWarningPopup] = useState(false);

  const notificationData = {
    title: notificationTitle,
    notificationType: notificationType,
    content: notificationContent,
    activeStatus: activeStatus,
    userId: customerID,
  };

  useEffect(() => {
    apiHeader((headers) => {
      setHeaders(headers);
    });
  }, []);

  const sendClick = () => {
    setShowUpdateWarningPopup(true);
  };
  // status Change Flag From Modal
  const updateConfirmationFlag = (isConfirmed) => {
    if (isConfirmed === true && headers) {
      sendNotificationToUser();
    }
    setShowUpdateWarningPopup(false);
  };

  const sendNotificationToUser = () => {
    const sendNotificationAPI = rootPath + "/notification";
    axios
      .post(sendNotificationAPI, notificationData, headers)
      .then(function (response) {
        console.log("Customer Update", response);
      })
      .catch(function (error) {
        console.log("Order Update error", error);
      });
  };

  return (
    <>
      {/* Status change Confirmation Modal */}
      {showUpdateWarningPopup ? (
        <UpdateWarning updateConfirmationFlag={updateConfirmationFlag} />
      ) : null}

      <GridContainer>
        <GridItem xs={12} sm={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <ForwardToInboxIcon />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Send A Notification</h4>
            </CardHeader>

            <CardBody>
              {/* <h4 className={classes.cardIconTitle}>Basic Info</h4> */}
              <GridContainer>
                {/* Customer ID */}
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Customer ID"
                    id="customer-id"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: customerID || "",
                      //   onChange: (event) => setName(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>

                {/* Notification Type */}
                <GridItem xs={12} sm={12} md={6} style={{ marginTop: "12px" }}>
                  <FormControl variant="standard" sx={{ width: "100%" }}>
                    <InputLabel
                      id="notification-type"
                      style={{ fontSize: "14px" }}
                    >
                      Notification Type
                    </InputLabel>
                    <Select
                      labelId="notification-type"
                      id="notification-type"
                      style={{ fontSize: "14px" }}
                      value={notificationType || " "}
                      onChange={(event) =>
                        setNotificationType(event.target.value)
                      }
                      label="Brand Name"
                    >
                      <MenuItem value={"DEFAULT"}>DEFAULT</MenuItem>
                      <MenuItem value={"OFFER"}>OFFER</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>

                {/* Notification Title */}
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Notification Title"
                    id="notification-title"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: notificationTitle || "",
                      onChange: (event) =>
                        setNotificationTitle(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>

                {/* Active Status */}
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Active Status"
                    id="active-status"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: activeStatus || "",
                      //   onChange: (event) => setActiveStatus(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>

                {/* Notification Content */}
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Notification Content"
                    id="notification-content"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: notificationContent || "",
                      onChange: (event) =>
                        setNotificationContent(event.target.value),
                      maxLength: "300",
                    }}
                  />
                </GridItem>
              </GridContainer>

              <Button
                color="rose"
                aria-label="edit"
                className={searchButton}
                onClick={() => sendClick()}
              >
                Send
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
};

export default SendNotification;
