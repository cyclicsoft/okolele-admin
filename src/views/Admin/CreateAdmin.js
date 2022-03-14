//index->App->Admin->Sidebar->CreateAdmin
/*eslint-disable*/
import React, { useState } from "react";
import axios from "axios";
// Global State
import { store, useGlobalState } from "state-pool";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment";

// material ui icons
import MailOutline from "@material-ui/icons/MailOutline";
import Contacts from "@material-ui/icons/Contacts";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

// style for this view
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import "../../assets/scss/ghorwali-scss/create-admin.scss";

const useStyles = makeStyles(styles);

export default function AdminManagement() {
  const classes = useStyles();
  // accessToken
  const [userToken, setUserToken, updateUserToken] = useGlobalState(
    "accessToken"
  );
  var accessTknValidity = new Date(userToken.tokenValidity);
  var refreshTknValidity = new Date(userToken.refreshTokenValidity);

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
  // API Header
  let config = {
    headers: {
      Authorization: "Bearer " + userToken.token,
    },
  };

  // Refresh Token
  // const refreshTokenData = {
  //   refreshToken: userToken.refreshToken,
  // };

  // register Data
  const registerData = {
    name: "",
    password: registerPassword,
    mobile: registerPhone,
    email: registerEmail,
    roles: ["ROLE_ADMIN"],
  };
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
    accessTokenValidityCheck();
  };

  const accessTokenValidityCheck = () => {
    var currentLocalDateTime = new Date();

    // if isEmptyCheck is false, proceed to register
    if (isEmptyCheck === false) {
      if (
        registerPassword.length >= 6 &&
        registerPassword == registerConfirmPassword
      ) {
        if (accessTknValidity.getTime() > currentLocalDateTime.getTime()) {
          console.log(
            "accessTknValidity.getTime() > currentLocalDateTime.getTime()"
          );
          adminCreateHandler();
        } else {
          console.log(
            "accessTknValidity.getTime() <= currentLocalDateTime.getTime()"
          );
          // If access token validity expires, call refresh token api
          refreshTokenHandler();
        }
      } else {
        alert("Password not matched!");
      }
    }
  };

  const refreshTokenHandler = () => {
    var currentLocalDateTime = new Date();

    if (refreshTknValidity.getTime() > currentLocalDateTime.getTime()) {
      console.log(
        "refreshTknValidity.getTime() > currentLocalDateTime.getTime()"
      );
      const refreshTokenAPI = "http://localhost:8080/auth/token";
      axios
        .post(refreshTokenAPI, userToken.refreshToken)
        .then(function (response) {
          console.log("Refresh token response: ", response);

          if (response.data.code == 403) {
            alert(response.data.message);
            // Logout forcefully from here
          } else {
            updateUserToken(function (accessToken) {
              accessToken.token = response.data.token;
              accessToken.tokenValidity = response.data.tokenValidity;
              accessToken.refreshToken = response.data.refreshToken;
              accessToken.refreshTokenValidity =
                response.data.refreshTokenValidity;
            });
            
            adminCreateHandler();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log(
        "refreshTknValidity.getTime() <= currentLocalDateTime.getTime()"
      );
      // Logout forcefully from here
    }
  };

  const adminCreateHandler = () => {
    console.log("config", config);
    const registerAPI = "http://localhost:8080/auth/signup?";
    axios
      .post(registerAPI, registerData, config)
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
