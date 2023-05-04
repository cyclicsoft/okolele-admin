/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
// Global State
import { store, useGlobalState } from "state-pool";
// material-ui icons
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Radio from "@material-ui/core/Radio";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
// Card
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
// Custom Input
import CustomInput from "components/CustomInput/CustomInput.js";
import Clearfix from "components/Clearfix/Clearfix.js";
// Date
import "date-fns";
import DateValidate from "views/DatePicker/DateValidate";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
// SCSS File
import "../../assets/scss/ghorwali-scss/voucherCard.scss";

import moment from "moment";
import { title } from "assets/jss/material-dashboard-pro-react";
import SaveWarning from "views/ConfirmationModals/SaveWarning";
import { apiHeader } from "services/helper-function/api-header";
// var moment = require('moment');

const useStyles = makeStyles(styles);

function CreateVoucher() {
  const classes = useStyles();
  // accessToken
  const [userToken, setUserToken, updateUserToken] = useGlobalState(
    "accessToken"
  );
  // Root Path URL
  const rootPath = process.env.REACT_APP_BASE_URL;
  // headers
  const [headers, setHeaders] = useState();

  const [VoucherCode, setVoucherCode] = useState("");
  const [voucherType, setVoucherType] = useState("FLAT");
  const [VoucherValue, setVoucherValue] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [minPurchase, setMinPurchase] = useState(0);
  const [usageLimit, setUsageLimit] = useState(1);

  const [selectedStartDate, setselectedStartDate] = React.useState(new Date());
  const [selectedEndDate, setselectedEndDate] = React.useState(new Date());

  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  useEffect(() => {
    apiHeader((headers) => {
      setHeaders(headers);
    });
  }, []);

  useEffect(() => {
    toTimeStamp();
  }, [selectedStartDate, selectedEndDate]);

  //Start Date
  const handleStartDate = (date) => {
    setselectedStartDate(date);
    console.log(date);
  };
  //End Date
  const handleEndDate = (date) => {
    setselectedEndDate(date);
    console.log(date);
  };

  const handleVoucherTypeChange = (event) => {
    setVoucherType(event.target.value);
  };

  const voucherData = {
    coupon_code: VoucherCode,
    coupon_type: voucherType,
    value: VoucherValue,
    usage_limit: usageLimit,
    start_date: startDateTime,
    expiry_date: endDateTime,
    max_discount_amount: maxAmount,
    min_order_value: minPurchase,
    is_active: false,
  };

  const voucherSaveClick = () => {
    voucherSaveHandler();
  };
  const voucherSaveHandler = () => {
    if (inputDateValidityCheck() === true) {
      const voucherCreateAPI = rootPath + "/coupon";
      console.log("voucherSaveHandler/voucherData: ", voucherData);

      axios
        .post(voucherCreateAPI, voucherData, headers)
        .then(function (response) {
          console.log("update response: ", response);
        })
        .catch(function (error) {
          // handle error
          console.log("error.response.status: ", error.response.status);
          if (error.response.status === 409) {
            alert("The Cupon Code already exist!");
          }
        });
    }
  };

  const inputDateValidityCheck = () => {
    if (selectedStartDate.getTime() <= selectedEndDate.getTime()) {
      if (selectedStartDate.getTime() === selectedEndDate.getTime()) {
        toTimeStamp();
        if (voucherType === "PERCENT" && VoucherValue > 100) {
          alert("Percentage value can not be more than 100");
          return false;
        } else {
          console.log("voucherData...: ", voucherData);
          return true;
        }
      } else {
        toTimeStamp();
        if (voucherType === "PERCENT" && VoucherValue > 100) {
          alert("Percentage value can not be more than 100");
          return false;
        } else {
          console.log("voucherData...: ", voucherData);
          return true;
        }
      }
    } else {
      alert("End Date must be greater than Start Date");
      return false;
    }
  };

  // Convert to TimeStamp
  const toTimeStamp = () => {
    // start date time
    const startDate = splitDate(selectedStartDate);
    setStartDateTime(startDate);

    // end date time
    const endtDate = splitDate(selectedEndDate);
    setEndDateTime(endtDate);
  };
  // split Date
  const splitDate = (x) => {
    const temp = new Date(x.getTime() - x.getTimezoneOffset() * 60000).toJSON();
    const splitedDate = JSON.stringify(temp).slice(1, 11);
    console.log("temp: ", splitedDate);
    return splitedDate;
  };

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <LocalOfferIcon />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Create Voucher</h4>
            </CardHeader>
            <CardBody>
              {/* Voucher Type  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <div>Select Voucher Type</div>
                  <div
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          checked={voucherType === "FLAT"}
                          onChange={handleVoucherTypeChange}
                          value="FLAT" // 1 For Fixed Amount and 2 For Percetage
                          name="radio button demo"
                          aria-label="A"
                          icon={
                            <FiberManualRecord
                              className={classes.radioUnchecked}
                            />
                          }
                          checkedIcon={
                            <FiberManualRecord
                              className={classes.radioChecked}
                            />
                          }
                          classes={{
                            checked: classes.radio,
                            root: classes.radioRoot,
                          }}
                        />
                      }
                      classes={{
                        label: classes.label,
                        root: classes.labelRoot,
                      }}
                      label="Fixed Amount (৳)"
                    />
                  </div>

                  <div
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          checked={voucherType === "PERCENT"}
                          onChange={handleVoucherTypeChange}
                          value="PERCENT" // 1 For Fixed Amount and 2 For Percetage
                          name="radio button demo"
                          aria-label="B"
                          icon={
                            <FiberManualRecord
                              className={classes.radioUnchecked}
                            />
                          }
                          checkedIcon={
                            <FiberManualRecord
                              className={classes.radioChecked}
                            />
                          }
                          classes={{
                            checked: classes.radio,
                            root: classes.radioRoot,
                          }}
                        />
                      }
                      classes={{
                        label: classes.label,
                        root: classes.labelRoot,
                      }}
                      label="Percentage (%)"
                    />
                  </div>
                </GridItem>
              </GridContainer>

              {/* Code  and Value*/}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Voucher Code"
                    id="voucher-code"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: VoucherCode || "",
                      onChange: (event) => setVoucherCode(event.target.value),
                      maxLength: "10",
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Voucher Value"
                    id="voucher-value"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "Number",
                      value: VoucherValue || "",
                      onChange: (event) => setVoucherValue(event.target.value),
                      maxLength: "10",
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* Max amount and Min Purchase  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    // disabled={voucherType === "FLAT" ? true : false}
                    labelText="Maximum amount"
                    id="max-amount"
                    formControlProps={{
                      fullWidth: true,
                      disabled: voucherType === "FLAT" ? true : false,
                    }}
                    inputProps={{
                      type: "String",
                      value: maxAmount || "",
                      onChange: (event) => setMaxAmount(event.target.value),
                      maxLength: "10",
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Minimum Purchase"
                    id="minimum-purchase"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "Number",
                      value: minPurchase || "",
                      onChange: (event) => setMinPurchase(event.target.value),
                      maxLength: "10",
                    }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                {/* Usage Limit */}
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Usage Limit"
                    id="usage-limit"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "Number",
                      value: usageLimit || "",
                      onChange: (event) => setUsageLimit(event.target.value),
                      maxLength: "3",
                    }}
                  />
                </GridItem>
                {/* Date Picker */}
                <GridItem>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        margin="normal"
                        style={{ marginRight: "12px" }}
                        id="date-picker-dialog"
                        label="Start Date"
                        format="MM/dd/yyyy"
                        value={selectedStartDate}
                        onChange={handleStartDate}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Start Date"
                        format="MM/dd/yyyy"
                        value={selectedEndDate}
                        onChange={handleEndDate}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </GridItem>
              </GridContainer>

              {/* <GridContainer>
                <DateValidate
                  handleStartDate={handleStartDate}
                  handleStartTime={handleStartTime}
                  handleEndDate={handleEndDate}
                  handleEndTime={handleEndTime}
                />
              </GridContainer> */}

              <Button
                color="rose"
                className={classes.updateProfileButton}
                onClick={voucherSaveClick}
              >
                Save Voucher
              </Button>
              <Clearfix />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}

export default CreateVoucher;
