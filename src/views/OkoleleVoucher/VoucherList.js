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
import "../../assets/scss/ghorwali-scss/voucherCard.scss";
// Pagination
import PaginationComponent from "views/Pagination/PaginationComponent";
import SearchPaginationComponent from "views/Pagination/SearchPaginationComponent";
// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Search from "@material-ui/icons/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import SyncIcon from "@mui/icons-material/Sync";
//SCSS file
import "../../assets/scss/ghorwali-scss/voucher-list.scss";
import "date-fns";
import "../../assets/scss/ghorwali-scss/paginations.scss";
// react component used to create alerts
import DeleteWarning from "views/ConfirmationModals/DeleteWarning";
import UpdateWarning from "views/ConfirmationModals/UpdateWarning";
//Date
import "../../assets/scss/ghorwali-scss/voucherCard.scss";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";

import moment from "moment";

const useStyles = makeStyles(styles);

export default function VoucherList() {
  // ############################# Vendor List Data#############################
  const [checked, setChecked] = React.useState([]);
  const classes = useStyles();
  const searchButton = classes.top + " " + classes.searchButton;
  // accessToken
  const [userToken, setUserToken, updateUserToken] = useGlobalState(
    "accessToken"
  );
  // Root Path URL
  const rootPath = useGlobalState("rootPathVariable");

  const [voucherId, setVoucherId] = useState("");
  const [VoucherCode, setVoucherCode] = useState("");
  const [voucherType, setVoucherType] = useState("FLAT");
  const [VoucherValue, setVoucherValue] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [minPurchase, setMinPurchase] = useState(0);
  const [usageLimit, setUsageLimit] = useState(1);
  const [activeStatus, setActiveStatus] = useState(false);

  const [selectedStartDate, setselectedStartDate] = React.useState(new Date());
  const [selectedEndDate, setselectedEndDate] = React.useState(new Date());

  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  const [voucherList, setVoucherList] = useState([]);
  // Pagination
  const [totalPageNo, setTotalPageNo] = useState(1);

  const [userNormalRender, setUserNormalRender] = useState(true); // true for normal pagination, false for search pagination

  // Search
  const [searchKeyword, setSearchKeyword] = useState("");

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

  // Voucher Delete
  const [deleteUrl, setDeleteUrl] = useState("");
  const [deleteBtnClicked, setDeleteBtnClicked] = useState(false);
  // Voucher Update
  const [updateBtnClicked, setUpdateBtnClicked] = useState(false);

  // get Voucher List
  const syncVoucherList = () => {
    getToken((token) => {
      getVoucherList(token);
    });
  };
  // get Voucher List
  useEffect(() => {
    getToken((token) => {
      getVoucherList(token);
    });
  }, []);
  // getVoucherList
  const getVoucherList = (token) => {
    setUserNormalRender(true);
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const pageNo = 0;
    const voucherListAPI = rootPath[0] + "/coupon?page=" + pageNo + "&size=5";

    axios
      .get(voucherListAPI, config)
      .then(function (response) {
        console.log("getVoucherList...: ", response.data);
        setVoucherList(response.data.content.data);
        console.log("Total...: ", response.data.content.totalItems);
        setTotalPageNo(Math.ceil(response.data.content.totalItems / 5));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // Pagination handler
  const paginationHandler = (pageNumber) => {
    let config = {};
    getToken((token) => {
      config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
    });
    // console.log("---------Called from paginationHandler----------");
    const pageNo = pageNumber - 1;
    const voucherListAPI = rootPath[0] + "/coupon?page=" + pageNo + "&size=5";

    axios
      .get(voucherListAPI, config)
      .then(function (response) {
        setVoucherList(response.data.content.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    toTimeStamp();
  }, [selectedStartDate, selectedEndDate]);

  // Voucher Search Handler
  const voucherSearchHanler = (event) => {
    setUserNormalRender(false);
    let config = {};
    getToken((token) => {
      config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
    });

    console.log("searchKeyword...: ", searchKeyword);
    const pageNo = 0;

    const voucherSearchByCode =
      rootPath[0] +
      "/coupon/search?page=" +
      pageNo +
      "&size=5&coupon_code=" +
      searchKeyword;

    axios
      .get(voucherSearchByCode, config)
      .then(function (response) {
        console.log("voucherSearchByCode/list...: ", response.data);
        setVoucherList(response.data.content.data);

        setTotalPageNo(Math.ceil(response.data.content.totalItems / 5));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // Search Pagination handler
  const searchPaginationHandler = (pageNumber) => {
    let config = {};
    getToken((token) => {
      config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
    });

    const pageNo = pageNumber - 1;

    const voucherSearchByCode =
      rootPath[0] +
      "/coupon/search?page=" +
      pageNo +
      "&size=5&coupon_code=" +
      searchKeyword;

    console.log("searchPaginationHandler/config...: ", config);

    axios
      .get(voucherSearchByCode, config)
      .then(function (response) {
        setVoucherList(response.data.content.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleVoucherTypeChange = (event) => {
    setVoucherType(event.target.value);
  };

  const statusChangeBtnClick = (voucherId, statusToUpdate) => {
    let config = {};
    getToken((token) => {
      config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
    });

    const statusUpdateAPI =
      rootPath[0] + "/coupon/status/" + voucherId + "?status=" + statusToUpdate;

    axios
      .post(statusUpdateAPI, {}, config)
      .then(function (response) {
        console.log("statusChangeBtnClick: ", response);
        alert("Status Updated!");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // card Deactivate Handler
  const cardDeactivateHandler = () => {
    const voucherUpdateUrl =
      "/multivendorshop/mv/v1/voucher/app/admin/activestatus/" +
      voucherId +
      "?status=false";
    axios
      .put(voucherUpdateUrl)
      .then(function (response) {
        console.log("update response: ", response);
      })
      .catch(function (error) {
        console.log("error: ", error);
      });
  };
  // card Activate Handler
  const cardActivateHandler = () => {
    const voucherUpdateUrl =
      "/multivendorshop/mv/v1/voucher/app/admin/activestatus/" +
      voucherId +
      "?status=true";
    axios
      .put(voucherUpdateUrl)
      .then(function (response) {
        console.log("update response: ", response);
      })
      .catch(function (error) {
        console.log("error: ", error);
      });
  };

  // Retriving the record to be updated
  const editVoucher = (id, voucherDetails) => {
    setVoucherId(id);

    console.log("editVoucher/voucherDetails: ", voucherDetails);
    setVoucherCode(voucherDetails.coupon_code);
    setVoucherType(voucherDetails.coupon_type);
    setVoucherValue(voucherDetails.value);
    setMaxAmount(voucherDetails.max_discount_amount);
    setMinPurchase(voucherDetails.min_order_value);
    setUsageLimit(voucherDetails.usage_limit);
    setActiveStatus(voucherDetails.is_active);

    setselectedStartDate(new Date(voucherDetails.created_date));
    setselectedEndDate(new Date(voucherDetails.expiry_date));
  };

  // Record data to be updated
  const voucherData = {
    coupon_code: VoucherCode,
    coupon_type: voucherType,
    value: VoucherValue,
    usage_limit: usageLimit,
    start_date: startDateTime,
    expiry_date: endDateTime,
    max_discount_amount: maxAmount,
    min_order_value: minPurchase,
    is_active: activeStatus,
  };
  // For update button click set
  const voucherUpdateClick = (event) => {
    setUpdateBtnClicked(true);

    event.preventDefault();
  };
  // update record if Flag receives 'true'
  const updateConfirmationFlag = (flag) => {
    if (flag === true && inputDateValidityCheck() === true) {
      let config = {};
      getToken((token) => {
        config = {
          headers: {
            Authorization: "Bearer " + token,
          },
        };
      });

      const voucherUpdateAPI = rootPath[0] + "/coupon/" + voucherId;
      console.log("updateConfirmationFlag/voucherData: ", voucherData);
      axios
        .put(voucherUpdateAPI, voucherData, config)
        .then(function (response) {
          console.log("update response: ", response);
        })
        .catch(function (error) {
          // handle error
          console.log("error: ", error);
        });
    }
  };
  const inputDateValidityCheck = () => {
    console.log(
      "inputDateValidityCheck/selectedStartDate,selectedEndDate",
      selectedStartDate,
      selectedEndDate
    );
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
  // onUpdate Change Flag
  const onUpdateChangeFlag = (flag) => {
    setUpdateBtnClicked(flag);
  };

  // Record delete handler
  const deleteVoucher = (id) => {
    alert(id);
    const voucherDeleteAPI = rootPath[0] + "/coupon/" + id;
    setDeleteUrl(voucherDeleteAPI);

    setDeleteBtnClicked(true);
  };
  // on Delete close the warning popup
  const onDeleteChangeFlag = (flag) => {
    setDeleteBtnClicked(flag);
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
      {/* ############################# Warning Component Calling ############################# */}
      {updateBtnClicked ? (
        <UpdateWarning
          updateConfirmationFlag={updateConfirmationFlag}
          onUpdateChangeFlag={onUpdateChangeFlag}
        />
      ) : null}
      {deleteBtnClicked ? (
        <DeleteWarning
          deleteUrl={deleteUrl}
          onDeleteChangeFlag={onDeleteChangeFlag}
        />
      ) : null}

      {/* ############################# Voucher List Table############################# */}
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <Assignment />
              </CardIcon>
              <h4 style={{ float: "left" }} className={classes.cardIconTitle}>
                Voucher List
              </h4>
              <div style={{ marginLeft: "49vw", display: "flex" }}>
                {/* Sync Voucher List */}
                <button
                  style={{
                    marginTop: "2%",
                    background: "none",
                    border: "none",
                    color: "gray",
                  }}
                  className={searchButton}
                  onClick={() => syncVoucherList()}
                >
                  <SyncIcon />
                </button>
                <div
                  style={{
                    marginTop: "5vh",
                    marginRight: "4vh",
                    color: "gray",
                    fontWeight: "500",
                  }}
                >
                  Refresh
                </div>

                <CustomInput
                  formControlProps={{
                    className: classes.top + " " + classes.search,
                  }}
                  inputProps={{
                    placeholder: "Search by Code",
                    value: searchKeyword,
                    onChange: (event) => setSearchKeyword(event.target.value),
                    type: "String",
                  }}
                />

                <Button
                  style={{ marginTop: "5%" }}
                  color="white"
                  aria-label="edit"
                  justIcon
                  round
                  className={searchButton}
                  onClick={() => voucherSearchHanler()}
                >
                  <Search
                    className={
                      classes.headerLinksSvg + " " + classes.searchIcon
                    }
                  />
                </Button>
              </div>
            </CardHeader>

            <CardBody>
              <Table
                tableHead={[
                  "Voucher Code",
                  "Type",
                  "Value",
                  "Start Date",
                  "Expiry Date",
                  "Status",
                  "Actions",
                ]}
                tableData={voucherList.map((voucher) => {
                  const {
                    id,
                    coupon_code,
                    coupon_type,
                    value,
                    start_date,
                    expiry_date,
                    is_active,
                  } = voucher;
                  var activeStatus;
                  // var voucherOwnerType;
                  var startDate = moment(start_date).format("DD-MM-YYYY");
                  var endDate = moment(expiry_date).format("DD-MM-YYYY");

                  if (!is_active || is_active == null) {
                    activeStatus = "Inactive";
                  } else {
                    activeStatus = "Active";
                  }

                  return [
                    coupon_code,
                    coupon_type,
                    value,
                    startDate,
                    endDate,
                    activeStatus,
                    <div>
                      {/* edit Voucher */}
                      <Button
                        disabled={is_active ? true : false}
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                        round
                        color="success"
                        className={
                          classes.actionButton + " " + classes.actionButtonRound
                        }
                        onClick={() => editVoucher(id, voucher)}
                      >
                        <Edit className={classes.icon} />
                      </Button>

                      {/* delete Voucher */}
                      <Button
                        disabled={is_active ? true : false}
                        style={{ marginLeft: "2px", marginRight: "2px" }}
                        round
                        color="danger"
                        className={
                          classes.actionButton + " " + classes.actionButtonRound
                        }
                        onClick={() => deleteVoucher(id)}
                      >
                        <Close className={classes.icon} />
                      </Button>

                      {/* Publish/Unpublished button (Conditional display) */}
                      {is_active ? (
                        <Button
                          // style={{
                          //   height: "30px",
                          //   width: "30px",
                          //   padding: "0px 0px 0px 3px",
                          //   margin: "0px 2px 0px 2px",
                          // }}
                          round
                          color="default"
                          className={
                            classes.actionButton +
                            " " +
                            classes.actionButtonRound
                          }
                          onClick={() => statusChangeBtnClick(id, false)}
                        >
                          <UnpublishedIcon className={classes.icon} />
                        </Button>
                      ) : (
                        <Button
                          // style={{
                          //   height: "30px",
                          //   width: "30px",
                          //   padding: "0px 0px 0px 3px",
                          //   margin: "0px 2px 0px 2px",
                          // }}
                          round
                          color="rose"
                          className={
                            classes.actionButton +
                            " " +
                            classes.actionButtonRound
                          }
                          onClick={() => statusChangeBtnClick(id, true)}
                        >
                          <CheckCircleIcon className={classes.icon} />
                        </Button>
                      )}
                    </div>,
                  ];
                })}
                customCellClasses={[
                  classes.center,
                  classes.right,
                  classes.right,
                ]}
                customClassesForCells={[0, 4, 5]}
                customHeadCellClasses={[
                  classes.center,
                  classes.right,
                  classes.right,
                ]}
                customHeadClassesForCells={[0, 4, 5]}
              />
            </CardBody>

            <div className="pagination-style">
              {userNormalRender ? (
                <PaginationComponent
                  paginationHandler={paginationHandler}
                  totalCount={totalPageNo}
                />
              ) : (
                <SearchPaginationComponent
                  paginationHandler={searchPaginationHandler}
                  totalCount={totalPageNo}
                />
              )}
            </div>
          </Card>
        </GridItem>
      </GridContainer>

      {/* ############################# Voucher Edit Form ############################# */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <LocalOfferIcon />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Update Voucher</h4>
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
                      // onChange: (event) => setVoucherCode(event.target.value),
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

              {/* Usage Limit & Date Picker */}
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

              <Button
                color="info"
                className={classes.updateProfileButton}
                onClick={voucherUpdateClick}
              >
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
