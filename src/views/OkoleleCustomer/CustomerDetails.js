import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
// Global State
import { store, useGlobalState } from "state-pool";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// Custom Input
import CustomInput from "components/CustomInput/CustomInput.js";
import Clearfix from "components/Clearfix/Clearfix.js";

const useStyles = makeStyles(styles);

const CustomerDetails = (props) => {
  const classes = useStyles();

  //   orderId from props
  var customerId = props.location.customerId;
  console.log("customerId: ", customerId);

  // accessToken
  const [userToken, setUserToken, updateUserToken] = useGlobalState(
    "accessToken"
  );
  // Root Path URL
  const rootPath = useGlobalState("rootPathVariable");

  // Customer Info
  const [customerID, setCustomerID] = useState(customerId);
  const [name, setName] = useState();
  const [customerName, setCustomerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [addressBook, setAddressBook] = useState([]);

  useEffect(() => {
    getToken((token) => {
      getCustomerDetails(token);
    });
  }, [customerID]);

  const getCustomerDetails = (token) => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    console.log("config...: ", config);

    const customerDetailsAPI = rootPath[0] + "/users/" + customerID;
    axios
      .get(customerDetailsAPI, config)
      .then(function (response) {
        setName(response.data.content.name);
        setCustomerName(response.data.content.userName);
        setMobile(response.data.content.mobile);
        setEmail(response.data.content.email);
        setIsVerified(response.data.content.isVerified);
        setIsActive(response.data.content.isActive);
        setAddressBook(response.data.content.addresses);
      })
      .catch(function (error) {
        console.log("Order Details error", error);
      });
  };

  // get Token
  function getToken(callback) {
    let userTkn = userToken;
    console.log("getToken/userToken: ", userTkn);
    // token
    let token = userTkn.token;
    // tokenValidity
    var tokenTime = new Date(userTkn.tokenValidity);
    // current time
    var now = new Date();

    if (tokenTime.getTime() > now.getTime()) {
      console.log("getToken/If conditio", token);
      callback(token);
    } else {
      refreshTokenGenerator((newToken) => {
        console.log("getToken/Else conditio", newToken);
        if (newToken !== null && newToken.length > 0) {
          token = newToken;
          callback(token);
        }
      });
    }
  }
  // Refresh Token Generator
  function refreshTokenGenerator(callback) {
    var refreshTokenTime = new Date(userToken.refreshTokenValidity);
    var now = new Date();

    if (refreshTokenTime.getTime() > now.getTime()) {
      const refreshTokenAPI = rootPath[0] + "/auth/token";
      console.log(
        "RefreshTokenGenerator/refreshToken before generation: ",
        userToken.refreshToken
      );

      axios
        .post(refreshTokenAPI, {
          refreshToken: userToken.refreshToken,
        })
        .then(function (response) {
          if (response.status == 403) {
            alert(response.data.message);
            localStorage.clear();
            window.location.href = "/";
          } else {
            tokenUdateHandler(response.data);

            console.log("RefreshTokenGenerator/response.data: ", response.data);
            callback(response.data.token);
          }
        })
        .catch(function (error) {
          console.log("RefreshTokenGenerator / error: ", error);
          localStorage.clear();
          window.location.href = "/";
        });
    } else {
      localStorage.clear();
      window.location.href = "/";
    }
  }
  // token Udate to Global state
  const tokenUdateHandler = (TokenContent) => {
    updateUserToken(function (accessToken) {
      accessToken.token = TokenContent.token;
      accessToken.tokenValidity = TokenContent.tokenValidity;
      accessToken.refreshToken = TokenContent.refreshToken;
      accessToken.refreshTokenValidity = TokenContent.refreshTokenValidity;
    });
  };

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <AccountCircleIcon />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Customer Details</h4>
            </CardHeader>

            <CardBody>
              <h4 className={classes.cardIconTitle}>Basic Info</h4>
              <GridContainer>
                {/* Customer ID */}
                <GridItem xs={12} sm={12} md={3}>
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

                {/* Customer Name */}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Customer Name"
                    id="customer-name"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: customerName || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>

                {/* Phone */}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Phone"
                    id="phone"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mobile || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>

                {/* Email */}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Email"
                    id="email"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: email || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>

                {/* Verification Status */}
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Verification Status"
                    id="verification-status"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: isVerified || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "150",
                    }}
                  />
                </GridItem>

                {/*Active Status */}
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
                      value: isActive || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>
              </GridContainer>

              <h4 className={classes.cardIconTitle}>Address Book</h4>
              {addressBook.map((addressBook) => (
                <GridContainer>
                  {/* Default Address */}
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Default Address"
                      id="default-address"
                      disabled="true"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: addressBook.isDefault || "",
                        //   onChange: (event) => setProductDescription(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>

                  {/* Name */}
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Name"
                      id="address-name"
                      disabled="true"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: addressBook.name || "",
                        //   onChange: (event) => setProductDescription(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>

                  {/* Mobile */}
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Mobile"
                      id="address-mobile"
                      disabled="true"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: addressBook.mobile || "",
                        //   onChange: (event) => setProductDescription(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>

                  {/* Division */}
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Division"
                      id="address-division"
                      disabled="true"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: addressBook.division || "",
                        //   onChange: (event) => setProductDescription(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>

                  {/* District */}
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="District"
                      id="address-district"
                      disabled="true"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: addressBook.district || "",
                        //   onChange: (event) => setProductDescription(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>

                  {/* Area */}
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Area"
                      id="address-area"
                      disabled="true"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: addressBook.area || "",
                        //   onChange: (event) => setProductDescription(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>

                  {/* Label */}
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Label"
                      id="address-label"
                      disabled="true"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: addressBook.label || "",
                        //   onChange: (event) => setProductDescription(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>

                  {/* Address */}
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Address"
                      id="address-address"
                      disabled="true"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: addressBook.address || "",
                        //   onChange: (event) => setProductDescription(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                </GridContainer>
              ))}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
};

export default CustomerDetails;
