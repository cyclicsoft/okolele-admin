//index->App->AdminLogin
import React, { useState } from "react";
import axios from "axios";
// Global State
import { store, useGlobalState } from "state-pool";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
// import Face from "@material-ui/icons/Face";
// import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

// Importing toastify module
import { toast } from "react-toastify";
// Import toastify css file
import "react-toastify/dist/ReactToastify.css";
// toast-configuration method,
// it is compulsory method.
toast.configure();

// Store Global state
store.setState("accessToken", {
  token: "",
  tokenValidity: "",
  refreshToken: "",
  refreshTokenValidity: "",
});

store.setState("loggedInAdminInfo", {
  id: "",
  email: "",
  username: "",
  roles: "",
});

const useStyles = makeStyles(styles);

export default function AdminLogin(props) {
  const classes = useStyles();
  // Root Path URL
  const rootPath = useGlobalState("rootPathVariable");
  // login popup with animation
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  // Loing data
  const [emailPhone, setEmailPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userToken, setUserToken, updateUserToken] = useGlobalState(
    "accessToken"
  );
  const [adminInfo, setAdminInfo, updateAdminInfo] = useGlobalState(
    "loggedInAdminInfo"
  );

  // Load login popup with animation
  React.useEffect(() => {
    let id = setTimeout(function () {
      setCardAnimation("");
    }, 700);
    //Specify how to clean up after this effect:
    return function clearTimeout(id) {
      //window.clearTimeout(id);
    };
  });

  const loginFormHandler = (event) => {
    const userData = {
      userName: emailPhone,
      password: password,
      app_name: "ADMIN",
    };
    console.log(userData);

    if (emailPhone.length != 0 || password.length != 0) {
      //alert('Opps! Please Enter All The Fields')
      const loginAPI = rootPath[0] + "/auth/login";
      axios
        .post(loginAPI, userData)
        .then(function (response) {
          console.log("Accress Token Info: ", response.data.content);
          // var date = new Date(response.data.content.tokenValidity);
          // console.log("response: ", date.toString());
          // console.log("response code: ", response.status);
          // console.log("Access token api response: ", response.data.content);
          if (response.status == 200) {
            toast.success(
              "Login Successful!",
              { position: toast.POSITION.TOP_CENTER },
              { autoClose: 50 }
            );
          } else if (response.status == 400) {
            toast.error(
              "Invalid Request!",
              { position: toast.POSITION.TOP_CENTER },
              { autoClose: 2000 }
            );
          } else if (response.status == 401) {
            toast.error(
              "Unauthorization Detected! Please try again.",
              { position: toast.POSITION.TOP_CENTER },
              { autoClose: 2000 }
            );
          }

          try {
            tokenUdateHandler(response.data.content);
            adminInfoUdateHandler(response.data.content);
          } catch (e) {
            console.log(e.message);
          }

          props.LoginStatusChange(true);
        })
        .catch(function (error) {
          alert("Oops! Please try again.");
          props.LoginStatusChange(false);
        });
    } else {
      alert("Oops! Please enter both field.");
      // props.LoginStatusChange(true);
    }

    event.preventDefault();
  };

  const tokenUdateHandler = (TokenContent) => {
    updateUserToken(function (accessToken) {
      accessToken.token = TokenContent.token;
      accessToken.tokenValidity = TokenContent.tokenValidity;
      accessToken.refreshToken = TokenContent.refreshToken;
      accessToken.refreshTokenValidity = TokenContent.refreshTokenValidity;
    });
  };

  const adminInfoUdateHandler = (adminInfo) => {
    updateAdminInfo(function (loggedInAdminInfo) {
      loggedInAdminInfo.id = adminInfo.id;
      loggedInAdminInfo.email = adminInfo.email;
      loggedInAdminInfo.username = adminInfo.username;
      loggedInAdminInfo.roles = adminInfo.roles;
    });
  };

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form onSubmit={loginFormHandler}>
            <Card login className={classes[cardAnimaton]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="rose"
              >
                <h4 className={classes.cardTitle}>Log In</h4>
              </CardHeader>

              <CardBody>
                <CustomInput
                  labelText="Email or Password"
                  id="emailphone"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    // endAdornment: (
                    //   <InputAdornment position="end">
                    //     <Email className={classes.inputAdornmentIcon} />
                    //   </InputAdornment>
                    // ),
                    type: "Text",
                    value: emailPhone,
                    onChange: (event) => setEmailPhone(event.target.value),
                  }}
                />
                <CustomInput
                  labelText="Password"
                  id="password"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    autoComplete: "off",
                    type: "Password",
                    value: password,
                    onChange: (event) => setPassword(event.target.value),
                    maxLength: "10",
                    minLength: "6",
                  }}
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button color="rose" simple size="lg" block type="submit">
                  Let{"'"}s Go
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
