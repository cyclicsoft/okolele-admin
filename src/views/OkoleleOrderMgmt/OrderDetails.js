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
// Custom Input
import CustomInput from "components/CustomInput/CustomInput.js";
import Clearfix from "components/Clearfix/Clearfix.js";

const useStyles = makeStyles(styles);

const OrderDetails = (props) => {
  const classes = useStyles();

  //   orderId from props
  var orderId = props.location.orderId;
  console.log("orderId: ", orderId);

  // accessToken
  const [userToken, setUserToken, updateUserToken] = useGlobalState(
    "accessToken"
  );

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
    getToken((token) => {
      getOrderDetails(token);
    });
  }, [orderID]);

  const getOrderDetails = (token) => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    console.log("config...: ", config);

    const orderDetailsAPI = "http://localhost:8080/order/" + orderID;
    axios
      .get(orderDetailsAPI, config)
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
      const refreshTokenAPI = "http://localhost:8080/auth/token";
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
                <AddShoppingCartIcon />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Order Details</h4>
            </CardHeader>

            <CardBody>
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

              <h4 className={classes.cardIconTitle}>Pricing</h4>
              <GridContainer>
                {/* Cupon */}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Cupon"
                    id="cupon"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: cupon || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>

                {/* Cupon Discount*/}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Cupon Discount"
                    id="cupon-discount"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: cuponDiscount || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>

                {/* Total Discount*/}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Total Discount"
                    id="total-discount"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: totalDiscount || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>

                {/* Sub-Total*/}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Sub-Total"
                    id="sub-total"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: subTotal || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>

                {/* Paid Amount*/}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Paid Amount"
                    id="paid-amount"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: paidAmount || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>

                {/* Payment Type*/}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Payment Type"
                    id="payment-type"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: paymentType || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>

                {/* Payment Status*/}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Payment Status"
                    id="payment-status"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: paymentStatus || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>
              </GridContainer>

              <h4 className={classes.cardIconTitle}>Shipping Address</h4>
              <GridContainer>
                {/* Name */}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Name"
                    id="shipmentAddress-name"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: shipmentAddress.name || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>

                {/* Mobile */}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Mobile"
                    id="shipmentAddress-mobile"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: shipmentAddress.mobile || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>

                {/* Division */}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Division"
                    id="shipmentAddress-division"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: shipmentAddress.division || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>

                {/* District */}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="District"
                    id="shipmentAddress-district"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: shipmentAddress.district || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>

                {/* Area */}
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Area"
                    id="shipmentAddress-area"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: shipmentAddress.area || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "150",
                    }}
                  />
                </GridItem>
              </GridContainer>

              <h4 className={classes.cardIconTitle}>Billing Address</h4>
              <GridContainer>
                {/* Name */}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Name"
                    id="billing-name"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: billingAddress.name || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>

                {/* Mobile */}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Mobile"
                    id="billing-mobile"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: billingAddress.mobile || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>

                {/* Division */}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Division"
                    id="billing-division"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: billingAddress.division || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>

                {/* District */}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="District"
                    id="billing-district"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: billingAddress.district || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "50",
                    }}
                  />
                </GridItem>

                {/* Area */}
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Area"
                    id="billing-area"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: billingAddress.area || "",
                      //   onChange: (event) => setProductDescription(event.target.value),
                      maxLength: "150",
                    }}
                  />
                </GridItem>
              </GridContainer>

              <h4 className={classes.cardIconTitle}>Order Items</h4>
              {orderItems.map((orderItem) => (
                <GridContainer>
                  {/* Product Title */}
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Product Title"
                      id="product-title"
                      disabled="true"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: orderItem.productTitle || "",
                        //   onChange: (event) => setProductDescription(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>

                  {/* Product ID */}
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Product ID"
                      id="product-id"
                      disabled="true"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: orderItem.productId || "",
                        //   onChange: (event) => setProductDescription(event.target.value),
                        maxLength: "50",
                      }}
                    />
                  </GridItem>

                  {/* Product Type */}
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Product Type"
                      id="product-type"
                      disabled="true"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: orderItem.productType || "",
                        //   onChange: (event) => setProductDescription(event.target.value),
                        maxLength: "50",
                      }}
                    />
                  </GridItem>

                  {/* Product Color */}
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Product Color"
                      id="product-color"
                      disabled="true"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: orderItem.productVariant.color || "",
                        //   onChange: (event) => setProductDescription(event.target.value),
                        maxLength: "50",
                      }}
                    />
                  </GridItem>

                  {/* Order Quantity */}
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Order Quantity"
                      id="order-quantity"
                      disabled="true"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: orderItem.quantity || "",
                        //   onChange: (event) => setProductDescription(event.target.value),
                        maxLength: "50",
                      }}
                    />
                  </GridItem>

                  {/* Discount Type */}
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Discount Type"
                      id="discount-type"
                      disabled="true"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: orderItem.discount.type || "",
                        //   onChange: (event) => setProductDescription(event.target.value),
                        maxLength: "50",
                      }}
                    />
                  </GridItem>

                  {/* Discount Value */}
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Discount Value"
                      id="discount-value"
                      disabled="true"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: orderItem.discount.value || "",
                        //   onChange: (event) => setProductDescription(event.target.value),
                        maxLength: "50",
                      }}
                    />
                  </GridItem>

                  {orderItem.productVariantsIds.map((productVariantsId) => (
                    // Variant ID
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Variant ID"
                        id="variant-id"
                        disabled="true"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "String",
                          value: productVariantsId || "",
                          //   onChange: (event) => setProductDescription(event.target.value),
                          maxLength: "50",
                        }}
                      />
                    </GridItem>
                  ))}
                </GridContainer>
              ))}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
};

export default OrderDetails;
