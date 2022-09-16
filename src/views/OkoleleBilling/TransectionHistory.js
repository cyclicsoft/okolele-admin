import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// Global State
import { store, useGlobalState } from "state-pool";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import Radio from "@mui/material/Radio";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";

import avatar from "assets/img/faces/marc.jpg";

import CustomInput from "components/CustomInput/CustomInput.js";
import Clearfix from "components/Clearfix/Clearfix.js";
import CardAvatar from "components/Card/CardAvatar.js";
// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
import Search from "@material-ui/icons/Search";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";

import AddLocation from "@material-ui/icons/AddLocation";
// react components used to create a google map
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import Map from "../GhorwaliMap/Map";
import PaginationComponent from "views/Pagination/PaginationComponent";
import SearchPaginationComponent from "views/Pagination/SearchPaginationComponent";

import "../../assets/scss/ghorwali-scss/paginations.scss";
import "../../assets/scss/ghorwali-scss/search-dropdown.scss";
// react component used to create alerts
import DeleteWarning from "views/ConfirmationModals/DeleteWarning";
import UpdateWarning from "views/ConfirmationModals/UpdateWarning";

import { RefreshTokenGenerator } from "../ReusableFunctions/RefreshTokenGenerator.js";

import axios from "axios";
import ActivateDeactivatePopup from "views/ConfirmationModals/ActivateDeactivatePopup";

const useStyles = makeStyles(styles);

export default function TransectionHistory() {
  const classes = useStyles();
  const history = useHistory();
  // Root Path URL
  const rootPath = useGlobalState("rootPathVariable");

  // accessToken
  const [userToken, setUserToken, updateUserToken] = useGlobalState(
    "accessToken"
  );

  const [transectionListBy, setTransectionListBy] = useState(
    "By Customer Phone"
  );
  const [customerPhone, setCustomerPhone] = useState("");
  const [transectionType, setTransectionType] = useState("PAYMENT");
  const [transectionList, settransectionList] = useState([]);

  const [showActiveInactivePopup, setShowActiveInactivePopup] = useState(false);
  const [customerToBeUpdated, setCustomerToBeUpdated] = useState("");
  const [statusChangeAction, setStatusChangeAction] = useState(false);

  const [transectByPhone, setTransectByPhone] = useState(true);

  const searchButton = classes.top + " " + classes.searchButton;
  const [totalPageNo, setTotalPageNo] = useState(1);

  // Customer Search Handler
  const transectionByPhoneOnclick = () => {
    setTransectByPhone(true);
    getToken((token) => {
      getTransectionByPhone(token);
    });
  };
  // getTransectionByPhone
  const getTransectionByPhone = (token) => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const pageNo = 0;

    const transectionByPhoneAPI =
      rootPath[0] +
      "/transaction/mobile?mobile=" +
      customerPhone +
      "&page=" +
      pageNo +
      "&size=10";
    axios
      .get(transectionByPhoneAPI, config)
      .then(function (response) {
        settransectionList(response.data.content.data);
        console.log("transectionByPhoneAPI...: ", response.data);
        setTotalPageNo(Math.ceil(response.data.content.totalItems / 10));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Search Pagination handler
  const searchPaginationHandler = (pageNumber) => {
    let Tkn = "";
    getToken((token) => {
      Tkn = token;
    });
    let config = {
      headers: {
        Authorization: "Bearer " + Tkn,
      },
    };

    console.log("---------Called from searchPaginationHandler----------");
    const pageNo = pageNumber - 1;

    const transectionByIdAPI =
      rootPath[0] +
      "/transaction/type?transactionType=" +
      transectionType +
      "&page=" +
      pageNo +
      "&size=5";
    axios
      .get(transectionByIdAPI, config)
      .then(function (response) {
        settransectionList(response.data.content.data);
        console.log("transectionByIdAPI...: ", response.data);
        setTotalPageNo(Math.ceil(response.data.content.totalItems / 10));
      })
      .catch(function (error) {
        console.log("users error", error);
      });
  };

  // Pagination handler
  const paginationHandler = (pageNumber) => {
    let Tkn = "";
    getToken((token) => {
      Tkn = token;
    });
    let config = {
      headers: {
        Authorization: "Bearer " + Tkn,
      },
    };

    const pageNo = pageNumber - 1;

    const transectionByPhoneAPI =
      rootPath[0] +
      "/transaction/mobile?mobile=" +
      customerPhone +
      "&page=" +
      pageNo +
      "&size=10";
    axios
      .get(transectionByPhoneAPI, config)
      .then(function (response) {
        settransectionList(response.data.content.data);
        console.log("transectionByPhoneAPI...: ", response.data);
        setTotalPageNo(Math.ceil(response.data.content.totalItems / 10));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getTransectionBy = (event) => {
    setTransectionListBy(event.target.value);
    if (event.target.value === "By Transection Type") {
      setTransectByPhone(false);

      getToken((token) => {
        getTransectionListByType(token, transectionType);
      });
    }
  };

  const transectionTypeHandler = (event) => {
    setTransectionType(event.target.value);

    getToken((token) => {
      getTransectionListByType(token, event.target.value);
    });
  };

  const getTransectionListByType = (token, transectionType) => {
    const pageNo = 0;

    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    console.log("transectionType...: ", transectionType);

    const transectionByIdAPI =
      rootPath[0] +
      "/transaction/type?transactionType=" +
      transectionType +
      "&page=" +
      pageNo +
      "&size=5";
    axios
      .get(transectionByIdAPI, config)
      .then(function (response) {
        settransectionList(response.data.content.data);
        console.log("transectionByIdAPI...: ", response.data);
        setTotalPageNo(Math.ceil(response.data.content.totalItems / 10));
      })
      .catch(function (error) {
        console.log("users error", error);
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
      {/* ############################# Rider List ############################# */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <Assignment />
              </CardIcon>
              <h4 style={{ float: "left" }} className={classes.cardIconTitle}>
                Billing History
              </h4>

              <div style={{ marginLeft: "45vw", display: "flex" }}>
                <div className="search-dropdown-style">
                  <select
                    value={transectionListBy}
                    onChange={(event) => getTransectionBy(event)}
                  >
                    <option value="By Customer Phone">By Customer Phone</option>
                    <option value="By Transection Type">
                      By Transection Type
                    </option>
                  </select>
                </div>
                {transectionListBy === "By Transection Type" && (
                  <div className="search-dropdown-style">
                    <select
                      value={transectionType}
                      onChange={(event) => transectionTypeHandler(event)}
                    >
                      <option value="PAYMENT">PAYMENT</option>
                      <option value="REFUND">REFUND</option>
                      <option value="ADJUSTMENT">ADJUSTMENT</option>
                    </select>
                  </div>
                )}

                {transectionListBy === "By Customer Phone" && (
                  <div style={{ display: "flex" }}>
                    <CustomInput
                      formControlProps={{
                        className: classes.top + " " + classes.search,
                      }}
                      inputProps={{
                        placeholder: "Customer Phone",
                        value: customerPhone,
                        onChange: (event) =>
                          setCustomerPhone(event.target.value),
                        type: "Phone",
                      }}
                    />
                    <Button
                      style={{ marginTop: "9%" }}
                      color="white"
                      aria-label="edit"
                      justIcon
                      round
                      className={searchButton}
                      onClick={() => transectionByPhoneOnclick()}
                    >
                      <Search
                        className={
                          classes.headerLinksSvg + " " + classes.searchIcon
                        }
                      />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardBody>
              <Table
                tableHead={[
                  "Customer ID",
                  "Transection Type",
                  "Amount",
                  "Modified On",
                  "Actions",
                ]}
                tableData={transectionList.map((transection) => {
                  // console.log("customerList: ", user);
                  const {
                    id,
                    customerId,
                    transactionType,
                    amount,
                    modifiedDate,
                  } = transection;
                  return [
                    customerId,
                    transactionType,
                    amount,
                    modifiedDate,
                    <div>
                      <Button
                        style={{ margin: "2px" }}
                        round
                        color="info"
                        className={
                          classes.actionButton + " " + classes.actionButtonRound
                        }
                        // onClick={() => goToCustomerDetails(id)}
                      >
                        <Person className={classes.icon} />
                      </Button>
                      {/* <Button
                        style={{ margin: "2px" }}
                        round
                        color="success"
                        className={
                          classes.actionButton + " " + classes.actionButtonRound
                        }
                        onClick={() => editCustomer(id)}
                      >
                        <Edit className={classes.icon} />
                      </Button> */}
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
              {transectByPhone ? (
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
    </>
  );
}
