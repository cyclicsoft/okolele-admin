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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// Custom Input
import CustomInput from "components/CustomInput/CustomInput.js";
import UpdateWarning from "views/ConfirmationModals/UpdateWarning";

const useStyles = makeStyles(styles);

const UpdateCustomerDetails = (props) => {
  const classes = useStyles();
  const searchButton = classes.top + " " + classes.searchButton;

  //   orderId from props
  var customerId = props.location.customerId;
  console.log("customerId: ", customerId);

  // Root Path URL
  const rootPath = process.env.REACT_APP_BASE_URL;

  const [headers, setHeaders] = useState();

  // Customer Info
  const [customerID, setCustomerID] = useState(customerId);
  const [name, setName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [addressBook, setAddressBook] = useState([]);

  const [showUpdateWarningPopup, setShowUpdateWarningPopup] = useState(false);

  useEffect(() => {
    if (headers) {
      getCustomerDetails();
    }
  }, [customerID, headers]);

  const getCustomerDetails = () => {
    const customerDetailsAPI = rootPath + "/users/" + customerID;
    axios
      .get(customerDetailsAPI, headers)
      .then(function (response) {
        console.log("Customer Details", response.data);

        setName(response.data.content.name);
        setCustomerName(response.data.content.userName);
        setImage(response.data.content.img);
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

  const customerData = {
    name: name,
    mobile: mobile,
    email: email,
    img: image,
  };
  const customerUpdaeClick = () => {
    setShowUpdateWarningPopup(true);
  };
  // status Change Flag From Modal
  const updateConfirmationFlag = (isConfirmed) => {
    if (isConfirmed === true) {
      updateCustomer();
    }
    setShowUpdateWarningPopup(false);
  };

  const updateCustomer = () => {
    const customerUpdateAPI = rootPath + "/users/" + customerID;
    axios
      .put(customerUpdateAPI, customerData, headers)
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
                <AccountCircleIcon />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Update Customer</h4>
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
                      value: name || "",
                      onChange: (event) => setName(event.target.value),
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
                      type: "Phone",
                      value: mobile || "",
                      onChange: (event) => setMobile(event.target.value),
                      maxLength: "14",
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
                      type: "Email",
                      value: email || "",
                      onChange: (event) => setEmail(event.target.value),
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

              <Button
                color="rose"
                aria-label="edit"
                className={searchButton}
                onClick={() => customerUpdaeClick()}
              >
                Update
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
};

export default UpdateCustomerDetails;
