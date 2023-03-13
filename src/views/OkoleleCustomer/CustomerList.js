/*eslint-disable*/
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
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

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

export default function CustomerList() {
  const classes = useStyles();
  const history = useHistory();

  // accessToken
  const [userToken, setUserToken, updateUserToken] = useGlobalState(
    "accessToken"
  );
  // Root Path URL
  const rootPath = useGlobalState("rootPathVariable");

  const [showActiveInactivePopup, setShowActiveInactivePopup] = useState(false);
  const [customerToBeUpdated, setCustomerToBeUpdated] = useState("");
  const [statusChangeAction, setStatusChangeAction] = useState(false);

  const searchButton = classes.top + " " + classes.searchButton;
  const [totalPageNo, setTotalPageNo] = useState(1);

  const [userNormalRender, setUserNormalRender] = useState(true); // true for normal pagination, false for search pagination
  // Search
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchTypeValue, setSearchTypeValue] = useState("No Select");

  const [customerList, setCustomerList] = useState([]);
  // Rider Delete
  const [deleteUrl, setDeleteUrl] = useState("");
  const [deleteBtnClicked, setDeleteBtnClicked] = useState(false);

  useEffect(() => {
    getToken((token) => {
      getCustomerList(token);
    });
  }, []);

  const getCustomerList = (token) => {
    const pageNo = 0;

    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    console.log("config...: ", config);

    const customerListByPagination =
      rootPath[0] + "/users?page=" + pageNo + "&size=5";
    axios
      .get(customerListByPagination, config)
      .then(function (response) {
        setCustomerList(response.data.data);
        console.log("users...: ", response.data.data);
        setTotalPageNo(Math.ceil(response.data.totalItems / 5));
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

    console.log("config...2: ", config);

    console.log("pageNumber: ", pageNumber);
    const pageNo = pageNumber - 1;

    const customerListByPagination =
      rootPath[0] + "/users?page=" + pageNo + "&size=5";

    axios
      .get(customerListByPagination, config)
      .then(function (response) {
        setCustomerList(response.data.data);
        console.log("CustomerList...: ", response.data.data);
        console.log("Total...: ", response.data.totalItems);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // handle Search Type
  const onSearchTypeChange = (event) => {
    //Normal pagination component will be hide and Search pagination will be rendered
    if (event.target.value == "No Select") {
      setUserNormalRender(true);
    } else if (
      event.target.value == "Search By Name" ||
      event.target.value == "Search By Phone"
    ) {
      setUserNormalRender(false);
    }

    console.log("event.target.value", event.target.value);
    setSearchTypeValue(event.target.value);
  };
  // Customer Search Handler
  const customerSearchHanler = () => {
    getToken((token) => {
      searchCustomer(token);
    });
  };
  // searchCustomer
  const searchCustomer = (token) => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const pageNo = 0;

    if (searchTypeValue === "Search By Phone") {
      const customerByPhone =
        rootPath[0] +
        "/users/search?keyword=" +
        searchKeyword +
        "&userFilterType=PHONE&page=" +
        pageNo +
        "&size=10";
      axios
        .get(customerByPhone, config)
        .then(function (response) {
          setCustomerList(response.data.content.data);
          // console.log("Searched Customers...: ", response.data);
          setTotalPageNo(Math.ceil(response.data.content.totalItems / 10));
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (searchTypeValue === "Search By Name") {
      const customerByName =
        rootPath[0] +
        "/users/search?keyword=" +
        searchKeyword +
        "&userFilterType=NAME&page=" +
        pageNo +
        "&size=10";
      axios
        .get(customerByName, config)
        .then(function (response) {
          setCustomerList(response.data.content.data);
          // console.log("Searched Customers...: ", response.data.content.totalItems);
          setTotalPageNo(Math.ceil(response.data.content.totalItems / 10));
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (searchTypeValue === "No Select") {
      const customerListByPagination =
        rootPath[0] + "/users?page=" + pageNo + "&size=5";
      axios
        .get(customerListByPagination, config)
        .then(function (response) {
          setCustomerList(response.data.data);
          // console.log("users...: ", response.data.data);
          setTotalPageNo(Math.ceil(response.data.totalItems / 5));
        })
        .catch(function (error) {
          console.log("users error", error);
        });
    }
  };

  // Search Pagination handler
  const searchPaginationHandler = (pageNumber) => {
    console.log("---------Called from searchPaginationHandler----------");
    const pageNo = pageNumber - 1;

    if (searchTypeValue === "Search By Phone") {
      const riderByPhone =
        "/multivendorshop/mv/v1/customer/app/admin/byPhone/" +
        searchKeyword +
        "?page=" +
        pageNo +
        "&size=10";
      axios
        .get(riderByPhone)
        .then(function (response) {
          setCustomerList(response.data.content);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (searchTypeValue === "Search By Name") {
      const riderByName =
        "/multivendorshop/mv/v1/customer/app/admin/byName/" +
        searchKeyword +
        "?page=" +
        pageNo +
        "&size=10";
      axios
        .get(riderByName)
        .then(function (response) {
          setCustomerList(response.data.content);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const goToCustomerDetails = (id) => {
    alert(id);

    history.push({
      pathname: "/admin/customer-details",
      customerId: id,
    });
  };

  const editCustomer = (id) => {
    alert(id);

    history.push({
      pathname: "/admin/update-customer",
      customerId: id,
    });
  };

  // chage Active Status
  const chageActiveStatus = (id, action) => {
    setShowActiveInactivePopup(true);
    setCustomerToBeUpdated(id);
    setStatusChangeAction(action);
  };
  // status Change Flag From Modal
  const statusChangeFlag = (isConfirmed) => {
    if (isConfirmed === true) {
      getToken((token) => {
        updateStatus(token);
      });
    }
    setShowActiveInactivePopup(false);
  };
  const updateStatus = (token) => {
    // setIsDataLoaded(false);

    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const statusUpdateAPI =
      rootPath[0] +
      "/users/activation/" +
      customerToBeUpdated +
      "?status=" +
      statusChangeAction;

    axios
      .post(statusUpdateAPI, {}, config)
      .then(function (response) {
        console.log("Status Update response: ", response);
        alert("Status updated!");
        getToken((token) => {
          getCustomerList(token);
        });
        // setIsDataLoaded(true);
      })
      .catch(function (error) {
        console.log(error);
        // setIsDataLoaded(true);
      });
  };

  // goToCustomerOrderList
  const goToCustomerOrderList = (id) => {
    alert(id);

    history.push({
      pathname: "/admin/user-order-list",
      customerId: id,
    });
  };

  // go To user-notifications
  const goToUserNotifications = (id) => {
    alert(id);

    history.push({
      pathname: "/admin/user-notifications",
      customerId: id,
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
      {/* Status change Confirmation Modal */}
      {showActiveInactivePopup ? (
        <ActivateDeactivatePopup statusChangeFlag={statusChangeFlag} />
      ) : null}

      {/* ############################# Rider List ############################# */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <Assignment />
              </CardIcon>
              <h4 style={{ float: "left" }} className={classes.cardIconTitle}>
                Customer List
              </h4>

              <div style={{ marginLeft: "45vw", display: "flex" }}>
                <div className="search-dropdown-style">
                  <select value={searchTypeValue} onChange={onSearchTypeChange}>
                    <option value="No Select">No Select</option>
                    <option value="Search By Name">Search By Name</option>
                    <option value="Search By Phone">Search By Phone</option>
                  </select>
                </div>

                <CustomInput
                  formControlProps={{
                    className: classes.top + " " + classes.search,
                  }}
                  inputProps={{
                    placeholder: "Search Customer",
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
                  onClick={() => customerSearchHanler()}
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
                tableHead={["#", "Name", "Phone", "Email", "Actions"]}
                tableData={customerList.map((user) => {
                  console.log("customerList: ", user);
                  const { id, name, mobile, email, isActive } = user;
                  return [
                    id,
                    name,
                    mobile,
                    email,
                    <div>
                      <Button
                        style={{ margin: "2px" }}
                        round
                        color="info"
                        className={
                          classes.actionButton + " " + classes.actionButtonRound
                        }
                        onClick={() => goToCustomerDetails(user.id)}
                      >
                        <Person className={classes.icon} />
                      </Button>
                      <Button
                        style={{ margin: "2px" }}
                        round
                        color="success"
                        className={
                          classes.actionButton + " " + classes.actionButtonRound
                        }
                        onClick={() => editCustomer(user.id)}
                      >
                        <Edit className={classes.icon} />
                      </Button>
                      {/* activate/deactivate button (Conditional display) */}
                      {isActive ? (
                        <Button
                          round
                          color="default"
                          className={
                            classes.actionButton +
                            " " +
                            classes.actionButtonRound
                          }
                          onClick={() => chageActiveStatus(id, false)}
                        >
                          <UnpublishedIcon className={classes.icon} />
                        </Button>
                      ) : (
                        <Button
                          round
                          color="rose"
                          className={
                            classes.actionButton +
                            " " +
                            classes.actionButtonRound
                          }
                          onClick={() => chageActiveStatus(id, true)}
                        >
                          <CheckCircleIcon className={classes.icon} />
                        </Button>
                      )}
                      <Button
                        style={{ margin: "2px" }}
                        round
                        color="primary"
                        className={
                          classes.actionButton + " " + classes.actionButtonRound
                        }
                        onClick={() => goToCustomerOrderList(user.id)}
                      >
                        <AddShoppingCartIcon className={classes.icon} />
                      </Button>
                      <Button
                        style={{ margin: "2px" }}
                        round
                        color="danger"
                        className={
                          classes.actionButton + " " + classes.actionButtonRound
                        }
                        onClick={() => goToUserNotifications(user.id)}
                      >
                        <ForwardToInboxIcon className={classes.icon} />
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
    </>
  );
}
