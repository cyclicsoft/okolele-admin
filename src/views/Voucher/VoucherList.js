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
//import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";
// Card 
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import Table from "components/Table/Table.js";
// Custom Input 
import CustomInput from "components/CustomInput/CustomInput.js";
import Clearfix from "components/Clearfix/Clearfix.js";
// SCSS File
import '../../assets/scss/ghorwali-scss/voucherCard.scss'
// Pagination 
import PaginationComponent from "views/Pagination/PaginationComponent";
import SearchPaginationComponent from "views/Pagination/SearchPaginationComponent";
// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Search from "@material-ui/icons/Search";
//SCSS file
import '../../assets/scss/ghorwali-scss/voucher-list.scss'
import 'date-fns';
import "../../assets/scss/ghorwali-scss/paginations.scss"
// react component used to create alerts
import DeleteWarning from "views/ConfirmationModals/DeleteWarning";
import UpdateWarning from "views/ConfirmationModals/UpdateWarning";
//Date
import '../../assets/scss/ghorwali-scss/voucherCard.scss'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';

import moment from 'moment';


const useStyles = makeStyles(styles);

export default function VoucherList() {

  // ############################# Vendor List Data#############################
  const [checked, setChecked] = React.useState([]);
  const classes = useStyles();
  const searchButton = classes.top + " " + classes.searchButton;

  const [voucherId, setVoucherId] = useState('');
  const [cardTitle, setcardTitle] = useState('');
  const [VoucherCode, setVoucherCode] = useState('')
  const [voucherType, setVoucherType] = useState('1');
  const [voucherOwnerType, setVoucherOwnerType] = useState('0');
  const [description, setDescription] = useState('');
  const [VoucherValue, setVoucherValue] = useState('0');
  const [maxAmount, setMaxAmount] = useState('0');
  const [minPurchase, setMinPurchase] = useState('0');
  const [activeStatus, setActiveStatus] = useState('');

  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');

  const [voucherList, setVoucherList] = useState([]);
  // Pagination 
  const [totalPageNo, setTotalPageNo] = useState(1);

  const [userNormalRender, setUserNormalRender] = useState(true); // true for normal pagination, false for search pagination

  // Search 
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchTypeValue, setSearchTypeValue] = useState('No Select');

  // The first commit of Material-UI
  const [selectedStartDate, setselectedStartDate] = React.useState(new Date('2021-01-01T00:00:54'));
  const [selectedStartTime, setselectedStartTime] = React.useState(new Date('2021-01-01T00:00:54'));
  const [selectedEndDate, setselectedEndDate] = React.useState(new Date('2021-01-01T00:00:54'));
  const [selectedEndTime, setselectedEndTime] = React.useState(new Date('2021-01-01T00:00:54'));


  // Voucher Delete 
  const [deleteUrl, setDeleteUrl] = useState('');
  const [deleteBtnClicked, setDeleteBtnClicked] = useState(false);
  // Voucher Update 
  const [updateBtnClicked, setUpdateBtnClicked] = useState(false);



  useEffect(() => {
    console.log('---------Called from useEffect----------');
    const pageNo = 0;
    const voucherListUrl = '/multivendorshop/mv/v1/voucher/app/admin?page=' + pageNo + '&size=5';

    axios.get(voucherListUrl)
      .then(function (response) {
        setVoucherList(response.data.content);
        console.log("Total...: ", response.data.totalElements);
        // console.log("Total Page: ", Math.ceil(response.data.totalElements / 10));
        setTotalPageNo(Math.ceil(response.data.totalElements / 5));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [selectedStartDate, selectedStartTime, selectedEndDate, selectedEndTime]);
  // Pagination handler 
  const paginationHandler = (pageNumber) => {
    console.log('---------Called from paginationHandler----------');
    const pageNo = pageNumber - 1;
    const voucherListUrl = '/multivendorshop/mv/v1/voucher/app/admin?page=' + pageNo + '&size=5';

    axios.get(voucherListUrl)
      .then(function (response) {
        setVoucherList(response.data.content);
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  useEffect(() => {
    toTimeStamp();
  }, [selectedStartDate, selectedStartTime, selectedEndDate, selectedEndTime]);



  // handle Search Type
  const handleSearchType = (event) => {
    //Normal pagination component will be hide and Search pagination will be rendered
    if (event.target.value === 'No Select') {
      setUserNormalRender(true);
    } else if (event.target.value === 'Search By Voucher Code') {
      setUserNormalRender(false);
    }

    console.log('event.target.value', event.target.value);
    setSearchTypeValue(event.target.value);
  }
  // Voucher Search Handler
  const voucherSearchHanler = (event) => {
    console.log("searchTypeValue...: ", searchTypeValue);
    console.log("searchKeyword...: ", searchKeyword);
    const pageNo = 0;

    if (searchTypeValue === 'Search By Voucher Code') {
      const voucherSearchByCode = '/multivendorshop/mv/v1/voucher/app/admin/bycode/' + searchKeyword + '?page=' + pageNo + '&size=5';
      axios.get(voucherSearchByCode)
        .then(function (response) {
          setVoucherList(response.data.content);
          console.log("Total...: ", response.data);
          setTotalPageNo(Math.ceil(response.data.totalElements / 5));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else if (searchTypeValue === 'No Select') {
      const voucherListUrl = '/multivendorshop/mv/v1/voucher/app/admin?page=' + pageNo + '&size=5';

      axios.get(voucherListUrl)
        .then(function (response) {
          setVoucherList(response.data.content);
          console.log("Total...: ", response.data.totalElements);
          console.log("Total Page: ", Math.ceil(response.data.totalElements / 5));
          setTotalPageNo(Math.ceil(response.data.totalElements / 5));
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }
  // Search Pagination handler 
  const searchPaginationHandler = (pageNumber) => {

    console.log('---------Called from searchPaginationHandler----------');
    const pageNo = pageNumber - 1;

    if (searchTypeValue === 'Search By Voucher Code') {
      const voucherSearchByCode = '/multivendorshop/mv/v1/voucher/app/admin/bycode/' + searchKeyword + '?page=' + pageNo + '&size=5';
      axios.get(voucherSearchByCode)
        .then(function (response) {
          setVoucherList(response.data.content);
        })
        .catch(function (error) {
          console.log(error);
        });

    }
  }



  //Start Date
  const handleStartDateChange = (date) => {
    console.log(date)
    setselectedStartDate(date);
  }
  //Start Time
  const handleStartTimeChange = (date) => {
      setselectedStartTime(date);
  }
  //End Date
  const handleEndDateChange = (date) => {
      console.log(date)
      setselectedEndDate(date);
  }
  //End Time
  const handleEndTimeChange = (date) => {
      setselectedEndTime(date);
  }


  const handleVoucherTypeChange = event => {
    setVoucherType(event.target.value);
  }



  // card Deactivate Handler 
  const cardDeactivateHandler = () => {
    const voucherUpdateUrl = '/multivendorshop/mv/v1/voucher/app/admin/activestatus/' + voucherId + '?status=false' ;
      axios.put(voucherUpdateUrl)
        .then(function (response) {
          console.log('update response: ', response);
        })
        .catch(function (error) {
          console.log('error: ', error);
      });
  }
  // card Activate Handler 
  const cardActivateHandler = () => {
    const voucherUpdateUrl = '/multivendorshop/mv/v1/voucher/app/admin/activestatus/' + voucherId + '?status=true' ;
      axios.put(voucherUpdateUrl)
        .then(function (response) {
          console.log('update response: ', response);
        })
        .catch(function (error) {
          console.log('error: ', error);
      });
  }



  // Retriving the record to be updated 
  const editVoucher = (id) => {
    alert(id)
    const riderDetailsUrl = '/multivendorshop/mv/v1/voucher/app/admin/' + id;
    axios.get(riderDetailsUrl)
      .then(function (response) {
        console.log(response.data)
        setVoucherId(response.data.voucherId);
        setcardTitle(response.data.voucherTitle);
        setDescription(response.data.description);
        setVoucherCode(response.data.voucherCode);
        setVoucherOwnerType(response.data.ownerType);
        setVoucherType(response.data.voucherType);
        setVoucherValue(response.data.voucherValue);

        const convertedStartDate = timeStampToDate(response.data.startDate);
        setselectedStartDate(convertedStartDate);
        setselectedStartTime(convertedStartDate);

        const convertedEndDate = timeStampToDate(response.data.endDate);
        setselectedEndDate(convertedEndDate);
        setselectedEndTime(convertedEndDate);
        if(response.data.status){
          setActiveStatus('Active');
        }else {
          setActiveStatus('Inactive');
        }
        
        setMaxAmount(response.data.maxAmount);
        setMinPurchase(response.data.minPurchaseAmount);
      });
  }
  const timeStampToDate = (timeStamp) => {
    const convertedDateTime = new Date(timeStamp); // Unix timestamp to date time
    // const convertedDateTime = new Date(timeStamp * 1000);  // normal timestamp to date time 
    console.log('Unix time stamp converted to date: ', convertedDateTime);

    return convertedDateTime;
  }
  // For update button click set
  const voucherUpdateHandler = (event) => {
    setUpdateBtnClicked(true);

    event.preventDefault();
  }
  // Record data to be updated 
  const voucherData = {
    "voucherTitle": cardTitle,
    "description": description,
    "voucherCode": VoucherCode,
    "ownerType": 0,
    "voucherType": voucherType,
    "voucherValue": VoucherValue,
    "startDate": startDateTime,
    "endDate": endDateTime,
    "maxAmount": maxAmount,
    "minPurchaseAmount": minPurchase
  }
  // update record if Flag receives 'true'
  const updateConfirmationFlag = (flag) => {

    if (flag == true) {
      if (selectedStartDate.getTime() <= selectedEndDate.getTime()) {
        if (selectedStartDate.getTime() === selectedEndDate.getTime()) {
          if (selectedStartTime.getTime() < selectedEndTime.getTime()) {
            toTimeStamp();
            if (voucherData.voucherType === '2' && voucherData.voucherValue > '100') {
              alert('Percentage value can not be more than 100');
            } else {
              console.log('voucherData: ', voucherData);
              const voucherUpdateUrl = '/multivendorshop/mv/v1/voucher/app/admin/' + voucherId;
              axios.put(voucherUpdateUrl, voucherData)
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
          if (voucherData.voucherType === '2' && voucherData.voucherValue > '100') {
            alert('Percentage value can not be more than 100');
          } else {
            console.log('voucherData: ', voucherData);
            const voucherUpdateUrl = '/multivendorshop/mv/v1/voucher/app/admin/' + voucherId;
            axios.put(voucherUpdateUrl, voucherData)
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


  }
  // onUpdate Change Flag 
  const onUpdateChangeFlag = (flag) => {
    setUpdateBtnClicked(flag);
  }


  // Record delete handler 
  const deleteVoucher = (id) => {
    alert(id)
    const riderDeleteById = '/multivendorshop/mv/v1/voucher/app/admin/' + id;
    setDeleteUrl(riderDeleteById);

    setDeleteBtnClicked(true);
  }
  // on Delete close the warning popup 
  const onDeleteChangeFlag = (flag) => {
    setDeleteBtnClicked(flag);
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

      {/* ############################# Warning Component Calling ############################# */}
      {updateBtnClicked ? <UpdateWarning updateConfirmationFlag={updateConfirmationFlag} onUpdateChangeFlag={onUpdateChangeFlag} /> : null}
      {deleteBtnClicked ? <DeleteWarning deleteUrl={deleteUrl} onDeleteChangeFlag={onDeleteChangeFlag} /> : null}

      {/* ############################# Voucher List Table############################# */}
      <GridContainer>
        <GridItem xs={12}>
          <Card>

            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <Assignment />
              </CardIcon>
              <h4 style={{ float: 'left' }} className={classes.cardIconTitle}>Voucher List</h4>
              <div style={{ marginLeft: '45vw', display: 'flex' }}>

                <div className="search-dropdown-style">
                  <select
                    value={searchTypeValue}
                    onChange={handleSearchType}
                  >
                    <option value="No Select">No Select</option>
                    <option value="Search By Voucher Code">Search By Voucher Code</option>
                  </select>
                </div>

                <CustomInput
                  formControlProps={{
                    className: classes.top + " " + classes.search
                  }}
                  inputProps={{
                    placeholder: "Search Voucher",
                    value: searchKeyword,
                    onChange: (event) => setSearchKeyword(event.target.value),
                    type: 'String'
                  }}
                />
                <Button
                  style={{ marginTop: '5%' }}
                  color="white"
                  aria-label="edit"
                  justIcon
                  round
                  className={searchButton}
                  onClick={() => voucherSearchHanler()}
                >
                  <Search className={classes.headerLinksSvg + " " + classes.searchIcon} />
                </Button>
              </div>

            </CardHeader>

            <CardBody>
              <Table
                tableHead={[
                  "#",
                  "Voucher Code",
                  "Start Date",
                  "End Date",
                  "Status",
                  "Actions"
                ]}
                tableData={voucherList.map((user) => {
                  const { voucherId, voucherCode, startDate, endDate, status } = user;
                  var activeStatus;
                  // var voucherOwnerType;
                  var startDateTime = moment(startDate).format('DD-MM-YYYY')
                  var endDateTime = moment(endDate).format('DD-MM-YYYY')

                  // if (ownerType == 0) { voucherOwnerType = 'Admin' }
                  // else if (ownerType == 2) { voucherOwnerType = 'Vendor' }

                  if (!status || status == null) { activeStatus = "Inactive" }
                  else { activeStatus = "Active" }

                  return (
                    [
                      voucherId,
                      voucherCode,
                      startDateTime,
                      endDateTime,
                      activeStatus,
                      <div>
                        <Button style={{ marginLeft: '2px', marginRight: '2px' }}
                          round
                          color='success'
                          className={classes.actionButton + " " + classes.actionButtonRound}
                          onClick={() => editVoucher(user.voucherId)}>
                          <Edit className={classes.icon} />
                        </Button>
                        <Button style={{ marginLeft: '2px', marginRight: '2px' }}
                          round
                          color='danger'
                          className={classes.actionButton + " " + classes.actionButtonRound}
                          onClick={() => deleteVoucher(user.voucherId)}>
                          <Close className={classes.icon} />
                        </Button>
                      </div>
                    ]
                  )
                })}
                customCellClasses={[classes.center, classes.right, classes.right]}
                customClassesForCells={[0, 4, 5]}
                customHeadCellClasses={[
                  classes.center,
                  classes.right,
                  classes.right
                ]}
                customHeadClassesForCells={[0, 4, 5]}
              />
            </CardBody>

            <div className="pagination-style">
              {userNormalRender ? <PaginationComponent paginationHandler={paginationHandler} totalCount={totalPageNo} /> :
                <SearchPaginationComponent paginationHandler={searchPaginationHandler} totalCount={totalPageNo} />
              }
            </div>

          </Card>
        </GridItem>
      </GridContainer>


      {/* ############################# Voucher Edit Form ############################# */}
      <GridContainer>
        <GridItem xs={12} sm={12} >
          {/* md={8} */}
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <LocalOfferIcon />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
                Update Voucher
              </h4>
            </CardHeader>
            <CardBody>

              {/* Card Title and ID */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Card Title"
                    id="card-title"
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
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Card Id"
                    id="card-id"
                    disabled='true'
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: 'String',
                      value: voucherId || '',
                      // onChange: (event) => setVoucherId(event.target.value),
                      // maxLength: "10"
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* Description  and Status*/}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
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
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Status "
                    id="status"
                    disabled='true'
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: 'String',
                      value: activeStatus || '',
                      // onChange: (event) => setActiveStatus(event.target.value),
                      // maxLength: "200"

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

              {/* Date and Time  */}
              <GridContainer>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Start Date"
                      format="MM/dd/yyyy"
                      value={selectedStartDate}
                      onChange={handleStartDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                    <KeyboardTimePicker
                      margin="normal"
                      id="time-picker"
                      label="Time picker"
                      value={selectedStartTime}
                      onChange={handleStartTimeChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />

                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="End Date"
                      format="MM/dd/yyyy"
                      value={selectedEndDate}
                      onChange={handleEndDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                    <KeyboardTimePicker
                      margin="normal"
                      id="time-picker"
                      label="Time picker"
                      value={selectedEndTime}
                      onChange={handleEndTimeChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>

              </GridContainer>

              <Button color="danger" className={classes.updateProfileButton} onClick={cardDeactivateHandler}>
                Deactivate
              </Button>
              <Button color="success" className={classes.updateProfileButton} onClick={cardActivateHandler}>
                Activate
              </Button>
              <Button color="info" className={classes.updateProfileButton} onClick={voucherUpdateHandler}>
                Update
              </Button>

              <Clearfix />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

    </>
  );
}
