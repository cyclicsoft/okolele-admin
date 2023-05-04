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
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// Custom Input
import CustomInput from "components/CustomInput/CustomInput.js";
import { apiHeader } from "services/helper-function/api-header";

const useStyles = makeStyles(styles);

const UpdateOrderStatus = (props) => {
  const classes = useStyles();
  const searchButton = classes.top + " " + classes.searchButton;

  //   orderId from props
  var orderId = props.location.orderId;

  // Root Path URL
  const rootPath = process.env.REACT_APP_BASE_URL;
  // headers
  const [headers, setHeaders] = useState();

  //   Order Info
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderID, setOrderID] = useState(orderId);
  const [orderStatus, setOrderStatus] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [cupon, setCupon] = useState("");
  const [cuponDiscount, setCuponDiscount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [createdOn, setCreatedOn] = useState("");
  const [updatedOn, setUpdatedOn] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [paidAmount, setPaidAmount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [billingAddress, setBillingAddress] = useState([]);
  const [shipmentAddress, setShipmentAddress] = useState([]);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    apiHeader((headers) => {
      setHeaders(headers);
    });
  }, []);

  useEffect(() => {
    if (headers) {
      getOrderDetails();
    }
  }, [orderID, headers]);

  const getOrderDetails = () => {
    const orderDetailsAPI = rootPath + "/order/" + orderID;
    axios
      .get(orderDetailsAPI, headers)
      .then(function (response) {
        setOrderDetails(response.data.content);
        console.log("Order Details...: ", response.data.content);

        setOrderID(response.data.content.id);
        setOrderStatus(response.data.content.orderStatus);
        setUserId(response.data.content.userId);
        setMessage(response.data.content.message);
        setCupon(response.data.content.coupon);
        setCuponDiscount(response.data.content.couponDiscount);
        setSubTotal(response.data.content.subTotal);
        setTotalDiscount(response.data.content.totalDiscount);
        setCreatedOn(response.data.content.createdDate);
        setUpdatedOn(response.data.content.modifiedDate);
        setOrderItems(response.data.content.orderItems);
        setPaidAmount(response.data.content.paidAmount);
        setPaymentStatus(response.data.content.paymentStatus);
        setPaymentType(response.data.content.paymentType);
        setBillingAddress(response.data.content.billingAddress);
        setShipmentAddress(response.data.content.shipmentAddress);
        setTransactionId(response.data.content.transactionId);
      })
      .catch(function (error) {
        console.log("Order Details error", error);
      });
  };

  const statusUpdaeClick = () => {
    updateStatus();
  };
  const updateStatus = () => {
    const statusUpdateAPI =
      rootPath +
      "/order/status/" +
      orderID +
      "?userId=" +
      userId +
      "&orderStatus=" +
      orderStatus +
      "&orderActiveStatus=false";

    axios
      .put(statusUpdateAPI, {}, headers)
      .then(function (response) {
        console.log("Order status update...: ", response);
      })
      .catch(function (error) {
        console.log("Order status update error", error);
      });
  };

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <AddShoppingCartIcon />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Update Order Status</h4>
            </CardHeader>

            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <div>
                    <select
                      style={{ height: "43px", marginTop: "4px" }}
                      value={orderStatus}
                      onChange={(event) => setOrderStatus(event.target.value)}
                    >
                      <option value="DRAFT">DRAFT</option>
                      <option value="IN_REVIEW">IN_REVIEW</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERY_IN_PROGRESS">
                        DELIVERY_IN_PROGRESS
                      </option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED_USER">CANCELLED_USER</option>
                      <option value="CANCELLED_ADMIN">CANCELLED_ADMIN</option>
                      <option value="FAILED_DELIVER1">FAILED_DELIVER1</option>
                      <option value="FAILED_DELIVER2">FAILED_DELIVER2</option>
                      <option value="FAILED_DELIVER3">FAILED_DELIVER3</option>
                      <option value="FAILED_PAYMENT">FAILED_PAYMENT</option>
                      <option value="ERR_UNKNOWN">ERR_UNKNOWN</option>
                    </select>
                  </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <Button
                    color="rose"
                    aria-label="edit"
                    className={searchButton}
                    onClick={() => statusUpdaeClick()}
                  >
                    Update Status
                  </Button>
                </GridItem>
              </GridContainer>

              <br />

              <h4 className={classes.cardIconTitle}>Basic Info</h4>
              <GridContainer>
                {/* Order ID */}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Order ID"
                    id="order-id"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: orderID || "",
                      //   onChange: (event) => setName(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>

                {/* Order Status */}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Order Status"
                    id="order-status"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: orderStatus || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>

                {/* User ID */}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="User ID"
                    id="user-id"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: userId || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>

                {/* Transection ID */}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Transection ID"
                    id="transection-id"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: transactionId || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>

                {/* Customer Message */}
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Customer Message"
                    id="message"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: message || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "150",
                    }}
                  />
                </GridItem>

                {/* Created On */}
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Created On"
                    id="created-on"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: createdOn || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>

                {/* Updated On */}
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Updated On"
                    id="updated-on"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: updatedOn || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
};

export default UpdateOrderStatus;
