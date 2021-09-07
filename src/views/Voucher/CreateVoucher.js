import React, { useState, useEffect } from "react";
import axios from "axios";
// material-ui icons
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
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
import 'date-fns';
import DateValidate from 'views/DatePicker/DateValidate';
// SCSS File
import '../../assets/scss/ghorwali-scss/voucherCard.scss'


import moment from 'moment';
import { title } from "assets/jss/material-dashboard-pro-react";
import SaveWarning from "views/ConfirmationModals/SaveWarning";
// var moment = require('moment');


const useStyles = makeStyles(styles);

function CreateVoucher() {

  const classes = useStyles();

  const [cardTitle, setcardTitle] = useState('');
  const [VoucherCode, setVoucherCode] = useState('')
  const [voucherType, setVoucherType] = useState('1');
  const [description, setDescription] = useState('');
  const [VoucherValue, setVoucherValue] = useState('0');
  const [maxAmount, setMaxAmount] = useState('0');
  const [minPurchase, setMinPurchase] = useState('0');

  // The first commit of Material-UI
  const [selectedStartDate, setselectedStartDate] = React.useState(new Date());
  const [selectedStartTime, setselectedStartTime] = React.useState(new Date());
  const [selectedEndDate, setselectedEndDate] = React.useState(new Date());
  const [selectedEndTime, setselectedEndTime] = React.useState(new Date());

  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');

  useEffect(() => {
    toTimeStamp();
}, [selectedStartDate, selectedStartTime, selectedEndDate, selectedEndTime]);


  //Start Date
  const handleStartDate = (date) => {
    setselectedStartDate(date);
    // alert(date);
  }
  //Start Time
  const handleStartTime = (date) => {
    setselectedStartTime(date);
    // alert(date);
  }
  //End Date
  const handleEndDate = (date) => {
    setselectedEndDate(date);
    // alert(date);
  }
  //End Time
  const handleEndTime = (date) => {
    setselectedEndTime(date);
    // alert(date);
  }


  const handleVoucherTypeChange = event => {
    setVoucherType(event.target.value);
  }


  const voucherData = {
    "voucherTitle": cardTitle,
    "description": description,
    "voucherCode": VoucherCode,
    "ownerType": '0', 
    "voucherType": voucherType,
    "voucherValue": VoucherValue,
    "startDate": startDateTime,
    "endDate": endDateTime,
    "maxAmount": maxAmount,
    "minPurchaseAmount": minPurchase
  }
  const cardSaveHandler = (event) => {
    if (selectedStartDate.getTime() <= selectedEndDate.getTime()) {
      if (selectedStartDate.getTime() === selectedEndDate.getTime()) {
        if (selectedStartTime.getTime() < selectedEndTime.getTime()) {
          toTimeStamp();
          if(voucherData.voucherType === '2' && voucherData.voucherValue>'100'){
            alert('Percentage value can not be more than 100');
          }else {
            console.log('voucherData: ', voucherData);
            const voucherCreateUrl = '/multivendorshop/mv/v1/voucher/app/admin';
            axios.post(voucherCreateUrl, voucherData)
              .then(function (response) {
                console.log('update response: ', response);
              })
              .catch(function (error) {
                // handle error
                console.log('error: ', error);
              });
          }
        } else {
          alert("End Time must be greater than Start Time")
        }
      } else {
        toTimeStamp();
        if(voucherData.voucherType === '2' && voucherData.voucherValue>'100'){
          alert('Percentage value can not be more than 100');
        }else {
          console.log('voucherData: ', voucherData);
          const voucherCreateUrl = '/multivendorshop/mv/v1/voucher/app/admin';
          axios.post(voucherCreateUrl, voucherData)
            .then(function (response) {
              console.log('update response: ', response);
            })
            .catch(function (error) {
              // handle error
              console.log('error: ', error);
            });
        }
      }

    }
    else {
      alert("End Date must be greater than Start Date")
    }
  }


  // Convert to TimeStamp 
  const toTimeStamp = () => {
    // start date time 
    const startDate = splitDate(selectedStartDate);
    console.log('selectedStartDate: ', selectedStartDate);
    const startTime = splitTime(selectedStartTime);
    const startDT = startDate + ' ' + startTime;
    const startDtStamp = new Date(startDT).valueOf(); // converting to unix timestamp
    // const startDtStamp = Date.parse(startDT) / 1000; // converting to normal timestamp
    console.log('startDtStamp: ', startDT);
    setStartDateTime(startDtStamp);

    // end date time
    const endtDate = splitDate(selectedEndDate);
    const endTime = splitTime(selectedEndTime);
    const endDT = endtDate + ' ' + endTime;
    const endDtStamp = new Date(endDT).valueOf(); // converting to unix timestamp
    // const endDtStamp = Date.parse(endDT) / 1000; // converting to normal timestamp
    console.log('endDtStamp: ', endDtStamp);
    setEndDateTime(endDtStamp);
  }
  // split Date 
  const splitDate = (x) => {
    const temp = new Date(x.getTime() - (x.getTimezoneOffset() * 60000)).toJSON();
    const splitedDate = JSON.stringify(temp).slice(1, 11);
    console.log('temp: ', splitedDate);
    return splitedDate;
  }
  // split Time 
  const splitTime = (x) => {
    let hoursDiff = x.getHours();
    let minutesDiff = x.getMinutes();
    let secondDiff = x.getSeconds();
    console.log(hoursDiff + ':' + minutesDiff + ':' + secondDiff);
    return hoursDiff + ':' + minutesDiff + ':' + secondDiff;
  }

  return (
    <>
      
      <GridContainer>
        <GridItem xs={12} sm={12} >
          {/* md={8} */}
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <LocalOfferIcon />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
                Create Voucher
              </h4>
            </CardHeader>
            <CardBody>

              {/* Card Title  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Card Title"
                    id="card-title"
                    disabled='true'
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: 'String',
                      value: cardTitle || '',
                      onChange: (event) => setcardTitle(event.target.value),
                      maxLength: "50"
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* Description  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Description "
                    id="description"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: 'String',
                      value: description || '',
                      onChange: (event) => setDescription(event.target.value),
                      maxLength: "200"

                    }}
                  />
                </GridItem>
              </GridContainer>

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
                          checked={voucherType === "1"}
                          onChange={handleVoucherTypeChange}
                          value="1" // 1 For Fixed Amount and 2 For Percetage
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
                            root: classes.radioRoot
                          }}
                        />
                      }
                      classes={{
                        label: classes.label,
                        root: classes.labelRoot
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
                          checked={voucherType === "2"}
                          onChange={handleVoucherTypeChange}
                          value="2" // 1 For Fixed Amount and 2 For Percetage
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
                            root: classes.radioRoot
                          }}
                        />
                      }
                      classes={{
                        label: classes.label,
                        root: classes.labelRoot
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
                      fullWidth: true
                    }}
                    inputProps={{
                      type: 'String',
                      value: VoucherCode || '',
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
                      fullWidth: true
                    }}
                    inputProps={{
                      type: 'Number',
                      value: VoucherValue || '',
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
                    labelText="Maximum amount"
                    id="max-amount"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: 'String',
                      value: maxAmount || '',
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
                      fullWidth: true
                    }}
                    inputProps={{
                      type: 'Number',
                      value: minPurchase || '',
                      onChange: (event) => setMinPurchase(event.target.value),
                      maxLength: "10",
                    }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <DateValidate
                  handleStartDate={handleStartDate}
                  handleStartTime={handleStartTime}
                  handleEndDate={handleEndDate}
                  handleEndTime={handleEndTime}
                />
              </GridContainer>

              <Button color="rose" className={classes.updateProfileButton} onClick={cardSaveHandler}>
                Save Voucher
              </Button>
              <Clearfix />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

    </>

  )
}

export default CreateVoucher
