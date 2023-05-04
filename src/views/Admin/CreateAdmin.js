//index->App->Admin->Sidebar->CreateAdmin
/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// material ui icons
import MailOutline from "@material-ui/icons/MailOutline";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import "../../assets/scss/ghorwali-scss/create-admin.scss";
import { apiHeader } from "services/helper-function/api-header.js";

const useStyles = makeStyles(styles);

export default function AdminManagement() {
  const classes = useStyles();
  // Root Path URL
  const rootPath = process.env.REACT_APP_BASE_URL;
  const [headers, setHeaders] = useState();

  // register form
  const [registerPhone, setregisterPhone] = React.useState("");
  const [registerPhoneState, setregisterPhoneState] = React.useState("");
  const [registerEmail, setregisterEmail] = React.useState("");
  const [registerEmailState, setregisterEmailState] = React.useState("");
  const [registerPassword, setregisterPassword] = React.useState("");
  const [registerPasswordState, setregisterPasswordState] = React.useState("");
  const [registerConfirmPassword, setregisterConfirmPassword] = React.useState(
    ""
  );
  const [
    registerConfirmPasswordState,
    setregisterConfirmPasswordState,
  ] = React.useState("");
  //   Empty field check
  const [isEmptyCheck, setIsEmptyCheck] = useState(false);

  useEffect(() => {
    apiHeader((headers) => {
      setHeaders(headers);
    });
  }, []);

  // function that returns true if value is email, false otherwise
  const verifyEmail = (value) => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };
  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };
  // function that verifies if value contains only numbers
  const verifyNumber = (value) => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };

  const registerClick = () => {
    if (registerPhoneState === "") {
      setregisterPhoneState("error");
      setIsEmptyCheck(true);
    }
    if (registerEmailState === "") {
      setregisterEmailState("error");
      setIsEmptyCheck(true);
    }
    if (registerPasswordState === "") {
      setregisterPasswordState("error");
      setIsEmptyCheck(true);
    }
    if (registerConfirmPasswordState === "") {
      setregisterConfirmPasswordState("error");
      setIsEmptyCheck(true);
    }

    if (
      registerPhoneState !== "" &&
      registerEmailState !== "" &&
      registerPasswordState !== "" &&
      registerConfirmPasswordState !== ""
    ) {
      adminCreateHandler();
    }
  };

  // register Data
  const registerData = {
    name: "",
    password: registerPassword,
    mobile: registerPhone,
    email: registerEmail,
    roles: ["ROLE_ADMIN"],
  };
  const adminCreateHandler = () => {
    const registerAPI = rootPath + "/auth/signup?";
    axios
      .post(registerAPI, registerData, headers)
      .then(function (response) {
        console.log("Register response: ", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {/* ############################# Create Admin############################# */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <MailOutline />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Register Forms</h4>
            </CardHeader>
            <CardBody>
              <form>
                <CustomInput
                  success={registerEmailState === "success"}
                  error={registerEmailState === "error"}
                  labelText="Phone Number *"
                  id="registerphone"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (event) => {
                      if (verifyNumber(event.target.value)) {
                        setregisterPhoneState("success");
                      } else {
                        setregisterPhoneState("error");
                      }
                      setregisterPhone(event.target.value);
                    },
                    type: "number",
                  }}
                />
                <CustomInput
                  success={registerEmailState === "success"}
                  error={registerEmailState === "error"}
                  labelText="Email Address *"
                  id="registeremail"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (event) => {
                      if (verifyEmail(event.target.value)) {
                        setregisterEmailState("success");
                      } else {
                        setregisterEmailState("error");
                      }
                      setregisterEmail(event.target.value);
                    },
                    type: "email",
                  }}
                />
                <CustomInput
                  success={registerPasswordState === "success"}
                  error={registerPasswordState === "error"}
                  labelText="Password *"
                  id="registerpassword"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (event) => {
                      if (verifyLength(event.target.value, 1)) {
                        setregisterPasswordState("success");
                      } else {
                        setregisterPasswordState("error");
                      }
                      setregisterPassword(event.target.value);
                    },
                    type: "password",
                    autoComplete: "off",
                  }}
                />
                <CustomInput
                  success={registerConfirmPasswordState === "success"}
                  error={registerConfirmPasswordState === "error"}
                  labelText="Confirm Password *"
                  id="registerconfirmpassword"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: (event) => {
                      if (registerPassword === event.target.value) {
                        setregisterConfirmPasswordState("success");
                      } else {
                        setregisterConfirmPasswordState("error");
                      }
                      setregisterConfirmPassword(event.target.value);
                    },
                    type: "password",
                    autoComplete: "off",
                  }}
                />
                <div className={classes.formCategory}>
                  <small>*</small> Required fields
                </div>
                <Button
                  color="rose"
                  onClick={registerClick}
                  className={classes.registerButton}
                >
                  Register
                </Button>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
