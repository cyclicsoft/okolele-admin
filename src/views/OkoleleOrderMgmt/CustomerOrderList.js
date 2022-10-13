import React, { useState, useEffect } from "react";
import axios from "axios";
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
import InfoIcon from "@mui/icons-material/Info";
import PermIdentity from "@material-ui/icons/PermIdentity";
import Search from "@material-ui/icons/Search";

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

import "../../assets/scss/ghorwali-scss/paginations.scss";
import "../../assets/scss/ghorwali-scss/search-dropdown.scss";

const useStyles = makeStyles(styles);

export default function CustomerOrderList(props) {
  const classes = useStyles();
  const history = useHistory();

  // customerId from props
  var customerId = props.location.customerId;
  console.log("customerId: ", customerId);

  // accessToken
  const [userToken, setUserToken, updateUserToken] = useGlobalState(
    "accessToken"
  );
  // Root Path URL
  const rootPath = useGlobalState("rootPathVariable");

  const searchButton = classes.top + " " + classes.searchButton;

  const [customerID, setCustomerID] = useState(customerId);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [customerPhone, setCustomerPhone] = useState("");

  // Pagination
  const [totalPageNo, setTotalPageNo] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getToken((token) => {
      // console.log("registerClick / TOken: ", token);
      getOrderList(token);
    });
  }, [customerID]);

  //   get Order List
  const getOrderList = (token) => {
    // API Header
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const pageNo = 0;
    const odrListAPI =
      rootPath[0] +
      "/order?userId=" +
      customerID +
      "&page=" +
      pageNo +
      "&size=10";

    axios
      .get(odrListAPI, config)
      .then(function (response) {
        setCustomerOrders(response.data.content.data);
        console.log("Order List...: ", response.data.content.data);
        setTotalPageNo(Math.ceil(response.data.content.totalItems / 10));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Pagination handler
  const paginationHandler = (pageNumber) => {
    // Show Data Loader
    // setIsDataLoaded(false);
    console.log("pageNumber: ", pageNumber);
    const pageNo = pageNumber - 1;
    setCurrentPage(pageNo);

    let config = {};

    getToken((token) => {
      config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
    });

    const odrListAPI =
      rootPath[0] +
      "/order?userId=" +
      customerID +
      "&page=" +
      pageNo +
      "&size=10";

    axios
      .get(odrListAPI, config)
      .then(function (response) {
        if (response.status == 200 && response.data.content.totalItems > 0) {
          setCustomerOrders(response.data.content.data);
        }
        // setIsDataLoaded(true);
      })
      .catch(function (error) {
        console.log(error);
        // setIsDataLoaded(true);
      });
  };

  // order Search Click
  const orderSearchClick = (event) => {
    getToken((token) => {
      searchOdrByCustomerPhone(token);
    });
  };
  // search Odr By Customer Phone
  const searchOdrByCustomerPhone = (token) => {
    // API Header
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const pageNo = 0;

    const searchOdrListAPI =
      rootPath[0] +
      "/order/mobile?page=" +
      pageNo +
      "&size=10&mobile=" +
      customerPhone;
    axios
      .get(searchOdrListAPI, config)
      .then(function (response) {
        setCustomerOrders(response.data.content.data);
        console.log("Searched Odr List: ", response.data);
        setTotalPageNo(Math.ceil(response.data.content.totalItems / 10));
      })
      .catch(function (error) {
        console.log(error);
        setCustomerOrders([]);
      });
  };

  const viewOrderDetails = (id) => {
    alert(id);

    history.push({
      pathname: "/admin/order-details",
      orderId: id,
    });
  };

  const updateOrderStatus = (id) => {
    alert(id);

    history.push({
      pathname: "/admin/update-orderStatus",
      orderId: id,
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
      {/* ############################# Order List ############################# */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <Assignment />
              </CardIcon>
              <h4 style={{ float: "left" }} className={classes.cardIconTitle}>
                Order List
              </h4>

              <div style={{ marginLeft: "59vw", display: "flex" }}>
                {/* <div className="search-dropdown-style">
                  <select value={searchTypeValue} onChange={handleSearchType}>
                    <option value="Search By Name">Search By Name</option>
                    <option value="Search By Phone">Search By Phone</option>
                  </select>
                </div> */}

                <CustomInput
                  formControlProps={{
                    className: classes.top + " " + classes.search,
                  }}
                  inputProps={{
                    placeholder: "Search By Phone",
                    value: customerPhone,
                    onChange: (event) => setCustomerPhone(event.target.value),
                    type: "Phone",
                  }}
                />
                <Button
                  style={{ marginTop: "5%" }}
                  color="white"
                  aria-label="edit"
                  justIcon
                  round
                  className={searchButton}
                  onClick={() => orderSearchClick()}
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
                tableHead={["#", "Date", "Order Total", "Status", "Actions"]}
                tableData={customerOrders.map((user) => {
                  console.log("riderList: ", user);
                  const { id, createdDate, subTotal, orderStatus } = user;
                  return [
                    id,
                    createdDate,
                    subTotal,
                    orderStatus,
                    <div>
                      <Button
                        style={{ margin: "2px" }}
                        round
                        color="info"
                        className={
                          classes.actionButton + " " + classes.actionButtonRound
                        }
                        onClick={() => viewOrderDetails(id)}
                      >
                        <InfoIcon className={classes.icon} />
                      </Button>
                      <Button
                        style={{ margin: "2px" }}
                        round
                        color="success"
                        className={
                          classes.actionButton + " " + classes.actionButtonRound
                        }
                        onClick={() => updateOrderStatus(id)}
                      >
                        <Edit className={classes.icon} />
                      </Button>
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
              <PaginationComponent
                paginationHandler={paginationHandler}
                totalCount={totalPageNo}
              />
            </div>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
